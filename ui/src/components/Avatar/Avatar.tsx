import { imageSources } from "@auralous/ui/assets";
import { makeStyles, Size } from "@auralous/ui/styles";
import { FC } from "react";
import { Image, StyleSheet, View } from "react-native";

interface AvatarProps {
  href?: string | null;
  username: string;
  size: keyof typeof Size;
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

const useStyles = makeStyles((theme, size: AvatarProps["size"]) => ({
  root: {
    borderRadius: 128,
    overflow: "hidden",
    backgroundColor: theme.colors.backgroundSecondary,
    width: Size[size],
    height: Size[size],
  },
}));

const Avatar: FC<AvatarProps> = ({ href, username, size }) => {
  const dstyles = useStyles(size);
  return (
    <View style={dstyles.root}>
      <Image
        style={styles.image}
        source={href ? { uri: href } : imageSources.defaultUser}
        defaultSource={imageSources.defaultUser}
        accessibilityLabel={username}
      />
    </View>
  );
};

export default Avatar;
