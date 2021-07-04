import { Size } from "@auralous/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FeaturedPlaylists from "./FeaturedPlaylists";
import HeaderSection from "./Header";
import RecentStories from "./RecentStories";
import Section from "./Section";
import { HomeScreenProps } from "./types";

const styles = StyleSheet.create({
  root: {
    paddingVertical: Size[2],
  },
  content: {
    paddingHorizontal: Size[6],
    paddingVertical: Size[3],
  },
});

const HomeScreen: FC<HomeScreenProps> = () => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.root}>
        <HeaderSection />
        <View style={styles.content}>
          <Section title={t("home.featured_playlists.title")}>
            <FeaturedPlaylists />
          </Section>
          <Section
            title={t("home.recent_stories.title")}
            description={t("home.recent_stories.description")}
          >
            <RecentStories />
          </Section>
          <Section
            title={t("home.radio_stations.title")}
            description={t("home.radio_stations.description")}
          ></Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
