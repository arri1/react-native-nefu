import React from 'react'
import {SafeAreaView, StyleSheet, Text, View} from 'react-native'
import {useQuery} from '@apollo/react-hooks'
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler'


import {USER} from '../gqls/auth/queries'


const Profile = ({navigation}) => {
    const logOut = async () => {
        await AsyncStorage.setItem('token', '')
        navigation.replace('Login')
    }

    const update = () => {
        navigation.navigate('EditProfileScreen')
    }

    const user = useQuery(USER)
    const user_login = {
        'login': user.data.user.login,
        'name': user.data.user.name,
        'group': user.data.user.group
    }


    return (
        <SafeAreaView style={styles.container}>
            <View style = {{ alignItems: 'center' }}>
                <Icon name="user-circle" size={ 100 } color = "#374e8c" style = {{ marginBottom: 10 }} />
                <View style = { styles.text_container }>
                    <Text style = { styles.text }>
                        { user_login.login }
                    </Text>
                    <Text style = {[ styles.text, { marginTop: 20 } ]}>
                        { user_login.name }
                    </Text>
                    <Text style = { styles.text }>
                        { user_login.group }
                    </Text>
                </View>
            </View>
            <View style = {{ alignItems: 'center' }}>
                <TouchableOpacity
                    style={[ styles.button_view, { marginBottom: 20 } ]}
                    title={'Update'}
                    onPress={() => 
                        {
                            update()
                        }
                    }>
                
                    <Text style={ styles.button_text }>Редактировать</Text>
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
    },
    button_view:{
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: 50,
        width: 260,
        backgroundColor: '#374e8c',
        alignSelf: 'stretch',
        elevation: 4,
    },
    button_text: {
        color: '#fff',
        fontSize: 15
    }
})



export default Profile