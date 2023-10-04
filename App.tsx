import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import Home from "./Screens/Home";
import Splash from "./Screens/Splash";
import OneSourat from "./Screens/OneSourat";

const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen options={{ headerShown: false }} name="Splash" component={Splash} />
          <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
          <Stack.Screen name="Soura" component={OneSourat} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  };
}

