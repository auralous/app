import { Resolver as GraphCacheResolver, UpdateResolver as GraphCacheUpdateResolver, OptimisticMutationResolver as GraphCacheOptimisticMutationResolver } from '@urql/exchange-graphcache';
import { DocumentNode } from 'graphql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Artist = {
  __typename: 'Artist';
  id: Scalars['ID'];
  platform: PlatformName;
  externalId: Scalars['ID'];
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type CrossTracks = {
  __typename: 'CrossTracks';
  id: Scalars['ID'];
  youtube?: Maybe<Scalars['ID']>;
  spotify?: Maybe<Scalars['ID']>;
};


export type LocationInput = {
  lng: Scalars['Float'];
  lat: Scalars['Float'];
};

export type Me = {
  __typename: 'Me';
  user: User;
  oauthId: Scalars['String'];
  platform: PlatformName;
  accessToken?: Maybe<Scalars['String']>;
  expiredAt?: Maybe<Scalars['DateTime']>;
};

export type Message = {
  __typename: 'Message';
  id: Scalars['ID'];
  creatorId: Scalars['String'];
  creator: User;
  createdAt: Scalars['DateTime'];
  text?: Maybe<Scalars['String']>;
  type: MessageType;
};

export enum MessageType {
  Message = 'message',
  Join = 'join',
  Play = 'play'
}

export type Mutation = {
  __typename: 'Mutation';
  me?: Maybe<User>;
  meDelete: Scalars['Boolean'];
  messageAdd: Scalars['Boolean'];
  notificationsMarkRead: Scalars['Int'];
  nowPlayingReact?: Maybe<Scalars['Boolean']>;
  nowPlayingSkip?: Maybe<Scalars['Boolean']>;
  playlistAddTracks: Scalars['Boolean'];
  playlistCreate: Playlist;
  queueAdd: Scalars['Boolean'];
  queueRemove: Scalars['Boolean'];
  queueReorder: Scalars['Boolean'];
  queueToTop: Scalars['Boolean'];
  storyChangeQueueable: Scalars['Boolean'];
  storyCreate: Story;
  storyDelete: Scalars['ID'];
  storyPing: Scalars['Boolean'];
  storySendInvites: Scalars['Boolean'];
  storyUnlive: Story;
  userFollow: Scalars['Boolean'];
  userUnfollow: Scalars['Boolean'];
};


export type MutationMeArgs = {
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
};


export type MutationMessageAddArgs = {
  id: Scalars['ID'];
  text: Scalars['String'];
};


export type MutationNotificationsMarkReadArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationNowPlayingReactArgs = {
  id: Scalars['ID'];
  reaction: NowPlayingReactionType;
};


export type MutationNowPlayingSkipArgs = {
  id: Scalars['ID'];
};


export type MutationPlaylistAddTracksArgs = {
  id: Scalars['ID'];
  trackIds: Array<Scalars['String']>;
};


export type MutationPlaylistCreateArgs = {
  name: Scalars['String'];
  trackIds: Array<Scalars['String']>;
};


export type MutationQueueAddArgs = {
  id: Scalars['ID'];
  tracks: Array<Scalars['ID']>;
};


export type MutationQueueRemoveArgs = {
  id: Scalars['ID'];
  uids: Array<Scalars['ID']>;
};


export type MutationQueueReorderArgs = {
  id: Scalars['ID'];
  position: Scalars['Int'];
  insertPosition: Scalars['Int'];
};


export type MutationQueueToTopArgs = {
  id: Scalars['ID'];
  uids: Array<Scalars['ID']>;
};


export type MutationStoryChangeQueueableArgs = {
  id: Scalars['ID'];
  userId: Scalars['String'];
  isRemoving: Scalars['Boolean'];
};


export type MutationStoryCreateArgs = {
  text: Scalars['String'];
  isPublic: Scalars['Boolean'];
  location?: Maybe<LocationInput>;
  tracks: Array<Scalars['ID']>;
};


export type MutationStoryDeleteArgs = {
  id: Scalars['ID'];
};


export type MutationStoryPingArgs = {
  id: Scalars['ID'];
};


export type MutationStorySendInvitesArgs = {
  id: Scalars['ID'];
  invitedIds: Array<Scalars['String']>;
};


export type MutationStoryUnliveArgs = {
  id: Scalars['ID'];
};


export type MutationUserFollowArgs = {
  id: Scalars['ID'];
};


export type MutationUserUnfollowArgs = {
  id: Scalars['ID'];
};

export type Notification = {
  id: Scalars['ID'];
  hasRead: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
};

export type NotificationFollow = Notification & {
  __typename: 'NotificationFollow';
  id: Scalars['ID'];
  hasRead: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  followerId: Scalars['String'];
};

export type NotificationInvite = Notification & {
  __typename: 'NotificationInvite';
  id: Scalars['ID'];
  hasRead: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  inviterId: Scalars['String'];
  storyId: Scalars['String'];
};

export type NotificationNewStory = Notification & {
  __typename: 'NotificationNewStory';
  id: Scalars['ID'];
  hasRead: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  storyId: Scalars['String'];
  creatorId: Scalars['String'];
};

export type NowPlaying = {
  __typename: 'NowPlaying';
  id: Scalars['ID'];
  currentTrack?: Maybe<NowPlayingQueueItem>;
};

export type NowPlayingQueueItem = {
  __typename: 'NowPlayingQueueItem';
  uid: Scalars['ID'];
  trackId: Scalars['String'];
  playedAt: Scalars['DateTime'];
  endedAt: Scalars['DateTime'];
  creatorId: Scalars['String'];
};

export type NowPlayingReactionItem = {
  __typename: 'NowPlayingReactionItem';
  userId: Scalars['String'];
  reaction: NowPlayingReactionType;
};

export enum NowPlayingReactionType {
  Heart = 'heart',
  Joy = 'joy',
  Fire = 'fire',
  Cry = 'cry'
}

export enum PlatformName {
  Youtube = 'youtube',
  Spotify = 'spotify'
}

export type Playlist = {
  __typename: 'Playlist';
  id: Scalars['ID'];
  platform: PlatformName;
  externalId: Scalars['ID'];
  name: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  total: Scalars['Int'];
};

export type Query = {
  __typename: 'Query';
  crossTracks?: Maybe<CrossTracks>;
  me?: Maybe<Me>;
  messages?: Maybe<Array<Message>>;
  myPlaylists?: Maybe<Array<Playlist>>;
  notifications: Array<Notification>;
  nowPlaying?: Maybe<NowPlaying>;
  nowPlayingReactions?: Maybe<Array<NowPlayingReactionItem>>;
  playlist?: Maybe<Playlist>;
  playlistTracks: Array<Track>;
  playlistsFeatured: Array<Playlist>;
  playlistsFriends: Array<Playlist>;
  playlistsSearch: Array<Playlist>;
  queue?: Maybe<Queue>;
  searchTrack: Array<Track>;
  stories: Array<Story>;
  storiesOnMap: Array<Story>;
  story?: Maybe<Story>;
  storyLive?: Maybe<Story>;
  storyTracks: Array<Track>;
  storyUsers?: Maybe<Array<Scalars['String']>>;
  track?: Maybe<Track>;
  user?: Maybe<User>;
  userFollowers: Array<Scalars['String']>;
  userFollowings: Array<Scalars['String']>;
  userStat?: Maybe<UserStat>;
};


export type QueryCrossTracksArgs = {
  id: Scalars['ID'];
};


export type QueryMessagesArgs = {
  id: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
};


