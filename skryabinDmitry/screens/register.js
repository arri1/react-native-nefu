import React,{useState} from 'react'
import { StyleSheet, View, SafeAreaView, TouchableOpacity, TextInput, Text } from 'react-native'
import { showMessage } from "react-native-flash-message"
import {useApolloClient, useMutation} from "@apollo/react-hooks"
import AsyncStorage from '@react-native-async-storage/async-storage';


import { REGISTER_USER } from '../gqls/auth/mutations'
import { USER } from "../gqls/auth/queries"



const Registration = ({ navigation }) => {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const apollo = useApolloClient()

    const [reg, { loading }] = useMutation(REGISTER_USER, {
        onCompleted: async ({registerUser}) => {
            await AsyncStorage.setItem('token', registerUser.token)
            showMessage({
                message: 'Регистрация прошла успешно',
                type: 'info'
            })
            apollo.writeQuery({query: USER, data: {user: registerUser.user}})
            navigation.goBack()
        },
        onError: ({message}) => {
            if (message === 'GraphQL error: Unique constraint failed on the fields: (`login`)') {
                showMessage({
                    message: 'Такой логин уже существует',
                    type: 'danger'
                })
                return null
            }
            showMessage({
                message: 'Что то пошло не так',
                type: 'danger'
            })
        }
    })

    const validate = () => {
        if (login === '') {
            showMessage({
                message: "Введите логин",
                type: "danger",
            })
            return false
        }
        if (password === '') {
            showMessage({
                message: "Введите пароль",
                type: "danger",
            })
            return false
        }
        if (password !== confirmPassword) {
            showMessage({
                message: "Пароли не совпадают",
                type: "danger",
            })
            return false
        }
        return true
    }

    const createUser = () => {
        if (!validate())
            return null
        reg({
            variables: {
                data: {
                    password,
                    login
                }
            }
        })
    }

    return (
        <SafeAreaView style = { styles.container }>
            <Text style = { styles.logo }>
                TASK's
            </Text>

            <View>
                <View style = { styles.description_text_container }>
                    <Text style = { styles.text }>
                        Создайте свой аккаунт
                    </Text>
                </View>

                <TextInput
                    onChangeText={text => setLogin(text)}
                    value={login}
                    style={[styles.input, {marginTop: 30}]}
                    placeholder={'Логин'}
                    />
                <TextInput
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    style={[styles.input, {marginTop: 15}]}
                    placeholder={'Пароль'}
                />
                <TextInput
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry={true}
                    style={[styles.input, {marginTop: 15}]}
                    placeholder={'Подтвердите пароль'}
                />
                <TouchableOpacity
                    style={styles.tch_opacity_login}
                    title={'Sign_up'}
                    onPress={() => 
                        {
                            createUser()
                            console.log("Pressed")
                        }
                    }>
                
                    <Text style={{ color: '#fff', fontSize: 15 }}> Зарегестрироваться </Text>
                </TouchableOpacity>
            </View>


            <View style={ styles.tch_opacity_sign_up }>
                <TouchableOpacity
                    title={'Back'}
                    onPress={()=>{
                        navigation.goBack()
                    }}
                >
                    <Text style={{ color: '#374e8c' }}>Назад</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>            

    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50,
        marginVertical: 50,
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    tch_opacity_login: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        height: 50,
        backgroundColor: '#374e8c',
        alignSelf: 'stretch',
        elevation: 4
    },
    logo:{
        color: '#374e8c',
        fontSize: 50,
        fontWeight: 'bold'
    },
    description_text_container: {
        marginTop:20,
        marginBottom: -10,
        width: '100%',
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 20
    },
    input: {
        marginBottom: 0,
        backgroundColor: '#fff',
        elevation: 4,
        alignSelf: 'stretch',
    }
})


export default Registration