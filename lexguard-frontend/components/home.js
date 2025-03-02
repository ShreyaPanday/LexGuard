import React from "react";
import { Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
const Home = () => {
  const dispatch = useDispatch();
  const { email, isLoggedIn } = useSelector((state) => state.user);

  return isLoggedIn ? (
    <Text>Logged in as {email}</Text>
  ) : (
    <Text>Not Logged in</Text>
  );
};

export default Home;
