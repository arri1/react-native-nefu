import React, {useState,useEffect} from 'react'
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native'

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

    return (
        <SafeAreaView>
            <Text 
                style={{
                    textAlign:'center',
                    marginTop:25
                }}>
                Lab2: Hello BJladika! v3
            </Text>
      
            <TouchableOpacity
                style={{
                marginTop:10,
                height: 40,
                alignItems:'center',
                Text:"dsd",
                backgroundColor: 'lightblue'
                }}
                title={'Press X to Win'}
                onPress={() => {
                setColor(colorArray[color_int])
                setCountNumb(color_int+1)
                if (color_int >= 6) setCountNumb(0)
                }}>
            
                <Text style={{marginTop:10}}>Нажми на меня</Text>
            </TouchableOpacity>

            <View
                style={{
                marginTop:30,
                alignSelf:'center',
                backgroundColor: color,
                width: 50,
                height: 50
                }}
            />
      
            <Text style={{marginTop:30,textAlign:'center'}}>Число Владыки: {count}</Text>
        </SafeAreaView>
    );
};

export default UseStateLab
