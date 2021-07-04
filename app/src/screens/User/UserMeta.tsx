import { User, useUserStatQuery } from "@auralous/api";
import { Avatar, Size, Text } from "@auralous/ui";
import { useNavigation } from "@react-navigation/native";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RouteName } from "../types";

const styles = StyleSheet.create({
  root: {
    padding: Size[2],
  },
  meta: {
    alignItems: "center",
    marginBottom: Size[6],
  },
  username: {
    marginTop: Size[2],
  },
  stats: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
    padding: Size[1],
  },
  statTouchable: {
    alignItems: "center",
  },
  statName: {
    textTransform: "uppercase",
  },
});

interface UserStatProps {
  name: string;
  value: number;
  list: "followers" | "following";
  username: string;
}

const UserStat: FC<UserStatProps> = ({ name, value, list, username }) => {
  const navigation = useNavigation();
  const goToList = useCallback(
    () =>
      navigation.navigate(
        list === "followers"
          ? RouteName.UserFollowers
          : RouteName.UserFollowing,
        { username }
      ),
    [navigation, username, list]
  );
  return (
    <View style={styles.stat}>
      <TouchableOpacity style={styles.statTouchable} onPress={goToList}>
        <Text bold size="xl" color="textSecondary">
          {value}
        </Text>
        <Text size="sm" color="textTertiary" style={styles.statName}>
          {name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const UserMeta: FC<{ user: User }> = ({ user }) => {
  const [{ data: { userStat } = { userStat: undefined } }] = useUserStatQuery({
    variables: { id: user.id },
    requestPolicy: "cache-and-network",
  });

  const { t } = useTranslation();

  return (
    <>
      <View style={styles.root}>
        <View style={styles.meta}>
          <Avatar
            size={32}
            href={user.profilePicture}
            username={user.username}
          />
          <Text bold style={styles.username} size="2xl">
            {user.username}
          </Text>
        </View>
        <View style={styles.stats}>
          <UserStat
            value={userStat?.followerCount || 0}
            name={t("user.followers")}
            list="followers"
            username={user.username}
          />
          <UserStat
            value={userStat?.followingCount || 0}
            name={t("user.following")}
            list="following"
            username={user.username}
          />
        </View>
      </View>
    </>
  );
};

export default UserMeta;
