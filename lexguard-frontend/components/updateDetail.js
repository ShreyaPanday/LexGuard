import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Keyboard,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { landingPageStyles, buttonStyles } from "../styles/styles";
import StyledButton from "./styledButton";
import Header from "./header";

const UpdateDetail = ({ naviagtion }) => {
  const dispatch = useDispatch();
  const { email, isLoggedIn } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleSubmitDetails = () => {
    console.log({
      email: email,
      name: name,
      phone: phone,
      contactEmail: contactEmail,
    });
  };
  return (
    <SafeAreaView style={landingPageStyles.pageStyle}>
      {isLoggedIn ? (
        <>
          <Header naviagtion={naviagtion} />
          <View
            style={{ ...landingPageStyles.formContainer, marginTop: "20%" }}
          >
            <Text
              style={{
                ...landingPageStyles.headerText,
                marginBottom: 25,
                color: "#4B0082",
                paddingHorizontal: 0,
              }}
            >
              Update Details
            </Text>
            {/* Name */}
            <TextInput
              style={landingPageStyles.input}
              placeholder="Enter Name..."
              value={name}
              onChangeText={setName}
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
              value={contactEmail}
              onChangeText={setContactEmail}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
            <StyledButton
              styles={buttonStyles.button}
              title="Submit Details"
              onClick={handleSubmitDetails}
            />
          </View>
        </>
      ) : (
        <StyledButton
          title={"Oops! You are logged out! Go to Login Page"}
          styles={{ ...buttonStyles.button }}
          onClick={() => naviagtion.navigate("Login")}
        />
      )}
    </SafeAreaView>
  );
};

export default UpdateDetail;
