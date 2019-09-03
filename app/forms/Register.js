import React from "react";
import t from "tcomb-form-native";
import formValidation from "../utils/Validations";
import inputTemplate from "./templates/Input";

export const RegisterStruct = t.struct({
  name: t.String,
  email: formValidation.email,
  password: formValidation.password,
  passwordConfirmation: formValidation.password
});

export const RegisterOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Name and Surname",
        iconType: "material-community",
        iconName: "account-outline"
      }
    },
    email: {
      template: inputTemplate,
      config: {
        placeholder: "E-mail",
        iconType: "material-community",
        iconName: "at"
      }
    },
    password: {
      template: inputTemplate,
      config: {
        placeholder: "Password",
        password: true,
        secureTextEntry: true,
        iconType: "material-community",
        iconName: "lock-outline"
      }
    },
    passwordConfirmation: {
      template: inputTemplate,
      config: {
        placeholder: "Password confirmation",
        password: true,
        secureTextEntry: true,
        iconType: "material-community",
        iconName: "lock-reset"
      }
    }
  }
};
