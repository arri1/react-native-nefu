import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import ProfileNavigator from './profileNavigator'


import ToDo from '../screens/tasks'


const Tab = createBottomTabNavigator();

const AppNavigator = ()=>{
  return (
    <Tab.Navigator
      tabBarOptions = {{
        activeTintColor: '#374e8c'
      }}
    >
      <Tab.Screen 
          name="AddTaskNavigator" 
          component={ ToDo }
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