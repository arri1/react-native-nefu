import React from 'react'
import {SafeAreaView, Text} from 'react-native'

const Loader = ({ navigation }) => {
  navigation.replace('Login')
    return (
        <SafeAreaView style = {{ backgroundColor: '#374e8c' }}>
            <Text>Приветсвую!</Text>
        </SafeAreaView>
    )
}

export default Loader
