import React from 'react'
import TodoListItem from '../components/todoListItem'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';




const Tab = createBottomTabNavigator();

const TabNavigator = ()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen 
            name="Главная"  
            component={TodoListItem}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="home" color={color} size={size} />
                ) }}
            />
            <Tab.Screen 
            name="Посты" 
            component={TodoListItem} 
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="newspaper" color={color} size={size} />
                ) }}
            />
       
            <Tab.Screen 
            name="Профиль" 
            component={TodoListItem}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account-edit" color={color} size={size} />
                ) }}
            />
            
        </Tab.Navigator>
    )
}

export default TabNavigator
