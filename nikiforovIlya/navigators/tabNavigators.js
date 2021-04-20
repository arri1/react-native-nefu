import React from 'react'
import UseStateLab from '../screens/useStateLab'
import Settings from '../screens/settings'
import TodoList from '../screens/todoList'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import UseMemoLab from '../screens/useMemoLab'
const Tab = createBottomTabNavigator();

const TabNavigator = ()=>{
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={UseStateLab}/>
            <Tab.Screen name="USe" component={UseMemoLab} />
            <Tab.Screen name="todoList" component={TodoList} />
            <Tab.Screen name="Profile" component={Settings}/>
            
        </Tab.Navigator>
    )
}

export default TabNavigator
