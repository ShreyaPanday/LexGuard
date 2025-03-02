import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Keyboard,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { landingPageStyles, buttonStyles } from "../styles/styles";
import StyledButton from "./styledButton";
import Header from "./header";

const UpdateDetail = ({ naviagtion }) => {
  const { email, isLoggedIn } = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [loader, setLoader] = useState(false);

  const handleSubmitDetails = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        "http://10.117.17.193:5001/addEmergencyContact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            name,
            phone,
            contactEmail,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        Alert.alert("Success", "Emergency Contact Added Successfully!");
        setLoader(false);
      } else {
        Alert.alert("Error", "Could not update Emergency Contact");
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoader(false);
    }
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
