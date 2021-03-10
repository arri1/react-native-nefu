import React, {useState,useEffect} from 'react'
import {SafeAreaView, Text, TouchableOpacity, View, StyleSheet} from 'react-native'

const colorArray=[
    'red',
    'orange',
    'yellow',
    'green',
    'lightblue',
    'blue',
    'purple'
  ]

const UseStateLab = () => {
    const [color, setColor] = useState('white')
    const [count,setCount] = useState(0)
    const [color_int,setCountNumb] = useState(0)
    
    useEffect(()=>{
        setCount(count+1)
    },[color])

    const styles = StyleSheet.create({
        tch_opacity: {
            marginTop:10,
            height: 40,
            alignItems:'center',
            backgroundColor: 'lightblue'
        },
        square_view_rainbow: {
            marginTop:30,
            alignSelf:'center',
            width: 50,
            height: 50
        },
        text_lab_title:{
            textAlign:'center',
            marginTop:25
        }
    })

    return (
        <SafeAreaView>
            <Text style={styles.text_lab_title}>
                Lab2: Hello BJladika! v4
            </Text>
      
            <TouchableOpacity
                style={styles.tch_opacity}
                title={'Press X to Win'}
                onPress={() => 
                    {
                        setColor(colorArray[color_int])
                        setCountNumb(color_int+1)
                        if (color_int >= 6) setCountNumb(0)
                    }
                }>
            
                <Text style={{marginTop:10}}>Нажми на меня</Text>
            </TouchableOpacity>

            <View name='rainbow' style={[styles.square_view_rainbow, {backgroundColor:color}]}/>
      
            <Text style={{marginTop:30,textAlign:'center'}}>Число Владыки: {count}</Text>
        </SafeAreaView>
    );
};

export default UseStateLab
