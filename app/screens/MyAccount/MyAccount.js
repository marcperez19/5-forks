import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";

import { Button } from "react-native-elements";

import * as firebase from "firebase";

import MyAccountGuest from "../../components/MyAccount/MyAccountGuest";
import MyAccountUser from "../../components/MyAccount/MyAccountUser";

export default class MyAccount extends Component {
  constructor() {
    super();

    this.state = {
      login: false
    };
  }

  async componentDidMount() {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          login: true
        });
      } else {
        this.setState({
          login: false
        });
      }
    });
  }

  gotoScreen = nameScreen => {
    this.props.navigation.navigate(nameScreen);
  };

  logout = () => {
    firebase.auth().signOut();
  };

  render() {
    const { login } = this.state;

    if (login) {
      return <MyAccountUser />;
    } else {
      return <MyAccountGuest goToScreen={this.gotoScreen} />;
    }
  }
}

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: "#fff",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
