import { PlatformName } from "~/graphql/gql.gen";
import { PlayerPlaying } from "./types";

// eslint-disable-next-line @typescript-eslint/ban-types
type HandlerFn = Function;

interface PlayerHandle {
  play: () => void;
  seek: (ms: number) => void;
  isPlaying: () => boolean;
  pause: () => void;
  loadById: (externalId: string) => void;
  setVolume: (p: number) => void;
}

interface Player {
  // on
  on(state: "playing", fn: () => void): void;
  on(state: "paused", fn: () => void): void;
  on(state: "seeked", fn: () => void): void;
  on(state: "time", fn: (ms: number) => void): void;
  on(state: "ended", fn: () => void): void;
  // off
  off(state: "playing", fn: () => void): void;
  off(state: "paused", fn: () => void): void;
  off(state: "seeked", fn: () => void): void;
  off(state: "time", fn: (ms: number) => void): void;
  off(state: "ended", fn: () => void): void;
}

class Player {
  ee: Record<string, HandlerFn[]>;
  _lastPlatform: PlatformName | undefined;
  currentMs: number;
  playerFn: PlayerHandle | null;
  wasPlaying = false;
  playerPlaying: PlayerPlaying = null;

  constructor() {
    // developit/mitt
    this.ee = Object.create(null);
    this.currentMs = 0;
    this.playerFn = null;
    this.on("time", (ms: number) => {
      this.currentMs = ms;
    });
  }

  on(state: string, handler: HandlerFn) {
    (this.ee[state] || (this.ee[state] = [])).push(handler);
  }

  off(type: string, handler: HandlerFn) {
    if (this.ee[type]) {
      // eslint-disable-next-line no-bitwise
      this.ee[type].splice(this.ee[type].indexOf(handler) >>> 0, 1);
    }
  }

  emit(type: string, ...evt: unknown[]) {
    (this.ee[type] || []).slice().forEach((handler) => {
      handler(...evt);
    });
  }

  registerPlayer(registerHandle: PlayerHandle) {
    this.playerFn = registerHandle;
    // start playing after register
    this.playerPlaying &&
      registerHandle.loadById(this.playerPlaying.externalId);
  }

  unregisterPlayer() {
    this.playerFn = null;
  }

  seek(ms: number) {
    this.playerFn?.seek(ms);
  }

  get isPlaying() {
    return this.playerFn?.isPlaying();
  }

  play() {
    this.wasPlaying = true;
    this.playerFn?.play();
  }

  pause() {
    this.wasPlaying = false;
    this.playerFn?.pause();
  }

  setVolume(p: number) {
    this.playerFn?.setVolume(p);
  }

  loadByExternalId(externalId: string) {
    this.playerFn?.loadById(externalId);
  }

  comparePlatform(platform: PlatformName | undefined): boolean {
    const isSamePlatform = !!platform && this._lastPlatform === platform;
    this._lastPlatform = platform;
    return isSamePlatform;
  }
}

export default Player;
