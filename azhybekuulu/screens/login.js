import React, {useState} from 'react'
import {AsyncStorage, Button, StyleSheet, Text, TextInput, View} from "react-native"
import {useApolloClient, useMutation, useQuery} from "@apollo/client"
import {showMessage} from "react-native-flash-message"
import {USER} from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"
import {AUTH} from "../gqls/user/mutations"

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        margin: 15
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'stretch',
    }
})

const Login = ({navigation}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    const apollo = useApolloClient()

    const {loading: userLoading} = useQuery(USER, {
        onCompleted: ({user}) => {
            if (user)
                navigation.push('tabNavigators')
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
            navigation.replace('tabNavigators')
        },
        onError: ({message}) => {
            console.log(message)
            if (message==='GraphQL error: Incorrect password'){
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
    return (
        <View style={styles.container}>
            <Text>Логин</Text>
            <TextInput
                onChangeText={text => setLogin(text)}
                value={login}
                style={[styles.input, {marginTop: 8}]}
                placeholder={'Введите логин'}
            />
            <Text style={{marginTop: 24}}>Пароль</Text>
            <TextInput
                onChangeText={text => setPassword(text)}
                value={password}
                style={[styles.input, {marginTop: 8}]}
                placeholder={'Введите пароль'}
                secureTextEntry={true}
            />
            <View
                style={
                    {marginTop: 24}
                }

            >
                <Button
                    title={'Войти'}
                    onPress={onAuth}
                />
            </View>
            <View
                style={
                    {
                        marginTop: 24,
                    }
                }

            >
                <Button
                    title={'Регистрация'}
                    style={{paddingTop: 24}}
                    onPress={
                        () => {
                            navigation.push('Registration')
                        }
                    }
                />
            </View>
        </View>
    )
}

export default Login
