import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import tabNavigators from "./tabNavigators"
import Login from "../screens/login"
import Registration from "../screens/registration"

const Stack = createStackNavigator()

const mainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Login'}
                options={
                    {headerShown: false}
                }
                component={Login}/>
            <Stack.Screen
                name={'Registration'}
                options={
                    {headerShown: false}
                }
                component={Registration}/>
            <Stack.Screen
                name={'tabNavigators'}
                component={tabNavigators}
                options={
                    {headerShown: false}
                }
            />
        </Stack.Navigator>
    )
}

export default mainNavigator
