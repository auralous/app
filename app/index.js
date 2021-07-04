import { setImageSources } from "@auralous/ui";
import { AppRegistry } from "react-native";
import "react-native-gesture-handler";
import { name as appName } from "./app.json";
import App from "./src/App";
import defaultPlaylist from "./src/assets/images/default_playlist.jpg";
import defaultTrack from "./src/assets/images/default_track.jpg";
import defaultUser from "./src/assets/images/default_user.jpg";
import "./src/i18n";

setImageSources({
  defaultPlaylist,
  defaultTrack,
  defaultUser,
});

AppRegistry.registerComponent(appName, () => App);
