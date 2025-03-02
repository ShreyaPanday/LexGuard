import React, { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {
  SafeAreaView,
  Text,
  TextInput,
  Keyboard,
  View,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import Header from "./header";
import { ScrollView } from "react-native";
import { buttonStyles, landingPageStyles, styles } from "../styles/styles";
import { useSelector } from "react-redux";
import StyledButton from "./styledButton";

const Chat = ({ navigation }) => {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState("");
  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(false);
  const { email, isLoggedIn } = useSelector((state) => state.user);
  const handleSendPrompt = async () => {
    if (!question) {
      Alert.alert("Ask your question before you hit send!");
      return;
    }
    setAsked(question);
    setLoader(true);
    try {
      const response = await fetch("http://10.117.17.193:5001/getLegalAdvice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          userQuery: question,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        setAnswer(data.legalAdvice);
        setLoader(false);
        setQuestion("");
      } else {
        Alert.alert("Failed");
      }
    } catch (err) {
      Alert.alert(err.message);
    } finally {
      setLoader(false);
    }
  };
  return (
    <SafeAreaView>
      <Header navigation={navigation} />
      {isLoggedIn ? (
        <ScrollView style={{ height: "80%", marginTop: -30 }}>
          <Text style={styles.geminiChat}>Ask me whatever you want!</Text>
          {asked && <Text style={styles.userChat}>{asked}</Text>}
          {answer && <Text style={styles.geminiChat}>{answer}</Text>}
          {/* Prompt */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <TextInput
              style={{
                ...landingPageStyles.input,
                marginLeft: 5,
                width: "75%",
              }}
              placeholder="Ask Gemini..."
              value={question}
              onChangeText={setQuestion}
              returnKeyType="done"
              onSubmitEditing={Keyboard.dismiss}
            />
            <TouchableOpacity
              style={{
                ...buttonStyles.button,
                borderRadius: 20,
                height: 55,
                width: "15%",
                color: "white",
                marginTop: 3,
              }}
              onPress={handleSendPrompt}
            >
              <FontAwesome name="paper-plane" size={18} color="white" />
            </TouchableOpacity>
          </View>
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

export default Chat;
