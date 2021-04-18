import React, {useState} from 'react'
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {USER} from '../gqls/auth/queries'
import LoadingBar from '../components/loadingBar'
import {UPDATE_USER} from '../gqls/auth/mutations'
import {showMessage} from 'react-native-flash-message'

import AsyncStorage from '@react-native-async-storage/async-storage';

//TODO: Add change name too


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
    },
    button_view:{
        marginTop: 24,
        alignItems: 'center'
    }
})

const Settings = ({navigation}) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [group, setGroup] = useState('')
    const [name, setName] = useState('')

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
        },
        update: (cache, {data: {user}}) => {
            cache.writeQuery({query: USER, data: {user}})
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
        const variables = {
            data: {
                group: {set: group},
                name: {set: name},
            }
        }
        if (password)
            variables.data.password = {set: password}
        save({variables})
    }

    if (userLoading || saveLoading)
        return (
            <LoadingBar/>
        )

    return (
        <SafeAreaView style={styles.container}>
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
            <View style={styles.button_view}>
                <Button
                    title={'Сохранить'}
                    onPress={onSave}
                />
            </View>
            <View style={styles.button_view}>
                <Button
                    title={'Выйти'}
                    onPress={logOut}
                />
            </View>
        </SafeAreaView>
    )
}
export default Settings