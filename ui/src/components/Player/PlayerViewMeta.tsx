import { Maybe, Track } from "@auralous/api";
import { imageSources } from "@auralous/ui/assets";
import { Text } from "@auralous/ui/components/Typography";
import { Size } from "@auralous/ui/styles";
import { FC } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  image: {
    flex: 1,
    marginVertical: Size[2],
  },
  header: {
    padding: Size[2],
  },
});

const PlayerViewMeta: FC<{ track: Maybe<Track> }> = ({ track }) => {
  return (
    <>
      <ImageBackground
        style={styles.image}
        resizeMode="contain"
        source={
          track?.image ? { uri: track?.image } : imageSources.defaultTrack
        }
        defaultSource={imageSources.defaultTrack}
      />
      <View style={styles.header}>
        <Text size="xl" bold numberOfLines={1}>
          {track?.title}
        </Text>
        <Text size="lg" color="textSecondary" numberOfLines={1}>
          {track?.artists.map((artist) => artist.name).join(", ")}
        </Text>
      </View>
    </>
  );
};

export default PlayerViewMeta;
