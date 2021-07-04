import { PlaybackContextType } from "./Context";

export interface PlaybackContextMeta {
  id: string;
  contextDescription: string;
  contextOwner?: string;
  imageUrl?: string | null;
  contextCollaborators?: string[];
  isLive: boolean;
  type: PlaybackContextType;
}
