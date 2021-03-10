import React from 'react'
import {SafeAreaView,TouchableOpacity,Text,StyleSheet, Image} from 'react-native'

const styles = StyleSheet.create({
    tch_opacity: {
        marginTop:50,
        height: 40,
        alignItems:'center',
        backgroundColor: 'lightblue'
    },
})

const image = { uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png" };

const Login = ({navigation})=>{
    return(
        <SafeAreaView>
            <Image
                source={
                    image
                }
                style={{
                    marginTop:20,
                    width: 160,
                    height: 160,
                    alignSelf:'center',
                    //Below lines will help to set the border radius
                    borderRadius: 50,
                    overflow: 'hidden',
                }}>

            </Image>


            <TouchableOpacity
                onPress={()=>{
                    navigation.push('Registration')
                }}
            >
                <Text>
                    Регистрация
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.tch_opacity}
                title={'Press X to Win'}
                onPress={() => 
                    {
                        navigation.push('LabsViewNavigator')
                    }
                }>
            
                <Text style={{marginTop:10}}>Тестовый просмотр лабов</Text>
            </TouchableOpacity>
    </SafeAreaView>
    )
}

export default Login
