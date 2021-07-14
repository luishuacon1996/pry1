import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Button } from "react-native-elements";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("screen");

const tracks = [
  {
    id: 1,
    url: require("../assets/audio/Escoge-el-color-amarillo1623977940.mp3"),
    title: "yellow",
    name: "Amarillo",
  },
  {
    id: 2,
    url: require("../assets/audio/Escoge-el-color-azul1623977968.mp3"),
    title: "blue",
    name: "Azul",
  },

  {
    id: 3,
    url: require("../assets/audio/Escoge-el-color-rojo1623977901.mp3"),
    title: "red",
    name: "Rojo",
  },
];

const Color4 = () => {
  const [currentColor, setCurrentColor] = useState("blue");
  const [colorX, setColorX] = useState("green");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [colorY, setColorY] = useState("blue");
  const [sound, setSound] = useState("");
  const [colorEsp, setColorEsp] = useState("Azul");
  const [url, setUrl] = useState(tracks[1].url);

  function userClick(color) {
    let colorsS = ["green", "purple", "orange"];
    if (color === currentColor) {
      Toast.show({
        type: "success",
        text1: "escogiste el color correcto",
      });
      let num = Math.floor(Math.random() * 2);
      console.log(`current color antes ${currentColor}`);
      console.log(`current color después ${currentColor}`);
      setDisabledBtn(true);
      if (num === 1) {
        let num = Math.floor(Math.random() * 3);
        let colorAux = tracks[num].title;
        let color1 = tracks[num].name;
        let urlAux = tracks[num].url;
        setUrl(urlAux);
        console.log(colorAux);
        setColorY(colorAux);
        setCurrentColor(colorAux);
        setColorEsp(color1);
        setColorX(colorsS[Math.floor(Math.random() * 3)]);
      } else {
        let num = Math.floor(Math.random() * 3);
        let colorAux = tracks[num].title;
        let color1 = tracks[num].name;
        let urlAux = tracks[num].url;
        setUrl(urlAux);
        console.log(colorAux);
        setColorX(colorAux);
        setCurrentColor(colorAux);
        setColorEsp(color1);
        setColorY(colorsS[Math.floor(Math.random() * 3)]);
      }
    } else {
      Toast.show({
        type: "error",
        text1: "escogiste el color incorrecto, intenta otra vez",
      });
    }
  }

  function instructions() {
    setDisabledBtn(false);
    console.log(currentColor);
  }
  async function playSound() {
    instructions();
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(url);
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>Escoge el color:</Text>
      <Text style={styles.instructions}>{colorEsp}</Text>

      <View style={styles.colors}>
        <TouchableOpacity
          disabled={disabledBtn}
          onPress={() => userClick(colorX)}
          style={[styles.x, { backgroundColor: colorX }]}
        />
        <TouchableOpacity
          disabled={disabledBtn}
          onPress={() => userClick(colorY)}
          style={[styles.y, { backgroundColor: colorY }]}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button
          title="instrucciones"
          disabled={!disabledBtn}
          onPress={playSound}
        />
      </View>
    </View>
  );
};
export default Color4;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-between",
  },
  x: {
    //flex: 1,
    height: height * 0.34,
    width: width * 0.3,
    margin: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  y: {
    //flex: 1,
    height: height * 0.34,
    width: width * 0.3,
    margin: 10,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  colors: {
    //flex: 1,
    height: 300,
    flexDirection: "row",
  },

  instructions: {
    //flex: 1,
    fontSize: 20,
    textAlign: "center",
    padding: 15,
  },
});
