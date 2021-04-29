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

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to User"
        onPress={() => navigation.navigate('UserScreen')}
      />
  </View>
  );
}

function UserScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
         name="Home" 
         component={HomeScreen}
         options={{ title: 'Home' }}
         />
        <Stack.Screen
         name="User"
         component={UserScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;