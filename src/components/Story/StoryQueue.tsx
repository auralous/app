import React from "react";
import dynamic from "next/dynamic";
import StoryQueueable from "./StoryQueueable";
import { useMe } from "~/hooks/user";
import { Story } from "~/graphql/gql.gen";
import { useLogin } from "~/components/Auth";
import { toast } from "~/lib/toast";
import { Modal, useModal } from "~/components/Modal";
import { usePlayer } from "~/components/Player";
import { SvgPlus, SvgUserPlus } from "~/assets/svg";
import { useI18n } from "~/i18n/index";
import StoryListeners from "./StoryListeners";

const StoryQueueAdder = dynamic(() => import("./StoryQueueAdder"), {
  ssr: false,
});

const QueueManager = dynamic(() => import("~/components/Queue/QueueManager"));
const QueueViewer = dynamic(() => import("~/components/Queue/QueueViewer"));

const StoryQueueableManager: React.FC<{ story: Story }> = ({ story }) => {
  const { t } = useI18n();
  const [active, open, close] = useModal();

  const me = useMe();

  return (
    <>
      <div className="px-4 py-1 flex">
        {me?.user.id === story.creatorId && (
          <>
            <button
              className="btn btn-primary mr-1 flex-none overflow-hidden inline-flex w-8 h-8 rounded-full p-0"
              title={t("story.queueable.title")}
              onClick={open}
            >
              <SvgUserPlus className="w-4 h-4" />
            </button>
            <Modal.Modal
              active={active}
              close={close}
              title={t("story.queueable.title")}
            >
              <Modal.Header>
                <Modal.Title>{t("story.queueable.title")}</Modal.Title>
              </Modal.Header>
              <Modal.Content>
                <StoryQueueable story={story} />
              </Modal.Content>
              <Modal.Footer>
                <button className="btn" onClick={close}>
                  {t("common.done")}
                </button>
              </Modal.Footer>
            </Modal.Modal>
          </>
        )}
        <div className="flex-1">
          <StoryListeners userIds={story.queueable} />
        </div>
      </div>
    </>
  );
};

const StoryQueue: React.FC<{ story: Story }> = ({ story }) => {
  const { t } = useI18n();

  const { playQueueItem } = usePlayer();

  const me = useMe();

  const isQueueable = Boolean(
    me &&
      (story.creatorId === me.user.id || story.queueable.includes(me.user.id))
  );

  const [, showLogin] = useLogin();

  const [active, open, close] = useModal();

  const onAddButtonClick = () => {
    if (!me) return showLogin();
    if (!isQueueable)
      return toast.open({
        type: "info",
        message: t("story.queue.notAllowed"),
      });
    open();
  };

  if (story.isLive)
    return (
      <div className="h-full flex flex-col">
        <button
          title={t("story.queue.adderTitle")}
          onClick={onAddButtonClick}
          className="z-40 btn btn-primary rounded-full absolute bottom-2 right-2 w-12 h-12 p-1"
        >
          <SvgPlus />
        </button>
        <StoryQueueAdder story={story} active={active} close={close} />
        <StoryQueueableManager story={story} />
        <div className="flex-1 h-0">
          <QueueManager
            isQueueable={isQueueable}
            queueId={story.id}
            onEmptyAddClick={open}
          />
        </div>
      </div>
    );

  return <QueueViewer queueId={`${story.id}:played`} onClick={playQueueItem} />;
};

export default StoryQueue;