export type QueryNotificationsArgs = {
  next?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryNowPlayingArgs = {
  id: Scalars['ID'];
};


export type QueryNowPlayingReactionsArgs = {
  id: Scalars['ID'];
};


export type QueryPlaylistArgs = {
  id: Scalars['ID'];
};


export type QueryPlaylistTracksArgs = {
  id: Scalars['ID'];
};


export type QueryPlaylistsSearchArgs = {
  query: Scalars['String'];
};


export type QueryQueueArgs = {
  id: Scalars['ID'];
};


export type QuerySearchTrackArgs = {
  query: Scalars['String'];
};


export type QueryStoriesArgs = {
  id: Scalars['ID'];
  next?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryStoriesOnMapArgs = {
  lng: Scalars['Float'];
  lat: Scalars['Float'];
  radius: Scalars['Float'];
};


export type QueryStoryArgs = {
  id: Scalars['ID'];
};


export type QueryStoryLiveArgs = {
  creatorId?: Maybe<Scalars['String']>;
};


export type QueryStoryTracksArgs = {
  id: Scalars['ID'];
};


export type QueryStoryUsersArgs = {
  id: Scalars['ID'];
};


export type QueryTrackArgs = {
  id: Scalars['ID'];
};


export type QueryUserArgs = {
  username?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
};


export type QueryUserFollowersArgs = {
  id: Scalars['ID'];
};


export type QueryUserFollowingsArgs = {
  id: Scalars['ID'];
};


export type QueryUserStatArgs = {
  id: Scalars['ID'];
};

export type Queue = {
  __typename: 'Queue';
  id: Scalars['ID'];
  items: Array<QueueItem>;
};

export type QueueItem = {
  __typename: 'QueueItem';
  uid: Scalars['ID'];
  trackId: Scalars['String'];
  creatorId: Scalars['String'];
};

export type Story = {
  __typename: 'Story';
  id: Scalars['ID'];
  text: Scalars['String'];
  isPublic: Scalars['Boolean'];
  image?: Maybe<Scalars['String']>;
  creatorId: Scalars['ID'];
  creator: User;
  createdAt: Scalars['DateTime'];
  isLive: Scalars['Boolean'];
  queueable: Array<Scalars['String']>;
};

export type Subscription = {
  __typename: 'Subscription';
  messageAdded: Message;
  notificationAdded: Notification;
  nowPlayingReactionsUpdated?: Maybe<Array<NowPlayingReactionItem>>;
  nowPlayingUpdated?: Maybe<NowPlaying>;
  queueUpdated: Queue;
  storyUpdated: Story;
  storyUsersUpdated: Array<Scalars['String']>;
};


export type SubscriptionMessageAddedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionNowPlayingReactionsUpdatedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionNowPlayingUpdatedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionQueueUpdatedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionStoryUpdatedArgs = {
  id: Scalars['ID'];
};


export type SubscriptionStoryUsersUpdatedArgs = {
  id: Scalars['ID'];
};

export type Track = {
  __typename: 'Track';
  id: Scalars['ID'];
  platform: PlatformName;
  externalId: Scalars['ID'];
  artists: Array<Artist>;
  duration: Scalars['Int'];
  title: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};

export type User = {
  __typename: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  bio?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['String']>;
};

export type UserStat = {
  __typename: 'UserStat';
  id: Scalars['ID'];
  followerCount: Scalars['Int'];
  followingCount: Scalars['Int'];
};

export type MessagePartsFragment = (
  { __typename: 'Message' }
  & Pick<Message, 'id' | 'creatorId' | 'createdAt' | 'text' | 'type'>
  & { creator: (
    { __typename: 'User' }
    & Pick<User, 'id' | 'username' | 'profilePicture'>
  ) }
);

export type MessagesQueryVariables = Exact<{
  id: Scalars['ID'];
  offset?: Maybe<Scalars['Int']>;
  limit?: Maybe<Scalars['Int']>;
}>;


export type MessagesQuery = { messages?: Maybe<Array<(
    { __typename: 'Message' }
    & MessagePartsFragment
  )>> };

export type MessageAddMutationVariables = Exact<{
  id: Scalars['ID'];
  text: Scalars['String'];
}>;


export type MessageAddMutation = Pick<Mutation, 'messageAdd'>;

export type MessageAddedSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MessageAddedSubscription = { messageAdded: (
    { __typename: 'Message' }
    & MessagePartsFragment
  ) };

export type NotificationsQueryVariables = Exact<{
  next?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type NotificationsQuery = { notifications: Array<(
    { __typename: 'NotificationFollow' }
    & Pick<NotificationFollow, 'followerId' | 'id' | 'createdAt' | 'hasRead'>
  ) | (
    { __typename: 'NotificationInvite' }
    & Pick<NotificationInvite, 'storyId' | 'inviterId' | 'id' | 'createdAt' | 'hasRead'>
  ) | (
    { __typename: 'NotificationNewStory' }
    & Pick<NotificationNewStory, 'storyId' | 'creatorId' | 'id' | 'createdAt' | 'hasRead'>
  )> };

export type NotificationsMarkReadMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type NotificationsMarkReadMutation = Pick<Mutation, 'notificationsMarkRead'>;

export type NotificationAddedSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationAddedSubscription = { notificationAdded: (
    { __typename: 'NotificationFollow' }
    & Pick<NotificationFollow, 'followerId' | 'id' | 'createdAt' | 'hasRead'>
  ) | (
    { __typename: 'NotificationInvite' }
    & Pick<NotificationInvite, 'storyId' | 'inviterId' | 'id' | 'createdAt' | 'hasRead'>
  ) | (
    { __typename: 'NotificationNewStory' }
    & Pick<NotificationNewStory, 'storyId' | 'creatorId' | 'id' | 'createdAt' | 'hasRead'>
  ) };

export type NowPlayingQueuePartsFragment = (
  { __typename: 'NowPlayingQueueItem' }
  & Pick<NowPlayingQueueItem, 'uid' | 'trackId' | 'playedAt' | 'endedAt' | 'creatorId'>
);

export type NowPlayingQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NowPlayingQuery = { nowPlaying?: Maybe<(
    { __typename: 'NowPlaying' }
    & Pick<NowPlaying, 'id'>
    & { currentTrack?: Maybe<(
      { __typename: 'NowPlayingQueueItem' }
      & NowPlayingQueuePartsFragment
    )> }
  )> };

export type NowPlayingSkipMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NowPlayingSkipMutation = Pick<Mutation, 'nowPlayingSkip'>;

export type OnNowPlayingUpdatedSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OnNowPlayingUpdatedSubscription = { nowPlayingUpdated?: Maybe<(
    { __typename: 'NowPlaying' }
    & Pick<NowPlaying, 'id'>
    & { currentTrack?: Maybe<(
      { __typename: 'NowPlayingQueueItem' }
      & NowPlayingQueuePartsFragment
    )> }
  )> };

export type NowPlayingReactionsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NowPlayingReactionsQuery = { nowPlayingReactions?: Maybe<Array<(
    { __typename: 'NowPlayingReactionItem' }
    & Pick<NowPlayingReactionItem, 'reaction' | 'userId'>
  )>> };

export type NowPlayingReactionsUpdatedSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type NowPlayingReactionsUpdatedSubscription = { nowPlayingReactionsUpdated?: Maybe<Array<(
    { __typename: 'NowPlayingReactionItem' }
    & Pick<NowPlayingReactionItem, 'reaction' | 'userId'>
  )>> };

export type NowPlayingReactMutationVariables = Exact<{
  id: Scalars['ID'];
  reaction: NowPlayingReactionType;
}>;


export type NowPlayingReactMutation = Pick<Mutation, 'nowPlayingReact'>;

export type PlaylistPartsFragment = (
  { __typename: 'Playlist' }
  & Pick<Playlist, 'id' | 'platform' | 'externalId' | 'name' | 'image' | 'url' | 'total'>
);

export type PlaylistQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaylistQuery = { playlist?: Maybe<(
    { __typename: 'Playlist' }
    & PlaylistPartsFragment
  )> };

export type MyPlaylistsQueryVariables = Exact<{ [key: string]: never; }>;


export type MyPlaylistsQuery = { myPlaylists?: Maybe<Array<(
    { __typename: 'Playlist' }
    & PlaylistPartsFragment
  )>> };

export type PlaylistTracksQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type PlaylistTracksQuery = { playlistTracks: Array<(
    { __typename: 'Track' }
    & TrackPartsFragment
  )> };

export type PlaylistsFeaturedQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaylistsFeaturedQuery = { playlistsFeatured: Array<(
    { __typename: 'Playlist' }
    & PlaylistPartsFragment
  )> };

export type PlaylistsFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type PlaylistsFriendsQuery = { playlistsFriends: Array<(
    { __typename: 'Playlist' }
    & PlaylistPartsFragment
  )> };

export type PlaylistsSearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type PlaylistsSearchQuery = { playlistsSearch: Array<(
    { __typename: 'Playlist' }
    & PlaylistPartsFragment
  )> };

export type PlaylistAddTracksMutationVariables = Exact<{
  id: Scalars['ID'];
  trackIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type PlaylistAddTracksMutation = Pick<Mutation, 'playlistAddTracks'>;

export type PlaylistCreateMutationVariables = Exact<{
  name: Scalars['String'];
  trackIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type PlaylistCreateMutation = { playlistCreate: (
    { __typename: 'Playlist' }
    & PlaylistPartsFragment
  ) };

export type QueueItemPartsFragment = (
  { __typename: 'QueueItem' }
  & Pick<QueueItem, 'uid' | 'trackId' | 'creatorId'>
);

export type QueueAddMutationVariables = Exact<{
  id: Scalars['ID'];
  tracks: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type QueueAddMutation = Pick<Mutation, 'queueAdd'>;

export type QueueRemoveMutationVariables = Exact<{
  id: Scalars['ID'];
  uids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type QueueRemoveMutation = Pick<Mutation, 'queueRemove'>;

export type QueueReorderMutationVariables = Exact<{
  id: Scalars['ID'];
  position: Scalars['Int'];
  insertPosition: Scalars['Int'];
}>;


export type QueueReorderMutation = Pick<Mutation, 'queueReorder'>;

export type QueueToTopMutationVariables = Exact<{
  id: Scalars['ID'];
  uids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type QueueToTopMutation = Pick<Mutation, 'queueToTop'>;

export type QueueQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type QueueQuery = { queue?: Maybe<(
    { __typename: 'Queue' }
    & Pick<Queue, 'id'>
    & { items: Array<(
      { __typename: 'QueueItem' }
      & QueueItemPartsFragment
    )> }
  )> };

export type QueueUpdatedSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type QueueUpdatedSubscription = { queueUpdated: (
    { __typename: 'Queue' }
    & Pick<Queue, 'id'>
    & { items: Array<(
      { __typename: 'QueueItem' }
      & QueueItemPartsFragment
    )> }
  ) };

export type StoryDetailPartsFragment = (
  { __typename: 'Story' }
  & Pick<Story, 'text' | 'image' | 'createdAt' | 'isPublic' | 'isLive' | 'creatorId' | 'queueable'>
  & { creator: (
    { __typename: 'User' }
    & Pick<User, 'id' | 'username' | 'profilePicture'>
  ) }
);

export type StoryQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryQuery = { story?: Maybe<(
    { __typename: 'Story' }
    & Pick<Story, 'id'>
    & StoryDetailPartsFragment
  )> };

export type StoriesQueryVariables = Exact<{
  id: Scalars['ID'];
  next?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
}>;


export type StoriesQuery = { stories: Array<(
    { __typename: 'Story' }
    & Pick<Story, 'id'>
    & StoryDetailPartsFragment
  )> };

export type StoriesOnMapQueryVariables = Exact<{
  lng: Scalars['Float'];
  lat: Scalars['Float'];
  radius: Scalars['Float'];
}>;


export type StoriesOnMapQuery = { storiesOnMap: Array<(
    { __typename: 'Story' }
    & Pick<Story, 'id'>
    & StoryDetailPartsFragment
  )> };

export type StoryLiveQueryVariables = Exact<{
  creatorId?: Maybe<Scalars['String']>;
}>;


export type StoryLiveQuery = { storyLive?: Maybe<(
    { __typename: 'Story' }
    & Pick<Story, 'id'>
    & StoryDetailPartsFragment
  )> };

export type StoryTracksQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryTracksQuery = { storyTracks: Array<(
    { __typename: 'Track' }
    & TrackPartsFragment
  )> };

export type StoryCreateMutationVariables = Exact<{
  text: Scalars['String'];
  isPublic: Scalars['Boolean'];
  location?: Maybe<LocationInput>;
  tracks: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type StoryCreateMutation = { storyCreate: (
    { __typename: 'Story' }
    & Pick<Story, 'id'>
    & StoryDetailPartsFragment
  ) };

export type StoryChangeQueueableMutationVariables = Exact<{
  id: Scalars['ID'];
  userId: Scalars['String'];
  isRemoving: Scalars['Boolean'];
}>;


export type StoryChangeQueueableMutation = Pick<Mutation, 'storyChangeQueueable'>;

export type StoryDeleteMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryDeleteMutation = Pick<Mutation, 'storyDelete'>;

export type StoryUnliveMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryUnliveMutation = { storyUnlive: (
    { __typename: 'Story' }
    & Pick<Story, 'id'>
    & StoryDetailPartsFragment
  ) };

export type StoryUsersQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryUsersQuery = Pick<Query, 'storyUsers'>;

export type StoryPingMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryPingMutation = Pick<Mutation, 'storyPing'>;

export type StoryUpdatedSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryUpdatedSubscription = { storyUpdated: (
    { __typename: 'Story' }
    & Pick<Story, 'id'>
    & StoryDetailPartsFragment
  ) };

export type StoryUsersUpdatedSubscriptionVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StoryUsersUpdatedSubscription = Pick<Subscription, 'storyUsersUpdated'>;

export type StorySendInvitesMutationVariables = Exact<{
  id: Scalars['ID'];
  invitedIds: Array<Scalars['String']> | Scalars['String'];
}>;


export type StorySendInvitesMutation = Pick<Mutation, 'storySendInvites'>;

export type ArtistPartsFragment = (
  { __typename: 'Artist' }
  & Pick<Artist, 'id' | 'platform' | 'externalId' | 'name' | 'image' | 'url'>
);

export type TrackPartsFragment = (
  { __typename: 'Track' }
  & Pick<Track, 'id' | 'platform' | 'externalId' | 'title' | 'duration' | 'image' | 'url'>
  & { artists: Array<(
    { __typename: 'Artist' }
    & ArtistPartsFragment
  )> }
);

export type TrackQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TrackQuery = { track?: Maybe<(
    { __typename: 'Track' }
    & TrackPartsFragment
  )> };

export type CrossTracksQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type CrossTracksQuery = { crossTracks?: Maybe<(
    { __typename: 'CrossTracks' }
    & Pick<CrossTracks, 'id' | 'youtube' | 'spotify'>
  )> };

export type SearchTrackQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type SearchTrackQuery = { searchTrack: Array<(
    { __typename: 'Track' }
    & TrackPartsFragment
  )> };

export type UserPublicPartsFragment = (
  { __typename: 'User' }
  & Pick<User, 'id' | 'username' | 'bio' | 'profilePicture'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { me?: Maybe<(
    { __typename: 'Me' }
    & Pick<Me, 'oauthId' | 'platform' | 'accessToken' | 'expiredAt'>
    & { user: (
      { __typename: 'User' }
      & UserPublicPartsFragment
    ) }
  )> };

export type UserQueryVariables = Exact<{
  username?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
}>;


export type UserQuery = { user?: Maybe<(
    { __typename: 'User' }
    & UserPublicPartsFragment
  )> };

export type UserStatQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserStatQuery = { userStat?: Maybe<(
    { __typename: 'UserStat' }
    & Pick<UserStat, 'id' | 'followerCount' | 'followingCount'>
  )> };

export type UserFollowersQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserFollowersQuery = Pick<Query, 'userFollowers'>;

export type UserFollowingsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserFollowingsQuery = Pick<Query, 'userFollowings'>;

export type UserFollowMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserFollowMutation = Pick<Mutation, 'userFollow'>;

export type UserUnfollowMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type UserUnfollowMutation = Pick<Mutation, 'userUnfollow'>;

export type MeUpdateMutationVariables = Exact<{
  name?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
}>;


export type MeUpdateMutation = { me?: Maybe<(
    { __typename: 'User' }
    & UserPublicPartsFragment
  )> };

export type MeDeleteMutationVariables = Exact<{ [key: string]: never; }>;


export type MeDeleteMutation = Pick<Mutation, 'meDelete'>;

export const MessagePartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode;
export const NowPlayingQueuePartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NowPlayingQueueParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NowPlayingQueueItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"playedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}}]} as unknown as DocumentNode;
export const PlaylistPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;
export const QueueItemPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueueItemParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueueItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}}]} as unknown as DocumentNode;
export const StoryDetailPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoryDetailParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isLive"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"queueable"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;
export const ArtistPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode;
export const TrackPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrackParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode;
export const UserPublicPartsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPublicParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]} as unknown as DocumentNode;
export const MessagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"messages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode;

export function useMessagesQuery(options: Omit<Urql.UseQueryArgs<MessagesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MessagesQuery>({ query: MessagesDocument, ...options });
};
export const MessageAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"messageAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}}]}]}}]} as unknown as DocumentNode;

export function useMessageAddMutation() {
  return Urql.useMutation<MessageAddMutation, MessageAddMutationVariables>(MessageAddDocument);
};
export const MessageAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"messageAdded"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"messageAdded"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MessageParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MessageParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Message"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]} as unknown as DocumentNode;

export function useMessageAddedSubscription<TData = MessageAddedSubscription>(options: Omit<Urql.UseSubscriptionArgs<MessageAddedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<MessageAddedSubscription, TData>) {
  return Urql.useSubscription<MessageAddedSubscription, TData, MessageAddedSubscriptionVariables>({ query: MessageAddedDocument, ...options }, handler);
};
export const NotificationsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"notifications"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"next"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notifications"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"next"},"value":{"kind":"Variable","name":{"kind":"Name","value":"next"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRead"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationFollow"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followerId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationInvite"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyId"}},{"kind":"Field","name":{"kind":"Name","value":"inviterId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationNewStory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyId"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode;

export function useNotificationsQuery(options: Omit<Urql.UseQueryArgs<NotificationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NotificationsQuery>({ query: NotificationsDocument, ...options });
};
export const NotificationsMarkReadDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"notificationsMarkRead"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationsMarkRead"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}]}]}}]} as unknown as DocumentNode;

export function useNotificationsMarkReadMutation() {
  return Urql.useMutation<NotificationsMarkReadMutation, NotificationsMarkReadMutationVariables>(NotificationsMarkReadDocument);
};
export const NotificationAddedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"notificationAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"notificationAdded"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"hasRead"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationFollow"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"followerId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationInvite"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyId"}},{"kind":"Field","name":{"kind":"Name","value":"inviterId"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NotificationNewStory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyId"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]} as unknown as DocumentNode;

export function useNotificationAddedSubscription<TData = NotificationAddedSubscription>(options: Omit<Urql.UseSubscriptionArgs<NotificationAddedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NotificationAddedSubscription, TData>) {
  return Urql.useSubscription<NotificationAddedSubscription, TData, NotificationAddedSubscriptionVariables>({ query: NotificationAddedDocument, ...options }, handler);
};
export const NowPlayingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"nowPlaying"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nowPlaying"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentTrack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NowPlayingQueueParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NowPlayingQueueParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NowPlayingQueueItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"playedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}}]} as unknown as DocumentNode;

