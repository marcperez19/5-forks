import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon, Image, Button } from "react-native-elements";

import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import Toast, { DURATION } from "react-native-easy-toast";

import t from "tcomb-form-native";
const Form = t.form.Form;

import {
  AddRestaurantStruct,
  AddRestaurantOptions
} from "../../forms/AddRestaurant";

import uploadImage from "../../utils/UploadImage";

import { firebaseapp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
const db = firebase.firestore(firebaseapp);

export default class AddRestaurant extends Component {
  constructor() {
    super();

    this.state = {
      imageUriRestaurant: "",
      formData: {
        name: "",
        city: "",
        address: "",
        description: ""
      }
    };
  }

  isImageRestaurant = image => {
    if (image) {
      return (
        <Image source={{ uri: image }} style={{ width: 500, height: 200 }} />
      );
    } else {
      return (
        <Image
          source={require("../../../assets/img/no-image-icon.png")}
          style={{ width: 500, height: 200 }}
        />
      );
    }
  };

  uploadImage = async () => {
    const resultPermission = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
    if (resultPermission.status === "denied") {
      this.refs.toast.show(
        "You need to accept in order to access camera roll",
        1500
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true
      });

      if (result.cancelled) {
        this.refs.toast.show("You have closed camera roll", 1500);
      } else {
        this.setState({
          imageUriRestaurant: result.uri
        });
      }
    }
  };

  onChangeFormAddRestaurant = formValue => {
    this.setState({
      formData: formValue
    });
  };

  addRestaurant = () => {
    const { imageUriRestaurant } = this.state;
    const { name, city, address, description } = this.state.formData;

    uploadImage(imageUriRestaurant, "mifotorestaurante", "restaurants")
      .then(() => {
        console.log("todo bien");
      })
      .catch(error => {
        console.log("error");
      });
  };

  render() {
    const { imageUriRestaurant } = this.state;

    return (
      <View style={styles.viewBody}>
        <View style={styles.viewPhoto}>
          {this.isImageRestaurant(imageUriRestaurant)}
        </View>
        <View>
          <Form
            ref="addRestaurantForm"
            type={AddRestaurantStruct}
            options={AddRestaurantOptions}
            value={this.state.formData}
            onChange={formValue => this.onChangeFormAddRestaurant(formValue)}
          />
        </View>
        <View style={styles.viewIconUploadPhoto}>
          <Icon
            name="camera"
            type="material-community"
            color="#7a7a7a"
            onPress={() => this.uploadImage()}
            iconStyle={styles.addPhotoIcon}
          />
        </View>
        <View style={styles.viewButtonAddRestaurant}>
          <Button
            title="Create restaurant"
            onPress={() => this.addRestaurant()}
            buttonStyle={styles.btnAddRestaurant}
          />
        </View>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={320}
          fadeInDuration={1000}
          fadeOutDuration={1000}
          opacity={0.8}
          textStyle={{ color: "#fff" }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewBody: {
    flex: 1
  },
  viewPhoto: {
    alignItems: "center",
    height: 200,
    marginBottom: 20
  },
  viewIconUploadPhoto: {
    flex: 1,
    alignItems: "flex-start",
    marginLeft: 12,
    marginTop: 10
  },
  addPhotoIcon: {
    backgroundColor: "#e3e3e3",
    padding: 13,
    paddingBottom: 10,
    margin: 0
  },
  viewButtonAddRestaurant: {
    flex: 1,
    justifyContent: "flex-end"
  },
  btnAddRestaurant: {
    backgroundColor: "#00a680",
    margin: 20
  }
});
