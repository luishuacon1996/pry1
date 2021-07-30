import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon, Image, Card } from "react-native-elements";
import { MyContext } from "../context";

import { human, systemWeights, materialColors } from "react-native-typography";

const Principal = (props) => {
  const context = useContext(MyContext);

  return (
    <SafeAreaView style={styles.container}>
      <Card containerStyle={styles.cardStyle}>
        <Card.Title style={styles.text}>3-4 AÑOS</Card.Title>

        <Image
          style={styles.image}
          source={require("../assets/images/child.png")}
        />
        <Card.Divider />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("Categoria");
            context.setEdad(4);
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              //alignContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="arrow-right" size={70} />
          </View>
        </TouchableOpacity>
      </Card>
      <Card containerStyle={styles.cardStyle}>
        <Card.Title style={styles.text}>4-5 AÑOS</Card.Title>

        <Image
          style={styles.image}
          source={require("../assets/images/girl.png")}
        />
        <Card.Divider />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            props.navigation.navigate("Categoria");
            context.setEdad(5);
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              //alignContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="arrow-right" size={70} />
          </View>
        </TouchableOpacity>
      </Card>
    </SafeAreaView>
  );
};

export default Principal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12cfcf",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-around",
  },
  button: {
    backgroundColor: "#869acb",
    borderRadius: 5,

    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 105,
    height: 45,
    paddingBottom: 15,
  },
  image: {
    width: 88,
    height: 88,
    margin: 10,
  },
  cardStyle: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderRadius: 7,
    borderColor: "black",
    backgroundColor: "#9b59b6",
  },
  text: {
    ...human.title2,
    ...systemWeights.semibold,
    color: materialColors.whiteSecondary,
  },
});
