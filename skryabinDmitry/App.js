import React, { useState } from 'react'
import { View, SafeAreaView, TouchableOpacity, Text, StyleSheet } from 'react-native'



const App = () => {
  const [color, changeColor] = useState(0)

    const colors = [
        'red',
        'green',
        'yellow',
        'blue',
        'black' 
    ]

    const pressHandler = () => {
        changeColor(color + 1)
        if (color > 3){
            changeColor(0)
        }
    }

    return (
        <SafeAreaView style = { styles.container }>
            <View style = {[ styles.circle, { backgroundColor: colors[color] }]}>

            </View>
            <TouchableOpacity 
                style = { styles.button }
                onPress = {pressHandler}
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
        padding: 15,
        backgroundColor: '#374e8c',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#fff',
        fontSize: 20
    }
})

export default App;
