import React, {useState,useEffect} from 'react'
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native'

const UseStateLab = () => {
    const [color, setColor] = useState('red')
    const [count, setCount] = useState(0)

    useEffect(() => {
        setCount(count + 1)
    }, [color])
    return (
        <SafeAreaView
        >
            <Text
                style={{textAlign: 'center', marginTop: 15}}
            >
                Lab 2
            </Text>
            <TouchableOpacity
                style={{
                    width: '100%',
                    height: 40,
                    marginTop: 24,
                    backgroundColor: 'yellow',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                title={'Change color'}
                onPress={() => {
                    console.log(1)
                    setColor(color === 'red' ? 'blue' : 'red')
                }}>
                <Text>
                    Change color
                </Text>
            </TouchableOpacity>
            <View
                style={{marginTop: 30, alignSelf: 'center', backgroundColor: color, width: '100%', height: 100}}
            />
            <Text style={{marginTop: 24}}>
                {'change count ' + count}
            </Text>
        </SafeAreaView>
    );
}

export default UseStateLab