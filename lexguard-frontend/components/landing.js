import React from "react";
import { Text, View, StyleSheet } from "react-native";
import StyledButton from "./styledButton";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  styles,
  landingPageStyles,
  textStyles,
  buttonStyles,
} from "../styles/styles";

const LandingPage = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={landingPageStyles.pageStyle}>
        <View style={landingPageStyles.header}>
          <Text style={landingPageStyles.headerText}>LexGuard</Text>
        </View>
        <View style={landingPageStyles.content}>
          <Text style={textStyles.h1}>Welcome to LexGuard</Text>
          <Text style={textStyles.p}>
            Your Personal Legal Assistant Powered by GeminiAI
          </Text>
        </View>
        <View style={landingPageStyles.content}>
          <Text style={textStyles.h2}>
            Get Reliable Legal Advice at Your Fingertips
          </Text>
          <Text style={textStyles.p}>
            Navigating legal matters can be overwhelming, but with LexGuard,
            expert legal advice is now accessible anytime, anywhere. Powered by
            GeminiAI, our intelligent platform provides fast, reliable, and
            tailored legal consultations to help you make informed decisions.
          </Text>
        </View>
        <View style={landingPageStyles.content}>
          <Text style={textStyles.h2}>Ready to Get Legal Help?</Text>
          <Text style={textStyles.p}>
            Start using LexGuard today for fast, secure, and tailored legal
            advice anytime, anywhere.
          </Text>
          <StyledButton
            styles={buttonStyles.button}
            title="Get Started"
            onClick={() => navigation.navigate("Signup")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LandingPage;
