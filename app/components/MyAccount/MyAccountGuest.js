import React, { Component } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { Button, Image } from "react-native-elements";
import { bold } from "ansi-colors";

export default class MyAccountGuest extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { goToScreen } = this.props;
    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/image-my-account-guest-01.jpg")}
          style={styles.image}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <Text style={styles.title}>Check your 5-forks profile</Text>
        <Text style={styles.description}>
          ¿Como describirías tu mejor restaurante? Busca y visualiza los mejores
          restaurantes de una forma sencilla, vota cual te ha gustado más y
          comenta como ha sido tu experiencia.
        </Text>
        <Button
          title="See your profile"
          buttonStyle={styles.btnViewProfile}
          onPress={() => goToScreen("Login")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 30,
    paddingRight: 30
  },
  image: {
    height: 300,
    marginBottom: 40
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 10
  },
  description: {
    textAlign: "center",
    marginBottom: 30
  },
  btnViewProfile: {
    width: "100%",
    backgroundColor: "#00a680"
  }
});
