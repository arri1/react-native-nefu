import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UseStateLab from '../screens/useStateLab';
import HomeScreen from '../screens/homeScreen';
import TodoList from '../screens/todoList';
import Settings from '../screens/settings';
import { Text } from 'react-native'

const TodoListStack = createStackNavigator()
const TodoListStackScreen = () => {
  return (
    <TodoListStack.Navigator>
      <TodoListStack.Screen
        name="TodoList"
        component={TodoList}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            height: 70,
            elevation: 0,
            backgroundColor: '#3b444b'
          },
          headerLeft: null,
          headerTitle: (
            <Text
              style={{
                fontFamily: 'Lora-Regular',
                fontWeight: '400',
                fontSize: 24,
                color: '#F6F6F6'
              }}
            >
              Посты
            </Text>
          )
        }}
      />
    </TodoListStack.Navigator>
  )
}

const UseStateLabStack = createStackNavigator()
const UseStateLabStackScreen = () => {
  return (
    <UseStateLabStack.Navigator>
      <UseStateLabStack.Screen
        name="UseStateLab"
        component={UseStateLab}
        options={{
          headerTitleAlign: 'center',
          headerStyle: {
            height: 70,
            elevation: 0,
            backgroundColor: '#3b444b'
          },
          headerTitle: (
            <Text
              style={{
                fontFamily: 'Lora-Regular',
                fontWeight: '400',
                fontSize: 24,
                color: '#f6f6f6'
              }}
            >
              Лаба 1
            </Text>
          ),
          headerLeft: null
        }}
      />
    </UseStateLabStack.Navigator>
  )
}

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = () => {
  return (

    <Tab.Navigator barStyle={{ backgroundColor: '#3b444b' }}>
      <Tab.Screen
        name="settings"
        component={Settings}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}

      />
      <Tab.Screen
        name="homeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="todoList"
        component={TodoListStackScreen}
        options={{
          tabBarLabel: 'Posts',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="post" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="useStateLab"
        component={UseStateLabStackScreen}
        options={{
          tabBarLabel: 'useStateLab',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="adjust" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>

  )
};
export default TabNavigator;