import { Story } from "@auralous/api";
import { imageSources } from "@auralous/ui/assets";
import { Avatar } from "@auralous/ui/components/Avatar";
import { Text } from "@auralous/ui/components/Typography";
import { makeStyles, Size } from "@auralous/ui/styles";
import { format as formatMs } from "@auralous/ui/utils";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ImageBackground, StyleSheet, View } from "react-native";

interface StoryItemProps {
  story: Story;
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,.5)", padding: Size[4] },
  top: {
    flex: 1,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  text: {
    lineHeight: 18,
    color: "#ffffff",
  },
  textSecondary: {
    lineHeight: 18,
    color: "rgba(255, 255, 255, 0.75)",
  },
});

const useStyles = makeStyles((theme, isLive: boolean) => ({
  root: {
    width: Size[44],
    height: Size[44] * 1.5625,
    borderRadius: Size[2],
    overflow: "hidden",
    backgroundColor: theme.colors.backgroundSecondary,
  },
  tag: {
    paddingHorizontal: Size[3],
    paddingVertical: 3,
    borderRadius: 9999,
    flexGrow: 0,
    marginTop: Size[1],
    backgroundColor: isLive ? theme.colors.primary : "rgba(0,0,0,.5)",
  },
}));

const StoryItem: FC<StoryItemProps> = ({ story }) => {
  const { t } = useTranslation();

  const dstyles = useStyles(story.isLive);

  const dateStr = useMemo(() => {
    if (!story) return "";
    if (story.isLive) return t("common.status.live").toUpperCase();
    const d = Date.now() - story.createdAt.getTime();
    return t("common.time.ago", { time: formatMs(t, d) });
  }, [story, t]);

  return (
    <View style={dstyles.root}>
      <ImageBackground
        source={
          story.image ? { uri: story.image } : imageSources.defaultPlaylist
        }
        defaultSource={imageSources.defaultPlaylist}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <View style={styles.top}>
            <Avatar
              href={story.creator.profilePicture}
              username={story.creator.username}
              size={12}
            />
          </View>
          <View style={styles.bottom}>
            <Text style={styles.text} bold size="xl">
              {story.creator.username}
            </Text>
            {Boolean(story.text) && (
              <Text style={styles.textSecondary} numberOfLines={3}>
                {story.text}
              </Text>
            )}
            <View style={dstyles.tag}>
              <Text size="xs" style={{ color: "#ffffff" }}>
                {dateStr}
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default StoryItem;
