import { PlatformName, useMeQuery } from "@auralous/api";
import { useMemo } from "react";

const usePlaybackAuthentication = () => {
  /**
   * Player Authentication
   */
  const [{ data }] = useMeQuery({
    requestPolicy: "cache-and-network",
  });

  /**
   * Playing Platform
   * Preferred platform to use by user. If the user
   * is not sign in, defaulting to YouTube. However,
   * we always wait for the result of mAuth
   * so in order not to load unneccessary sdks
   */
  const playingPlatform = useMemo<PlatformName | null>(() => {
    // if mAuth === undefined, it has not fetched
    if (data?.me === undefined) return null;
    return data.me?.platform || PlatformName.Youtube;
  }, [data]);

  return {
    playingPlatform,
    accessToken: data?.me?.accessToken || null,
  } as const;
};

export default usePlaybackAuthentication;
