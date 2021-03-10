import React from 'react'
import {SafeAreaView,TouchableOpacity,Text} from 'react-native'

const Login = ({navigation})=>{
    return(
        <SafeAreaView>
            <TouchableOpacity
                onPress={()=>{
                    navigation.push('Registration')
                }}
            >
                <Text>
                    Регистрация
                </Text>
            </TouchableOpacity>
    </SafeAreaView>
    )
}

export default Login
