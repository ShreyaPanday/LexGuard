import React from "react";
import { Text, TouchableOpacity } from "react-native";

const StyledButton = ({ title, onClick, styles }) => {
  return (
    <TouchableOpacity>
      <Text
        style={{
          ...styles,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
        onPress={onClick}
      >
        {/* {icon && <Icon name={icon} size={30} color="white" />} */}
        <Text>{title}</Text>
      </Text>
    </TouchableOpacity>
  );
};

export default StyledButton;
