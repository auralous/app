import { useTrackQuery } from "@auralous/api";
import { useColors } from "@auralous/ui";
import { useEffect, useState } from "react";
import ImageColors from "react-native-image-colors";

export const useTrackColor = (trackId?: string | null) => {
  const [{ data, stale }] = useTrackQuery({
    variables: { id: trackId || "" },
    pause: !trackId,
  });
  const image = !stale ? data?.track?.image : undefined;

  const colors = useColors();

  const [color, setColor] = useState<string>(colors.background);

  useEffect(() => {
    if (!image) return setColor(colors.background);
    let shouldCommit = true;
    ImageColors.getColors(image)
      .then((colorResult) => {
        if (!shouldCommit) return;
        if (colorResult.platform === "android") {
          setColor(colorResult.vibrant || colors.background);
        } else {
          setColor(colorResult.primary);
        }
      })
      .catch(() => {
        setColor(colors.background);
      });
    return () => {
      shouldCommit = false;
    };
  }, [image, colors]);

  return color;
};
