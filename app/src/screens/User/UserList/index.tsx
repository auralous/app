import { LoadingScreen } from "@/components/Loading";
import { Maybe } from "@auralous/api";
import { Size } from "@auralous/ui";
import { FC } from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import ListUserItem from "./ListUserItem";

interface ListProps<Item = any> {
  data: Maybe<Item[]> | undefined;
  fetching: boolean;
}

const renderItem: ListRenderItem<string> = ({ item }) => (
  <ListUserItem id={item} key={item} />
);

const styles = StyleSheet.create({
  flatList: { flex: 1 },
});

const UserList: FC<ListProps> = ({ data, fetching }) => {
  return fetching && !data ? (
    <LoadingScreen />
  ) : (
    <FlatList
      data={data || []}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: Size[2],
      }}
      style={styles.flatList}
      removeClippedSubviews
    />
  );
};

export default UserList;
