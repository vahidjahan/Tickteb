/** @format */

import { AppRegistry } from "react-native";
import Route from "./src/route/Route";
import { name as appName } from "./app.json";
import { I18nManager } from "react-native";

I18nManager.forceRTL(false);

AppRegistry.registerComponent(appName, () => Route);
