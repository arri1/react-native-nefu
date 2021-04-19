import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import TaskScreen from '../screens/TaskScreen'
import AddTaskScreen from '../screens/AddTaskScreen'


const Stack = createStackNavigator()

const AddTaskNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
              name="TaskScreen" 
              component = { TaskScreen }
              options = {{
                title: 'Задачи'
              }}
              />
            <Stack.Screen 
              name="AddTaskScreen" 
              component = { AddTaskScreen }
              options = {{
                title: 'Добавление задачи'
              }}
              />
        </Stack.Navigator>
    )
}

export default AddTaskNavigator