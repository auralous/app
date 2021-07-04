import { useAuthActions } from "@/gql/context";
import { useMe } from "@/gql/hooks";
import { ParamList, RouteName } from "@/screens/types";
import {
  HeaderBackable,
  IconGoogleColor,
  IconSpotify,
  Logo,
  Size,
  Spacer,
  Text,
  TextLink,
  useColors,
} from "@auralous/ui";
import { StackScreenProps } from "@react-navigation/stack";
import { FC, useEffect } from "react";
import { Trans, useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Config from "react-native-config";
import { SafeAreaView } from "react-native-safe-area-context";
import ContinueButton from "./ContinueButton";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: Size[4],
    paddingVertical: Size[12],
    justifyContent: "flex-end",
  },
  buttonsContainer: {
    paddingVertical: Size[2],
    paddingHorizontal: Size[4],
    marginBottom: Size[4],
  },
  smallText: {
    textAlign: "center",
    marginTop: Size[1],
  },
  smallTextContainer: {
    marginTop: Size[6],
  },
  smallTextLinkFix: {
    transform: [{ translateY: 4 }],
    textDecorationLine: "underline",
  },
  top: {
    paddingBottom: Size[12],
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: Size[8],
  },
});

const SignInScreen: FC<StackScreenProps<ParamList, RouteName.SignIn>> = ({
  route,
  navigation,
}) => {
  const { t } = useTranslation();
  const { signIn } = useAuthActions();

  const me = useMe();

  useEffect(() => {
    const accessToken = route.params?.access_token;
    if (accessToken) signIn(accessToken);
  }, [route, signIn]);

  useEffect(() => {
    if (me) navigation.goBack();
  }, [me, navigation]);

  const colors = useColors();

  return (
    <>
      <HeaderBackable onBack={navigation.goBack} title={t("sign_in.title")} />
      <SafeAreaView style={styles.root}>
        <View style={styles.top}>
          <Logo
            style={styles.logo}
            width={256}
            height={64}
            fill={colors.text}
          />
          <Text size="lg" bold color="textSecondary">
            Music Together
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <ContinueButton
            platform="google"
            name="Google"
            icon={<IconGoogleColor width={21} height={21} />}
            listenOn="YouTube"
          />
          <Spacer y={4} />
          <ContinueButton
            platform="spotify"
            name="Spotify"
            icon={<IconSpotify width={21} height={21} fill="#ffffff" />}
            listenOn="YouTube"
          />
        </View>
        <View style={styles.smallTextContainer}>
          <Text size="sm" style={styles.smallText} color="textSecondary">
            <Trans
              t={t}
              i18nKey="legal.accept_continue_text"
              components={[
                <TextLink
                  size="sm"
                  color="textSecondary"
                  activeColor="text"
                  key="privacy"
                  href={`${Config.WEB_URI}/privacy`}
                  style={styles.smallTextLinkFix}
                />,
                <TextLink
                  size="sm"
                  color="textSecondary"
                  activeColor="text"
                  key="youtube"
                  href="https://www.youtube.com/t/terms"
                  style={styles.smallTextLinkFix}
                />,
                <TextLink
                  size="sm"
                  color="textSecondary"
                  activeColor="text"
                  key="spotify"
                  href="https://www.spotify.com/us/legal/privacy-policy/"
                  style={styles.smallTextLinkFix}
                />,
              ]}
            />
          </Text>
        </View>
      </SafeAreaView>
    </>
  );
};

export default SignInScreen;
