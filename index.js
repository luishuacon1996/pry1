/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import React from "react";

import { name as appName } from "./app.json";
import Toast from "react-native-toast-message";

import { MyProvider } from "./src/context";
import SuperAlert from "react-native-super-alert";

const provider = () => (
  <MyProvider>
    <App />
    <Toast ref={(ref) => Toast.setRef(ref)} />
    <SuperAlert customStyle={customStyle} />
  </MyProvider>
);

AppRegistry.registerComponent(appName, () => provider);

const customStyle = {
  container: {
    backgroundColor: "#1dd195",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  buttonCancel: {
    backgroundColor: "orange",
  },
  buttonConfirm: {
    backgroundColor: "#1b21cf",
  },
  title: {
    color: "yellow",
    fontSize: 10,
  },
  message: {
    fontSize: 100,

    color: "pink",
  },
};
