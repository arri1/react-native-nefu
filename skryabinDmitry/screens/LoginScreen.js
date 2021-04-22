import React, {useState} from 'react'
import {View,SafeAreaView,TouchableOpacity,Text,TextInput,StyleSheet} from 'react-native'
import {useApolloClient, useMutation, useQuery} from "@apollo/react-hooks"
import {showMessage} from "react-native-flash-message"
import AsyncStorage from '@react-native-async-storage/async-storage'


import {USER} from "../gqls/auth/queries"
import LoadingBar from "../components/loadingBar"
import {AUTH_USER} from "../gqls/auth/mutations"


const Login = ({ navigation })=>{
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const apollo = useApolloClient()

    const {loading: userLoading} = useQuery(USER, {
        onCompleted: ({ user }) => {
            if (user)
            {
                navigation.replace('AppNavigator')
                showMessage({
                    message: 'Авто-логинизация',
                    type: 'info'
                })
            }
        },
        onError: () => {
            console.log("Ничего не получили")
        },
        fetchPolicy:'network-only'
    })
    const [auth, {loading: authLoading}] = useMutation(AUTH_USER, {
        onCompleted: async ({authUser}) => {
            showMessage({
                message: 'Регистрация прошла успешно',
                type: 'info'
            })
            await AsyncStorage.setItem('token',authUser.token)
            apollo.writeQuery({query: USER, data: {user: authUser.user}})
            
            navigation.replace('AppNavigator')
        },
        onError: ({message}) => {
            console.log(message)
            if (message==='Incorrect password'){
                showMessage({
                    message: 'Неверный пароль или логин',
                    type: 'danger'
                })
                return  null
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
                message: 'Введите логин',
                type: 'danger'
            })
            return false
        }
        if (password === '') {
            showMessage({
                message: 'Введите пароль',
                type: 'danger'
            })
            return false
        }
        return true
    }
    const onAuth = () => {
        if (!validate())
            return null
        auth({
            variables: {
                data: {
                    login,
                    password
                }
            }
        })
    }

    if (userLoading || authLoading)
        return (
            <LoadingBar/>
        )
    return(
        <SafeAreaView style = { styles.container }>
            <Text style = { styles.logo }>
                TASK's
            </Text>

            <View>
                <View style = { styles.description_text_container }>
                    <Text style = { styles.text }>
                        Войдите в приложение
                    </Text>
                </View>

                <TextInput
                    onChangeText={text => setLogin(text)}
                    value={login}
                    style={[styles.input, {marginTop: 30}]}
                    placeholder={'Введите логин'}
                />
                <TextInput
                    onChangeText={text => setPassword(text)}
                    value={password}
                    style={[styles.input, {marginTop: 15}]}
                    placeholder={'Введите пароль'}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    style={styles.tch_opacity_login}
                    title={'Log In'}
                    onPress={() => 
                        {
                            onAuth()
                            console.log("Pressed")
                        }
                    }>
                
                    <Text style={{ color: '#fff', fontSize: 15 }}>Войти</Text>
                </TouchableOpacity>
            </View>


            <View style={ styles.tch_opacity_sign_up }>
                <Text>
                    Нет аккаунта? 
                </Text>
                <TouchableOpacity
                    title={'Log In'}
                    onPress={()=>{
                        navigation.push('Registration')
                    }}
                >
                    <Text style={{ color: '#374e8c' }}> Регистрация</Text>
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
    tch_opacity_sign_up: {
        flexDirection: 'row'
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

export default Login
