import { LoadingScreen } from "@/components/Loading";
import { NotFoundScreen } from "@/components/NotFound";
import { ParamList, RouteName } from "@/screens/types";
import { useStoryQuery } from "@auralous/api";
import { HeaderBackable } from "@auralous/ui";
import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";
import StoryLiveContent from "./StoryLiveContent";
import StoryNonLiveContent from "./StoryNonLiveContent";

const StoryScreen: FC<StackScreenProps<ParamList, RouteName.Story>> = ({
  route,
  navigation,
}) => {
  const [{ data, fetching }] = useStoryQuery({
    variables: {
      id: route.params.id,
    },
  });

  return (
    <>
      <HeaderBackable onBack={navigation.goBack} title="" />
      {fetching ? (
        <LoadingScreen />
      ) : data?.story ? (
        data.story.isLive ? (
          <StoryLiveContent story={data.story} />
        ) : (
          <StoryNonLiveContent story={data.story} />
        )
      ) : (
        <NotFoundScreen />
      )}
    </>
  );
};

export default StoryScreen;
