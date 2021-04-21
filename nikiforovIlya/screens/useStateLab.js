import React, {useState,useEffect} from 'react'
import {SafeAreaView,StyleSheet, Text, TouchableOpacity, View} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: "center",
        height: 80,
        paddingTop: 38,
        justifyContent: "flex-start"
      },
    title: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    }
});

const UseStateLab = () => {
    const [color, setColor] = useState('red')
    const [count, setCount] = useState(0)

    useEffect(() => {
        setCount(count + 1)
    }, [color])
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Главная</Text> 
        <SafeAreaView
            style={{marginTop: 250}}
        >
         
            <TouchableOpacity
                style={{
                    minWidth: 180,
                    backgroundColor: '#197BDD',
                    borderRadius: 50,
                    minHeight:50,
                    alignItems:'center',
                    justifyContent:'center'
                }}
                title={'Change color'}
                onPress={() => {
                    setColor(color === 'red' ? 'blue' : 'red')
                }}>
                <Text
                    style={{color:'#FFFFFF'}}
                >
                    Нажмите, чтобы изменить цвет
                </Text>
            </TouchableOpacity>
            <View
                style={{marginTop: 30, alignSelf: 'center', backgroundColor: color, width: '100%', height: 100}}
            />
            <Text style={{marginTop: 24}}>
                {'счет ' + count}
            </Text>
        </SafeAreaView>
        </View>
    );
}

export default UseStateLab
