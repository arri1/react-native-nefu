import React, {useState} from 'react'
import {Button, ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from "react-native-flash-message"
import {useApolloClient, useMutation} from "@apollo/client"
import {REG} from "../gqls/user/mutations"
import {USER} from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"
import Icon from 'react-native-vector-icons/FontAwesome5';
import {TextInput, DefaultTheme} from 'react-native-paper'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 25,
    },
    input: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
    },
    tch_opacity_create_acc: {
        marginTop: 35,
        height: 60,
        alignItems: 'center',
        backgroundColor: '#197BDD',
        marginLeft: 80,
        marginRight: 80,
        borderRadius: 50
    },
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
                message: 'Что-то пошло не так',
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
            <Text style={{marginTop:25, alignSelf:'center', fontSize:16}}>Заполните все поля для создания аккаунта</Text>
            <TextInput
                onChangeText={text => setLogin(text)}
                value={login}
                style={[styles.input,{marginTop: 20}]}
                placeholder={'Введите логин'}
                mode='outlined'
                theme={theme}
                left={
                    <TextInput.Icon
                    styles={{marginLeft:50}}
                    name={()=><Icon name='user' size={24}/>}
                    />
                }
            />
            <TextInput
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry={true}
                style={[styles.input, {marginTop: 20}]}
                placeholder={'Введите пароль'}
                mode='outlined'
                theme={theme}
                left={
                    <TextInput.Icon
                    styles={{marginLeft:50}}
                    name={()=><Icon name='lock' size={24}/>}
                    />
                }
            />
            <TextInput
                onChangeText={text => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
                style={[styles.input, {marginTop: 20}]}
                placeholder={'Повторите пароль'}
                mode='outlined'
                theme={theme}
                left={
                    <TextInput.Icon
                    styles={{marginLeft:50}}
                    name={()=><Icon name='lock' size={24}/>}
                    />
                }
            />
            <TouchableOpacity
                style={styles.tch_opacity_create_acc}
                title={'Log In'}
                onPress={() => {createUser()}}>
                <Text style={{ fontSize:18, marginTop: 18, color:'white', }}>Create Account</Text>
            </TouchableOpacity>

        </ScrollView>
    )
}
export default Registration
