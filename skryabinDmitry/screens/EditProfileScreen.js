import React, {useState} from 'react'
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {USER} from '../gqls/auth/queries'
import LoadingBar from '../components/loadingBar'
import {UPDATE_USER} from '../gqls/auth/mutations'
import {showMessage} from 'react-native-flash-message'


import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler'


const Profile = ({navigation}) => {

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
        <SafeAreaView style={ styles.container }>
            <Text style={styles.title}>Настройки</Text>
            <View>
                <Text style = { styles.title_text }>
                    Общие данные
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
                <View>
                    <Text style = { styles.title_text }>
                        Смена пароля
                    </Text>
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
                </View>
            </View>
            <TouchableOpacity style={styles.button_view}
                title= 'Save'
                onPress={onSave}
            >
                <Text style = { styles.button_text }>
                    Сохранить
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50,
        marginVertical: 50,
        flex: 1,
        justifyContent: 'space-evenly',
    },
    title: {
        fontSize: 20,
    },
    title_text: {
        fontSize: 15,
        marginBottom: 5
    },  
    input: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#374e8c',
        borderRadius: 10,
        alignSelf: 'stretch',
    },
    button_view:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: 50,
        backgroundColor: '#374e8c',
        borderRadius: 10,
        alignSelf: 'stretch'
    },
    button_text: {
        color: '#fff',
        fontSize: 15
    }
})



export default Profile