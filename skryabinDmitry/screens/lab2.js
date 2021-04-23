import React, { useState } from 'react'
import { SafeAreaView, View, StyleSheet, TouchableOpacity, Text } from 'react-native'


const toDoSreen = () => {

    const [color, setColor] = useState(0)
    colors = [
        'red',
        'green',
        'blue',
        'yellow',
        'purple',
        'black'
    ]
    const pressHandler = () => {
        if (color < 5){
            setColor(color+1)
        }
        else{
            setColor(0)
        }
    }

    return (
        <SafeAreaView style = { styles.container }>
            <View style = {[ styles.circle, { backgroundColor: colors[color] } ]}>
            </View>
            <TouchableOpacity
                style = { styles.button }
                onPress = { pressHandler }
            >
                <Text style = { styles.text }>
                    Сменить цвет
                </Text>
           </TouchableOpacity>
        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 50,
        marginVertical: 50,
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    circle: {
        width: 100,
        height: 100,
        borderRadius: 100
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 40,
        height: 50,
        backgroundColor: '#374e8c',
        alignSelf: 'stretch',
        elevation: 4
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
})

export default toDoSreen;