export function useNowPlayingQuery(options: Omit<Urql.UseQueryArgs<NowPlayingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NowPlayingQuery>({ query: NowPlayingDocument, ...options });
};
export const NowPlayingSkipDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"nowPlayingSkip"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nowPlayingSkip"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

export function useNowPlayingSkipMutation() {
  return Urql.useMutation<NowPlayingSkipMutation, NowPlayingSkipMutationVariables>(NowPlayingSkipDocument);
};
export const OnNowPlayingUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onNowPlayingUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nowPlayingUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"currentTrack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"NowPlayingQueueParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"NowPlayingQueueParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"NowPlayingQueueItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"playedAt"}},{"kind":"Field","name":{"kind":"Name","value":"endedAt"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}}]} as unknown as DocumentNode;

export function useOnNowPlayingUpdatedSubscription<TData = OnNowPlayingUpdatedSubscription>(options: Omit<Urql.UseSubscriptionArgs<OnNowPlayingUpdatedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<OnNowPlayingUpdatedSubscription, TData>) {
  return Urql.useSubscription<OnNowPlayingUpdatedSubscription, TData, OnNowPlayingUpdatedSubscriptionVariables>({ query: OnNowPlayingUpdatedDocument, ...options }, handler);
};
export const NowPlayingReactionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"nowPlayingReactions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nowPlayingReactions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reaction"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode;

