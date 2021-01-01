import React from "react";
import StoryReaction from "./StoryReaction";
import { usePlayer } from "~/components/Player/index";
import { PlayerImage, PlayerMeta } from "~/components/Player/PlayerView";
import { Story } from "~/graphql/gql.gen";

const StoryPlayer: React.FC<{ story: Story }> = ({ story }) => {
  const {
    state: { crossTracks, fetching },
  } = usePlayer();

  return (
    <div className="h-full flex flex-col max-w-lg mx-auto">
      <PlayerImage track={crossTracks?.original} />
      <div className="flex justify-between">
        <PlayerMeta track={crossTracks?.original} fetching={fetching} />
        {story.isLive && <StoryReaction story={story} />}
      </div>
    </div>
  );
};

export default StoryPlayer;
