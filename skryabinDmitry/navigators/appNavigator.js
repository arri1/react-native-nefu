import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'


import ProfileNavigator from './profileNavigator'


import Lab2 from '../screens/lab2'
import ToDo from '../screens/tasks'

const Stack = createStackNavigator()
const Stack2 = createStackNavigator()

const createHomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name = "Main" 
      component = { ToDo }
      options = {{
        title: 'Задачи'
      }} />
  </Stack.Navigator>
)

const createlab2Stack = () => (
  <Stack2.Navigator>
    <Stack2.Screen 
      name = "lab2" 
      component = { Lab2 }
      options = {{
        title: 'LAB2'
      }} />
  </Stack2.Navigator>
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
          name="lab2" 
          component={ createlab2Stack }
          options={{
            tabBarLabel: 'Lab2',
            tabBarIcon: ({ color }) => (
              <Icon name="code-branch" color={color} size={25}/>
            ),
          }}
      />
      <Tab.Screen 
          name="AddTaskNavigator" 
          component={ createHomeStack }
          options={{
            tabBarLabel: 'Задачи',
            tabBarIcon: ({ color }) => (
              <Icon name="tasks" color={color} size={25}/>
            ),
          }}
      />
      <Tab.Screen 
          name="settings" 
          component={ ProfileNavigator }
          options={{
            tabBarLabel: 'Профиль',
            tabBarIcon: ({ color }) => (
              <Icon name="user" color={color} size={25}/>
            ),
          }}
      />
    </Tab.Navigator>
  )
}

export default AppNavigator