import React, {useState} from 'react'
import {Button, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {USER} from '../gqls/auth/queries'
import LoadingBar from '../components/loadingBar'
import {UPDATE_USER} from '../gqls/auth/mutations'
import {showMessage} from 'react-native-flash-message'
import Icon from 'react-native-vector-icons/FontAwesome5';


import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler'


const Profile = ({navigation}) => {
    const logOut = async () => {
        //apollo.writeQuery({query: USER, data: {user: null}})
        await AsyncStorage.setItem('token', '')
        navigation.replace('Login')
    }

    const update = () => {
        navigation.navigate('EditProfileScreen')
    }

    const UserData = () => {
        const user = useQuery(USER)
        const user_login = {
            'login': user.data.user.login,
            'name': user.data.user.name,
            'group': user.data.user.group
        }
        return (
            user_login
        )
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style = {{ alignItems: 'center' }}>
                <Icon name="user-circle" size={ 100 } color = "#374e8c"  />
                <View style = { styles.text_container }>
                    <Text style = { styles.text }>
                        { UserData().login }
                    </Text>
                    <Text style = {[ styles.text, { marginTop: 20 } ]}>
                        { UserData().name }
                    </Text>
                    <Text style = { styles.text }>
                        { UserData().group }
                    </Text>
                </View>
            </View>
            <View style = {{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={[ styles.logout, { marginBottom: 20 } ]}
                    title={'Update'}
                    onPress={() => 
                        {
                            update()
                        }
                    }>
                
                    <Text style={ styles.logout }>Редактировать</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.logout}
                    title={'LogOut'}
                    onPress={() => 
                        {
                            logOut()
                        }
                    }>
                
                    <Text style={ styles.logout }>Выйти</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 50,
        marginVertical: 50,
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    logout: {
        color: '#374e8c'
    },
    text_container: {
        alignItems: 'center'
    },
    text: {
        fontSize: 20
    }
})



export default Profile