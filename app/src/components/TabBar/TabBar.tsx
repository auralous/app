import { PlayerBar } from "@/player";
import { useAnimatedBgColors } from "@/player/useAnimatedBgColors";
import { RouteName } from "@/screens/types";
import { usePlaybackColor } from "@auralous/player";
import { IconHome, IconMapPin, makeStyles, Size } from "@auralous/ui";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import Tab from "./Tab";

const styles = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  root: {
    width: "100%",
    justifyContent: "flex-end",
  },
});

const useStyles = makeStyles((theme) => ({
  tabBars: {
    width: "100%",
    height: Size[14],
    alignItems: "center",
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border,
  },
}));

const TabBar: FC<BottomTabBarProps> = ({ navigation, state }) => {
  const { t } = useTranslation();

  const dstyles = useStyles();
  const animatedStyle = useAnimatedBgColors(usePlaybackColor());
  const currentRoute = state.routeNames[state.index];

  return (
    <>
      <View style={styles.root}>
        <Animated.View style={[styles.bg, animatedStyle]} />
        <PlayerBar />
        <View style={dstyles.tabBars}>
          <Tab
            name={RouteName.Main}
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
