import React, { useState } from "react";
import { Alert, Button, SafeAreaView, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Header from "./header";
import { ScrollView } from "react-native";
import StyledButton from "./styledButton";
import { buttonStyles } from "../styles/styles";
import { setUser, logout } from "../redux/userSlice";
import BufferingLoader from "./loader";

const OptionTile = ({ title, onPress, styles, icon }) => {
  return (
    <StyledButton onClick={onPress} title={title} styles={styles} icon={icon} />
  );
};

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email, isLoggedIn } = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const options = [
    { title: "Talk to AI-Expert", navigate: "Chat" },
    { title: "Setup Lifelines", navigate: "UpdateDetails" },
    { title: "Your Help Journey", navigate: "History" },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSOS = async () => {
    setLoader(true);
    try {
      const response = await fetch("http://10.117.17.193:5002/sendAlert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        Alert.alert(
          "Alert has been sent! Please find a safe shelter in the meanwhile."
        );
      } else {
        Alert.alert("Error", "Something went wrong!");
      }
    } catch (err) {
      Alert.alert("Error", err);
    } finally {
      setLoader(false);
    }
  };
  return loader ? (
    <BufferingLoader />
  ) : (
    <SafeAreaView>
      <Header navigation={navigation} />
      {isLoggedIn ? (
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              width: "90%",
              height: "auto",
              justifyContent: "space-between",
              alignItems: "center",
              paddingLeft: 25,
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 20 }}>
              {email}
            </Text>
            <Button title="Logout" onPress={handleLogout} />
          </View>
          {options.map((option, index) => (
            <OptionTile
              key={index}
              title={option.title}
              styles={{ ...buttonStyles.button, margin: 40 }}
              onPress={() => navigation.navigate(option.navigate)}
            />
          ))}
          <StyledButton
            title="SOS"
            styles={{
              ...buttonStyles.button,
              backgroundColor: "red",
              color: "white",
            }}
            onClick={handleSOS}
          />
        </ScrollView>
      ) : (
        <StyledButton
          title={"Oops! You are logged out! Go to Login Page"}
          styles={{ ...buttonStyles.button }}
          onClick={() => navigation.navigate("Login")}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
