import React from 'react'
import {SafeAreaView, Text} from 'react-native'

const Loader = ({navigation}) => {
    navigation.replace('Login')
    return (
        <SafeAreaView>
            <Text>Hello world</Text>
        </SafeAreaView>
    )
}

export default Loader
