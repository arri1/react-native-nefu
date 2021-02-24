import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  SafeAreaView,
  Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UseStateLab from './screens/useStateLab'
import UseMemoLab from './screens/useMemoLab'
import TodoList from './screens/todoList'

const { width, height } = Dimensions.get('screen')


const Tab = createBottomTabNavigator();


const App = () => {
  return (
    <SafeAreaView
      style={{ width, height }}
    >
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen 
            name="useStateLab" 
            component={UseStateLab}
            options={{
              tabBarLabel: 'UseStateLab',
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="bell" color={color} size={36} />
              ),
            }}
          />
          <Tab.Screen 
            name="todoList" 
            component={TodoList}
            options={{
              tabBarLabel: 'TodoList',
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>

    </SafeAreaView>
  );
}

export default App;
