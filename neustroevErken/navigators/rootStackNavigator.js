import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Loader from '../screens/loader'
import Login from '../screens/login'
import Registration from '../screens/registration'
import TabNavigator from './tabNavigator'

const Stack = createStackNavigator()

const RootStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'loader'}
                options={
                    {
                        title: 'Загрузка'
                    }
                }
                component={Loader} />
            <Stack.Screen
                name={'login'}
                options={
                    {
                        title: 'Вход'
                    }
                }
                component={Login} />
            <Stack.Screen
                name={'registration'}
                options={
                    {
                        title: 'Регистрация'
                    }
                }
                component={Registration} />
            <Stack.Screen
                name={'tabNavigator'}
                component={TabNavigator}
                options={
                    { headerShown: false }
                }
            />
        </Stack.Navigator>
    )
}

export default RootStackNavigator