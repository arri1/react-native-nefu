import React, {useState} from 'react'
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApolloClient, useMutation, useQuery} from "@apollo/client"
import {showMessage} from "react-native-flash-message"
import {USER} from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"
import { AUTH_USER } from "../gqls/auth/mutations"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {TextInput, DefaultTheme} from 'react-native-paper'

import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
    tch_opacity_login: {
        marginTop: 35,
        height: 50,
        alignItems: 'center',
        backgroundColor: '#197BDD',
        marginLeft: 80,
        marginRight: 80,
        borderRadius: 50,
        borderColor: 'blue'

    },
    input: {
        height: 50,
        marginLeft: 25,
        marginRight: 25,
        alignSelf: 'stretch',
        backgroundColor:'white'
    }
})

const theme = {
    ...DefaultTheme,
    roundness: 40,
    colors: {
      ...DefaultTheme.colors,
      primary: '#197BDD',
      accent: '#f1c40f',
    },
  };

const Login = ({ navigation }) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const apollo = useApolloClient()

    const { loading: userLoading } = useQuery(USER, {
        onCompleted: async({ user }) => {
            if (user) {
                navigation.replace('Main')
                showMessage({
                    message: 'Авто-логинизация',
                    type: 'info'
                })
            }
        },
        onError: () => {

        },
        fetchPolicy: 'network-only'
    })
        const [auth, {loading: authLoading}] = useMutation(AUTH, {
        onCompleted: async ({authUser}) => {
            await AsyncStorage.setItem('token', authUser.token)
            showMessage({
                message: 'Регистрация прошла успешно',
                type: 'info'
            })
            await AsyncStorage.setItem('token', authUser.token)
            apollo.writeQuery({ query: USER, data: { user: authUser.user } })

            navigation.replace('Main')
            console.log("Login via Login")
        },
        onError: ({ message }) => {
            console.log(message)
            if (message === 'Incorrect password') {
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
        <SafeAreaView>
            <View>
            <Text style={{
                textAlign: 'center',
                marginTop: 100,
                fontSize: 24,
                color: 'black',
                fontWeight: 'bold'
            }} >
                Добрый день!
            </Text>
            <Text style={{
                textAlign: 'center',
                marginTop: 10,
                fontSize: 12,
                color: 'grey',
                
            }} >
                Введите свою почту и пароль, чтобы войти
            </Text>
            </View>

            <TextInput
                onChangeText={text => setLogin(text)}
                value={login}
                style={[styles.input, { marginTop: 30 }]}
                placeholder={'Введите логин'}
                mode='outlined'
                left={
                    <TextInput.Icon
                    style={{marginTop: 10 }}
                    name={()=><Icon name='address-card' size={14}/>}
                    />
                }
                theme={theme}
            />
            
            <TextInput
                onChangeText={
                    text => setPassword(text)
                }
                value={password}
                style={[styles.input, { color: "blue",marginTop: 15 }]}
                placeholder={'Введите пароль'}
                mode='outlined'
                secureTextEntry={true}
                left={
                    <TextInput.Icon
                    name={()=><Icon name='lock' size={14}/>}
                    />
                }
                theme={theme}
            />

            <TouchableOpacity
                style={styles.tch_opacity_login}
                title={'Log In'}
                onPress={() => {
                    onAuth()
                    console.log("Pressed")
                }
                }>

                <Text style={{ fontSize:18, marginTop: 12, color:'white', }}>Войти</Text>
            </TouchableOpacity>

                <TouchableOpacity
                title={'Log In'}
                onPress={() => {
                    navigation.push('Registration')
                }}
            >
                <Text style={{ textAlign: 'center', fontSize:12, color:'dodgerblue', marginTop:10 }}>Нет аккаунта? Зарегистрируйтесь</Text>
            </TouchableOpacity>
        
        
        </SafeAreaView>
    )
}
export default Login