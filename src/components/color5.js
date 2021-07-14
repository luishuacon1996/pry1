import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from "react-native";
import Toast from "react-native-toast-message";
import { Audio } from "expo-av";
const tracks = [
  {
    id: 1,
    url: require("../assets/audio/Escoge-el-color-amarillo1623977940.mp3"),
    title: "Amarillo",
    name: "yellow",
  },
  {
    id: 2,
    url: require("../assets/audio/Escoge-el-color-azul1623977968.mp3"),
    title: "Azul",
    name: "blue",
  },

  {
    id: 3,
    url: require("../assets/audio/Escoge-el-color-rojo1623977901.mp3"),
    title: "Rojo",
    name: "red",
  },
];

const Color5 = () => {
  const [sound, setSound] = useState("");
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [x, setX] = useState("blue");
  const [y, setY] = useState("yellow");
  const [currentColor, setCurrentColor] = useState("blue");
  const [timerIsOn, setTimerOn] = useState(true);
  const [difficulty, setDificulty] = useState(1000);
  const [currentColorEsp, setCurrentColorEsp] = useState("Azul");
  const [disabledBtn, setDisabledBtn] = useState(true);

  const userClick = (color) => {
    if (color == currentColor) {
      setScore(score + 1);

      generateColors();

      //this.startTimer();
    } else {
      Alert.alert(`escogiste el color incorrecto tienes ${score} puntos.`);
      resetGame();
    }
  };

  const generateColors = () => {
    let colors = ["green", "purple", "gray"];

    let num = Math.floor(Math.random() * 2);
    if (num === 0) {
      setX(currentColor);
      setY(colors[Math.floor(Math.random() * colors.length)]);
    } else if (num === 1) {
      setY(currentColor);
      setX(colors[Math.floor(Math.random() * colors.length)]);
    }
  };

  const startTimer = () => {
    let lvl = score + 1;
    let timer = setTimeout(() => {
      endTimer(timer, lvl);
    }, difficulty);
  };

  const resetGame = () => {
    setScore(0);
  };

  async function playSound() {
    setIndex(Math.floor(Math.random() * tracks.length));
    console(`index:${index}`);
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(tracks[index].url);
    setSound(sound);
    setCurrentColorEsp(tracks[index].title);
    setCurrentColor(tracks[index].name);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
          setIndex(Math.floor(Math.random() * tracks.length));
          console.log(index);
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <View style={styles.bar} />

      <Text style={styles.instructions}>
        Escoge el color correcto para ganar un punto
      </Text>

      <Text style={styles.color}>{currentColorEsp.toUpperCase()}</Text>

      <View style={styles.colors}>
        <TouchableOpacity
          disabled={disabledBtn}
          onPress={() => userClick(x)}
          style={[styles.x, { backgroundColor: x }]}
        />
        <TouchableOpacity
          disabled={disabledBtn}
          onPress={() => userClick(y)}
          style={[styles.y, { backgroundColor: y }]}
        />
      </View>
      <Text style={styles.color}>{`Puntos: ${score}`}</Text>
      <Button title="Play Sound" onPress={playSound} disabled={!disabledBtn} />
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
  },
  x: {
    height: "100%",
    width: "45%",
  },
  y: {
    height: "100%",
    width: "45%",
  },
  color: {
    margin: 20,
    fontSize: 30,
    fontWeight: "900",
  },
  colors: {
    height: 300,
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
