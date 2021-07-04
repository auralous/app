import {
  createContext,
  useContextSelector,
} from "@fluentui/react-context-selector";

export type SongSelectorState =
  | {
      selectedTracks: string[];
    }
  | {
      selectedTracks: string[];
      addTracks(trackIds: string[]): void;
      removeTracks(trackIds: string[]): void;
    };

export const SongSelectorContext = createContext({} as SongSelectorState);

const selectedTracksSelector = (v: SongSelectorState) => v.selectedTracks;
export const useSelectedTracks = () =>
  useContextSelector(SongSelectorContext, selectedTracksSelector);

const updateTracksSelector = (v: SongSelectorState) =>
  "addTracks" in v
    ? {
        addTracks: v.addTracks,
        removeTracks: v.removeTracks,
      }
    : undefined;
export const useUpdateTracks = () =>
  useContextSelector(SongSelectorContext, updateTracksSelector);
