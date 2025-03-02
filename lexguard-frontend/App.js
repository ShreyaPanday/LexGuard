import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./components/landing";
import SignUp from "./components/signup";
import Login from "./components/login";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./components/home";
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
          <Stack.Screen name="Dashboard" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
