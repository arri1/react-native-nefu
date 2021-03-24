import React, {useState} from 'react'
import {View,SafeAreaView,TouchableOpacity,Text,TextInput,StyleSheet, Button, Image} from 'react-native'
import {useApolloClient, useMutation, useQuery} from "@apollo/react-hooks"
import {showMessage} from "react-native-flash-message"
import {USER} from "../gqls/auth/queries"
import LoadingBar from "../components/loadingBar"
import {AUTH_USER} from "../gqls/auth/mutations"

const styles = StyleSheet.create({
    tch_opacity: {
        marginTop:50,
        height: 40,
        alignItems:'center',
        backgroundColor: 'lightblue'
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
                navigation.replace('LabsViewNavigator')
        },
        onError: () => {

        },
        fetchPolicy:'network-only'
    })
    const [auth, {loading: authLoading}] = useMutation(AUTH_USER, {
        onCompleted: async ({authUser}) => {
            await AsyncStorage.setItem('token', authUser.token)
            showMessage({
                message: 'Регистрация прошла успешно',
                type: 'info'
            })
            apollo.writeQuery({query: USER, data: {user: authUser.user}})
            navigation.replace('LabsViewNavigator')
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

            <View style={{marginTop: 24}}>
                <Button
                    title={'Войти'}
                    onPress={onAuth}
                />
            </View>

            <TouchableOpacity
                onPress={()=>{
                    navigation.push('Registration')
                }}
            >
                <Text>Регистрация</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tch_opacity}
                title={'Press X to Win'}
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
