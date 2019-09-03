import React, { Component } from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  Image,
  Button,
  Text,
  SocialIcon,
  Divider
} from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import t from "tcomb-form-native";
const Form = t.form.Form;

import { LoginStruct, LoginOptions } from "../../forms/Login";
import * as firebase from "firebase";
import { FacebookApi } from "../../utils/Social";
import * as Facebook from "expo-facebook";

export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      loginStruct: LoginStruct,
      loginOptions: LoginOptions,
      formData: {
        email: "",
        password: ""
      },
      formErrorMessage: ""
    };
  }

  login = () => {
    const { password } = this.state.formData;

    const validate = this.refs.loginForm.getValue();

    if (validate) {
      this.setState({
        formErrorMessage: ""
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(validate.email, validate.password)
        .then(resolved => {
          this.refs.toast.show("Login in...", 200, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(err => {
          this.refs.toast.show("Incorrect login", 500);
        });
    } else {
      this.refs.toast.show("Invalid form", 500);
    }
  };

  loginFacebook = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync(
      FacebookApi.facebook.application_id,
      { permissions: FacebookApi.facebook.permissions }
    );
    console.log(token);
    if (type == "success") {
      const credentials = firebase.auth.FacebookAuthProvider.credential(token);
      firebase
        .auth()
        .signInWithCredential(credentials)
        .then(() => {
          this.refs.toast.show("Correct log in", 300, () => {
            this.props.navigation.goBack();
          });
        })
        .catch(error => {
          this.refs.toast.show("Unknown error", 300);
        });
    } else if (type == "cancel") {
      this.refs.toast.show("Log in cancelled", 300);
    } else {
      this.refs.toast.show("Unknown error", 300);
    }
  };

  onChangeFormLogin = formValue => {
    this.setState({
      formData: formValue
    });
  };

  render() {
    const { loginStruct, loginOptions, formErrorMessage } = this.state;

    return (
      <View style={styles.viewBody}>
        <Image
          source={require("../../../assets/img/5-tenedores-letras-icono-logo.png")}
          containerStyle={styles.containerLogo}
          style={styles.logo}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={styles.formBody}>
          <Form
            ref="loginForm"
            type={loginStruct}
            options={loginOptions}
            value={this.state.formData}
            onChange={formValue => this.onChangeFormLogin(formValue)}
          />
          <Button
            buttonStyle={styles.buttonLoginContainer}
            title="Login"
            onPress={() => this.login()}
          />
          <Text style={styles.textRegister}>
            You don't have an account?
            <Text
              style={styles.btnRegister}
              onPress={() => this.props.navigation.navigate("Register")}
            >
              {" "}
              Sign Up!
            </Text>
          </Text>
          <Divider style={styles.divider}></Divider>
          <SocialIcon
            title="Log In With Facebook"
            button
            type="facebook"
            onPress={() => this.loginFacebook()}
          />
        </View>
        <Toast
          ref="toast"
          position="bottom"
          positionValue={250}
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
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30
  },
  logo: {
    width: 200,
    height: 100
  },
  buttonLoginContainer: {
    backgroundColor: "#00a680",
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  containerLogo: {
    alignItems: "center"
  },
  formBody: {
    marginTop: 30
  },
  divider: {
    backgroundColor: "#00a680",
    marginBottom: 20,
    marginTop: 20
  },
  textRegister: {
    marginTop: 15,
    marginLeft: 10,
    marginRight: 10
  },
  btnRegister: {
    color: "#00a680",
    fontWeight: "bold"
  }
});
