import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";
import { human, systemWeights, materialColors } from "react-native-typography";

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

const Color5 = () => {
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
    if (counter > 0) {
      if (color === currentColor) {
        alert("", "🙂");

        let num = Math.floor(Math.random() * 3);
        let colorAux = tracks[num].title;
        let color1 = tracks[num].name;
        let urlAux = tracks[num].url;
        setUrl(urlAux);
        setCurrentColor(color1);
        setColorEsp(colorAux);
      } else {
        alert("", "😟");
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
export default Color5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-around",
    backgroundColor: "#89E6CE",
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
    borderWidth: 3,
    borderColor: "black",
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
    borderWidth: 3,
    borderColor: "black",
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
    borderWidth: 3,
    borderColor: "black",
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
    ...human.title1,
    ...systemWeights.semibold,
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
});
