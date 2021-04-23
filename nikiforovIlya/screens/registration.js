import React, {useState} from 'react'
import {AsyncStorage, TouchableOpacity, Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native'
import {showMessage} from "react-native-flash-message"
import {useApolloClient, useMutation} from "@apollo/client"
import {REG} from "../gqls/user/mutations"
import {USER} from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
       flex: 1
        
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 20,
        alignSelf: 'stretch',
        margin: 15
    },
    button: {
        minWidth: 180,
        backgroundColor: '#197BDD',
        borderRadius: 50,
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
        marginTop: 30,
        color:'#000000'
    }
})

const Registration = ({navigation}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const apollo = useApolloClient()

    const [reg, {loading}] = useMutation(REG, {
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

    if (loading)
        return (
            <LoadingBar/>
        )

    return (
        
        <ScrollView
        
            style={styles.container}
        >
              <Text
                style={styles.Titles}
            >
                Регистрация
            </Text>
            <Text
                style={{color: '#959595', textAlign: 'center', marginTop: 80}}
            >
                Заполните все поля, чтобы создать аккаунт
            </Text>
            <TextInput
                onChangeText={text => setLogin(text)}
                value={login}
                style={[styles.input,{marginTop: 8}]}
                placeholder={'Введите логин'}
            />
            <TextInput
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                style={[styles.input, {marginTop: 8}]}
                placeholder={'Введите пароль'}
            
            
            />
            <TextInput
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
                style={[styles.input, {marginTop: 8}]}
                placeholder={'Повторите пароль'}
            />
          
            <View
                style={
                    {
                        marginTop: 24,
                        borderRadius: 66.7,
                        alignItems: 'center'
                    }
                }
            >
                 <TouchableOpacity
                    style={styles.button}
                    onPress={createUser}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Регистрация
                    </Text>
                </TouchableOpacity>
                
            </View>
           
            <View 
                
                style={
                    {
                        marginTop: 8,
                        alignItems: 'center'
                    }
                }
            >
            
                <Text
                    style={{color: '#959595'}}
                >   
                    Уже есть аккаунт?
               
                <TouchableOpacity
                    onPress={
                        () => {
                            navigation.push('Login')
                        }
                    }
                >
                    <Text
                        style={{color: '#2F80ED'}}
                    >
                        Войдите
                    </Text>
                </TouchableOpacity>
                </Text> 
                <Text
                    style={{color: '#2F80ED'}}
                >   
                    Забыли логин или пароль?  
                </Text>
            </View>
        </ScrollView>
    )
}

export default Registration
