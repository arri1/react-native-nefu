import React, {useState} from 'react'
import {View,SafeAreaView,TouchableOpacity,Text,TextInput,StyleSheet, Button, Image} from 'react-native'
import {useApolloClient, useMutation, useQuery} from "@apollo/react-hooks"
import {showMessage} from "react-native-flash-message"
import {USER} from "../gqls/auth/queries"
import LoadingBar from "../components/loadingBar"
import {AUTH_USER} from "../gqls/auth/mutations"
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
    tch_opacity_login: {
        marginTop:35,
        height: 40,
        alignItems:'center',
        backgroundColor: '#3abeff',
        marginLeft: 50,
        marginRight:50,
        borderRadius:50
    },
    tch_opacity_sign_up: {
        marginTop:10,
        height: 40,
        alignItems:'center',
        borderColor: 'lightblue',
        borderWidth: 1,
        marginLeft: 50,
        marginRight:50,
        borderRadius:50
    },
    tch_opacity_test: {
        marginTop:50,
        height: 40,
        alignItems:'center',
        backgroundColor: 'lightblue',
        marginLeft: 50,
        marginRight:50,
        borderRadius:50
    },
    logo:{
        marginTop:20,
        width: 160,
        height: 160,
        alignSelf:'center',
        //Below lines will help to set the border radius
        borderRadius: 50,
        overflow: 'hidden',
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'stretch',

    }
})

const image = { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png" };

const Login = ({navigation})=>{
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const apollo = useApolloClient()

    const {loading: userLoading} = useQuery(USER, {
        onCompleted: ({user}) => {
            if (user)
            {
                navigation.replace('LabsViewNavigator')
                showMessage({
                    message: 'Авто-логинизация',
                    type: 'info'
                })
            }
        },
        onError: () => {

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
            
            navigation.replace('LabsViewNavigator')
            console.log("Login via Login")
        },
        onError: ({message}) => {
            console.log(message)
            if (message==='Incorrect password'){
                showMessage({
                    message: 'Неверен пароль',
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
        <SafeAreaView>
            <Image
                source={image}
                style={styles.logo}>
            </Image>

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
            
                <Text style={{marginTop:10}}>Войти</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tch_opacity_sign_up}
                title={'Log In'}
                onPress={()=>{
                    navigation.push('Registration')
                }}
            >
                <Text style={{marginTop:10}}>Регистрация</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tch_opacity_sign_up}
                title={'Log In'}
                onPress={()=>{
                    showMessage({
                        message: 'Что то пошло не так',
                        type: 'danger'
                    })
                }}
            >
                <Text style={{marginTop:10}}>Test Message</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tch_opacity_test}
                title={'Test View'}
                onPress={() => 
                    {
                        navigation.push('LabsViewNavigator')
                    }
                }>
            
                <Text style={{marginTop:10}}>Тестовый просмотр лабов</Text>
            </TouchableOpacity>
    </SafeAreaView>
    )
}

export default Login
