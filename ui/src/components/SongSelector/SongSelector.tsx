import { Size } from "@auralous/ui/styles";
import { FC, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { SongSelectorContext, SongSelectorState } from "./Context";
import SearchInput from "./SearchInput";
import SelectByPlaylists from "./SelectByPlaylists";
import SelectBySongs from "./SelectBySongs";
import Tabs from "./Tabs";

const styles = StyleSheet.create({
  content: {
    padding: Size[3],
    paddingBottom: 0,
    flex: 1,
  },
});

export const SongSelector: FC<SongSelectorState> = (props) => {
  const [tab, setTab] = useState<"songs" | "playlists">("songs");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch("");
  }, [tab]);

  return (
    <SongSelectorContext.Provider value={props}>
      <Tabs tab={tab} setTab={setTab} />
      <SearchInput value={search} onSubmit={setSearch} />
      <View style={styles.content}>
        {tab === "songs" ? (
          <SelectBySongs search={search} />
        ) : (
          <SelectByPlaylists search={search} />
        )}
      </View>
    </SongSelectorContext.Provider>
  );
};
