import { PlatformName } from "@auralous/api";
import { FC } from "react";
import { SvgProps } from "react-native-svg";
import { IconSpotify, IconYoutube } from ".";

export const SvgByPlatformName: Record<PlatformName, FC<SvgProps>> = {
  [PlatformName.Youtube]: IconYoutube,
  [PlatformName.Spotify]: IconSpotify,
};
