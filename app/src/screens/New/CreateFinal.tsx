import { ParamList, RouteName } from "@/screens/types";
import { useStoryCreateMutation } from "@auralous/api";
import player, { PlaybackContextType } from "@auralous/player";
import {
  Button,
  GradientColors,
  Heading,
  Size,
  Spacer,
  Text,
} from "@auralous/ui";
import { useFocusEffect } from "@react-navigation/core";
import { StackScreenProps } from "@react-navigation/stack";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  BackHandler,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Size[4],
    paddingHorizontal: Size[1],
  },
  number: {
    fontSize: 144,
    color: "#ffffff",
    fontWeight: "bold",
  },
  textColor: {
    color: "#ffffff",
  },
});

const Create: FC<StackScreenProps<ParamList, RouteName.NewFinal>> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation();

  const [{ fetching }, createStory] = useStoryCreateMutation();

  const onCreate = useCallback(async () => {
    const result = await createStory({
      text: route.params.text,
      isPublic: true,
      tracks: route.params.selectedTracks,
    });
    if (result.data?.storyCreate) {
      player.playContext({
        type: PlaybackContextType.Story,
        id: result.data.storyCreate.id,
        shuffle: false,
      });
      navigation.navigate(RouteName.Home);
    }
  }, [route, createStory, navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        // Prevent going back while creating story
        return fetching;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [fetching])
  );

  const [sec, setSec] = useState(4);
  useEffect(() => {
    if (sec <= 0) {
      onCreate();
      return;
    }
    const intv = setTimeout(() => setSec(sec - 1), 1000);
    return () => clearTimeout(intv);
  }, [sec, onCreate]);

  return (
    <LinearGradient
      colors={GradientColors.rainbow.colors}
      locations={GradientColors.rainbow.locations}
      start={{ x: 1, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={StyleSheet.absoluteFill}
    >
      <SafeAreaView style={styles.root}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={styles.root}>
          <Text style={styles.number}>{sec}</Text>
          <Heading level={3} style={styles.textColor}>
            {t("new.final.title")}
          </Heading>
          <Spacer y={2} />
          <Text align="center" color="textSecondary">
            {t("new.final.subtitle")}
          </Text>
          <Spacer y={12} />
          <Button onPress={() => navigation.goBack()}>
            {t("common.action.cancel")}
          </Button>
        </View>
      </SafeAreaView>
      {fetching && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator animating color="#ffffff" size="large" />
        </View>
      )}
    </LinearGradient>
  );
};

export default Create;
