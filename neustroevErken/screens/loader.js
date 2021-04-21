import React from 'react'
import { SafeAreaView, Text } from 'react-native'
import Login from './login'

const Loader = ({ navigation }) => {
    navigation.replace('login', { screen: Login })
    return (
        <SafeAreaView>
            <Text>Hi guys</Text>
        </SafeAreaView>
    )
}

export default Loader