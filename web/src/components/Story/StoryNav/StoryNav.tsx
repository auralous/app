import { format as formatMs } from "@lukeed/ms";
import {
  SvgChevronDown,
  SvgMoreAlt,
  SvgPlayStopR,
  SvgShare,
  SvgTrash,
  SvgUser,
} from "assets/svg";
import { useLogin } from "components/Auth";
import { Skeleton } from "components/Loading";
import { Modal, ModalBackdrop, useModal } from "components/Modal";
import { Button } from "components/Pressable";
import { StoryShare } from "components/Story";
import { Typography } from "components/Typography";
import { UserList } from "components/User";
import { Box } from "components/View";
import { Story, useStoryUsersQuery, useUserQuery } from "gql/gql.gen";
import { useMe } from "hooks/user";
import { useI18n } from "i18n/index";
import Link from "next/link";
import { useMemo } from "react";
import StoryDelete from "./StoryDelete";
import StoryEnd from "./StoryEnd";

const StoryNavMenu: React.FC<{
  story: Story;
}> = ({ story }) => {
  const { t } = useI18n();

  const [{ data: { user } = { user: undefined } }] = useUserQuery({
    variables: { id: story.creatorId || "" },
  });

  const [active, open, close] = useModal();

  const [activeShare, openShare, closeShare] = useModal();
  const [activeDelete, openDelete, closeDelete] = useModal();

  const me = useMe();

  return (
    <>
      <Button
        accessibilityLabel={t("story.menu.handle")}
        icon={<SvgMoreAlt className="w-8 h-8" />}
        onPress={open}
        styling="link"
      />
      <ModalBackdrop.Modal
        active={active}
        title={t("story.ofUsername", { username: user?.username })}
        close={close}
      >
        <Box fullWidth alignItems="center" gap="sm">
          {user && (
            <>
              <img
                className="w-32 h-32 object-cover shadow-lg"
                src={user.profilePicture}
                alt={user.username}
              />
              <Box padding="xs" justifyContent="center">
                <Typography.Paragraph
                  size="md"
                  truncate
                  strong
                  noMargin
                  align="center"
                >
                  {t("story.ofUsername", { username: user.username })}
                </Typography.Paragraph>
                <Typography.Paragraph
                  size="sm"
                  truncate
                  color="foreground-secondary"
                  align="center"
                >
                  {story.text}
                </Typography.Paragraph>
              </Box>
            </>
          )}
          <Button
            onPress={openShare}
            icon={<SvgShare className="w-5 h-5" />}
            styling="link"
            title={t("story.share.title")}
          />
          <StoryShare active={activeShare} close={closeShare} story={story} />
          <Link href={`/user/${user?.username}`}>
            <Button
              icon={<SvgUser className="w-5 h-5" />}
              title={t("story.menu.viewCreator")}
              styling="link"
            />
          </Link>
          <StoryEnd story={story}>
            {(openEnd) => (
              <Button
                icon={<SvgPlayStopR className="w-5 h-5" />}
                title={t("story.end.title")}
                styling="link"
                onPress={openEnd}
              />
            )}
          </StoryEnd>
          {story.isLive === false && me?.user.id === story.creatorId && (
            <>
              <Button
                icon={<SvgTrash className="w-5 h-5" />}
                title={t("story.delete.title")}
                onPress={openDelete}
                styling="link"
              />
              <StoryDelete
                active={activeDelete}
                close={closeDelete}
                story={story}
              />
            </>
          )}
        </Box>
      </ModalBackdrop.Modal>
    </>
  );
};

const StoryNavListeners: React.FC<{
  story: Story;
}> = ({ story }) => {
  const { t } = useI18n();

  const me = useMe();

  const [{ data: { storyUsers } = { storyUsers: undefined }, fetching }] =
    useStoryUsersQuery({
      variables: {
        id: story.id,
      },
      pause: !me,
    });

  const [, login] = useLogin();

  const [active, show, close] = useModal();

  return (
    <>
      <Box
        alignItems="center"
        row
        paddingX="sm"
        paddingY="xs"
        backgroundColor="primary"
        rounded="full"
        gap="xs"
        onPress={me ? show : login}
        style={{ cursor: "pointer" }}
      >
        <Typography.Text
          style={{ textTransform: "uppercase" }}
          strong
          size="xs"
        >
          {t("common.live")}
        </Typography.Text>
        {storyUsers && (
          <>
            <SvgUser className="w-4 h-4" />
            <Typography.Text strong size="xs">
              {storyUsers.length || 0}
            </Typography.Text>
            <span className="sr-only">{t("story.listeners.title")}</span>
            <Modal.Modal
              title={t("story.listeners.title")}
              active={active}
              close={close}
            >
              <Modal.Header>
                <Modal.Title>{t("story.listeners.title")}</Modal.Title>
              </Modal.Header>
              <Modal.Content>
                <UserList userIds={storyUsers} loading={fetching} />
              </Modal.Content>
            </Modal.Modal>
          </>
        )}
      </Box>
    </>
  );

  return (
    <span className="font-bold text-xs bg-primary animate-pulse uppercase leading-none py-0.5 px-1 rounded-full">
      {t("common.live")}
    </span>
  );
};

const StoryNav: React.FC<{ story: Story; onClose: () => void }> = ({
  story,
  onClose,
}) => {
  const { t } = useI18n();

  const [{ data: { user } = { user: undefined } }] = useUserQuery({
    variables: { id: story.creatorId || "" },
  });

  const dateStr = useMemo(() => {
    const d = Date.now() - story.createdAt.getTime();
    return d ? formatMs(d) : "";
  }, [story]);

  return (
    <Box row alignItems="center" justifyContent="between">
      <Button
        styling="link"
        icon={<SvgChevronDown className="w-8 h-8" />}
        accessibilityLabel={t("modal.close")}
        onPress={onClose}
      />
      <Box
        row
        minWidth={0}
        flex={1}
        alignItems="center"
        justifyContent="center"
        gap="xs"
      >
        <Skeleton show={!user} rounded="full">
          <img
            alt={user?.username}
            className="w-6 h-6 rounded-full object-cover"
            src={user?.profilePicture}
          />
        </Skeleton>
        <Typography.Text size="sm" strong>
          {t("story.ofUsername", { username: user?.username || "" })}
        </Typography.Text>
        {story.isLive ? (
          <StoryNavListeners story={story} />
        ) : (
          <Typography.Text size="xs" color="foreground-secondary">
            {dateStr}
          </Typography.Text>
        )}
      </Box>
      <StoryNavMenu story={story} />
    </Box>
  );
};

export default StoryNav;
