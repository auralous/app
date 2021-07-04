import { ImageURISource } from "react-native";

interface ImageSources {
  defaultPlaylist: ImageURISource;
  defaultTrack: ImageURISource;
  defaultUser: ImageURISource;
}

export const imageSources = {} as ImageSources;

export const setImageSources = (sources: ImageSources) => {
  Object.assign(imageSources, sources);
};
