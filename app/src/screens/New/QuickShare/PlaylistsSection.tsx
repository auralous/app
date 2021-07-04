import { Playlist } from "@auralous/api";
import { Heading, PlaylistItem, Size } from "@auralous/ui";
import { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  root: {
    marginBottom: Size[4],
  },
  title: {
    marginBottom: Size[3],
  },
  scroll: {
    marginHorizontal: -Size[6],
    paddingLeft: Size[6],
    paddingRight: Size[3],
  },
  item: {
    marginRight: Size[4],
  },
});

interface PlaylistsSectionProps {
  playlists: Playlist[];
  title: string;
  onSelect(playlist: Playlist): void;
}

const PlaylistsSection: FC<PlaylistsSectionProps> = ({
  playlists,
  title,
  onSelect,
}) => {
  return (
    <View style={styles.root}>
      <Heading style={styles.title} level={6}>
        {title}
      </Heading>
      <ScrollView
        contentContainerStyle={styles.scroll}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {playlists.map((playlist) => (
          <TouchableOpacity
            key={playlist.id}
            style={styles.item}
            onPress={() => onSelect(playlist)}
          >
            <PlaylistItem playlist={playlist} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default PlaylistsSection;
