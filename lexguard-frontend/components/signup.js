import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Alert,
  TextInput,
  Keyboard,
  Button,
} from "react-native";
import { landingPageStyles, buttonStyles } from "../styles/styles";
import StyledButton from "./styledButton";
import Header from "./header";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const handleSignUp = async () => {
    if (
      !email ||
      !password ||
      !age ||
      !name ||
      !gender ||
      !phone ||
      !confirmPassword
    ) {
      Alert.alert("Error", "Please fill in all the fields!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    try {
      setLoader(true);
      const response = await fetch("http://10.117.17.193:5001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
          phone,
          gender,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();
      console.log("Response from API:", data);
      setLoader(false);

      if (response.ok) {
        Alert.alert("Success", "Signup Successful!");
      } else {
        Alert.alert("Signup Failed", data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      Alert.alert("Error", "Failed to connect to the server.");
    }
    navigation.navigate("Login");
  };
  return (
    <SafeAreaView style={landingPageStyles.pageStyle}>
      <Header navigation={navigation} />
      <View style={landingPageStyles.formContainer}>
        <Text
          style={{
            ...landingPageStyles.headerText,
            marginBottom: 25,
            color: "#4B0082",
          }}
        >
          SignUp
        </Text>
        {/* Name */}
        <TextInput
          style={landingPageStyles.input}
          placeholder="Enter your name..."
          value={name}
          onChangeText={setName}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {/* Age */}
        <TextInput
          style={landingPageStyles.input}
          placeholder="Enter your age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {/* Gender */}
        <TextInput
          style={landingPageStyles.input}
          placeholder="Male/Female/Other..."
          value={gender}
          onChangeText={setGender}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {/* Phone */}
        <TextInput
          style={landingPageStyles.input}
          placeholder="(___)-_______"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        {/* Email */}
        <TextInput
          style={landingPageStyles.input}
          placeholder="Enter Email..."
          value={email}
          onChangeText={setEmail}
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
        {/* Confirm Password */}
        <TextInput
          style={landingPageStyles.input}
          placeholder="Confirm Password..."
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
          returnKeyType="done"
          onSubmitEditing={Keyboard.dismiss}
        />
        <StyledButton
          styles={buttonStyles.button}
          title="Sign Up"
          onClick={handleSignUp}
        />
        <Button
          title="Skip to Login"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
