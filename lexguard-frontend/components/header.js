import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { landingPageStyles } from "../styles/styles";
const Header = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={{ ...landingPageStyles.header }}
      onPress={() => navigation.navigate("GetStarted")}
    >
      <Text
        style={{
          ...landingPageStyles.headerText,
        }}
      >
        LexGuard
      </Text>
    </TouchableOpacity>
  );
};

export default Header;
