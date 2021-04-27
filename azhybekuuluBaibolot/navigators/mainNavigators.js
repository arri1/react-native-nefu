import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import TabNavigator from "./tabNavigators"
import todoList from "../screens/todoList"

const Stack = createStackNavigator()

const MainNavigator = () => {
    return (
        
        <Stack.Navigator>
            <Stack.Screen
                name={'todoList'}
                options={
                    {headerShown: false}
                }
                component={todoList}/>            
        </Stack.Navigator>
    )
}

export default MainNavigator
