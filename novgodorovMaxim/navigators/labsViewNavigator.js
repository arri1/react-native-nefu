import React,{useState} from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    SafeAreaView,
    Dimensions
  } from 'react-native';
  
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UseStateLab from '../screens/useStateLab'
import TodoList from '../screens/todoList'
import Settings from '../screens/settings'

const { width, height } = Dimensions.get('screen')
const Tab = createBottomTabNavigator();

const LabsView = ({navigation})=>{
    return (
            <Tab.Navigator>
                <Tab.Screen 
                    name="useStateLab" 
                    component={UseStateLab}
                    options={{
                    tabBarLabel: 'UseStateLab',
                    tabBarIcon: ({ color }) => (
                        <Icon name="chrome" color={'green'} size={30} />
                    ),
                    }}
                />
                <Tab.Screen 
                    name="todoList" 
                    component={TodoList}
                    options={{
                    tabBarLabel: 'TodoList',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="playstation" color={'blue'} size={30} />
                    ),
                    }}
                />
                <Tab.Screen 
                    name="settings" 
                    component={Settings}
                    options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size }) => (
                        <Icon2 name="settings" color={'blue'} size={30} />
                    ),
                    }}
                />
            </Tab.Navigator>
    )
}

export default LabsView
