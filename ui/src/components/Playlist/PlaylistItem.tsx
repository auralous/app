import { Maybe, Playlist } from "@auralous/api";
import { imageSources } from "@auralous/ui/assets";
import { Text } from "@auralous/ui/components/Typography";
import { Size } from "@auralous/ui/styles";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, View } from "react-native";

interface PlaylistItemProps {
  playlist: Maybe<Playlist>;
  fetching?: boolean;
}

const styles = StyleSheet.create({
  root: {
    width: Size[32],
  },
  image: {
    width: Size[32],
    height: Size[32],
    borderRadius: Size[2],
    resizeMode: "cover",
    marginBottom: Size[1],
  },
  meta: {
    paddingVertical: Size[1],
    paddingHorizontal: Size[1],
  },
  metaTitle: {
    lineHeight: 16,
  },
});

const PlaylistItem: FC<PlaylistItemProps> = ({ playlist }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.root}>
      <Image
        source={
          playlist?.image
            ? { uri: playlist?.image }
            : imageSources.defaultPlaylist
        }
        defaultSource={imageSources.defaultPlaylist}
        style={styles.image}
        accessibilityLabel={playlist?.name}
      />
      <View style={styles.meta}>
        <Text style={styles.metaTitle} bold="medium" numberOfLines={1}>
          {playlist?.name}
        </Text>
        <Text size="sm" color="textTertiary">
          {t(`music_platform.${playlist?.platform}.name` as const)}
        </Text>
      </View>
    </View>
  );
};

export default PlaylistItem;
