import React, { useCallback, useMemo, useState } from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { animated, useSpring } from "react-spring";
import { QueueManager, QueueViewer, useQueue } from "~/components/Queue";
import {
  TrackAdderPlaylist,
  TrackAdderSearch,
} from "~/components/Track/TrackAdder";
import {
  QueueAction,
  Room,
  useUpdateQueueMutation,
  RoomState,
} from "~/graphql/gql.gen";
import { useI18n } from "~/i18n/index";
import { SvgClock } from "~/assets/svg";

const AnimatedTabPanel = animated(TabPanel);
const tabInactiveStyle = { opacity: 0, transform: "translate3d(0px,40px,0px)" };
const tabActiveStyle = { opacity: 1, transform: "translate3d(0px,0px,0px)" };

const RoomQueue: React.FC<{ room: Room; roomState: RoomState }> = ({
  room,
  roomState,
}) => {
  const { t } = useI18n();

  const [, updateQueue] = useUpdateQueueMutation();

  const [queue] = useQueue(`room:${room.id}`);

  const addedTracks = useMemo(() => {
    if (!queue) return [];
    return queue.items.map(({ trackId }) => trackId);
  }, [queue]);

  const onAddTracks = useCallback(
    (newTrackArray: string[]) => {
      return updateQueue({
        id: `room:${room.id}`,
        tracks: newTrackArray,
        action: QueueAction.Add,
      }).then((result) => !!result.data?.updateQueue);
    },
    [updateQueue, room]
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const getClassName = (index: number) =>
    `flex-1 p-2 text-sm font-bold ${
      index === selectedIndex ? "bg-blue" : "bg-blue-secondary"
    } transition duration-300`;

  const tabPanelStyle0 = useSpring(
    0 === selectedIndex ? tabActiveStyle : tabInactiveStyle
  );
  const tabPanelStyle1 = useSpring(
    1 === selectedIndex ? tabActiveStyle : tabInactiveStyle
  );
  const tabPanelStyle2 = useSpring(
    2 === selectedIndex ? tabActiveStyle : tabInactiveStyle
  );
  const tabPanelStyle3 = useSpring(
    3 === selectedIndex ? tabActiveStyle : tabInactiveStyle
  );

  return (
    <Tabs
      index={selectedIndex}
      onChange={setSelectedIndex}
      className="h-full flex flex-col overflow-hidden"
    >
      <TabList className="flex flex-none">
        <Tab className={getClassName(0)}>{t("room.queue.queue.title")}</Tab>
        <Tab
          className={getClassName(1)}
          disabled={!roomState.permission.queueCanAdd}
        >
          {t("room.queue.search.title")}
        </Tab>
        <Tab
          className={getClassName(2)}
          disabled={!roomState.permission.queueCanAdd}
        >
          {t("room.queue.playlist.title")}
        </Tab>
        <Tab
          className={`${getClassName(3)} flex-grow-0`}
          title={t("room.queue.played.title")}
        >
          <SvgClock width="16" height="16" />
        </Tab>
      </TabList>
      <TabPanels className="flex-1 h-0">
        <AnimatedTabPanel style={tabPanelStyle0} className="h-full">
          <QueueManager
            permission={roomState.permission}
            queueId={`room:${room.id}`}
            onEmptyAddClick={() => setSelectedIndex(1)}
          />
        </AnimatedTabPanel>
        <AnimatedTabPanel style={tabPanelStyle1} className="h-full">
          <TrackAdderSearch callback={onAddTracks} addedTracks={addedTracks} />
        </AnimatedTabPanel>
        <AnimatedTabPanel style={tabPanelStyle2} className="h-full">
          <TrackAdderPlaylist
            callback={onAddTracks}
            addedTracks={addedTracks}
            queryConfig={selectedIndex === 2 ? undefined : { enabled: false }}
          />
        </AnimatedTabPanel>
        <AnimatedTabPanel style={tabPanelStyle3} className="h-full">
          <QueueViewer
            onAdd={roomState.permission.queueCanAdd ? onAddTracks : undefined}
            queueId={`room:${room.id}:played`}
            reverse
            queryOpts={selectedIndex === 3 ? undefined : { pause: true }}
          />
        </AnimatedTabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default RoomQueue;
