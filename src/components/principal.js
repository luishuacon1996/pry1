import React, { useContext } from "react";
import { View, StyleSheet, SafeAreaView, Dimensions } from "react-native";
import { Card, Icon, Image, Button } from "react-native-elements";
import { MyContext } from "../context";

const Principal = (props) => {
  const context = useContext(MyContext);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Card containerStyle={styles.cardStyle}>
          <Card.Title>3-4 Años</Card.Title>
          <View style={{ paddingBottom: 10 }}>
            <Image
              source={require("../assets/images/child.png")}
              style={styles.image}
              resizeMode={"contain"}
            />
          </View>
          <Card.Divider />
          <Button
            icon={<Icon name="arrow-right" size={20} color="white" />}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              props.navigation.navigate("Categoria");
              context.setEdad(4);
            }}
          />
        </Card>
      </View>
      <View>
        <Card containerStyle={styles.cardStyle}>
          <Card.Title>4-5 Años</Card.Title>
          <View style={{ paddingBottom: 5 }}>
            <Image
              source={require("../assets/images/girl.png")}
              style={styles.image}
              resizeMode={"contain"}
            />
          </View>
          <Card.Divider />
          <Button
            icon={<Icon name="arrow-right" size={20} color="white" />}
            onPress={() => {
              /* 1. Navigate to the Details route with params */
              props.navigation.navigate("Categoria");
              context.setEdad(5);
            }}
          />
        </Card>
      </View>
      <View>
        <Card containerStyle={styles.cardStyle}>
          <Card.Title>5-6 Años</Card.Title>
          <View style={{ paddingBottom: 10 }}>
            <Image
              source={require("../assets/images/boy.png")}
              style={styles.image}
              resizeMode={"contain"}
            />
          </View>
          <Card.Divider />
          <Button
            icon={<Icon name="arrow-right" size={20} color="white" />}
            onPress={() => {
              props.navigation.navigate("Categoria");
              context.setEdad(6);
            }}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default Principal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffa",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-around",
  },
  button: {
    backgroundColor: "#869acb",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    shadowColor: "#303838",
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    shadowOpacity: 0.35,
    width: 80,
    height: 30,
  },
  image: {
    width: 78,
    height: 78,
  },
  cardStyle: {
    width: Dimensions.get("window").width * 0.3,
    height: Dimensions.get("window").height * 0.26,
    justifyContent: "center",
  },
});
