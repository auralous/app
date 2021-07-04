import { PlaybackCurrentContext } from "./Context";

// eslint-disable-next-line @typescript-eslint/ban-types
type HandlerFn = Function;

interface PlayerHandle {
  play: () => void;
  seek: (ms: number) => void;
  isPlaying: () => boolean;
  pause: () => void;
  playByExternalId: (externalId: string | null) => void;
  setVolume: (percentage: number) => void;
}

interface Player {
  on(
    state: "context",
    fn: (context: null | PlaybackCurrentContext) => void
  ): void;
  on(state: "play", fn: () => void): void; // Trigger play
  on(state: "pause", fn: () => void): void; // Trigger pause
  on(state: "playing", fn: () => void): void; // Actually playing
  on(state: "paused", fn: () => void): void; // Actually pausing
  on(state: "seeked", fn: () => void): void;
  on(state: "ended", fn: () => void): void;
  on(state: "time", fn: (ms: number) => void): void;
  on(state: "skip-forward", fn: () => void): void;
  on(state: "skip-backward", fn: () => void): void;
  on(state: "play-index", fn: (index: number) => void): void;
  on(state: "play-next", fn: (uids: string[]) => void): void;
  on(
    state: "queue-reorder",
    fn: (from: number, to: number, data: unknown[]) => void
  ): void;
  on(state: "queue-remove", fn: (uids: string[]) => void): void;
  on(state: "queue-add", fn: (trackIds: string[]) => void): void;
  on(state: "__player_bar_pressed", fn: () => void): void;
  off(state: "context", fn: (context: PlaybackCurrentContext) => void): void;
  off(state: "play", fn: () => void): void;
  off(state: "pause", fn: () => void): void;
  off(state: "playing", fn: () => void): void;
  off(state: "paused", fn: () => void): void;
  off(state: "seeked", fn: () => void): void;
  off(state: "ended", fn: () => void): void;
  off(state: "time", fn: (ms: number) => void): void;
  off(state: "skip-forward", fn: () => void): void;
  off(state: "skip-backward", fn: () => void): void;
  off(state: "play-index", fn: (index: number) => void): void;
  off(state: "play-next", fn: (uids: string[]) => void): void;
  off(
    state: "queue-reorder",
    fn: (from: number, to: number, data: unknown[]) => void
  ): void;
  off(state: "queue-remove", fn: (uids: string[]) => void): void;
  off(state: "queue-add", fn: (trackIds: string[]) => void): void;
  off(state: "__player_bar_pressed", fn: () => void): void;
  emit(
    state: "context",
    fn: (context: null | PlaybackCurrentContext) => void
  ): void;
  emit(state: "play"): void; // Trigger play
  emit(state: "pause"): void; // Trigger pause
  emit(state: "playing"): void; // Actually playing
  emit(state: "paused"): void; // Actually pausing
  emit(state: "seeked"): void;
  emit(state: "ended"): void;
  emit(state: "time", ms: number): void;
  emit(state: "skip-forward"): void;
  emit(state: "skip-backward"): void;
  emit(state: "play-index", index: number): void;
  emit(state: "play-next", uids: string[]): void;
  emit(state: "queue-reorder", from: number, to: number, data: unknown[]): void;
  emit(state: "queue-remove", uids: string[]): void;
  emit(state: "queue-add", trackIds: string[]): void;
}

class Player {
  private ee: Record<string, HandlerFn[]>;
  private playerFn: PlayerHandle | null;

  __wasPlaying = false;

  constructor() {
    // developit/mitt
    this.ee = Object.create(null);
    this.playerFn = null;
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

  // Sometimes the player is not ready when #playByExternalId
  // is called. We queue it to do so later
  private __queuedPlayingExternalId: undefined | null | string = undefined;

  registerPlayer(registerHandle: PlayerHandle) {
    this.playerFn = registerHandle;
    if (this.__queuedPlayingExternalId !== undefined) {
      registerHandle.playByExternalId(this.__queuedPlayingExternalId);
      this.__queuedPlayingExternalId === undefined;
    }
  }

  playByExternalId(externalId: string | null) {
    if (!this.playerFn) {
      this.__queuedPlayingExternalId = externalId;
    }
    this.playerFn?.playByExternalId(externalId);
  }

  unregisterPlayer() {
    this.playerFn = null;
  }

  playContext(currentContextSelector: PlaybackCurrentContext) {
    this.emit("context", currentContextSelector);
  }

  seek(ms: number) {
    this.playerFn?.seek(ms);
  }

  get isPlaying() {
    return this.playerFn?.isPlaying();
  }

  play() {
    this.emit("play");
    this.__wasPlaying = true;
    this.playerFn?.play();
  }

  skipBackward() {
    this.emit("skip-backward");
  }

  skipForward() {
    this.emit("skip-forward");
  }

  pause() {
    this.emit("pause");
    this.__wasPlaying = false;
    this.playerFn?.pause();
  }

  setVolume(percentage: number) {
    this.playerFn?.setVolume(percentage);
  }
}

export default Player;
