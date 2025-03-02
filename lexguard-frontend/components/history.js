import React, { useEffect, useState } from "react";
import { landingPageStyles, styles } from "../styles/styles";
import { ScrollView, View, Text } from "react-native";
import { useSelector } from "react-redux";
import BufferingLoader from "./loader";
import { SafeAreaView } from "react-native";
import Header from "./header";

const ChatHistory = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { email, isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (isLoggedIn) {
      setLoader(true);
      fetch(`http://10.117.17.193:5001/getLegalAdviceHistory?email=${email}`)
        .then((response) => response.json())
        .then((json) => {
          setData(json.history);
          setLoader(false);
        })
        .catch((error) => {
          console.error(error);
          setLoader(false);
        });
    }
  }, [setData, setLoader]);

  return loader ? (
    <BufferingLoader />
  ) : (
    <SafeAreaView>
      <Header navigation={navigation} />
      <ScrollView>
        {data.map((item, index) => (
          <View
            key={index}
            style={{
              ...landingPageStyles.content,
              paddingRight: 10,
              right: -10,
              paddingLeft: 10,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: "#232323",
                textAlign: "right",
                marginBottom: 10,
              }}
            >
              {new Date(item.timestamp).toLocaleDateString()}{" "}
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
            <View style={styles.user}>
              <Text>{item?.request}</Text>
            </View>
            <View style={styles.gemini}>
              <Text>{item?.response}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatHistory;
