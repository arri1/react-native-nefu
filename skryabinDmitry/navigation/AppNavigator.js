import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import AddTaskNavigator from './AddTaskNavigator'
import ProfileNavigator from './ProfileNavigator'


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