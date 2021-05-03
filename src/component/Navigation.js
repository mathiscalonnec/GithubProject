import * as React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from "./Home"
import User from "./User"
import Followers from "./Followers"
import Repository from "./Repository"
import Contributors from './Contributors';
import RepositoriesSearch from './RepositoriesSearch'

function UserScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
         name="Home" 
         component={Home}
         options={{ title: 'Home' }}/>
        <Stack.Screen
         name="User"
         component={User}/>
        <Stack.Screen
         name="Repository"
         component={Repository}/>
        <Stack.Screen
         name="Contributors"
         component={Contributors}/>
        <Stack.Screen
         name="Followers"
         component={Followers}/>
        <Stack.Screen
         name="RepositoriesSearch"
         component={RepositoriesSearch}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;