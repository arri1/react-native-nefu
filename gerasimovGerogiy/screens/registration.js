import React,{useState} from 'react'
import {SafeAreaView,TouchableOpacity,TextInput,Text} from 'react-native'
import {useMutation} from '@apollo/client'

import {REGISTER_USER} from '../gqls/auth/mutations'

const Registration = ({navigation})=>{

    const [login,setLogin] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')

    const [reg,{loading}]=useMutation(REGISTER_USER,{
        onCompleted:()=>{
            console.log('bingo')
        },
        onError:({message})=>{
            console.error(message)
        }
    })

    return (
        <SafeAreaView>
            <TextInput
                value={login}
                onChange={(value)=>setLogin(value)}
                placeholder={'Логин'}
            />
            <TextInput
                value={password}
                onChange={(value)=>setPassword(value)}
                placeholder={'Пароль'}
            />
            <TextInput
                value={name}
                onChange={(value)=>setName(value)}
                placeholder={'Имя'}
            />
            <TouchableOpacity
                onPress={()=>{
                    reg({
                        variables:{
                            data:{
                                login,
                                password,
                                name
                            }
                        }
                    })
                }}
            >
                <Text>Регистрация</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default Registration
