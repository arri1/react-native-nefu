import React, { useState } from 'react'
import { AsyncStorage, TouchableOpacity, StyleSheet, Text, TextInput, View } from "react-native"
import { useApolloClient, useMutation, useQuery } from "@apollo/client"
import { showMessage } from "react-native-flash-message"
import { USER } from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"
import { AUTH } from "../gqls/user/mutations"


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 5,
        alignSelf: 'stretch',
        backgroundColor: '#F6F6F6',
        margin: 15
    },
    button: {
        minWidth: 350,
        backgroundColor: '#197BDD',
        borderRadius: 5,
        minHeight:50,
        alignItems:'center',
        justifyContent:'center'
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color:'#FFFFFF'
    },
    Titles:{
        textAlign: 'center',
        fontSize: 25,
        fontWeight: '500',
        marginTop: 50,
        margin: 32,
        color:'#000000'
    }
        
    

    
})


const Login = ({ navigation }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isSecureEntry, setIsSecureEntry] = useState(true);
    const apollo = useApolloClient()

    const { loading: userLoading } = useQuery(USER, {
        onCompleted: ({ user }) => {
            if (user)
                navigation.push('tabNavigators')
        },
        onError: () => {

        }
    })

    const [auth, { loading: authLoading }] = useMutation(AUTH, {
        onCompleted: async ({ authUser }) => {
            await AsyncStorage.setItem('token', authUser.token)
            showMessage({
                message: 'Авторизация прошла успешно',
                type: 'info'
            })
            apollo.writeQuery({ query: USER, data: { user: authUser.user } })
            navigation.replace('tabNavigators')
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

    if (userLoading || authLoading)
        return (
            <LoadingBar />
        )
    
    return (
        <View style={styles.container}>
            <Text
                style={styles.Titles}
            >
                Авторизация
            </Text>
           
            <TextInput
                onChangeText={text => setLogin(text)}
                value={login}
                style={[styles.input, { marginTop: 8 }]}
                placeholder={'Логин'}
            />
            <TextInput
                onChangeText={text => setPassword(text)}
                value={password}
                style={[styles.input, { marginTop: 8 }]}
                placeholder={'Пароль'}
                secureTextEntry={true}
            
            />
            <View
                style={
                    { marginTop: 24 }
                }

            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={onAuth}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Войти
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={
                    {
                        marginTop: 24,
                    }
                }

            >

            </View>
            <View

                style={
                    {
                        marginTop: 16,
                        alignItems: 'center'
                    }
                }
            >     
        
                <TouchableOpacity
                    onPress={
                        () => {
                            navigation.push('Registration')
                        }
                    }
                >
                    <Text
                        style={{color: '#2F80ED'}}
                    >
                       Нет аккаунта? Зарегистрируйтесь
                    </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

export default Login
