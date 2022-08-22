

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//bring all the screens

import Home from './screens/Home';
import Add from './screens/Add';
import Edit  from './screens/Edit';

const Stack = createNativeStackNavigator();

const App = () => {

  return (
    <NavigationContainer>{
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
      name='Home'
      component={Home}
      options={{
        headerStyle:{
          backgroundColor:"#0f4c75",
        },
        title: 'LCO netflix App',
        headerTitleStyle:{
          color:"#00b7c2",
          
        },
        headerTitleAlign:'center'
        
      }}></Stack.Screen>
      <Stack.Screen
      name='Add'
      component={Add}
      options={{
        headerStyle:{
          backgroundColor:"#0f4c75",
        
        },
        title: 'LCO Add netflix App',
        headerTitleStyle:{
          color:"#00b7c2",
         },
         headerTitleAlign:'center'
        
      }}></Stack.Screen>
      <Stack.Screen
      name='Edit'
      component={Edit}
      options={{
        headerStyle:{
          backgroundColor:"#0f4c75",
        },
        title: 'LCO Edit netflix App',
        headerTitleStyle:{
          color:"#00b7c2",
          
        },
        headerTitleAlign:'center'
        
      }}></Stack.Screen>

      </Stack.Navigator>
    }</NavigationContainer>
    
  )
}
export default App;
