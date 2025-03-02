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
} from "react-native";
import { landingPageStyles, buttonStyles } from "../styles/styles";
import StyledButton from "./styledButton";
import Header from "./header";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email, isLoggedIn } = useSelector((state) => state.user);
  const [inputEmail, setInputEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    dispatch(setUser({ email: inputEmail, password }));
    navigation.navigate("Dashboard");
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
