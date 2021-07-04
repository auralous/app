import { usePlaybackContextMeta } from "@/player/PlaybackContextProvider";
import player, { usePlaybackCurrentContext } from "@auralous/player";
import {
  Button,
  Header,
  IconChevronDown,
  IconMoreHorizontal,
  makeStyles,
  Size,
  Spacer,
  Text,
} from "@auralous/ui";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BackHandler,
  Pressable,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import PagerView from "react-native-pager-view";
import ChatView from "./ChatView";
import MusicView from "./MusicView";
import PlayerViewBackground from "./PlayerViewBackground";

const snapPoints = ["100%"];

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: Size[2],
  },
  content: {
    paddingTop: 0,
    flex: 1,
  },
  pagerView: {
    flex: 1,
  },

  tabs: {
    padding: Size[2],
    paddingBottom: Size[0],
    flexDirection: "row",
    justifyContent: "center",
  },
  playingFromText: {
    textTransform: "uppercase",
  },
});

const useStyles = makeStyles((theme, props: { selected: boolean }) => ({
  tab: {
    paddingHorizontal: Size[2],
    paddingVertical: Size[1],
    borderRadius: 9999,
    backgroundColor: props.selected ? theme.colors.control : "transparent",
  },
}));

const TabButton: FC<{
  title: string;
  onPress(): void;
  selected: boolean;
}> = ({ title, onPress, selected }) => {
  const dstyles = useStyles({ selected });

  return (
    <Pressable onPress={onPress} style={dstyles.tab}>
      <Text bold size="sm" color="text">
        {title}
      </Text>
    </Pressable>
  );
};

const PlayerView: FC = () => {
  const { t } = useTranslation();
  const currentContext = usePlaybackCurrentContext();

  const contextMeta = usePlaybackContextMeta(currentContext);

  const bottomSheetRef = useRef<BottomSheetModal>(null);

  useEffect(() => {
    const playerBarPressed = () => bottomSheetRef.current?.present();
    player.on("__player_bar_pressed", playerBarPressed);
    return () => player.off("__player_bar_pressed", playerBarPressed);
  }, []);

  const dismiss = useCallback(() => bottomSheetRef.current?.dismiss(), []);

  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const [sheetIndex, setSheetIndex] = useState(-1);

  useEffect(() => {
    const onBackPress = () => {
      if (sheetIndex !== 0) return false;
      dismiss();
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [dismiss, sheetIndex]);

  return (
    <BottomSheetModal
      onChange={setSheetIndex}
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      handleComponent={null}
    >
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.root}>
        <PlayerViewBackground />
        <View style={{ height: StatusBar.currentHeight }} />
        <Header
          title={
            contextMeta ? (
              <View>
                <Text size="xs" style={styles.playingFromText} align="center">
                  {t("player.playing_from", { entity: contextMeta.type })}
                </Text>
                <Text size="sm" bold align="center">
                  {contextMeta.contextDescription}
                </Text>
              </View>
            ) : (
              ""
            )
          }
          left={
            <Button
              onPress={() => bottomSheetRef.current?.dismiss()}
              icon={<IconChevronDown />}
              accessibilityLabel={t("common.navigation.go_back")}
            />
          }
          right={<Button icon={<IconMoreHorizontal />} />}
        />
        <View style={styles.content}>
          <View style={styles.tabs}>
            <TabButton
              onPress={() => pagerRef.current?.setPage(0)}
              selected={currentPage === 0}
              title={t("music.title")}
            />
            <Spacer x={2} />
            <TabButton
              onPress={() => pagerRef.current?.setPage(1)}
              selected={currentPage === 1}
              title={t("chat.title")}
            />
          </View>
          <PagerView
            onPageSelected={({ nativeEvent }) =>
              setCurrentPage(nativeEvent.position)
            }
            ref={pagerRef}
            style={styles.pagerView}
            initialPage={0}
          >
            <View key={0}>
              <MusicView key={0} />
            </View>
            <View>
              <ChatView contextMeta={contextMeta} key={1} />
            </View>
          </PagerView>
        </View>
      </View>
    </BottomSheetModal>
  );
};

export default PlayerView;
