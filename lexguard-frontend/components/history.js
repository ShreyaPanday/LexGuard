import React from "react";
import { landingPageStyles, styles } from "../styles/styles";
import { ScrollView } from "react-native";

const ChatHistory = () => {
  const [data, setData] = useState([]);

  return (
    <ScrollView>
      {data.map((item, index) => (
        <View key={index} style={landingPageStyles.content}>
          <Text style={styles.user}>{item?.user}</Text>
          <Text style={styles.gemini}>{item?.gemini}</Text>
        </View>
      ))}
    </ScrollView>
  );
};
