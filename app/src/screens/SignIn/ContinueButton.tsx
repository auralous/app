import { makeStyles, Size, Text, ThemeColorKey } from "@auralous/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Linking, Pressable, View } from "react-native";
import Config from "react-native-config";

const useStyles = makeStyles(
  (theme, platform: ContinueButtonProps["platform"]) => ({
    text: {
      marginLeft: Size[1],
      color: theme.colors[`${platform}Label` as ThemeColorKey],
    },
    pressable: {
      padding: Size[3],
      borderRadius: 9999,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: Size[1],
      backgroundColor: theme.colors[platform],
    },
  })
);

interface ContinueButtonProps {
  name: string;
  platform: "google" | "spotify";
  icon: JSX.Element;
  listenOn: string;
}

const ContinueButton: FC<ContinueButtonProps> = ({
  name,
  platform,
  icon,
  listenOn,
}) => {
  const dstyles = useStyles(platform);
  const { t } = useTranslation();
  return (
    <View>
      <Text color="textSecondary" align="center">
        {t("sign_in.listen_on", { name: listenOn })}
      </Text>
      <Pressable
        style={({ pressed }) => [
          dstyles.pressable,
          { opacity: pressed ? 0.75 : 1 },
        ]}
        onPress={() =>
          Linking.openURL(`${Config.API_URI}/auth/${platform}?is_app_login=1`)
        }
      >
        {icon}
        <Text style={dstyles.text} bold>
          {t("sign_in.continue_with", { name })}
        </Text>
      </Pressable>
    </View>
  );
};

export default ContinueButton;
