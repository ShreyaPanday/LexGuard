import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Header from "./header";
import { ScrollView } from "react-native";
import StyledButton from "./styledButton";
import { buttonStyles } from "../styles/styles";
import { setUser, logout } from "../redux/userSlice";

const OptionTile = ({ title, onPress, styles, icon }) => {
  return (
    <StyledButton onClick={onPress} title={title} styles={styles} icon={icon} />
  );
};

const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const { email, isLoggedIn } = useSelector((state) => state.user);
  const options = [
    { title: "Talk to AI-Expert", navigate: "GetStarted" },
    { title: "Setup Lifelines", navigate: "UpdateDetails" },
    { title: "Your Help Journey", navigate: "GetStarted" },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
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
