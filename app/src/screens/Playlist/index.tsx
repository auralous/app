import { LoadingScreen } from "@/components/Loading";
import { NotFoundScreen } from "@/components/NotFound";
import { ParamList, RouteName } from "@/screens/types";
import { usePlaylistQuery } from "@auralous/api";
import { HeaderBackable } from "@auralous/ui";
import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";
import PlaylistContent from "./PlaylistContent";

const PlaylistScreen: FC<StackScreenProps<ParamList, RouteName.Playlist>> = ({
  route,
  navigation,
}) => {
  const [{ data, fetching }] = usePlaylistQuery({
    variables: {
      id: route.params.id,
    },
  });

  return (
    <>
      <HeaderBackable onBack={navigation.goBack} title="" />
      {fetching ? (
        <LoadingScreen />
      ) : data?.playlist ? (
        <PlaylistContent playlist={data.playlist} />
      ) : (
        <NotFoundScreen />
      )}
    </>
  );
};

export default PlaylistScreen;
