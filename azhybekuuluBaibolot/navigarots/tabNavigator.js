import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
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
      </Tab.Navigator>
    </NavigationContainer>
  )
};
export default TabNavigator;