import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Overlay, Input, Button, Icon } from "react-native-elements";

export default class OverlayTwoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props
    };
  }

  onChangeInputOne = inputData => {
    this.setState({
      inputValueOne: inputData
    });
  };

  onChangeInputTwo = inputData => {
    this.setState({
      inputValueTwo: inputData
    });
  };

  update = () => {
    const newValueOne = this.state.inputValueOne;
    const newValueTwo = this.state.inputValueTwo;

    this.state.updateFunction(newValueOne, newValueTwo);

    this.setState({
      isVisibleOverlay: false
    });
  };

  close = () => {
    this.setState({
      isVisibleOverlay: false
    });

    this.state.updateFunction(null);
  };

  render() {
    const {
      isVisibleOverlay,
      placeholderOne,
      placeholderTwo,
      inputValueOne,
      inputValueTwo,
      password
    } = this.state;
    return (
      <Overlay
        isVisible={isVisibleOverlay}
        overlayBackgroundColor="transparent"
        overlayStyle={styles.overlayStyle}
      >
        <View style={styles.viewOverlay}>
          <Input
            containerStyle={styles.inputContainer}
            placeholder={placeholderOne}
            onChangeText={value => this.onChangeInputOne(value)}
            value={inputValueOne}
          />
          <Input
            containerStyle={styles.inputContainer}
            placeholder={placeholderTwo}
            onChangeText={value => this.onChangeInputTwo(value)}
            value={inputValueTwo}
            password={password}
            secureTextEntry={password}
          />
          <Button
            title="Update"
            buttonStyle={styles.buttonUpdate}
            onPress={() => this.update()}
          />
          <Icon
            type="material-community"
            name="close-circle-outline"
            containerStyle={styles.containerIconClose}
            size={30}
            onPress={() => this.close()}
          ></Icon>
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  overlayStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  viewOverlay: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20
  },
  inputContainer: {
    marginBottom: 20
  },
  buttonUpdate: {
    backgroundColor: "#00a680"
  },
  containerIconClose: {
    position: "absolute",
    right: -15,
    top: -16
  }
});