export function useNowPlayingReactionsQuery(options: Omit<Urql.UseQueryArgs<NowPlayingReactionsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<NowPlayingReactionsQuery>({ query: NowPlayingReactionsDocument, ...options });
};
export const NowPlayingReactionsUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"nowPlayingReactionsUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nowPlayingReactionsUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"reaction"}},{"kind":"Field","name":{"kind":"Name","value":"userId"}}]}}]}}]} as unknown as DocumentNode;

export function useNowPlayingReactionsUpdatedSubscription<TData = NowPlayingReactionsUpdatedSubscription>(options: Omit<Urql.UseSubscriptionArgs<NowPlayingReactionsUpdatedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<NowPlayingReactionsUpdatedSubscription, TData>) {
  return Urql.useSubscription<NowPlayingReactionsUpdatedSubscription, TData, NowPlayingReactionsUpdatedSubscriptionVariables>({ query: NowPlayingReactionsUpdatedDocument, ...options }, handler);
};
export const NowPlayingReactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"nowPlayingReact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"reaction"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NowPlayingReactionType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nowPlayingReact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"reaction"},"value":{"kind":"Variable","name":{"kind":"Name","value":"reaction"}}}]}]}}]} as unknown as DocumentNode;

export function useNowPlayingReactMutation() {
  return Urql.useMutation<NowPlayingReactMutation, NowPlayingReactMutationVariables>(NowPlayingReactDocument);
};
export const PlaylistDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playlist"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlist"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function usePlaylistQuery(options: Omit<Urql.UseQueryArgs<PlaylistQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PlaylistQuery>({ query: PlaylistDocument, ...options });
};
export const MyPlaylistsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"myPlaylists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myPlaylists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function useMyPlaylistsQuery(options: Omit<Urql.UseQueryArgs<MyPlaylistsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MyPlaylistsQuery>({ query: MyPlaylistsDocument, ...options });
};
export const PlaylistTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playlistTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlistTracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrackParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrackParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistParts"}}]}}]}}]} as unknown as DocumentNode;

export function usePlaylistTracksQuery(options: Omit<Urql.UseQueryArgs<PlaylistTracksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PlaylistTracksQuery>({ query: PlaylistTracksDocument, ...options });
};
export const PlaylistsFeaturedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playlistsFeatured"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlistsFeatured"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function usePlaylistsFeaturedQuery(options: Omit<Urql.UseQueryArgs<PlaylistsFeaturedQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PlaylistsFeaturedQuery>({ query: PlaylistsFeaturedDocument, ...options });
};
export const PlaylistsFriendsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playlistsFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlistsFriends"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function usePlaylistsFriendsQuery(options: Omit<Urql.UseQueryArgs<PlaylistsFriendsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PlaylistsFriendsQuery>({ query: PlaylistsFriendsDocument, ...options });
};
export const PlaylistsSearchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playlistsSearch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlistsSearch"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function usePlaylistsSearchQuery(options: Omit<Urql.UseQueryArgs<PlaylistsSearchQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PlaylistsSearchQuery>({ query: PlaylistsSearchDocument, ...options });
};
export const PlaylistAddTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"playlistAddTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trackIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlistAddTracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"trackIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trackIds"}}}]}]}}]} as unknown as DocumentNode;

export function usePlaylistAddTracksMutation() {
  return Urql.useMutation<PlaylistAddTracksMutation, PlaylistAddTracksMutationVariables>(PlaylistAddTracksDocument);
};
export const PlaylistCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"playlistCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"trackIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playlistCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"trackIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"trackIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PlaylistParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PlaylistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Playlist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"total"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function usePlaylistCreateMutation() {
  return Urql.useMutation<PlaylistCreateMutation, PlaylistCreateMutationVariables>(PlaylistCreateDocument);
};
export const QueueAddDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"queueAdd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tracks"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queueAdd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"tracks"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tracks"}}}]}]}}]} as unknown as DocumentNode;

