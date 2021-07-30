import React, { Component, useContext } from "react";
import { View, Text } from "react-native";
import Color4 from "./color4";
import Color5 from "./color5";
import Color6 from "./color6";
import Figuras4 from "./figurasGeometricas4";
import Figuras5 from "./figurasGeometricas5";

import { MyContext } from "../context";

const Juego = () => {
  const context = useContext(MyContext);
  if (context.state.Juego == 43) {
    return <Color4 />;
  } else if (context.state.Juego == 53) {
    return <Color5 />;
  } else if (context.state.Juego == 63) {
    return <Color6 />;
  } else if (context.state.Juego == 44) {
    return <Figuras4 />;
  } else if (context.state.Juego == 54) {
    return <Figuras5 />;
  } else {
    return (
      <View>
        <Text>aqui vienen los otros juegos</Text>
      </View>
    );
  }
};

export default Juego;
