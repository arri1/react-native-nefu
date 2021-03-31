import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import MainNavigation from "./mainNavigation"
import Login from "../screens/login"
import Registration from "../screens/registration"

const Stack = createStackNavigator()

const RootNav = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'Login'}
                options={
                    {
                        title: 'Вход'
                    }
                }
                component={Login}/>
            <Stack.Screen
                name={'Registration'}
                options={
                    {
                        title: 'Регистрация'
                    }
                }
                component={Registration}/>
        </Stack.Navigator>
    )
}

export default RootNav