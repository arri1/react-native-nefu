import React, { useState } from 'react'
import { TouchableOpacity, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { USER } from '../gqls/auth/queries'
import LoadingBar from '../components/loadingBar'
import { UPDATE_USER } from '../gqls/auth/mutations'
import { showMessage } from 'react-native-flash-message'

import {TextInput, DefaultTheme} from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome';

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
        alignSelf: 'stretch',
        marginTop: 20,
        backgroundColor:'white'
    },
    button_view: {
        marginTop: 24,
        alignItems: 'center',
    },
    tch_opacity_save_changes: {
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

const Settings_Edit_Profile = ({ navigation }) => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [group, setGroup] = useState('')
    const [name, setName] = useState('')

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
        update: (cache, { data: { user } }) => {
            cache.writeQuery({ query: USER, data: { user } })
        }
    })

    const logOut = async () => {
        navigation.replace('Login')
        await AsyncStorage.setItem('token', '')
        //apollo.writeQuery({ query: USER, data: { user: null } })
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
                group: { set: group },
                name: { set: name },
            }
        }
        if (password)
            variables.data.password = { set: password }
        save({ variables })
    }

    if (userLoading || saveLoading)
        return (
            <LoadingBar />
        )

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Настройки</Text>
            <Text style={{marginTop:25, alignSelf:'center', fontSize:16}}>Измените нужные вам данные</Text>
            <TextInput
                onChangeText={(text) => setName(text)}
                value={name}
                placeholder={'Имя'}
                style={[styles.input,{marginTop: 20}]}
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
                onChangeText={(text) => setGroup(text)}
                value={group}
                placeholder={'Группа'}
                style={styles.input}
                mode='outlined'
                theme={theme}
                left={
                    <TextInput.Icon
                    styles={{marginLeft:50}}
                    name={()=><Icon name='group' size={24}/>}
                    />
                }
            />
            <TextInput
                onChangeText={(text) => setPassword(text)}
                value={password}
                placeholder={'Новый пароль'}
                style={styles.input}
                secureTextEntry={true}
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
                onChangeText={(text) => setConfirmPassword(text)}
                value={confirmPassword}
                secureTextEntry={true}
                placeholder={'Повторите пароль'}
                style={styles.input}
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
                style={styles.tch_opacity_save_changes}
                title={'Log In'}
                onPress={() => {onSave()}}>
                <Text style={{ fontSize:18, marginTop: 18, color:'white', }}>Save Changes</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default Settings_Edit_Profile