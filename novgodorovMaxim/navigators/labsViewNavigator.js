import React,{useState} from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    SafeAreaView,
    Dimensions
  } from 'react-native';
  
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UseStateLab from '../screens/useStateLab'
import TodoList from '../screens/todoList'
import Settings from '../screens/settings'

const { width, height } = Dimensions.get('screen')
const Tab = createBottomTabNavigator();

const LabsView = ({})=>{
    return (
            <Tab.Navigator tabBarOptions={{
                activeTintColor:'#0066FF',
                inactiveTintColor:'black'
            }}>
                <Tab.Screen 
                    name="useStateLab" 
                    component={UseStateLab}
                    options={{
                    tabBarLabel: 'UseStateLab',
                    tabBarIcon: ({ color }) => (
                        <Icon2 name="chrome" color={color} size={30} />
                    ),
                    }}
                />
                <Tab.Screen 
                    name="todoList" 
                    component={TodoList}
                    options={{
                    tabBarLabel: 'TodoList',
                    tabBarIcon: ({ color, size }) => (
                        <Icon2 name="playstation" color={color} size={30} />
                    ),
                    }}
                />
                <Tab.Screen 
                    name="settings" 
                    component={Settings}
                    options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="settings" color={color} size={30} />
                    ),
                    }}
                />
            </Tab.Navigator>
    )
}

export default LabsView