export function useQueueAddMutation() {
  return Urql.useMutation<QueueAddMutation, QueueAddMutationVariables>(QueueAddDocument);
};
export const QueueRemoveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"queueRemove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queueRemove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"uids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uids"}}}]}]}}]} as unknown as DocumentNode;

export function useQueueRemoveMutation() {
  return Urql.useMutation<QueueRemoveMutation, QueueRemoveMutationVariables>(QueueRemoveDocument);
};
export const QueueReorderDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"queueReorder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"position"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"insertPosition"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queueReorder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"position"},"value":{"kind":"Variable","name":{"kind":"Name","value":"position"}}},{"kind":"Argument","name":{"kind":"Name","value":"insertPosition"},"value":{"kind":"Variable","name":{"kind":"Name","value":"insertPosition"}}}]}]}}]} as unknown as DocumentNode;

export function useQueueReorderMutation() {
  return Urql.useMutation<QueueReorderMutation, QueueReorderMutationVariables>(QueueReorderDocument);
};
export const QueueToTopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"queueToTop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"uids"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queueToTop"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"uids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"uids"}}}]}]}}]} as unknown as DocumentNode;

export function useQueueToTopMutation() {
  return Urql.useMutation<QueueToTopMutation, QueueToTopMutationVariables>(QueueToTopDocument);
};
export const QueueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"queue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QueueItemParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueueItemParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueueItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}}]} as unknown as DocumentNode;

export function useQueueQuery(options: Omit<Urql.UseQueryArgs<QueueQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<QueueQuery>({ query: QueueDocument, ...options });
};
export const QueueUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"queueUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queueUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"QueueItemParts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"QueueItemParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"QueueItem"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uid"}},{"kind":"Field","name":{"kind":"Name","value":"trackId"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}}]}}]} as unknown as DocumentNode;

export function useQueueUpdatedSubscription<TData = QueueUpdatedSubscription>(options: Omit<Urql.UseSubscriptionArgs<QueueUpdatedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<QueueUpdatedSubscription, TData>) {
  return Urql.useSubscription<QueueUpdatedSubscription, TData, QueueUpdatedSubscriptionVariables>({ query: QueueUpdatedDocument, ...options }, handler);
};
export const StoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"story"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"story"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoryDetailParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoryDetailParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isLive"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"queueable"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function useStoryQuery(options: Omit<Urql.UseQueryArgs<StoryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StoryQuery>({ query: StoryDocument, ...options });
};
export const StoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"stories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"next"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"next"},"value":{"kind":"Variable","name":{"kind":"Name","value":"next"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoryDetailParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoryDetailParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isLive"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"queueable"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function useStoriesQuery(options: Omit<Urql.UseQueryArgs<StoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StoriesQuery>({ query: StoriesDocument, ...options });
};
export const StoriesOnMapDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storiesOnMap"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lng"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"lat"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"radius"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storiesOnMap"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"lng"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lng"}}},{"kind":"Argument","name":{"kind":"Name","value":"lat"},"value":{"kind":"Variable","name":{"kind":"Name","value":"lat"}}},{"kind":"Argument","name":{"kind":"Name","value":"radius"},"value":{"kind":"Variable","name":{"kind":"Name","value":"radius"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoryDetailParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoryDetailParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isLive"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"queueable"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function useStoriesOnMapQuery(options: Omit<Urql.UseQueryArgs<StoriesOnMapQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StoriesOnMapQuery>({ query: StoriesOnMapDocument, ...options });
};
export const StoryLiveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storyLive"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"creatorId"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyLive"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"creatorId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"creatorId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoryDetailParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoryDetailParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isLive"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"queueable"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function useStoryLiveQuery(options: Omit<Urql.UseQueryArgs<StoryLiveQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StoryLiveQuery>({ query: StoryLiveDocument, ...options });
};
export const StoryTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storyTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyTracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrackParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrackParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistParts"}}]}}]}}]} as unknown as DocumentNode;

export function useStoryTracksQuery(options: Omit<Urql.UseQueryArgs<StoryTracksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StoryTracksQuery>({ query: StoryTracksDocument, ...options });
};
export const StoryCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"storyCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"text"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"LocationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tracks"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"text"},"value":{"kind":"Variable","name":{"kind":"Name","value":"text"}}},{"kind":"Argument","name":{"kind":"Name","value":"isPublic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isPublic"}}},{"kind":"Argument","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"Argument","name":{"kind":"Name","value":"tracks"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tracks"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoryDetailParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoryDetailParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isLive"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"queueable"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function useStoryCreateMutation() {
  return Urql.useMutation<StoryCreateMutation, StoryCreateMutationVariables>(StoryCreateDocument);
};
export const StoryChangeQueueableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"storyChangeQueueable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"isRemoving"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyChangeQueueable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"Argument","name":{"kind":"Name","value":"isRemoving"},"value":{"kind":"Variable","name":{"kind":"Name","value":"isRemoving"}}}]}]}}]} as unknown as DocumentNode;

export function useStoryChangeQueueableMutation() {
  return Urql.useMutation<StoryChangeQueueableMutation, StoryChangeQueueableMutationVariables>(StoryChangeQueueableDocument);
};
export const StoryDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"storyDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

export function useStoryDeleteMutation() {
  return Urql.useMutation<StoryDeleteMutation, StoryDeleteMutationVariables>(StoryDeleteDocument);
};
export const StoryUnliveDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"storyUnlive"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyUnlive"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoryDetailParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoryDetailParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isLive"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"queueable"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function useStoryUnliveMutation() {
  return Urql.useMutation<StoryUnliveMutation, StoryUnliveMutationVariables>(StoryUnliveDocument);
};
export const StoryUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"storyUsers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyUsers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

export function useStoryUsersQuery(options: Omit<Urql.UseQueryArgs<StoryUsersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StoryUsersQuery>({ query: StoryUsersDocument, ...options });
};
export const StoryPingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"storyPing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyPing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

export function useStoryPingMutation() {
  return Urql.useMutation<StoryPingMutation, StoryPingMutationVariables>(StoryPingDocument);
};
export const StoryUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"storyUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"StoryDetailParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StoryDetailParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Story"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"isPublic"}},{"kind":"Field","name":{"kind":"Name","value":"isLive"}},{"kind":"Field","name":{"kind":"Name","value":"creatorId"}},{"kind":"Field","name":{"kind":"Name","value":"queueable"}},{"kind":"Field","name":{"kind":"Name","value":"creator"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]} as unknown as DocumentNode;

export function useStoryUpdatedSubscription<TData = StoryUpdatedSubscription>(options: Omit<Urql.UseSubscriptionArgs<StoryUpdatedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<StoryUpdatedSubscription, TData>) {
  return Urql.useSubscription<StoryUpdatedSubscription, TData, StoryUpdatedSubscriptionVariables>({ query: StoryUpdatedDocument, ...options }, handler);
};
export const StoryUsersUpdatedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"storyUsersUpdated"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storyUsersUpdated"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

export function useStoryUsersUpdatedSubscription<TData = StoryUsersUpdatedSubscription>(options: Omit<Urql.UseSubscriptionArgs<StoryUsersUpdatedSubscriptionVariables>, 'query'> = {}, handler?: Urql.SubscriptionHandler<StoryUsersUpdatedSubscription, TData>) {
  return Urql.useSubscription<StoryUsersUpdatedSubscription, TData, StoryUsersUpdatedSubscriptionVariables>({ query: StoryUsersUpdatedDocument, ...options }, handler);
};
export const StorySendInvitesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"storySendInvites"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"invitedIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storySendInvites"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"invitedIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"invitedIds"}}}]}]}}]} as unknown as DocumentNode;

export function useStorySendInvitesMutation() {
  return Urql.useMutation<StorySendInvitesMutation, StorySendInvitesMutationVariables>(StorySendInvitesDocument);
};
export const TrackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"track"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"track"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrackParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrackParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistParts"}}]}}]}}]} as unknown as DocumentNode;

export function useTrackQuery(options: Omit<Urql.UseQueryArgs<TrackQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TrackQuery>({ query: TrackDocument, ...options });
};
export const CrossTracksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"crossTracks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"crossTracks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"youtube"}},{"kind":"Field","name":{"kind":"Name","value":"spotify"}}]}}]}}]} as unknown as DocumentNode;

