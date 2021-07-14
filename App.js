import React from "react";

import AppNavigator from "./src/navigation/AppNavigation";
import { MyProvider } from "./src/context/index";
import { View } from "react-native";

class App extends React.Component {
  render() {
    return (
      <MyProvider>
        <AppNavigator />
      </MyProvider>
    );
  }
}

export default App;
