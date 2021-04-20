import React, {useState} from 'react'
import {AsyncStorage,Image,TouchableOpacity, Button, StyleSheet, Text, TextInput, View} from 'react-native'
import {useApolloClient, useMutation, useQuery} from "@apollo/client"
import {USER} from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"
import {UPDATE_USER} from "../gqls/user/mutations"
import {showMessage} from "react-native-flash-message"

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 24
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        height: 80,
        paddingTop: 38,
        justifyContent: "flex-start"
        
    },
    input: {
        minWidth: 180,
        minHeight: 20,
        borderWidth: 0.5,
        borderRadius: 20,
        alignSelf: 'stretch',
        justifyContent:'center',
        marginTop: 14,
        margin: 14
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
    avatar:{
        flexDirection: "row",
        backgroundColor: '#D5E6FB',
        width: "36%",
        marginTop: 10,
        marginRight: 150,
        marginVertical: 80,
        padding: 50
    },
    title: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    }
})

const Settings = ({navigation}) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [group, setGroup] = useState('')
    const [name, setName] = useState('')

    const apollo = useApolloClient()

    const {loading: userLoading} = useQuery(USER, {
        onCompleted: ({user}) => {
            setGroup(user.group)
            setName(user.name)
        },
        onError: () => {

        }
    })

    const [save, {loading: saveLoading}] = useMutation(UPDATE_USER, {
        onCompleted: ({user}) => {
            apollo.writeQuery({query: USER, data: {user}})
            showMessage({
                message: 'Сохранено',
                type: 'info'
            })
        },
        onError: () => {
            showMessage({
                message: 'что то пошло не так',
                type: 'danger'
            })
        }
    })

    const logOut = async () => {
        apollo.writeQuery({query: USER, data: {user: null}})
        await AsyncStorage.setItem('token', '')
        navigation.replace('Login')
    }

    const validate = () => {
        if (group === '') {
            showMessage({
                message: 'Введите группу',
                type: 'danger'
            })
            return false
        }
        if (name === '') {
            showMessage({
                message: 'Введите имя',
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
        if (password !== confirmPassword) {
            showMessage({
                message: 'Пароли не совпадают',
                type: 'danger'
            })
            return false
        }
        return true
    }

    const onSave = () => {
        if (!validate()) {
            return null
        }
        save({
            variables: {
                data: {
                    group: {set: group},
                    name: {set: name},
                    password: {set: password}
                }
            }
        })
    }

    if (userLoading || saveLoading)
        return (
            <LoadingBar/>
        )

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Профиль</Text> 
            <Text 
                style={styles.avatar}
            >
                avatar
            </Text>           
            <TextInput
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder={'Имя'}
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) => setGroup(text)}
                value={group}
                placeholder={'Группа'}
                style={styles.input}
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder={'Новый пароль'}
                style={styles.input}
                secureTextEntry={true}
            />
            <TextInput
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
                placeholder={'Повторите пароль'}
                style={styles.input}
            />
            <View
                style={
                    {
                        marginTop: 24,
                        alignItems: 'center'
                    }
                }
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={onSave}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Сохранить
                    </Text>
                </TouchableOpacity>
            </View>
            <View
                style={
                    {
                        marginTop: 24,
                        alignItems: 'center'
                    }
                }
            >
                <TouchableOpacity
                    style={styles.button}
                    onPress={logOut}
                >
                    <Text
                        style={styles.buttonText}
                    >
                        Выйти
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Settings
