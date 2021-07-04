import player from "@auralous/player";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { View } from "react-native";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";

const PlayerYoutube: FC = () => {
  const youtubeRef = useRef<YoutubeIframeRef>(null);
  const isPlayingRef = useRef<boolean>(false);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [volume, setVolume] = useState(100);

  const [isPlaying, setIsPlaying] = useState(false);

  const onChangeState = useCallback((event: string) => {
    // https://lonelycpp.github.io/react-native-youtube-iframe/component-props#onchangestate
    if (event === "paused") {
      isPlayingRef.current = false;
      player.emit("paused");
    } else if (event === "playing") {
      player.emit("playing");
      isPlayingRef.current = true;
    } else if (event === "ended") player.emit("ended");
  }, []);

  useEffect(() => {
    const playByExternalId = (externalId: string | null) => {
      setVideoId(externalId);
      if (externalId) player.play(); // this is just to confirm play status
    };

    player.registerPlayer({
      play: () => setIsPlaying(true),
      seek: (ms) => youtubeRef.current?.seekTo(ms / 1000, true),
      pause: () => setIsPlaying(false),
      playByExternalId,
      setVolume: (p) => setVolume(p * 100),
      isPlaying: () => isPlayingRef.current,
    });

    // Retrieve current position every 1 sec
    const durationInterval = setInterval(async () => {
      player.emit(
        "time",
        ((await youtubeRef.current?.getCurrentTime()) || 0) * 1000
      );
    }, 1000);

    return () => {
      clearInterval(durationInterval);
      player.unregisterPlayer();
    };
  }, []);

  return (
    <View
      style={{
        display: "none",
      }}
      pointerEvents="none"
    >
      {videoId && (
        <YoutubePlayer
          play={isPlaying}
          onChangeState={onChangeState}
          height={0}
          volume={volume}
          videoId={videoId}
          ref={youtubeRef}
        />
      )}
    </View>
  );
};

export default PlayerYoutube;
