import React from "react";
import { Text, TouchableOpacity } from "react-native";

const StyledButton = ({ title, onClick, styles }) => {
  return (
    <TouchableOpacity>
      <Text style={styles} onPress={onClick}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
