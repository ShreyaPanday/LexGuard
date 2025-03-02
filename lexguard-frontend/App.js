import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, View } from "react-native";
import LandingPage from "./components/landing";
import SignUp from "./components/signup";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GetStarted">
        <Stack.Screen
          options={{ headerShown: false }}
          name="GetStarted"
          component={LandingPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Signup"
          component={SignUp}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
