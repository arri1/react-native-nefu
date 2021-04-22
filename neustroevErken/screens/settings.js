import React, {useState} from 'react'
import { Button, StyleSheet, Text, TextInput, View} from 'react-native'
import {AsyncStorage} from "@react-native-async-storage/async-storage"
import {useApolloClient, useMutation, useQuery} from "@apollo/client"
import {showMessage} from "react-native-flash-message"
import LoadingBar from "../components/loadingBar"
import {USER} from "../gqls/user/queries"
import {UPDATE_USER} from "../gqls/user/mutations"

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 24
    },
    container: {
        flex: 1,
        margin: 15
    },
    input: {
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'stretch',
        marginTop: 24
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
            <Text style={styles.title}>Настройки</Text>
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
                placeholder={'Повтарите пароль'}
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
                <Button
                    title={'Сохранить'}
                    onPress={onSave}
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
                    title={'Выйти'}
                    onPress={logOut}
                />
            </View>
        </View>
    )
}
export default Settings
