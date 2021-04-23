import React, {useState} from 'react'
import {Button, StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image} from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useApolloClient, useMutation, useQuery} from "@apollo/client"
import {showMessage} from "react-native-flash-message"
import {USER} from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"
import {AUTH} from "../gqls/user/mutations"
import {TextInput, DefaultTheme} from 'react-native-paper'

const styles = StyleSheet.create({
    tch_opacity_login: {
        marginTop: 35,
        height: 60,
        alignItems: 'center',
        backgroundColor: '#197BDD',
        marginLeft: 80,
        marginRight: 80,
        borderRadius: 50
    },
    tch_opacity_sign_up: {
        marginTop: 10,
        height: 60,
        alignItems: 'center',
        borderColor: 'lightblue',
        backgroundColor: '#56CCF2',
        borderWidth: 1,
        marginLeft: 110,
        marginRight: 110,
        borderRadius: 50
    },
    tch_opacity_test: {
        marginTop: 50,
        height: 40,
        alignItems: 'center',
        backgroundColor: 'lightblue',
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 50
    },
    logo: {
        marginTop: 20,
        width: 160,
        height: 160,
        alignSelf: 'center',
        borderRadius: 50,
        overflow: 'hidden',
    },
    input: {
        marginLeft: 25,
        marginRight: 25,
        alignSelf: 'stretch',
        backgroundColor:'white',
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

const image = { uri: "https://i.ytimg.com/vi/kG43Jpcem0M/maxresdefault.jpg" };

const Login = ({navigation}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const apollo = useApolloClient()

    const {loading: userLoading} = useQuery(USER, {
        onCompleted: ({user}) => {
            if (user)
                navigation.replace('MainNavigation')
        },
        onError: () => {

        }
    })

    const [auth, {loading: authLoading}] = useMutation(AUTH, {
        onCompleted: async ({authUser}) => {
            await AsyncStorage.setItem('token', authUser.token)
            showMessage({
                message: 'Регистрация прошла успешно',
                type: 'info'
            })
            apollo.writeQuery({query: USER, data: {user: authUser.user}})
            navigation.replace('MainNavigation')
        },                                  
        onError: ({message}) => {
            console.log(message)
            if (message==='GraphQL error: Incorrect password'){
                showMessage({
                    message: 'Неверный пароль',
                    type: 'danger'
                })
                return  null
            }
            showMessage({
                message: 'Что-то пошло не так',
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
    return (
        <SafeAreaView>
            <Image
                source={image}
                style={styles.logo}>
            </Image>

            <TextInput
                onChangeText={text => setLogin(text)}
                value={login}
                style={[styles.input, { marginTop: 30 }]}
                placeholder={'Введите логин'}
                mode='outlined'
                left={
                    <TextInput.Icon
                    name={()=><Icon name='user' size={24}/>}
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
                secureTextEntry={true}
                left={
                    <TextInput.Icon
                    styles={{marginLeft:50}}
                    name={()=><Icon name='lock' size={24}/>}
                    />
                }
                mode='outlined'
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

                <Text style={{ fontSize:18, marginTop: 18, color:'white', }}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tch_opacity_sign_up}
                title={'Log In'}
                onPress={() => {
                    navigation.push('Registration')
                }}
            >
                <Text style={{ fontSize:18, marginTop: 15, color:'white' }}>Sign Up</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )
}
export default Login
