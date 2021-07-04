import player from "@auralous/player";
import { FC, useCallback, useEffect, useState } from "react";
import Config from "react-native-config";
import {
  ApiConfig,
  ApiScope,
  auth as SpotifyAuth,
  PlayerState as SpotifyPlayerState,
  remote as SpotifyRemote,
  SpotifySession,
} from "react-native-spotify-remote";

const spotifyConfig: ApiConfig = {
  clientID: Config.SPOTIFY_CLIENT_ID,
  redirectURL: `auralous://sign-in/spotify/callback`,
  tokenRefreshURL: `${Config.API_URI}/spotify/refresh`,
  tokenSwapURL: `${Config.API_URI}/spotify/swap`,
  scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserReadPlaybackStateScope,
    ApiScope.UserReadCurrentlyPlayingScope,
  ],
  showDialog: false,
};

const PlayerSpotify: FC = () => {
  const [session, setSession] = useState<SpotifySession | null>(null);
  const [, setError] = useState();

  const init = useCallback(async () => {
    try {
      const session = await SpotifyAuth.authorize(spotifyConfig);
      await SpotifyRemote.connect(session.accessToken);
      setSession(session);
    } catch (e) {
      setError(e);
    }
  }, []);

  useEffect(() => {
    if (!session) init();
  }, [session, init]);

  useEffect(() => {
    if (!session) return;

    const playByExternalId = async (externalId: string | null) => {
      if (!externalId) return SpotifyRemote.pause();
      await SpotifyRemote.playUri(`spotify:track:${externalId}`);
      player.play(); // this is just to confirm play status
    };
    let state: SpotifyPlayerState | undefined;

    const onStateChange = (v: SpotifyPlayerState) => {
      if (v.isPaused !== state?.isPaused) {
        if (v.isPaused) player.emit("paused");
        else player.emit("playing");
      }

      player.emit("time", v.playbackPosition || 0);

      // Guessing when the track has ended
      // since the SDK does not provide a way
      // to do so
      if (
        state &&
        v.isPaused &&
        v.playbackPosition === 0 &&
        state?.isPaused === false
      ) {
        player.emit("ended");
      }

      state = v;
    };

    player.registerPlayer({
      play: () => SpotifyRemote.resume(),
      seek: (ms) =>
        SpotifyRemote.seek(ms).then(
          () => player.emit("seeked"),
          () => undefined
        ),
      pause: () => SpotifyRemote.pause(),
      playByExternalId,
      setVolume: (p) => {
        // Remote SDK does not support setting volume so we rely on Web API
        return fetch(
          `https://api.spotify.com/v1/me/player/volume` +
            `?volume_percent=${p * 100}`,
          {
            method: "PUT",
            headers: { Authorization: `Bearer ${session.accessToken}` },
          }
        );
      },
      // It is impossible to determine spotify without a promise so we rely on previous state
      isPlaying: () => !!state?.isPaused,
    });

    // Spotify SDK does not support subscribing to position
    // so we need polling to retrieve it, we poll every 1 sec
    const durationInterval = setInterval(async () => {
      const playerState = await fetch("https://api.spotify.com/v1/me/player", {
        headers: {
          authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .catch(() => null);

      player.emit("time", playerState?.progress_ms || 0);
    }, 1000);

    SpotifyRemote.on("playerStateChanged", onStateChange);

    return () => {
      clearInterval(durationInterval);
      player.unregisterPlayer();
      SpotifyRemote.off("playerStateChanged", onStateChange);

      SpotifyRemote.disconnect();
    };
  }, [session]);

  return null;
};

export default PlayerSpotify;
