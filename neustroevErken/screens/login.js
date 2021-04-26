import React, { useState } from 'react'
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper'
import { useApolloClient, useMutation, useQuery } from "@apollo/client"
import { showMessage } from "react-native-flash-message"
import { USER } from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"
import { AUTH } from "../gqls/user/mutations"

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 32,
        color: '#f6f6f6',
        marginTop: 70,
        marginVertical: 70,
    },
    container: {
        flex: 1,
        margin: 15,
    },
    MainContainer:
    {
        flex: 1,
        backgroundColor: '#2c2c2c',
    },
    button1: {
        borderRadius: 50,
        width: 200
    },
    buttonText: {
        color: 'white', 
        textAlign: 'center', 
        marginTop: 20, 
        textDecorationLine: 'underline', 
        fontSize: 12
    }

})

const Login = ({ navigation }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const apollo = useApolloClient()

    const { loading: userLoading } = useQuery(USER, {
        onCompleted: ({ user }) => {
            if (user) {
                navigation.push('tabNavigator')
            }
        },
        onError: () => {

        }
    })

    const [auth, { loading: authLoading }] = useMutation(AUTH, {
        onCompleted: async ({ authUser }) => {
            await AsyncStorage.setItem('token', authUser.token)
            showMessage({
                message: 'Регистрация прошла успешно',
                type: 'info'
            })
            apollo.writeQuery({ query: USER, data: { user: authUser.user } })
            navigation.replace('tabNavigator')
        },
        onError: ({ message }) => {
            console.log(message)
            if (message === 'GraphQL error: Incorrect password') {
                showMessage({
                    message: 'Неверен пароль',
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

    const textInputTheme = {
        colors: {
            primary: 'white',
            text: '#f6f6f6',
            placeholder: '#f6f6f6'
        }
    }

    if (userLoading || authLoading)
        return (
            <LoadingBar />
        )
    return (
        <View style={styles.MainContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Вход</Text>
                <TextInput
                    onChangeText={text => setLogin(text)}
                    value={login}
                    underlineColor={'#f6f6f6'}
                    theme={textInputTheme}
                    style={{ backgroundColor: 'transparent', fontSize: 14 }}
                    placeholder={'Имя пользователя'}
                />
                <TextInput
                    onChangeText={text => setPassword(text)}
                    value={password}

                    placeholder={'Пароль'}
                    secureTextEntry={true}
                    underlineColor={'#f6f6f6'}
                    theme={textInputTheme}
                    style={{ backgroundColor: 'transparent', fontSize: 14 }}
                />
                <View
                    style={
                        {
                            marginTop: 70,
                            alignItems: 'center',
                        }
                    }
                >
                    <Button
                        title={'Войти'}
                        onPress={onAuth}
                        buttonStyle={styles.button1}
                    />
                </View>
                <TouchableOpacity onPress={
                    () => {
                        navigation.push('registration')
                    }
                }>
                    <Text style={ styles.buttonText }>Создать свой аккаунт</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Login