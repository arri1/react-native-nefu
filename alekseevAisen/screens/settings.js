import React, {useState} from 'react'
import {Button, StyleSheet, Text, TextInput, View, ImageBackground, Image, SafeAreaView, TouchableOpacity} from 'react-native'
import {useApolloClient, useMutation, useQuery} from "@apollo/client"
import {USER} from "../gqls/user/queries"
import LoadingBar from "../components/loadingBar"
import {UPDATE_USER} from "../gqls/user/mutations"
import {showMessage} from "react-native-flash-message"

import AsyncStorage from '@react-native-async-storage/async-storage';


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
    button_view: {
        marginTop: 24,
        alignItems: 'center'
    },
    image_round:{
        marginTop: 20,
        width: 160,
        height: 160,
        alignSelf: 'center',
        //Below lines will help to set the border radius
        borderRadius: 100,
        overflow: 'hidden',
    },
    tch_opacity_logout: {
        marginTop: 35,
        height: 60,
        alignItems: 'center',
        backgroundColor: '#A4BFCA',
        marginLeft: 80,
        marginRight: 80,
        borderRadius: 50
    },
})

const image = {};

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
                message: 'Что-то пошло не так',
                type: 'danger'
            })
        }
    })

    const logOut = async () => {
        apollo.writeQuery({query: USER, data: {user: null}})
        await AsyncStorage.setItem('token', '')
        navigation.replace('Login')
    }

    return (
        <SafeAreaView style={styles.container}>

            <Image 
                source={require("../images/milos.jpg")} 
                style={styles.image_round}>
            </Image>

            <Text style={[styles.title, {marginTop:20}]}>BJladika</Text>

            <TouchableOpacity 
                style={styles.tch_opacity_logout}
                title={'Log In'}
                onPress={() => {navigation.push('Edit Account')}}>

                <Text style={{ fontSize:18, marginTop: 18, color:'white', }}>Edit Account</Text>
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.tch_opacity_logout,{backgroundColor:'#A5A6A7',marginTop:20}]}
                title={'Log In'}
                onPress={() => {logOut()}}>

                <Text style={{ fontSize:18, marginTop: 18, color:'white', }}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
export default Settings