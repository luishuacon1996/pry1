import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from "react-native";
import { Button, Icon } from "react-native-elements";
import { Audio } from "expo-av";
import Toast from "react-native-toast-message";
import { human, systemWeights, materialColors } from "react-native-typography";

const tracks = [
  {
    id: 1,
    url: require("../assets/audio/cuadrado.mp3"),
    title: "Cuadrado",
  },
  {
    id: 2,
    url: require("../assets/audio/circulo.mp3"),
    title: "Círculo",
  },
  {
    id: 3,
    url: require("../assets/audio/triangulo.mp3"),
    title: "Triángulo",
  },
  {
    id: 4,
    url: require("../assets/audio/rectangulo.mp3"),
    title: "Rectángulo",
  },
  {
    id: 5,
    url: require("../assets/audio/rombo.mp3"),
    title: "Rombo",
  },
];

const Figuras5 = () => {
  const [currentFigure, setCurrentFigure] = useState("Cuadrado");
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [url, setUrl] = useState(tracks[0].url);
  const [sound, setSound] = useState("");

  function userClick(figura) {
    if (figura === currentFigure) {
      Toast.show({
        type: "success",
        text1: "🙂🙂🙂🙂🙂🙂",
        delay: 100,
        position: "bottom",
      });
      let num = Math.floor(Math.random() * 5);
      console.log(num);

      let urlAux = tracks[num].url;
      let figureAux = tracks[num].title;
      setUrl(urlAux);
      setCurrentFigure(figureAux);
      console.log(figureAux);
      setDisabledBtn(true);
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
    console.log(currentFigure);
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
      <View style={styles.container}>
        <Text style={styles.instructions}>Escoge la figura correcta: </Text>
        <Text style={styles.instructions}>{currentFigure}</Text>
        <View style={styles.figuras}>
          <TouchableOpacity
            style={styles.button}
            disabled={disabledBtn}
            onPress={() => {
              userClick("Cuadrado");
            }}
          >
            <Image
              style={styles.image}
              source={require("../assets/images/square.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            disabled={disabledBtn}
            onPress={() => {
              userClick("Triángulo");
            }}
          >
            <Image
              style={styles.image}
              source={require("../assets/images/triangle-outline-variant.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.figuras}>
          <TouchableOpacity
            style={styles.button}
            disabled={disabledBtn}
            onPress={() => {
              userClick("Círculo");
            }}
          >
            <Image
              style={styles.image}
              source={require("../assets/images/oval.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            disabled={disabledBtn}
            onPress={() => {
              userClick("Rectángulo");
            }}
          >
            <Image
              style={styles.image}
              source={require("../assets/images/rectangulo.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.button}
          disabled={disabledBtn}
          onPress={() => {
            userClick("Rombo");
          }}
        >
          <Image
            style={styles.image}
            source={require("../assets/images/esquema-de-rombo.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 25 }}>
        <TouchableOpacity
          disabled={!disabledBtn}
          onPress={playSound}
          style={
            disabledBtn
              ? { ...styles.button1 }
              : { ...styles.button1, ...styles.buttonDisabled }
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

export default Figuras5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12cfcf",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#859a9b",
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.44,
    margin: 20,
  },
  image: {
    width: 120,
    height: 120,
  },
  instructions: {
    ...human.title1,
    ...systemWeights.semibold,
    color: materialColors.blackPrimary,
    textAlign: "center",
    padding: 5,
    margin: 8,
  },
  figuras: {
    flexDirection: "row",
    paddingTop: 20,
  },
  button1: {
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
