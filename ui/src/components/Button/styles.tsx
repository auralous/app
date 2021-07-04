import { makeStyles, Size } from "@auralous/ui/styles";
import { ReactNode } from "react";
import { BaseButtonProps } from "./types";

export const useStyles = makeStyles(
  (
    theme,
    { children, icon, disabled }: BaseButtonProps & { children?: ReactNode }
  ) => ({
    base: {
      paddingVertical: Size[2],
      paddingHorizontal: !!icon && !children ? Size[2] : Size[4],
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: Size[16],
      overflow: "hidden",
      opacity: disabled ? 0.5 : 1,
    },
    text: {
      fontWeight: "600",
      fontSize: 14,
    },
  })
);
