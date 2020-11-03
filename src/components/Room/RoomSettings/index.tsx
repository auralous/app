import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs";
import { Modal } from "~/components/Modal/index";
import RoomSettingsBasic from "./RoomSettingsBasic";
import RoomSettingsRules from "./RoomSettingsRules";
import RoomSettingsMember from "./RoomSettingsMember";
import { Room, RoomState } from "~/graphql/gql.gen";

const RoomSettings: React.FC<{
  room: Room;
  roomState: RoomState;
  active: boolean;
  close: () => void;
}> = ({ room, roomState, active, close }) => {
  if (!roomState) return null;
  return (
    <Modal.Modal active={active} onOutsideClick={close}>
      <Tabs>
        {({ selectedIndex }) => {
          const getClassNames = (index: number) =>
            `font-bold ${
              selectedIndex === index ? "opacity-100" : "opacity-25"
            } transition-opacity duration-200`;
          return (
            <>
              <Modal.Header>
                <TabList className="flex-none flex items-center font-bold text-4xl leading-tight">
                  <Tab className={getClassNames(0)}>Info</Tab>
                  <span className="font-bold opacity-25 mx-2 text-lg">
                    {" • "}
                  </span>
                  <Tab className={getClassNames(1)}>Rule</Tab>
                  <span className="font-bold opacity-25 mx-2 text-lg">
                    {" • "}
                  </span>
                  <Tab className={getClassNames(2)}>Member</Tab>
                </TabList>
              </Modal.Header>
              <Modal.Content>
                <TabPanels style={{ height: "calc(100vh - 12rem)" }}>
                  <TabPanel>
                    <RoomSettingsBasic room={room} />
                  </TabPanel>
                  <TabPanel>
                    <RoomSettingsRules room={room} roomState={roomState} />
                  </TabPanel>
                  <TabPanel>
                    <RoomSettingsMember room={room} roomState={roomState} />
                  </TabPanel>
                </TabPanels>
              </Modal.Content>
            </>
          );
        }}
      </Tabs>
    </Modal.Modal>
  );
};

export default RoomSettings;
