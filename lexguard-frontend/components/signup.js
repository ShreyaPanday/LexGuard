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
import { TouchableOpacity } from "react-native";
import StyledButton from "./styledButton";

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(null);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignUp = () => {
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

    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={landingPageStyles.pageStyle}>
      <View style={landingPageStyles.header}>
        <Text style={{ ...landingPageStyles.headerText, paddingHorizontal: 0 }}>
          SignUp
        </Text>
      </View>
      <View style={landingPageStyles.formContainer}>
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
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
