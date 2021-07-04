import { Maybe, Playlist } from "@auralous/api";
import { imageSources } from "@auralous/ui/assets";
import { Spacer } from "@auralous/ui/components/Spacer";
import { Text } from "@auralous/ui/components/Typography";
import { Size } from "@auralous/ui/styles";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";

interface PlaylistListItemProps {
  playlist: Maybe<Playlist>;
  fetching?: boolean;
}

const styles = StyleSheet.create({
  root: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: Size[12],
    height: Size[12],
  },
  meta: {
    flex: 1,
  },
});

const PlaylistListItem: FC<PlaylistListItemProps> = ({ playlist }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.root}>
      <Image
        style={styles.image}
        source={
          playlist?.image
            ? { uri: playlist?.image }
            : imageSources.defaultPlaylist
        }
        defaultSource={imageSources.defaultPlaylist}
        accessibilityLabel={playlist?.name}
      />
      <Spacer x={2} />
      <View style={styles.meta}>
        <View style={styles.title}>
          <Spacer x={1} />
          <Text bold numberOfLines={1}>
            {playlist?.name}
          </Text>
        </View>
        <Text color="textSecondary" size="sm" numberOfLines={1}>
          {t(`music_platform.${playlist?.platform}.name` as const)}
        </Text>
      </View>
    </View>
  );
};

export default PlaylistListItem;
