import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from './tabNavigator'

const Stack = createStackNavigator()

const RootStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="TabNavigator" component={TabNavigator}/>
        </Stack.Navigator>
    )
}

export default RootStackNavigator
