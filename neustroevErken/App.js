import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import UseStateLab from './screens/useStateLab';
import HomeScreen from './screens/homeScreen';
import TodoList from './screens/todoList'

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="useStateLab" 
          component={UseStateLab}
        />
        <Tab.Screen 
          name="homeScreen" 
          component={HomeScreen} 
        />
        <Tab.Screen 
          name="todoList" 
          component={TodoList} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
};
export default App;