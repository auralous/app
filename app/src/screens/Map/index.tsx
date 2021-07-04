import { ParamList, RouteName } from "@/screens/types";
import { StackScreenProps } from "@react-navigation/stack";
import { FC } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MapScreen: FC<StackScreenProps<ParamList, RouteName.Map>> = () => {
  return (
    <SafeAreaView>
      <View></View>
    </SafeAreaView>
  );
};

export default MapScreen;
