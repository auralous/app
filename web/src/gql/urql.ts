import { devtoolsExchange } from "@urql/devtools";
import { cacheExchange as createCacheExchange } from "@urql/exchange-graphcache";
import { simplePagination } from "@urql/exchange-graphcache/extras";
import { persistedFetchExchange } from "@urql/exchange-persisted-fetch";
import { refocusExchange } from "@urql/exchange-refocus";
import {
  GraphCacheConfig,
  MeDocument,
  MeQuery,
  NowPlayingReactionsDocument,
  NowPlayingReactionsQuery,
  NowPlayingReactionsUpdatedSubscription,
  Story,
  StoryUsersDocument,
  StoryUsersQuery,
  UserFollowingsDocument,
  UserFollowingsQuery,
  UserFollowingsQueryVariables,
} from "gql/gql.gen";
import { createClient as createWSClient } from "graphql-ws";
import { t } from "i18n/index";
import toast from "react-hot-toast";
import {
  createClient,
  dedupExchange,
  errorExchange,
  Exchange,
  fetchExchange,
  subscriptionExchange,
} from "urql";
import schema from "./introspection.gen";
import { nextCursorPagination } from "./_pagination";

const wsClient =
  typeof window !== "undefined"
    ? createWSClient({
        url: `${process.env.WEBSOCKET_URI}/graphql`,
      })
    : null;

// @ts-ignore
const cacheExchange = createCacheExchange<GraphCacheConfig>({
  schema,
  keys: {
    QueueItem: () => null,
    Me: () => null,
    NowPlayingReactionItem: () => null,
    NowPlayingQueueItem: () => null,
  },
  resolvers: {
    Query: {
      messages: simplePagination({
        offsetArgument: "offset",
        mergeMode: "before",
      }),
      stories: nextCursorPagination(),
      notifications: nextCursorPagination(),
      story: (parent, args) => ({ __typename: "Story", id: args.id }),
      track: (parent, args) => ({ __typename: "Track", id: args.id }),
      // user: (parent, args) => ({ __typename: "User", id: args.id }),
    },
    Message: {
      createdAt: (parent) => new Date(parent.createdAt),
    },
    NowPlayingQueueItem: {
      playedAt: (parent) =>
        typeof parent.playedAt === "string" ? new Date(parent.playedAt) : null,
      endedAt: (parent) =>
        typeof parent.endedAt === "string"
          ? new Date(parent.endedAt)
          : undefined,
    },
    Story: {
      createdAt: (parent) => new Date(parent.createdAt),
    },
    NotificationInvite: {
      createdAt: (parent) => new Date(parent.createdAt),
    },
    NotificationFollow: {
      createdAt: (parent) => new Date(parent.createdAt),
    },
    NotificationNewStory: {
      createdAt: (parent) => new Date(parent.createdAt),
    },
    Me: {
      expiredAt: (parent) =>
        parent.expiredAt ? new Date(parent.expiredAt) : parent.expiredAt,
    },
  },
  updates: {
    Mutation: {
      storyCreate: (result, args, cache) => {
        if (!result.storyCreate) return;
        cache.invalidate("Query", "storyLive", {
          creatorId: (result.storyCreate as Story).creatorId,
        });
      },
      storyUnlive: (result, args, cache) => {
        if (!result.storyUnlive) return;
        cache.invalidate("Query", "storyLive", {
          creatorId: (result.storyUnlive as Story).creatorId,
        });
      },
      storyDelete: (result, args, cache) => {
        cache.invalidate({
          __typename: "Story",
          id: result.storyDelete as string,
        });
      },
      meDelete: () => {
        window.resetUrqlClient();
      },
      userFollow: (result, args, cache) => {
        if (!result.userFollow) return;

        const followedId = args.id as string;

        const meCache = cache.readQuery<MeQuery>({ query: MeDocument });
        // Possibly invalid state
        if (!meCache?.me)
          throw new Error("Bad state: should have been authenticated");

        // Update current user following
        cache.updateQuery<UserFollowingsQuery, UserFollowingsQueryVariables>(
          {
            query: UserFollowingsDocument,
            variables: { id: meCache.me.user.id },
          },
          (data) => ({
            userFollowings: (data?.userFollowings
              ? [followedId, ...data.userFollowings]
              : [followedId]) as string[],
          })
        );

        // Invalidate user stat of both entity
        cache.invalidate({
          __typename: "UserStat",
          id: followedId,
        });
        cache.invalidate({
          __typename: "UserStat",
          id: meCache.me.user.id,
        });
      },
      userUnfollow: (result, args, cache) => {
        if (!result.userUnfollow) return;

        const unfollowedId = args.id as string;

        const meCache = cache.readQuery<MeQuery>({ query: MeDocument });
        // Possibly invalid state
        if (!meCache?.me)
          throw new Error("Bad state: should have been authenticated");

        // Update current user following
        cache.updateQuery<UserFollowingsQuery, UserFollowingsQueryVariables>(
          {
            query: UserFollowingsDocument,
            variables: { id: meCache.me.user.id },
          },
          (data) =>
            data?.userFollowings
              ? {
                  userFollowings: data.userFollowings.filter(
                    (uf) => uf !== unfollowedId
                  ),
                }
              : data
        );

        // Invalidate user stat of both entity
        cache.invalidate({
          __typename: "UserStat",
          id: unfollowedId,
        });
        cache.invalidate({
          __typename: "UserStat",
          id: meCache.me.user.id,
        });
      },
    },
    Subscription: {
      storyUsersUpdated: (result, args, cache) => {
        if (result.storyUsersUpdated) {
          cache.updateQuery<StoryUsersQuery>(
            {
              query: StoryUsersDocument,
              variables: { id: args.id },
            },
            () => ({ storyUsers: result.storyUsersUpdated as string[] })
          );
        }
      },
      nowPlayingReactionsUpdated: (result, args, cache) => {
        if (result.nowPlayingReactionsUpdated) {
          cache.updateQuery<NowPlayingReactionsQuery>(
            {
              query: NowPlayingReactionsDocument,
              variables: { id: args.id },
            },
            () => ({
              nowPlayingReactions: (result as NowPlayingReactionsUpdatedSubscription)
                .nowPlayingReactionsUpdated,
            })
          );
        }
      },
    },
  },
});

