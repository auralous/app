import { PlayerBar } from "@/player";
import { usePlaybackState } from "@auralous/player";
import { IconHome, IconMapPin, makeStyles, Size } from "@auralous/ui";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Tab from "./Tab";

const styles = StyleSheet.create({
  root: {
    width: "100%",
    justifyContent: "flex-end",
  },
});

const useStyles = makeStyles((theme, colors: [string, string]) => ({
  tabBars: {
    width: "100%",
    height: Size[14],
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors[1],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
}));

const TabBar: FC<BottomTabBarProps> = ({ navigation, state }) => {
  const playbackState = usePlaybackState();

  const { t } = useTranslation();

  const dstyles = useStyles(playbackState.colors);

  const currentRoute = state.routeNames[state.index];

  return (
    <>
      <View style={styles.root}>
        <PlayerBar />
        <View style={dstyles.tabBars}>
          <Tab
            name="main"
            title={t("home.title")}
            Icon={IconHome}
            navigation={navigation}
            currentRoute={currentRoute}
          />
          <Tab
            name="map"
            title={t("map.title")}
            Icon={IconMapPin}
            navigation={navigation}
            currentRoute={currentRoute}
          />
        </View>
      </View>
    </>
  );
};

export default TabBar;
