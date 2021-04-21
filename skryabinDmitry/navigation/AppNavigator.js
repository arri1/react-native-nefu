import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'

import AddTaskNavigator from './AddTaskNavigator'
import ProfileNavigator from './ProfileNavigator'


import MainScreen from '../screens/MainScreen'
import ProfileScreen from '../screens/ProfileScreen'
import { StackRouter } from 'react-navigation';
import TaskScreen from '../screens/TaskScreen';
import { BackgroundImage } from 'react-native-elements/dist/config';

const Stack = createStackNavigator()

const createHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name = "Main" 
      component = { MainScreen }
      options = {{
        title: 'Главная'
      }} 
      />
  </Stack.Navigator>
)

const createProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name = "Profile" 
      component = { ProfileScreen }
      options = {{
        title: 'Профиль'
      }} />
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator();

const AppNavigator = ()=>{
  return (
          <Tab.Navigator
            tabBarOptions = {{
              activeTintColor: '#374e8c'
            }}
          >
              <Tab.Screen 
                  name="MainScreen" 
                  component={ createHomeStack }
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
                  component={ ProfileNavigator }
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