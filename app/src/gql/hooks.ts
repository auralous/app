import {
  Me,
  useMeQuery,
  useStoryLiveQuery,
  useUserFollowingsQuery,
} from "@auralous/api";

export function useMe(): Me | null | undefined {
  const [{ data, fetching }] = useMeQuery();
  if (fetching) return undefined;
  return data?.me;
}

export function useMeFollowings() {
  const me = useMe();
  return useUserFollowingsQuery({
    variables: { id: me?.user.id || "" },
    pause: !me,
  });
}

export function useMeLiveStory() {
  const me = useMe();

  const [{ data }] = useStoryLiveQuery({
    variables: { creatorId: me?.user.id },
    pause: !me,
  });

  return data?.storyLive;
}
