import React from 'react'
import UseStateLab from '../screens/useStateLab'
import UseMemoLab from '../screens/useMemoLab'
import TodoList from '../screens/todoList'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
const Tab = createBottomTabNavigator();

const TabNavigator = ()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="useStateLab" component={UseStateLab} />
            <Tab.Screen name="useMemoLab" component={UseMemoLab} />
            <Tab.Screen name="todoList" component={TodoList} />
        </Tab.Navigator>
    )
}

export default TabNavigator