export function useCrossTracksQuery(options: Omit<Urql.UseQueryArgs<CrossTracksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CrossTracksQuery>({ query: CrossTracksDocument, ...options });
};
export const SearchTrackDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"searchTrack"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"query"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchTrack"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"query"},"value":{"kind":"Variable","name":{"kind":"Name","value":"query"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TrackParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ArtistParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Artist"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TrackParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Track"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"externalId"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"artists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ArtistParts"}}]}}]}}]} as unknown as DocumentNode;

export function useSearchTrackQuery(options: Omit<Urql.UseQueryArgs<SearchTrackQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SearchTrackQuery>({ query: SearchTrackDocument, ...options });
};
export const MeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPublicParts"}}]}},{"kind":"Field","name":{"kind":"Name","value":"oauthId"}},{"kind":"Field","name":{"kind":"Name","value":"platform"}},{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"expiredAt"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPublicParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]} as unknown as DocumentNode;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const UserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"user"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPublicParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPublicParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]} as unknown as DocumentNode;

export function useUserQuery(options: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};
export const UserStatDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userStat"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userStat"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"followerCount"}},{"kind":"Field","name":{"kind":"Name","value":"followingCount"}}]}}]}}]} as unknown as DocumentNode;

export function useUserStatQuery(options: Omit<Urql.UseQueryArgs<UserStatQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserStatQuery>({ query: UserStatDocument, ...options });
};
export const UserFollowersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userFollowers"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userFollowers"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

export function useUserFollowersQuery(options: Omit<Urql.UseQueryArgs<UserFollowersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserFollowersQuery>({ query: UserFollowersDocument, ...options });
};
export const UserFollowingsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"userFollowings"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userFollowings"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

export function useUserFollowingsQuery(options: Omit<Urql.UseQueryArgs<UserFollowingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserFollowingsQuery>({ query: UserFollowingsDocument, ...options });
};
export const UserFollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"userFollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userFollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

export function useUserFollowMutation() {
  return Urql.useMutation<UserFollowMutation, UserFollowMutationVariables>(UserFollowDocument);
};
export const UserUnfollowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"userUnfollow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userUnfollow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode;

export function useUserUnfollowMutation() {
  return Urql.useMutation<UserUnfollowMutation, UserUnfollowMutationVariables>(UserUnfollowDocument);
};
export const MeUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"meUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserPublicParts"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserPublicParts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"bio"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"}}]}}]} as unknown as DocumentNode;

export function useMeUpdateMutation() {
  return Urql.useMutation<MeUpdateMutation, MeUpdateMutationVariables>(MeUpdateDocument);
};
export const MeDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"meDelete"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meDelete"}}]}}]} as unknown as DocumentNode;

export function useMeDeleteMutation() {
  return Urql.useMutation<MeDeleteMutation, MeDeleteMutationVariables>(MeDeleteDocument);
};
export type WithTypename<T extends { __typename?: any }> = { [K in Exclude<keyof T, '__typename'>]?: T[K] } & { __typename: NonNullable<T['__typename']> };

export type GraphCacheKeysConfig = {
  Artist?: (data: WithTypename<Artist>) => null | string,
  CrossTracks?: (data: WithTypename<CrossTracks>) => null | string,
  Me?: (data: WithTypename<Me>) => null | string,
  Message?: (data: WithTypename<Message>) => null | string,
  NotificationFollow?: (data: WithTypename<NotificationFollow>) => null | string,
  NotificationInvite?: (data: WithTypename<NotificationInvite>) => null | string,
  NotificationNewStory?: (data: WithTypename<NotificationNewStory>) => null | string,
  NowPlaying?: (data: WithTypename<NowPlaying>) => null | string,
  NowPlayingQueueItem?: (data: WithTypename<NowPlayingQueueItem>) => null | string,
  NowPlayingReactionItem?: (data: WithTypename<NowPlayingReactionItem>) => null | string,
  Playlist?: (data: WithTypename<Playlist>) => null | string,
  Queue?: (data: WithTypename<Queue>) => null | string,
  QueueItem?: (data: WithTypename<QueueItem>) => null | string,
  Story?: (data: WithTypename<Story>) => null | string,
  Track?: (data: WithTypename<Track>) => null | string,
  User?: (data: WithTypename<User>) => null | string,
  UserStat?: (data: WithTypename<UserStat>) => null | string
}

