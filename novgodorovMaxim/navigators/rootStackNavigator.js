import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Loader from '../screens/loader'
import Login from '../screens/login'
import LabsViewNavigator from './labsViewNavigator'
import Registration from '../screens/registration'
import Settings_Edit_Account from '../screens/settings_edit_profile'

const Stack = createStackNavigator()

const RootStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="LabsViewNavigator" component={LabsViewNavigator}/>
            <Stack.Screen name="Registration" component={Registration}/>
            <Stack.Screen name="Edit Account" component={Settings_Edit_Account}/>
        </Stack.Navigator>
    )
}

export default RootStackNavigator
