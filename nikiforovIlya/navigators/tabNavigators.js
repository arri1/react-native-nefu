import React from 'react'
import UseStateLab from '../screens/useStateLab'
import Settings from '../screens/settings'
import TodoList from '../screens/todoList'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import UseMemoLab from '../screens/useMemoLab'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const Tab = createBottomTabNavigator();

const TabNavigator = ()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen 
            name="Главная"  
            component={UseStateLab}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ) }}
            />
            <Tab.Screen 
            name="Посты" 
            component={UseMemoLab} 
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="newspaper" color={color} size={size} />
                ) }}
            />
       
            <Tab.Screen 
            name="Профиль" 
            component={Settings}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-edit" color={color} size={size} />
                ) }}
            />
            
        </Tab.Navigator>
    )
}

export default TabNavigator
