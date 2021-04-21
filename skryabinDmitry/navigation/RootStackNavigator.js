import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from '@react-navigation/stack'


import AppNavigator from './AppNavigator'


import Loader from '../screens/LoaderScreen'
import Login from '../screens/LoginScreen'
import Registration from '../screens/RegistrationScreen'


const Stack = createStackNavigator()

const RootStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Loader" component = { Loader } options = {{ headerShown: false }} />
            <Stack.Screen name="Login" component = { Login } options = {{ headerShown: false }} />
            <Stack.Screen name="Registration" component = { Registration } options = {{ headerShown: false }} />
            <Stack.Screen name="AppNavigator" component = { AppNavigator } options = {{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default RootStackNavigator