export type GraphCacheResolvers = {
  Query?: {
    crossTracks?: GraphCacheResolver<WithTypename<Query>, QueryCrossTracksArgs, WithTypename<CrossTracks> | string>,
    me?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, WithTypename<Me> | string>,
    messages?: GraphCacheResolver<WithTypename<Query>, QueryMessagesArgs, Array<WithTypename<Message> | string>>,
    myPlaylists?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Playlist> | string>>,
    notifications?: GraphCacheResolver<WithTypename<Query>, QueryNotificationsArgs, Array<WithTypename<NotificationFollow> | WithTypename<NotificationInvite> | WithTypename<NotificationNewStory> | string>>,
    nowPlaying?: GraphCacheResolver<WithTypename<Query>, QueryNowPlayingArgs, WithTypename<NowPlaying> | string>,
    nowPlayingReactions?: GraphCacheResolver<WithTypename<Query>, QueryNowPlayingReactionsArgs, Array<WithTypename<NowPlayingReactionItem> | string>>,
    playlist?: GraphCacheResolver<WithTypename<Query>, QueryPlaylistArgs, WithTypename<Playlist> | string>,
    playlistTracks?: GraphCacheResolver<WithTypename<Query>, QueryPlaylistTracksArgs, Array<WithTypename<Track> | string>>,
    playlistsFeatured?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Playlist> | string>>,
    playlistsFriends?: GraphCacheResolver<WithTypename<Query>, Record<string, never>, Array<WithTypename<Playlist> | string>>,
    playlistsSearch?: GraphCacheResolver<WithTypename<Query>, QueryPlaylistsSearchArgs, Array<WithTypename<Playlist> | string>>,
    queue?: GraphCacheResolver<WithTypename<Query>, QueryQueueArgs, WithTypename<Queue> | string>,
    searchTrack?: GraphCacheResolver<WithTypename<Query>, QuerySearchTrackArgs, Array<WithTypename<Track> | string>>,
    stories?: GraphCacheResolver<WithTypename<Query>, QueryStoriesArgs, Array<WithTypename<Story> | string>>,
    storiesOnMap?: GraphCacheResolver<WithTypename<Query>, QueryStoriesOnMapArgs, Array<WithTypename<Story> | string>>,
    story?: GraphCacheResolver<WithTypename<Query>, QueryStoryArgs, WithTypename<Story> | string>,
    storyLive?: GraphCacheResolver<WithTypename<Query>, QueryStoryLiveArgs, WithTypename<Story> | string>,
    storyTracks?: GraphCacheResolver<WithTypename<Query>, QueryStoryTracksArgs, Array<WithTypename<Track> | string>>,
    storyUsers?: GraphCacheResolver<WithTypename<Query>, QueryStoryUsersArgs, Array<Scalars['String'] | string>>,
    track?: GraphCacheResolver<WithTypename<Query>, QueryTrackArgs, WithTypename<Track> | string>,
    user?: GraphCacheResolver<WithTypename<Query>, QueryUserArgs, WithTypename<User> | string>,
    userFollowers?: GraphCacheResolver<WithTypename<Query>, QueryUserFollowersArgs, Array<Scalars['String'] | string>>,
    userFollowings?: GraphCacheResolver<WithTypename<Query>, QueryUserFollowingsArgs, Array<Scalars['String'] | string>>,
    userStat?: GraphCacheResolver<WithTypename<Query>, QueryUserStatArgs, WithTypename<UserStat> | string>
  },
  Artist?: {
    id?: GraphCacheResolver<WithTypename<Artist>, Record<string, never>, Scalars['ID'] | string>,
    platform?: GraphCacheResolver<WithTypename<Artist>, Record<string, never>, PlatformName | string>,
    externalId?: GraphCacheResolver<WithTypename<Artist>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Artist>, Record<string, never>, Scalars['String'] | string>,
    image?: GraphCacheResolver<WithTypename<Artist>, Record<string, never>, Scalars['String'] | string>,
    url?: GraphCacheResolver<WithTypename<Artist>, Record<string, never>, Scalars['String'] | string>
  },
  CrossTracks?: {
    id?: GraphCacheResolver<WithTypename<CrossTracks>, Record<string, never>, Scalars['ID'] | string>,
    youtube?: GraphCacheResolver<WithTypename<CrossTracks>, Record<string, never>, Scalars['ID'] | string>,
    spotify?: GraphCacheResolver<WithTypename<CrossTracks>, Record<string, never>, Scalars['ID'] | string>
  },
  Me?: {
    user?: GraphCacheResolver<WithTypename<Me>, Record<string, never>, WithTypename<User> | string>,
    oauthId?: GraphCacheResolver<WithTypename<Me>, Record<string, never>, Scalars['String'] | string>,
    platform?: GraphCacheResolver<WithTypename<Me>, Record<string, never>, PlatformName | string>,
    accessToken?: GraphCacheResolver<WithTypename<Me>, Record<string, never>, Scalars['String'] | string>,
    expiredAt?: GraphCacheResolver<WithTypename<Me>, Record<string, never>, Scalars['DateTime'] | string>
  },
  Message?: {
    id?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['ID'] | string>,
    creatorId?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['String'] | string>,
    creator?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, WithTypename<User> | string>,
    createdAt?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['DateTime'] | string>,
    text?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, Scalars['String'] | string>,
    type?: GraphCacheResolver<WithTypename<Message>, Record<string, never>, MessageType | string>
  },
  NotificationFollow?: {
    id?: GraphCacheResolver<WithTypename<NotificationFollow>, Record<string, never>, Scalars['ID'] | string>,
    hasRead?: GraphCacheResolver<WithTypename<NotificationFollow>, Record<string, never>, Scalars['Boolean'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<NotificationFollow>, Record<string, never>, Scalars['DateTime'] | string>,
    followerId?: GraphCacheResolver<WithTypename<NotificationFollow>, Record<string, never>, Scalars['String'] | string>
  },
  NotificationInvite?: {
    id?: GraphCacheResolver<WithTypename<NotificationInvite>, Record<string, never>, Scalars['ID'] | string>,
    hasRead?: GraphCacheResolver<WithTypename<NotificationInvite>, Record<string, never>, Scalars['Boolean'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<NotificationInvite>, Record<string, never>, Scalars['DateTime'] | string>,
    inviterId?: GraphCacheResolver<WithTypename<NotificationInvite>, Record<string, never>, Scalars['String'] | string>,
    storyId?: GraphCacheResolver<WithTypename<NotificationInvite>, Record<string, never>, Scalars['String'] | string>
  },
  NotificationNewStory?: {
    id?: GraphCacheResolver<WithTypename<NotificationNewStory>, Record<string, never>, Scalars['ID'] | string>,
    hasRead?: GraphCacheResolver<WithTypename<NotificationNewStory>, Record<string, never>, Scalars['Boolean'] | string>,
    createdAt?: GraphCacheResolver<WithTypename<NotificationNewStory>, Record<string, never>, Scalars['DateTime'] | string>,
    storyId?: GraphCacheResolver<WithTypename<NotificationNewStory>, Record<string, never>, Scalars['String'] | string>,
    creatorId?: GraphCacheResolver<WithTypename<NotificationNewStory>, Record<string, never>, Scalars['String'] | string>
  },
  NowPlaying?: {
    id?: GraphCacheResolver<WithTypename<NowPlaying>, Record<string, never>, Scalars['ID'] | string>,
    currentTrack?: GraphCacheResolver<WithTypename<NowPlaying>, Record<string, never>, WithTypename<NowPlayingQueueItem> | string>
  },
  NowPlayingQueueItem?: {
    uid?: GraphCacheResolver<WithTypename<NowPlayingQueueItem>, Record<string, never>, Scalars['ID'] | string>,
    trackId?: GraphCacheResolver<WithTypename<NowPlayingQueueItem>, Record<string, never>, Scalars['String'] | string>,
    playedAt?: GraphCacheResolver<WithTypename<NowPlayingQueueItem>, Record<string, never>, Scalars['DateTime'] | string>,
    endedAt?: GraphCacheResolver<WithTypename<NowPlayingQueueItem>, Record<string, never>, Scalars['DateTime'] | string>,
    creatorId?: GraphCacheResolver<WithTypename<NowPlayingQueueItem>, Record<string, never>, Scalars['String'] | string>
  },
  NowPlayingReactionItem?: {
    userId?: GraphCacheResolver<WithTypename<NowPlayingReactionItem>, Record<string, never>, Scalars['String'] | string>,
    reaction?: GraphCacheResolver<WithTypename<NowPlayingReactionItem>, Record<string, never>, NowPlayingReactionType | string>
  },
  Playlist?: {
    id?: GraphCacheResolver<WithTypename<Playlist>, Record<string, never>, Scalars['ID'] | string>,
    platform?: GraphCacheResolver<WithTypename<Playlist>, Record<string, never>, PlatformName | string>,
    externalId?: GraphCacheResolver<WithTypename<Playlist>, Record<string, never>, Scalars['ID'] | string>,
    name?: GraphCacheResolver<WithTypename<Playlist>, Record<string, never>, Scalars['String'] | string>,
    image?: GraphCacheResolver<WithTypename<Playlist>, Record<string, never>, Scalars['String'] | string>,
    url?: GraphCacheResolver<WithTypename<Playlist>, Record<string, never>, Scalars['String'] | string>,
    total?: GraphCacheResolver<WithTypename<Playlist>, Record<string, never>, Scalars['Int'] | string>
  },
  Queue?: {
    id?: GraphCacheResolver<WithTypename<Queue>, Record<string, never>, Scalars['ID'] | string>,
    items?: GraphCacheResolver<WithTypename<Queue>, Record<string, never>, Array<WithTypename<QueueItem> | string>>
  },
  QueueItem?: {
    uid?: GraphCacheResolver<WithTypename<QueueItem>, Record<string, never>, Scalars['ID'] | string>,
    trackId?: GraphCacheResolver<WithTypename<QueueItem>, Record<string, never>, Scalars['String'] | string>,
    creatorId?: GraphCacheResolver<WithTypename<QueueItem>, Record<string, never>, Scalars['String'] | string>
  },
  Story?: {
    id?: GraphCacheResolver<WithTypename<Story>, Record<string, never>, Scalars['ID'] | string>,
    text?: GraphCacheResolver<WithTypename<Story>, Record<string, never>, Scalars['String'] | string>,
    isPublic?: GraphCacheResolver<WithTypename<Story>, Record<string, never>, Scalars['Boolean'] | string>,
    image?: GraphCacheResolver<WithTypename<Story>, Record<string, never>, Scalars['String'] | string>,
    creatorId?: GraphCacheResolver<WithTypename<Story>, Record<string, never>, Scalars['ID'] | string>,
    creator?: GraphCacheResolver<WithTypename<Story>, Record<string, never>, WithTypename<User> | string>,
    createdAt?: GraphCacheResolver<WithTypename<Story>, Record<string, never>, Scalars['DateTime'] | string>,
    isLive?: GraphCacheResolver<WithTypename<Story>, Record<string, never>, Scalars['Boolean'] | string>,
    queueable?: GraphCacheResolver<WithTypename<Story>, Record<string, never>, Array<Scalars['String'] | string>>
  },
  Track?: {
    id?: GraphCacheResolver<WithTypename<Track>, Record<string, never>, Scalars['ID'] | string>,
    platform?: GraphCacheResolver<WithTypename<Track>, Record<string, never>, PlatformName | string>,
    externalId?: GraphCacheResolver<WithTypename<Track>, Record<string, never>, Scalars['ID'] | string>,
    artists?: GraphCacheResolver<WithTypename<Track>, Record<string, never>, Array<WithTypename<Artist> | string>>,
    duration?: GraphCacheResolver<WithTypename<Track>, Record<string, never>, Scalars['Int'] | string>,
    title?: GraphCacheResolver<WithTypename<Track>, Record<string, never>, Scalars['String'] | string>,
    image?: GraphCacheResolver<WithTypename<Track>, Record<string, never>, Scalars['String'] | string>,
    url?: GraphCacheResolver<WithTypename<Track>, Record<string, never>, Scalars['String'] | string>
  },
  User?: {
    id?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['ID'] | string>,
    username?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    bio?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>,
    profilePicture?: GraphCacheResolver<WithTypename<User>, Record<string, never>, Scalars['String'] | string>
  },
  UserStat?: {
    id?: GraphCacheResolver<WithTypename<UserStat>, Record<string, never>, Scalars['ID'] | string>,
    followerCount?: GraphCacheResolver<WithTypename<UserStat>, Record<string, never>, Scalars['Int'] | string>,
    followingCount?: GraphCacheResolver<WithTypename<UserStat>, Record<string, never>, Scalars['Int'] | string>
  }
};

export type GraphCacheOptimisticUpdaters = {
  me?: GraphCacheOptimisticMutationResolver<MutationMeArgs, Maybe<WithTypename<User>>>,
  meDelete?: GraphCacheOptimisticMutationResolver<Record<string, never>, Scalars['Boolean']>,
  messageAdd?: GraphCacheOptimisticMutationResolver<MutationMessageAddArgs, Scalars['Boolean']>,
  notificationsMarkRead?: GraphCacheOptimisticMutationResolver<MutationNotificationsMarkReadArgs, Scalars['Int']>,
  nowPlayingReact?: GraphCacheOptimisticMutationResolver<MutationNowPlayingReactArgs, Maybe<Scalars['Boolean']>>,
  nowPlayingSkip?: GraphCacheOptimisticMutationResolver<MutationNowPlayingSkipArgs, Maybe<Scalars['Boolean']>>,
  playlistAddTracks?: GraphCacheOptimisticMutationResolver<MutationPlaylistAddTracksArgs, Scalars['Boolean']>,
  playlistCreate?: GraphCacheOptimisticMutationResolver<MutationPlaylistCreateArgs, WithTypename<Playlist>>,
  queueAdd?: GraphCacheOptimisticMutationResolver<MutationQueueAddArgs, Scalars['Boolean']>,
  queueRemove?: GraphCacheOptimisticMutationResolver<MutationQueueRemoveArgs, Scalars['Boolean']>,
  queueReorder?: GraphCacheOptimisticMutationResolver<MutationQueueReorderArgs, Scalars['Boolean']>,
  queueToTop?: GraphCacheOptimisticMutationResolver<MutationQueueToTopArgs, Scalars['Boolean']>,
  storyChangeQueueable?: GraphCacheOptimisticMutationResolver<MutationStoryChangeQueueableArgs, Scalars['Boolean']>,
  storyCreate?: GraphCacheOptimisticMutationResolver<MutationStoryCreateArgs, WithTypename<Story>>,
  storyDelete?: GraphCacheOptimisticMutationResolver<MutationStoryDeleteArgs, Scalars['ID']>,
  storyPing?: GraphCacheOptimisticMutationResolver<MutationStoryPingArgs, Scalars['Boolean']>,
  storySendInvites?: GraphCacheOptimisticMutationResolver<MutationStorySendInvitesArgs, Scalars['Boolean']>,
  storyUnlive?: GraphCacheOptimisticMutationResolver<MutationStoryUnliveArgs, WithTypename<Story>>,
  userFollow?: GraphCacheOptimisticMutationResolver<MutationUserFollowArgs, Scalars['Boolean']>,
  userUnfollow?: GraphCacheOptimisticMutationResolver<MutationUserUnfollowArgs, Scalars['Boolean']>
};

export type GraphCacheUpdaters = {
  Mutation?: {
    me?: GraphCacheUpdateResolver<{ me: Maybe<WithTypename<User>> }, MutationMeArgs>,
    meDelete?: GraphCacheUpdateResolver<{ meDelete: Scalars['Boolean'] }, Record<string, never>>,
    messageAdd?: GraphCacheUpdateResolver<{ messageAdd: Scalars['Boolean'] }, MutationMessageAddArgs>,
    notificationsMarkRead?: GraphCacheUpdateResolver<{ notificationsMarkRead: Scalars['Int'] }, MutationNotificationsMarkReadArgs>,
    nowPlayingReact?: GraphCacheUpdateResolver<{ nowPlayingReact: Maybe<Scalars['Boolean']> }, MutationNowPlayingReactArgs>,
    nowPlayingSkip?: GraphCacheUpdateResolver<{ nowPlayingSkip: Maybe<Scalars['Boolean']> }, MutationNowPlayingSkipArgs>,
    playlistAddTracks?: GraphCacheUpdateResolver<{ playlistAddTracks: Scalars['Boolean'] }, MutationPlaylistAddTracksArgs>,
    playlistCreate?: GraphCacheUpdateResolver<{ playlistCreate: WithTypename<Playlist> }, MutationPlaylistCreateArgs>,
    queueAdd?: GraphCacheUpdateResolver<{ queueAdd: Scalars['Boolean'] }, MutationQueueAddArgs>,
    queueRemove?: GraphCacheUpdateResolver<{ queueRemove: Scalars['Boolean'] }, MutationQueueRemoveArgs>,
    queueReorder?: GraphCacheUpdateResolver<{ queueReorder: Scalars['Boolean'] }, MutationQueueReorderArgs>,
    queueToTop?: GraphCacheUpdateResolver<{ queueToTop: Scalars['Boolean'] }, MutationQueueToTopArgs>,
    storyChangeQueueable?: GraphCacheUpdateResolver<{ storyChangeQueueable: Scalars['Boolean'] }, MutationStoryChangeQueueableArgs>,
    storyCreate?: GraphCacheUpdateResolver<{ storyCreate: WithTypename<Story> }, MutationStoryCreateArgs>,
    storyDelete?: GraphCacheUpdateResolver<{ storyDelete: Scalars['ID'] }, MutationStoryDeleteArgs>,
    storyPing?: GraphCacheUpdateResolver<{ storyPing: Scalars['Boolean'] }, MutationStoryPingArgs>,
    storySendInvites?: GraphCacheUpdateResolver<{ storySendInvites: Scalars['Boolean'] }, MutationStorySendInvitesArgs>,
    storyUnlive?: GraphCacheUpdateResolver<{ storyUnlive: WithTypename<Story> }, MutationStoryUnliveArgs>,
    userFollow?: GraphCacheUpdateResolver<{ userFollow: Scalars['Boolean'] }, MutationUserFollowArgs>,
    userUnfollow?: GraphCacheUpdateResolver<{ userUnfollow: Scalars['Boolean'] }, MutationUserUnfollowArgs>
  },
  Subscription?: {
    messageAdded?: GraphCacheUpdateResolver<{ messageAdded: WithTypename<Message> }, SubscriptionMessageAddedArgs>,
    notificationAdded?: GraphCacheUpdateResolver<{ notificationAdded: WithTypename<NotificationFollow> | WithTypename<NotificationInvite> | WithTypename<NotificationNewStory> }, Record<string, never>>,
    nowPlayingReactionsUpdated?: GraphCacheUpdateResolver<{ nowPlayingReactionsUpdated: Maybe<Array<WithTypename<NowPlayingReactionItem>>> }, SubscriptionNowPlayingReactionsUpdatedArgs>,
    nowPlayingUpdated?: GraphCacheUpdateResolver<{ nowPlayingUpdated: Maybe<WithTypename<NowPlaying>> }, SubscriptionNowPlayingUpdatedArgs>,
    queueUpdated?: GraphCacheUpdateResolver<{ queueUpdated: WithTypename<Queue> }, SubscriptionQueueUpdatedArgs>,
    storyUpdated?: GraphCacheUpdateResolver<{ storyUpdated: WithTypename<Story> }, SubscriptionStoryUpdatedArgs>,
    storyUsersUpdated?: GraphCacheUpdateResolver<{ storyUsersUpdated: Array<Scalars['String']> }, SubscriptionStoryUsersUpdatedArgs>
  },
};

export type GraphCacheConfig = {
  updates?: GraphCacheUpdaters,
  keys?: GraphCacheKeysConfig,
  optimistic?: GraphCacheOptimisticUpdaters,
  resolvers?: GraphCacheResolvers
};