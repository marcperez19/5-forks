import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import Toast, { DURATION } from "react-native-easy-toast";

import OverlayOneInput from "../../Elements/OverlayOneInput";
import OverlayTwoInput from "../../Elements/OverlayTwoInput";
import OverlayThreeInput from "../../Elements/OverlayThreeInput";

export default class UpdateUserInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props,
      overlayComponent: null,
      menuItems: [
        {
          title: "Change name and surname",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "account-circle",
          iconColorLeft: "#ccc",
          onPress: () =>
            this.openOverlay(
              "Name and surname",
              this.updateUserDisplayName,
              props.userInfo.displayName
            )
        },
        {
          title: "Change email",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "at",
          iconColorLeft: "#ccc",
          onPress: () =>
            this.openOverlayTwoInput(
              "Email",
              "Current password",
              props.userInfo.email,
              this.updateUserEmail
            )
        },
        {
          title: "Change password",
          iconType: "material-community",
          iconNameRight: "chevron-right",
          iconColorRight: "#ccc",
          iconNameLeft: "lock-reset",
          iconColorLeft: "#ccc",
          onPress: () =>
            this.openOverlayThreeInput(
              "Current password",
              "New password",
              "Repeat new password",
              this.updateUserPassword
            )
        }
      ]
    };
  }

  updateUserDisplayName = async newDisplayName => {
    if (newDisplayName) {
      this.state.updateUserDisplayName(newDisplayName);
    }
    this.setState({
      overlayComponent: null
    });
  };

  openOverlay = (placeholder, updateFunction, inputValue) => {
    this.setState({
      overlayComponent: (
        <OverlayOneInput
          isVisibleOverlay={true}
          placeholder={placeholder}
          updateFunction={updateFunction}
          inputValue={inputValue}
        />
      )
    });
  };

  updateUserEmail = async (newEmail, password) => {
    const emailOld = this.props.userInfo.email;

    if (emailOld != newEmail && password) {
      this.state.updateUserEmail(newEmail, password);
    }

    this.setState({
      overlayComponent: null
    });
  };

  openOverlayTwoInput = (
    placeholderOne,
    placeholderTwo,
    inputValueOne,
    updateFunction
  ) => {
    this.setState({
      overlayComponent: (
        <OverlayTwoInput
          isVisibleOverlay={true}
          placeholderOne={placeholderOne}
          placeholderTwo={placeholderTwo}
          inputValueOne={inputValueOne}
          inputValueTwo=""
          password={true}
          updateFunction={updateFunction}
        />
      )
    });
  };

  updateUserPassword = async (
    currentPassword,
    newPassword,
    repeatNewPassword
  ) => {
    if (currentPassword && newPassword && repeatNewPassword) {
      if (newPassword === repeatNewPassword) {
        if (currentPassword === newPassword) {
          this.refs.toast.show(
            "Old password and new password cannot be the same."
          );
        } else {
          this.state.updateUserPassword(
            currentPassword,
            newPassword,
            repeatNewPassword
          );
        }
      } else {
        this.refs.toast.show(
          "New password and repeat new password must be the same."
        );
      }
    } else {
      this.refs.toast.show("You must fill all the fields.");
    }

    this.setState({
      overlayComponent: null
    });
  };

  openOverlayThreeInput = (
    placeholderOne,
    placeholderTwo,
    placeholderThree,
    updateFunction
  ) => {
    this.setState({
      overlayComponent: (
        <OverlayThreeInput
          isVisibleOverlay={true}
          placeholderOne={placeholderOne}
          placeholderTwo={placeholderTwo}
          placeholderThree={placeholderThree}
          inputValueOne=""
          inputValueTwo=""
          inputValueThree=""
          password={true}
          updateFunction={updateFunction}
        />
      )
    });
  };
  render() {
    const { menuItems, overlayComponent } = this.state;

    return (
      <View>
        {menuItems.map((item, index) => (
          <ListItem
            key={index}
            title={item.title}
            leftIcon={{
              type: item.iconType,
              name: item.iconNameLeft,
              color: item.iconColorLeft
            }}
            rightIcon={{
              type: item.iconType,
              name: item.iconNameRight,
              color: item.iconColorRight
            }}
            onPress={item.onPress}
            containerStyle={styles.contentContainerStyle}
          />
        ))}
        {overlayComponent}
        <Toast
          ref="toast"
          position="center"
          positionValue={0}
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
  contentContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3"
  }
});
