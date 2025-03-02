import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, logout } from "../redux/userSlice";
import {
  Keyboard,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { landingPageStyles, buttonStyles } from "../styles/styles";
import StyledButton from "./styledButton";
import Header from "./header";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email, isLoggedIn } = useSelector((state) => state.user);
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);

  const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://10.117.17.193:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle the error response from the server (invalid credentials, etc.)
        return {
          success: false,
          message: data.message || "Login failed",
        };
      }

      // Handle successful login
      return {
        success: true,
        message: data.message, // Login success message from the server
        name: data.name, // Optionally return user's name or token if needed
      };
    } catch (error) {
      console.error("Error during login: ", error);
      return {
        success: false,
        message: "Network error. Please try again later.",
      };
    }
  };
  const handleLogin = async () => {
    if (!inputEmail || !password) {
      Alert.alert("Error", "Please enter both email and password!");
      return;
    }

    try {
      setLoader(true);
      const response = await loginUser(inputEmail, password);
      if (response.success) {
        Alert.alert("Success", "Logged in successfully!");
        dispatch(setUser({ email: inputEmail, name: response.name }));
        navigation.navigate("Dashboard");
        setLoader(false);
      } else {
        Alert.alert("Error", response.message || "Login Failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "Something Went Wrong.");
    }
  };

  return (
    <SafeAreaView style={landingPageStyles.pageStyle}>
      <Header navigation={navigation} />
      <View style={{ ...landingPageStyles.formContainer, marginTop: "20%" }}>
        <Text
          style={{
            ...landingPageStyles.headerText,
            marginBottom: 25,
            color: "#4B0082",
          }}
        >
          Login
        </Text>
        {/* Email */}
        <TextInput
          style={landingPageStyles.input}
          placeholder="Enter Email..."
          value={inputEmail}
          onChangeText={setInputEmail}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {/* Password */}
        <TextInput
          style={landingPageStyles.input}
          placeholder="Password..."
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        <StyledButton
          styles={buttonStyles.button}
          title="Login"
          onClick={handleLogin}
        />
        <Button
          title="Skip to Sign Up"
          onPress={() => navigation.navigate("Signup")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;
