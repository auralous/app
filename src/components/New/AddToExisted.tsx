import { useRouter } from "next/router";
import React, { useCallback } from "react";
import {
  QueueAction,
  Track,
  useStoriesQuery,
  useUpdateQueueMutation,
} from "~/graphql/gql.gen";
import { useCurrentUser } from "~/hooks/user";
import { useI18n } from "~/i18n/index";
import { useLogin } from "../Auth";
import { LoadingDots, SelectingListItem } from "./common";

const AddToExisted: React.FC<{ initTracks: Track[] }> = ({ initTracks }) => {
  const { t } = useI18n();
  const [, logIn] = useLogin();
  const user = useCurrentUser();

  const [
    { data: { stories } = { stories: undefined }, fetching },
  ] = useStoriesQuery({
    variables: { creatorId: user?.id || "" },
    pause: !user,
  });
  const router = useRouter();
  const [{ fetching: fetchingAdd }, updateQueue] = useUpdateQueueMutation();

  const onSelected = useCallback(
    async (id: string) => {
      await updateQueue({
        id: `story:${id}`,
        action: QueueAction.Add,
        tracks: initTracks.map((initTrack) => initTrack.id),
      });
      router.push(`/story/${id}`);
    },
    [initTracks, updateQueue, router]
  );

  if (!user)
    return (
      <div className="flex flex-col items-center p-4 rounded-lg bg-blue-tertiary">
        <p className="text-foreground-secondary mb-2cd ">
          {t("new.addExisted.authPrompt")}
        </p>
        <button onClick={logIn} className="btn btn-primary">
          {t("common.signIn")}
        </button>
      </div>
    );

  if (fetching)
    return (
      <span className="flex flex-col items-center p-4 text-xl font-black text-foreground-tertiary">
        <LoadingDots />
      </span>
    );

  return (
    <div>
      <p className="text-foreground font-bold text-sm text-center mb-1">
        {t("new.addExisted.prompt")}
      </p>
      <div className="h-48 w-full overflow-auto bg-background-secondary rounded-lg shadow-lg">
        {stories?.map((story) => (
          <SelectingListItem
            key={story.id}
            onClick={() => onSelected(story.id)}
            disabled={fetchingAdd}
          >
            <img
              className="w-8 h-8 rounded-lg object-cover"
              src={story.image}
              alt={story.title}
            />
            <div className="ml-2 text-left font-bold">{story.title}</div>
          </SelectingListItem>
        ))}
      </div>
    </div>
  );
};

export default AddToExisted;