export const createUrqlClient = () =>
  createClient({
    url: `${process.env.API_URI}/graphql`,
    fetchOptions: { credentials: "include" },
    exchanges: [
      process.env.NODE_ENV !== "production" && devtoolsExchange,
      dedupExchange,
      typeof window !== "undefined" && refocusExchange(),
      cacheExchange,
      errorExchange({
        onError({ networkError, graphQLErrors }) {
          if (typeof window === "undefined") return;
          if (networkError) toast.error("Unable to connect to server.");

          graphQLErrors.forEach((error) => {
            let message = error.message;
            const code = error.extensions?.code;
            if (code === "PERSISTED_QUERY_NOT_FOUND") return;
            if (message.startsWith("Internal error:")) {
              // We log this error to console so dev can look into it
              console.error(error);
              message = t("error.internal");
            }
            if (code === "UNAUTHENTICATED")
              message = t("error.unauthenticated");
            toast.error(message);
          });
        },
      }),
      persistedFetchExchange({
        preferGetForPersistedQueries: true,
      }),
      fetchExchange,
      subscriptionExchange({
        // @ts-ignore
        forwardSubscription(operation) {
          if (!wsClient) return undefined;
          return {
            subscribe: (sink) => {
              const dispose = wsClient.subscribe(operation, sink);
              return {
                unsubscribe: dispose,
              };
            },
          };
        },
      }),
    ].filter(Boolean) as Exchange[],
  });
