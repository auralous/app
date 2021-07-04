import { TabBar } from "@/components/TabBar";
import { ApiProvider } from "@/gql/context";
import HomeScreen from "@/screens/Home";
import MapScreen from "@/screens/Map";
import {
  CreateFinalScreen,
  QuickShareScreen,
  SelectSongsScreen,
} from "@/screens/New";
import PlaylistScreen from "@/screens/Playlist";
import SignInScreen from "@/screens/SignIn";
import { ParamList, RouteName } from "@/screens/types";
import {
  UserFollowersScreen,
  UserFollowingScreen,
  UserScreen,
} from "@/screens/User";
import { makeStyles, useTheme } from "@auralous/ui";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LinkingOptions, NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { FC, useMemo } from "react";
import { StatusBar } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PlayerComponent, PlayerProvider } from "./player";
import StoryScreen from "./screens/Story";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

const linking: LinkingOptions<ParamList> = {
  prefixes: ["auralous://"],
  config: {
    screens: {
      [RouteName.SignIn]: "sign-in",
      [RouteName.Main]: {
        // @ts-ignore
        screens: {
          [RouteName.User]: "user/:username",
        },
      },
    },
  },
};

// Routes that should be shown inside tab navigator
// allow bottom bars to be visible
type RouteItem = {
  name: string;
  component: React.ComponentType<any>;
  options?: NativeStackNavigationOptions;
};
const routes: RouteItem[] = [
  {
    name: RouteName.Home,
    component: gestureHandlerRootHOC(HomeScreen),
  },
  {
    name: RouteName.User,
    component: gestureHandlerRootHOC(UserScreen),
  },
  {
    name: RouteName.UserFollowers,
    component: gestureHandlerRootHOC(UserFollowersScreen),
  },
  {
    name: RouteName.UserFollowing,
    component: gestureHandlerRootHOC(UserFollowingScreen),
  },
  {
    name: RouteName.Playlist,
    component: gestureHandlerRootHOC(PlaylistScreen),
  },
  {
    name: RouteName.Story,
    component: gestureHandlerRootHOC(StoryScreen),
  },
];

const stackRoutes = routes.map((route) => (
  <Stack.Screen
    key={route.name}
    name={route.name}
    component={route.component}
    options={route.options}
  />
));

// Routes that should be shown outside of tab navigator
// preventing bottom bars to be visible
const rootRoutes: RouteItem[] = [
  {
    name: RouteName.SignIn,
    component: gestureHandlerRootHOC(SignInScreen),
    options: {
      presentation: "modal" as const,
    },
  },
  {
    name: RouteName.NewSelectSongs,
    component: gestureHandlerRootHOC(SelectSongsScreen),
  },
  {
    name: RouteName.NewQuickShare,
    component: gestureHandlerRootHOC(QuickShareScreen),
  },
  {
    name: RouteName.NewFinal,
    component: gestureHandlerRootHOC(CreateFinalScreen),
    options: {
      animation: "fade" as const,
    },
  },
];

const rootStackRoutes = rootRoutes.map((route) => (
  <Stack.Screen
    key={route.name}
    name={route.name}
    component={route.component}
    options={route.options}
  />
));

const MainScreen: FC = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      {stackRoutes}
    </Stack.Navigator>
  );
};

const RootScreen: FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name={RouteName.Main} component={MainScreen} />
      <Tab.Screen name="map" component={MapScreen} />
    </Tab.Navigator>
  );
};

const screenOptions = {
  headerShown: false,
};

const useStyles = makeStyles((theme) => ({
  sap: {
    backgroundColor: theme.colors.background,
  },
}));

const App = () => {
  const theme = useTheme();

  const styles = useStyles();

  const navigationTheme = useMemo(
    () => ({
      dark: true,
      colors: {
        background: theme.colors.background,
        card: "transparent",
        border: "transparent",
        primary: theme.colors.primary,
        text: theme.colors.text,
        notification: theme.colors.backgroundSecondary,
      },
    }),
    [theme]
  );

  return (
    <SafeAreaProvider style={styles.sap}>
      <NavigationContainer theme={navigationTheme} linking={linking}>
        <ApiProvider>
          <PlayerProvider>
            <BottomSheetModalProvider>
              <StatusBar backgroundColor={theme.colors.background} />
              <PlayerComponent />
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="root" component={RootScreen} />
                {rootStackRoutes}
              </Stack.Navigator>
            </BottomSheetModalProvider>
          </PlayerProvider>
        </ApiProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
