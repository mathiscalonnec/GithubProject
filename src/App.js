import React from "react";
import { 
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
  View,
  Button
} from "react-native";

import Navigation from "./component/Navigation"
import Home from "./component/Home"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


export default function App() {

  return (
    <Navigation/>
  );
};
