import React, {useEffect, useState} from 'react'
import {SafeAreaView,View, Text, ScrollView,StyleSheet} from 'react-native'
import axios from 'axios'
import TodoListItem from '../components/TodoListItem'
import Header from '../components/header';

const styles = StyleSheet.create({
    statusBar: {
      backgroundColor: "#7F39FB",
      color: "#fff",
      width: "100%",
      height: 30
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: "center",
      height: 80,
      paddingTop: 38,
      justifyContent: "flex-start"
    },
    todo: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    textbox: {
      borderWidth: 1,
      borderColor: "#7F39FB",
      borderRadius: 8,
      padding: 10,
      margin: 10,
      width: "80%"
    },
    title: {
        textAlign: 'center',
        color: '#000000',
        fontSize: 20,
        fontWeight: 'bold',
    }
});
const useMemoLab = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/posts').then(({data}) => {
            setData(data)
        })
    }, [])
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Новости</Text> 
        <SafeAreaView>
            <ScrollView>
                {
                    data.map(item => {
                        return (
                            <TodoListItem
                                title={item.title}
                                body={item.body}
                                key={item.id}
                            />
                        )
                    })
                }
            </ScrollView>
           
        </SafeAreaView>
        </View>
    )
}
export default useMemoLab
