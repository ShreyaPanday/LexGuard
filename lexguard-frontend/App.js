import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingPage from "./components/landing";
import SignUp from "./components/signup";
import Login from "./components/login";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./components/home";
import UpdateDetail from "./components/updateDetail";
import Chat from "./components/chat";

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
          <Stack.Screen
            options={{ headerShown: false }}
            name="Dashboard"
            component={Home}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="UpdateDetails"
            component={UpdateDetail}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Chat"
            component={Chat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
