import React, { useState } from 'react'
import { ImageBackground,Image, Button, SafeAreaView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { USER } from '../gqls/auth/queries'
import LoadingBar from '../components/loadingBar'
import { UPDATE_USER } from '../gqls/auth/mutations'
import { showMessage } from 'react-native-flash-message'

import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
    button_view: {
        marginTop: 24,
        alignItems: 'center'
    },
    image_round:{
        marginTop: 40,
        width: 160,
        height: 160,
        alignSelf: 'center',
        //Below lines will help to set the border radius
        borderRadius: 100,
        overflow: 'hidden',
    },
    tch_opacity_logout: {
        marginTop: 30,
        height: 50,
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: '#197BDD'
    },
})

const image = {};

const LabsView = ({ navigation }) => {
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


    return (
        <SafeAreaView style={styles.container}>

            <Text style={{
                textAlign: 'center',
                
                fontSize: 24,
                color: 'black',
                fontWeight: 'bold'
            }} >
                Главная
            </Text>

            <Image 
                source={require("../images/milos.jpg")} 
                style={styles.image_round}>
            </Image>

            <TouchableOpacity 
            
                style={styles.tch_opacity_logout}
                title={'list'}
                onPress={() => {navigation.push('List')}}>
                <Text style={{ fontSize:18, color:'#197BDD', }}>Список задач</Text>
        
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.tch_opacity_logout}
                title={'Log In'}
                onPress={() => {navigation.push('Edit Account')}}>

                <Text style={{ fontSize:18, color:'#197BDD', }}>Профиль</Text>
            </TouchableOpacity>
            
        </SafeAreaView>
    )
}

export default LabsView
