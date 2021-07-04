import { useColors } from "@auralous/ui/styles";
import { FC } from "react";
import { ActivityIndicator } from "react-native";

const LoadingBlock: FC = () => {
  const colors = useColors();
  return <ActivityIndicator size="large" color={colors.textSecondary} />;
};

export default LoadingBlock;
