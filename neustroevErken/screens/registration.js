import React, { useState } from 'react'
import { AsyncStorage, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper'
import { showMessage } from "react-native-flash-message"
import { useApolloClient, useMutation } from "@apollo/client"
import { REG } from "../gqls/user/mutations"
import { USER } from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"

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
    textInputStyle: {
        backgroundColor: 'transparent',
         fontSize: 14
    },
    buttonText: {
        color: 'white', 
        textAlign: 'center', 
        marginTop: 20, 
        textDecorationLine: 'underline', 
        fontSize: 12
    }
    
})

const Registration = ({ navigation }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const apollo = useApolloClient()

    const [reg, { loading }] = useMutation(REG, {
        onCompleted: async ({ registerUser }) => {
            await AsyncStorage.setItem('token', registerUser.token)
            showMessage({
                message: 'Регистрация прошла успешно',
                type: 'info'
            })
            apollo.writeQuery({ query: USER, data: { user: registerUser.user } })
            navigation.goBack()
        },
        onError: ({ message }) => {
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

    const textInputTheme = {
        colors: {
            primary: 'white',
            text: '#f6f6f6',
            placeholder: '#f6f6f6'
        }
    }

    if (loading)
        return (
            <LoadingBar />
        )

    return (
        <View style={styles.MainContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Регистрация</Text>
                <TextInput
                    onChangeText={text => setLogin(text)}
                    value={login}
                    underlineColor={'#f6f6f6'}
                    theme={textInputTheme}
                    style={ styles.textInputStyle }
                    placeholder={'Введите логин'}
                />
                <TextInput
                    onChangeText={text => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                    underlineColor={'#f6f6f6'}
                    theme={textInputTheme}
                    style={ styles.textInputStyle }
                    placeholder={'Введите пароль'}
                />
                <TextInput
                    onChangeText={text => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry={true}
                    underlineColor={'#f6f6f6'}
                    theme={textInputTheme}
                    style={ styles.textInputStyle }
                    placeholder={'Повторите пароль'}
                />
                <View
                    style={
                        {
                            marginTop: 70,
                            alignItems: 'center'
                        }
                    }
                >
                    <Button
                        title={'Создать'}
                        onPress={createUser}
                        buttonStyle={styles.button1}
                    />
                </View>
                <TouchableOpacity onPress={
                    () => {
                        navigation.goBack()
                    }
                }>
                    <Text style={styles.buttonText}>Уже есть аккаунт</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Registration