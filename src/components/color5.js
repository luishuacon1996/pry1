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
    url: require("../assets/audio/naranja.mp3"),
    title: "Naranja",
    name: "orange",
  },
  {
    id: 2,
    url: require("../assets/audio/morado.mp3"),
    title: "Morado",
    name: "purple",
  },

  {
    id: 3,
    url: require("../assets/audio/verde.mp3"),
    title: "Verde",
    name: "green",
  },
];

const Color6 = () => {
  const [colorX, setColorX] = useState();
  const [colorY, setColorY] = useState();
  const [colorR, setColorR] = useState("#ffffff");
  const [currentColor, setCurrentColor] = useState("purple");

  const [disabledBtn, setDisabledBtn] = useState(true);
  const [sound, setSound] = useState("");
  const [colorEsp, setColorEsp] = useState("Morado");
  const [url, setUrl] = useState(tracks[1].url);
  const [counter, setCounter] = useState(0);

  function userClick(color) {
    console.log(`color actual ${currentColor}`);
    console.log(`color resultante ${colorR}`);
    if (counter > 0) {
      if (color === currentColor) {
        Toast.show({
          type: "success",
          text1: "escogiste los colores correctos",
        });

        let num = Math.floor(Math.random() * 3);
        let colorAux = tracks[num].title;
        let color1 = tracks[num].name;
        let urlAux = tracks[num].url;
        setUrl(urlAux);
        setCurrentColor(color1);
        setColorEsp(colorAux);
      } else {
        Toast.show({
          type: "error",
          text1: "escogiste el color incorrecto, intenta otra vez",
        });
      }
    }
  }

  function setColors(color) {
    setCounter((prevCount) => prevCount + 1);
    if (counter === 0) {
      let colorAux = color;
      setColorX(colorAux);
    } else {
      let colorAux = color;

      setDisabledBtn(true);
      setColorY(colorAux);

      let color1 = resultante(colorAux);
      console.log(`color1: ${color1}`);
      userClick(color1);
    }
  }

  function instructions() {
    setDisabledBtn(false);
    console.log(currentColor);
    setCounter(0);
    setColorR("#fff");
  }

  const resultante = (color) => {
    let color1;
    if (colorX === "blue") {
      if (color === "yellow") {
        setColorR("green");
        color1 = "green";
        return color1;
      } else if (color === "red") {
        setColorR("purple");
        let color1 = "purple";
        return color1;
      }
    } else if (colorX === "red") {
      if (color === "yellow") {
        setColorR("orange");
        color1 = "orange";
        return color1;
      } else if (color === "blue") {
        setColorR("purple");
        color1 = "purple";
        return color1;
      }
    } else if (colorX === "yellow") {
      if (color === "blue") {
        setColorR("green");
        color1 = "green";
        return color1;
      } else if (color === "red") {
        setColorR("orange");
        color1 = "orange";
        return color1;
      }
    }
    console.log(`color 1 ${color1}`);
  };

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
      <Text style={styles.instructions}>
        Selecciona los colores para formar el color:
      </Text>
      <Text style={styles.instructions}>{colorEsp}</Text>

      <View style={styles.colors}>
        <TouchableOpacity
          disabled={disabledBtn}
          onPress={() => {
            setColors("blue");
            //userClick();
          }}
          style={[styles.x, { backgroundColor: "blue" }]}
        />
        <TouchableOpacity
          disabled={disabledBtn}
          onPress={() => {
            setColors("yellow");
            //userClick();
          }}
          style={[styles.y, { backgroundColor: "yellow" }]}
        />
        <TouchableOpacity
          disabled={disabledBtn}
          onPress={() => {
            setColors("red");
            //userClick();
          }}
          style={[styles.z, { backgroundColor: "red" }]}
        />
      </View>
      <View style={styles.colors}>
        <TouchableOpacity
          style={[styles.r, { backgroundColor: colorR }]}
          disabled={disabledBtn}
        />
      </View>
      <View style={{ margin: 25 }}>
        <Button
          title="instrucciones"
          disabled={!disabledBtn}
          onPress={
            playSound
            //instructions
          }
        />
      </View>
    </View>
  );
};
export default Color6;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-around",
  },
  x: {
    height: "100%",
    width: "30%",
    margin: 5,
    borderRadius: 6,
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
    height: "100%",
    width: "30%",
    margin: 5,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  z: {
    height: "100%",
    width: "30%",
    margin: 5,
    paddingBottom: 15,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },

  r: {
    height: "100%",
    width: "30%",
    margin: 15,
    paddingBottom: 20,
    borderRadius: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  color: {
    //flex: 1,
    margin: 30,
    fontSize: 30,
    fontWeight: "900",
  },
  colors: {
    //flex: 1,
    height: 200,
    flexDirection: "row",
  },
  bar: {
    height: 20,
    backgroundColor: "red",
  },
  instructions: {
    fontSize: 20,
    textAlign: "center",
    padding: 15,
  },
});
