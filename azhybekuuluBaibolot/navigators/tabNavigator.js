import React from 'react'
import UseStateLab from '../screens/useStateLab'
import Settings from '../screens/settings'
import TodoList from '../screens/todoList'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator();

const TabNavigator = ()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="useStateLab" component={UseStateLab} />
            <Tab.Screen name="Settings" component={Settings}/>
            <Tab.Screen name="todoList" component={TodoList} />
        </Tab.Navigator>
    )
}

export default TabNavigator