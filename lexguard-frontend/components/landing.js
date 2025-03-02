import React from "react";
import { Text, View, Button, ScrollView } from "react-native";
import StyledButton from "./styledButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  styles,
  landingPageStyles,
  textStyles,
  buttonStyles,
} from "../styles/styles";
import { useSelector } from "react-redux";
import Header from "./header";

const LandingPage = ({ navigation }) => {
  const { email, isLoggedIn } = useSelector((state) => state.user);
  return (
    <SafeAreaView style={styles.container}>
      <View style={landingPageStyles.pageStyle}>
        <Header navigation={navigation} />
        <ScrollView style={landingPageStyles.content}>
          <Text style={textStyles.h2}>
            Welcome {isLoggedIn ? email : "Guest"},
          </Text>
          <Text style={textStyles.p}>
            Your Personal Legal Assistant Powered by GeminiAI
          </Text>
          <Text style={textStyles.h2}>
            Get Reliable Legal Advice at Your Fingertips
          </Text>
          <Text style={textStyles.p}>
            Navigating legal matters can be overwhelming, but with LexGuard,
            expert legal advice is now accessible anytime, anywhere. Powered by
            GeminiAI, our intelligent platform provides fast, reliable, and
            tailored legal consultations to help you make informed decisions.
          </Text>
          <Text style={textStyles.h2}>Ready to Get Legal Help?</Text>
          <Text style={textStyles.p}>
            Start using LexGuard today for fast, secure, and tailored legal
            advice anytime, anywhere.
          </Text>
          {!isLoggedIn ? (
            <>
              <StyledButton
                styles={buttonStyles.button}
                title="Get Started"
                onClick={() => navigation.navigate("Signup")}
              />
              <Button
                title="Skip to Login"
                onPress={() => navigation.navigate("Login")}
              />
            </>
          ) : (
            <StyledButton
              styles={buttonStyles.button}
              title="Go to Dashboard"
              onClick={() => navigation.navigate("Dashboard")}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
