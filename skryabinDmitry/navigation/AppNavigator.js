import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AddTaskNavigator from './AddTaskNavigator'


import MainScreen from '../screens/MainScreen'
import ProfileScreen from '../screens/ProfileScreen'


const Tab = createBottomTabNavigator();

const AppNavigator = ()=>{
  return (
          <Tab.Navigator
            tabBarOptions = {{
              activeTintColor: '#5cf4f3'
            }}
          >
              <Tab.Screen 
                  name="MainScreen" 
                  component={ MainScreen }
                  options={{
                    tabBarLabel: 'Главная',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="home" color={color} size={25}/>
                    ),
                  }}
              />
              <Tab.Screen 
                  name="AddTaskNavigator" 
                  component={ AddTaskNavigator }
                  options={{
                    tabBarLabel: 'Задачи',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="journal-whills" color={color} size={25}/>
                    ),
                  }}
              />
              <Tab.Screen 
                  name="settings" 
                  component={ ProfileScreen }
                  options={{
                    tabBarLabel: 'Профиль',
                    tabBarIcon: ({ color, size }) => (
                      <Icon name="user-circle" color={color} size={25}/>
                    ),
                  }}
              />
          </Tab.Navigator>
  )
}

export default AppNavigator