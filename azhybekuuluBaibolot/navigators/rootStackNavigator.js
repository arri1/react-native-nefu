import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Loader from '../screens/loader'
import TodoList from '../screens/todoList'
import TabNavigator from './tabNavigators'

const Stack = createStackNavigator()

const RootStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigator" component={TabNavigator}/>
            <Stack.Screen name="Loader" component={Loader}/>
            <Stack.Screen name="TodoList" component={TodoList}/>
        </Stack.Navigator>
    )
}

export default RootStackNavigator
