import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import TaskScreen from '../screens/TaskScreen'
import AddTaskScreen from '../screens/AddTaskScreen'


const Stack = createStackNavigator()

const AddTaskNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TaskScreen" component = { TaskScreen }/>
            <Stack.Screen name="AddTaskScreen" component = { AddTaskScreen }/>
        </Stack.Navigator>
    )
}

export default AddTaskNavigator