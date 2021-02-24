import React,{useState} from 'react'
import {SafeAreaView,TouchableOpacity,TextInput,Text} from 'react-native'

const Registration = ({navigation})=>{
    const [login,setLogin] = useState('')

    return (
        <SafeAreaView>
            <TextInput
                value={login}
                onChange={(value)=>setLogin(value)}
                placeholder={'Логин'}
            />
            <TextInput
                placeholder={'Пароль'}
            />
            <TextInput
                placeholder={'Имя'}
            />
            <TouchableOpacity>
                <Text>Регистрация</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Registration
