import React, { useState } from 'react'
import { AsyncStorage, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements';
import { TextInput } from 'react-native-paper'
import { useApolloClient, useMutation, useQuery } from "@apollo/client"
import { showMessage } from "react-native-flash-message"
import LoadingBar from "../components/loadingBar"
import { USER } from "../gqls/user/queries"
import { UPDATE_USER } from "../gqls/user/mutations"

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 32,
        color: '#f6f6f6',
        marginTop: 20,
        marginVertical: 50
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
    button2: {
        borderRadius: 50,
        width: 200,
    },
})

const Settings = ({ navigation }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [group, setGroup] = useState('')
    const [name, setName] = useState('')

    const apollo = useApolloClient()

    const { loading: userLoading } = useQuery(USER, {
        onCompleted: ({ user }) => {
            setGroup(user.group)
            setName(user.name)
        },
        onError: () => {
        }
    })

    const [save, { loading: saveLoading }] = useMutation(UPDATE_USER, {
        onCompleted: ({ user }) => {
            apollo.writeQuery({ query: USER, data: { user } })
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
        apollo.writeQuery({ query: USER, data: { user: null } })
        await AsyncStorage.setItem('token', '')
        navigation.replace('login')
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
                    group: { set: group },
                    name: { set: name },
                    password: { set: password }
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

    if (userLoading || saveLoading)
        return (
            <LoadingBar />
        )

    return (
        <View style={styles.MainContainer}>
            <View style={styles.container}>
                <Text style={styles.title}>Настройки</Text>
                <TextInput
                    onChangeText={(name) => setName(name)}
                    placeholder={'Имя'}
                    value={name}
                    underlineColor={'#f6f6f6'}
                    theme={textInputTheme}
                    style={{ backgroundColor: 'transparent', fontSize: 14 }}
                />
                <TextInput
                    onChangeText={(group) => setGroup(group)}
                    placeholder={'Группа'}
                    value={group}
                    underlineColor={'#f6f6f6'}
                    theme={textInputTheme}
                    style={{ backgroundColor: 'transparent', fontSize: 14 }}
                />
                <TextInput
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    placeholder={'Новый пароль'}
                    underlineColor={'#f6f6f6'}
                    style={{ backgroundColor: 'transparent', fontSize: 14 }}
                    theme={textInputTheme}
                    secureTextEntry={true}
                />
                <TextInput
                    onChangeText={(text) => setConfirmPassword(text)}
                    value={confirmPassword}
                    secureTextEntry={true}
                    placeholder={'Повторите пароль'}
                    underlineColor={'#f6f6f6'}
                    style={{ backgroundColor: 'transparent', fontSize: 14 }}
                    theme={textInputTheme}
                />
                <View
                    style={
                        {
                            marginTop: 24,
                            alignItems: 'center',
                        }
                    }
                >
                    <Button
                        buttonStyle={styles.button1}
                        title={'Сохранить'}
                        onPress={onSave}
                        color='#2F80ED'
                        type="solid"
                    />
                </View>
                <View
                    style={
                        {
                            marginTop: 24,
                            alignItems: 'center'
                        }
                    }
                >
                    <Button
                        buttonStyle={styles.button2}
                        title={'Выйти из аккаунта'}
                        onPress={logOut}
                        type="outline"
                    />
                </View>
            </View>
        </View>
    )
}
export default Settings
