import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";

import { human, systemWeights, materialColors } from "react-native-typography";

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
        text1: "🙂🙂🙂🙂🙂🙂",
        position: "bottom",
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
        text1: "😥😥😥😥😥😥",
        position: "bottom",
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
      <Text style={styles.text}>Escoge el color:</Text>
      <Text style={styles.text1}>{colorEsp}</Text>

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
      <View style={{ margin: 30 }}>
        <TouchableOpacity
          disabled={!disabledBtn}
          onPress={playSound}
          style={
            disabledBtn
              ? { ...styles.button }
              : { ...styles.button, ...styles.buttonDisabled }
          }
        >
          <View style={{ justifyContent: "flex-end", paddingTop: 5 }}>
            <Icon name="arrow-right" size={70} />
          </View>
        </TouchableOpacity>
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
    backgroundColor: "#89E6CE",
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
    borderWidth: 3,
    borderColor: "black",
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
    borderWidth: 3,
    borderColor: "black",
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
  button: {
    shadowColor: "#000",
    shadowRadius: 10.32,
    elevation: 16,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    backgroundColor: "#1094EF",
    width: 120,
    height: 40,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  text: {
    ...human.largeTitle,
    ...systemWeights.semibold,
    color: materialColors.blackPrimary,
    textAlign: "center",
    padding: 15,
  },
  text1: {
    ...human.title1,
    ...systemWeights.semibold,
    color: materialColors.blackPrimary,
    textAlign: "center",
    padding: 15,
  },
});
