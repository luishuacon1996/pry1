import React, { useEffect, useState } from 'react'
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert
} from 'react-native'
import { Button } from 'react-native-elements'
import { Audio } from 'expo-av'

const tracks = [
  {
    id: 1,
    url: require("../assets/audio/naranja.mp3"),
    title: "Naranja",
  },
  {
    id: 2,
    url: require("../assets/audio/morado.mp3"),
    title: "Morado",
  },

  {
    id: 3,
    url: require("../assets/audio/verde.mp3"),
    title: "Verde",
  },
];

function mix_hexes_naive(...hexes) {
  const rgbs = hexes.map((hex) => hex2dec(hex));
  const rgb = rgbs
    .reduce((acc, cur) => {
      cur.forEach((e, i) => (acc[i] = acc[i] ? acc[i] + e : e));
      return acc;
    }, [])
    .map((e) => e / rgbs.length);
  const mixture = rgb2hex(...rgb);
  return mixture;
}

function hex2dec(hex) {
  return hex
    .replace("#", "")
    .match(/.{2}/g)
    .map((n) => parseInt(n, 16));
}

function rgb2hex(r, g, b) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  r = Math.min(r, 255);
  g = Math.min(g, 255);
  b = Math.min(b, 255);
  return "#" + [r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("");
}

function rgb2cmyk(r, g, b) {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  let k = Math.min(c, m, y);
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);
  return [c, m, y, k];
}

function cmyk2rgb(c, m, y, k) {
  let r = c * (1 - k) + k;
  let g = m * (1 - k) + k;
  let b = y * (1 - k) + k;
  r = (1 - r) * 255 + 0.5;
  g = (1 - g) * 255 + 0.5;
  b = (1 - b) * 255 + 0.5;
  return [r, g, b];
}

function mix_cmyks(...cmyks) {
  let c =
    cmyks.map((cmyk) => cmyk[0]).reduce((a, b) => a + b, 0) / cmyks.length;
  let m =
    cmyks.map((cmyk) => cmyk[1]).reduce((a, b) => a + b, 0) / cmyks.length;
  let y =
    cmyks.map((cmyk) => cmyk[2]).reduce((a, b) => a + b, 0) / cmyks.length;
  let k =
    cmyks.map((cmyk) => cmyk[3]).reduce((a, b) => a + b, 0) / cmyks.length;
  return [c, m, y, k];
}

function mix_hexes(...hexes) {
  let rgbs = hexes.map((hex) => hex2dec(hex));
  let cmyks = rgbs.map((rgb) => rgb2cmyk(...rgb));
  let mixture_cmyk = mix_cmyks(...cmyks);
  let mixture_rgb = cmyk2rgb(...mixture_cmyk);
  let mixture_hex = rgb2hex(...mixture_rgb);
  return mixture_hex;
}

const Color6 = () => {
  const [counter, setCounter] = useState(0);
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [color1, setColor1, color1Ref] = useState("#ffffff");
  const [color2, setColor2, color2Ref] = useState("#ffffff");
  const [color3, setColor3, color3Ref] = useState("#ffffff");
  const [sound, setSound] = useState("");
  const [index, setIndex] = useState(Math.floor(Math.random() * tracks.length));
  const [currentColor, setCurrentColor] = useState("");
  const [aux, setAux] = useState(true);

  //const [aux, setAux] = useState(false);
  const [title, setTitle] = useState("");
  let colors = [
    { hex: "#ff0000", color: "Rojo" },
    { hex: "#FFed00", color: "Amarillo" },
    { hex: "#00ff", color: "Azul" },
  ];

  async function userClick(color) {
    console.log(`contador antes ${counter}`);
    console.log(`color1 antes de setear: ${color1}`);
    console.log(`color2 antes de setear: ${color2}`);

    if (counter == 1) {
      console.log(`color1 despues de setear: ${color1}`);

      setColor1(color);
      //setColor3(color);

      setCounter((prevCount) => prevCount + 1);
    } else if (counter == 2) {
      setDisabledBtn(true);
      setColor2(color);
      console.log(`color2 despues: ${color2}`);
      setCounter(0);
    }
  }

  useEffect(() => {
    if (mix_hexes_naive(color1, color2) == "#808000") setColor3("#870d6f");
    else setColor3(mix_hexes_naive(color1, color2));
    console.log(color3);
  });

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

  //console.log(color3);
  //console.log(color1);

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(tracks[index].url);
    setSound(sound);
    setCurrentColor(tracks[index].title);

    console.log("Playing Sound");
    await sound.playAsync();
    setIndex(Math.floor(Math.random() * tracks.length));
    setCounter((prevCount) => prevCount + 1);
    //setColor3("#ffffff");

    setDisabledBtn(false);

    console.log(`color3:${color3}`);
  }

  const comprobar = () => {
    if (counter === 2) {
      if (color3 === "#80f600" && currentColor === "Verde") {
        Alert.alert("combinación correcta");
        setDisabledBtn(false);
      } else if (color3 === "#ff7700" && currentColor === "Naranja") {
        Alert.alert("combinación correcta");
        setDisabledBtn(false);
      } else if (color3 === "#870d6f" && currentColor === "Morado") {
        Alert.alert("combinación correcta");
        setDisabledBtn(false);
      } else {
        Alert.alert("vuelve a intentarlo");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Selecciona el color para formar el color:
      </Text>

      <Text style={styles.color}>{`el color ${currentColor}`}</Text>
      <View style={styles.colors}>
        <TouchableOpacity
          style={[styles.x, { backgroundColor: colors[0].hex }]}
          onPress={() => {
            userClick(colors[0].hex);
            comprobar();
          }}
          disabled={disabledBtn}
        />
        <TouchableOpacity
          style={[styles.x, { backgroundColor: colors[1].hex }]}
          onPress={() => {
            userClick(colors[1].hex);
            comprobar();
          }}
          disabled={disabledBtn}
        />
        <TouchableOpacity
          style={[styles.x, { backgroundColor: colors[2].hex }]}
          onPress={() => {
            userClick(colors[2].hex);
            comprobar();
          }}
          disabled={disabledBtn}
        />
      </View>
      <View style={styles.colors}>
        <TouchableOpacity
          style={[styles.y, { backgroundColor: color3 }]}
          disabled={disabledBtn}
        />
      </View>
      <View style={styles.color}>
        <Button
          title="Instrucciones"
          disabled={!disabledBtn}
          onPress={playSound}
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
    //justifyContent: "center",
    alignContent: "space-around",
  },
  x: {
    height: "100%",
    width: "30%",
    margin: 5,
    borderRadius: 6,
  },
  y: {
    height: "100%",
    width: "30%",
    margin: 20,
    borderRadius: 6,
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
