import React from "react";
import t from "tcomb-form-native";
import inputTemplate from "./templates/Input";
import textareaTemplate from "./templates/Textarea";

export const AddRestaurantStruct = t.struct({
  name: t.String,
  city: t.String,
  address: t.String,
  description: t.String
});

export const AddRestaurantOptions = {
  fields: {
    name: {
      template: inputTemplate,
      config: {
        placeholder: "Restaurant name",
        iconType: "material-community",
        iconName: "silverware"
      }
    },
    city: {
      template: inputTemplate,
      config: {
        placeholder: "City",
        iconType: "material-community",
        iconName: "city"
      }
    },
    address: {
      template: inputTemplate,
      config: {
        placeholder: "Address",
        iconType: "material-community",
        iconName: "map-marker"
      }
    },
    description: {
      template: textareaTemplate,
      config: {
        placeholder: "Description"
      }
    }
  }
};
