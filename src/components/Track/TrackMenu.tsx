import React, { useState } from "react";
import { AddToPlaylist } from "~/components/Playlist/index";
import { SvgPlus } from "~/assets/svg";
import { useTrackQuery } from "~/graphql/gql.gen";
import { SvgByPlatformName, PLATFORM_FULLNAMES } from "~/lib/constants";
import { useI18n } from "~/i18n/index";
import { Modal } from "~/components/Modal";

const TrackMenu: React.FC<{
  id: string;
  active: boolean;
  close: () => void;
}> = ({ id, active, close }) => {
  const { t } = useI18n();
  const [openAddPlaylist, setOpenAddPlaylist] = useState(false);
  const [{ data: { track } = { track: undefined } }] = useTrackQuery({
    variables: { id },
  });
  const SvgPlatformName = track?.platform
    ? SvgByPlatformName[track.platform]
    : null;

  return (
    <>
      <Modal.Modal
        active={active}
        onOutsideClick={close}
        className="px-6 py-8 flex-row max-w-xl"
      >
        <img
          className="w-full h-full absolute"
          src={track?.image}
          alt={track?.title}
          style={{
            zIndex: -1,
            filter: "blur(20px)",
          }}
        />
        <img
          className="w-32 h-32 rounded shadow-lg mr-4 flex-none"
          src={track?.image}
          alt={track?.title}
        />
        <div>
          <div className="py-2 mb-2">
            <div className="text-md mb-1 leading-tight font-bold w-full">
              {track?.title}
            </div>
            <div className="text-sm text-foreground-secondary">
              {track?.artists.map(({ name }) => name).join(", ")}
            </div>
          </div>
          <div className="flex">
            <button
              className="btn text-xs mr-2"
              onClick={() => setOpenAddPlaylist(true)}
            >
              <SvgPlus width="20" className="mr-1" /> {t("track.addToPlaylist")}
            </button>
            <a
              href={track?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn text-xs"
            >
              {SvgPlatformName && (
                <SvgPlatformName width="20" className="fill-current" />
              )}
              <span className="ml-2">
                {t("track.listenOn", {
                  platform:
                    (track?.platform && PLATFORM_FULLNAMES[track.platform]) ||
                    "",
                })}
              </span>
            </a>
          </div>
        </div>
      </Modal.Modal>
      <AddToPlaylist
        active={openAddPlaylist}
        close={() => {
          setOpenAddPlaylist(false);
        }}
        trackId={id}
      />
    </>
  );
};

export default TrackMenu;
