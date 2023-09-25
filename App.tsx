import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from 'react';
import Home from "./Screens/Home";
import OneSourat from "./Screens/OneSourat";

const Stack = createStackNavigator();

export default class App extends React.Component {

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Home"}>
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="Sourat"
            component={OneSourat}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  };
}

