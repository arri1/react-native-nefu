import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'


import AppNavigator from './appNavigator'


import Login from '../screens/login'
import Register from '../screens/register'


const Stack = createStackNavigator()

const LoginNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component = { Login } options = {{ headerShown: false }} />
            <Stack.Screen name="Registration" component = { Register } options = {{ headerShown: false }} />
            <Stack.Screen name="AppNavigator" component = { AppNavigator } options = {{ title: 'Задачи', headerShown: false }} />
        </Stack.Navigator>
    )
}

export default LoginNavigator