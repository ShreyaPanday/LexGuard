import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, SafeAreaView } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { landingPageStyles } from "../styles/styles";

const BufferingLoader = ({ size = 50, color = "#007bff" }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startRotation = () => {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 1000, // Adjust speed of rotation
          easing: Easing.linear,
          useNativeDriver: true,
        })
      ).start();
    };

    startRotation();
  }, []);

  const rotateInterpolation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <SafeAreaView
      style={{ ...landingPageStyles.pageStyle, justifyContent: "center" }}
    >
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolation }] }}>
          <FontAwesome name="spinner" size={size} color={color} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default BufferingLoader;
