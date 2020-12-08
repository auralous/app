import React, { useMemo } from "react";
import { usePlayer } from "~/components/Player/index";
import { useModal } from "~/components/Modal/index";
import { Story, Track, useNowPlayingQuery } from "~/graphql/gql.gen";
import { useI18n } from "~/i18n/index";
import { TrackMenu } from "~/components/Track";
import QueueAddedBy from "../Queue/QueueAddedBy";

const NowPlayingMeta: React.FC<{
  storyId: string;
  track: Track | null | undefined;
}> = ({ storyId, track }) => {
  const { t } = useI18n();
  const {
    state: { fetching, playingStoryId },
  } = usePlayer();

  const [
    { data: { nowPlaying } = { nowPlaying: undefined } },
  ] = useNowPlayingQuery({ variables: { id: storyId } });

  const storyPlayingStarted = playingStoryId === storyId;
  const [activeMenu, openMenu, closeMenu] = useModal();

  return (
    <>
      <div className="mb-1 flex flex-col items-start">
        <div className="truncate text-foreground-secondary text-xs max-w-full">
          {storyPlayingStarted ? (
            fetching ? (
              <span className="block h-3 w-32 bg-foreground-tertiary rounded-full animate-pulse" />
            ) : track ? (
              <>
                {track.artists.map(({ name }) => name).join(", ")}
                {nowPlaying?.currentTrack && (
                  <>
                    {" •"}
                    <QueueAddedBy
                      userId={nowPlaying?.currentTrack?.creatorId}
                    />
                  </>
                )}
              </>
            ) : (
              t("player.noneHelpText")
            )
          ) : (
            t("player.pausedHelpText")
          )}
        </div>
        <div
          role="link"
          className="font-bold text-lg leading-tight truncate cursor-pointer hover:bg-background-secondary focus:outline-none max-w-full"
          onClick={() => track && openMenu()}
          tabIndex={0}
          onKeyDown={({ key }) => key === "Enter" && track && openMenu()}
        >
          {storyPlayingStarted
            ? track?.title ||
              (fetching ? (
                <span className="block mt-1 h-5 w-40 bg-foreground-tertiary rounded-full animate-pulse" />
              ) : (
                t("player.noneText")
              ))
            : t("player.pausedText")}
        </div>
      </div>
      {track && (
        <TrackMenu id={track.id} active={activeMenu} close={closeMenu} />
      )}
    </>
  );
};

const StoryHeader: React.FC<{ story: Story }> = ({ story }) => {
  const { t } = useI18n();

  const {
    state: { playerPlaying, crossTracks, playingStoryId },
  } = usePlayer();

  const storyPlayingStarted = playingStoryId === story.id;

  const track = useMemo(
    () => (storyPlayingStarted ? playerPlaying || crossTracks?.original : null),
    [playerPlaying, crossTracks, storyPlayingStarted]
  );

  return (
    <div className="flex px-6 py-6 bg-black bg-opacity-40">
      <div className="w-12 h-12 bg-background-secondary rounded-lg overflow-hidden">
        {track && (
          <img
            className="w-full h-full object-cover"
            alt={`${t("nowPlaying.title")}: ${track.title}`}
            src={track.image}
          />
        )}
      </div>
      <div
        aria-label={t("player.label.nameAndArtist")}
        className="flex-1 w-0 px-2 flex flex-col justify-center relative"
      >
        <NowPlayingMeta storyId={story.id} track={track} />
      </div>
    </div>
  );
};

export default StoryHeader;