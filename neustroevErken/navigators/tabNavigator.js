import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import UseStateLab from '../screens/useStateLab';
import HomeScreen from '../screens/homeScreen';
import TodoList from '../screens/todoList';
import Settings from '../screens/settings'

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen 
          name="settings" 
          component={Settings}
        />
        <Tab.Screen 
          name="homeScreen" 
          component={HomeScreen} 
        />
        <Tab.Screen 
          name="todoList" 
          component={TodoList} 
        />
        <Tab.Screen 
          name="useStateLab" 
          component={UseStateLab} 
        />        
      </Tab.Navigator>
    </NavigationContainer>
  )
};
export default TabNavigator;