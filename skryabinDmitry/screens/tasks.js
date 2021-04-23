import React, { useState, useEffect } from 'react'
import { SafeAreaView, StyleSheet, FlatList } from 'react-native'


import axios from 'axios'


import ToDo from '../components/ToDo'

const toDoSreen = () => {
    const url = 'https://my-json-server.typicode.com/typicode/demo/posts'
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(url).then((response) => { 
            setData(response.data)
        })
    }, [])

    return (
        <SafeAreaView style = { styles.container }>
            <FlatList
                style = { styles.list }
                data = { data }
                renderItem = { ({ item })  => <ToDo task = { item.title } /> }
                keyExtractor = { item => item.id.toString() } 
            />
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container:{
        marginHorizontal: 10,
        marginVertical: 10,
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    }
    ,list: {
        width: '100%'
    }
})

export default toDoSreen;


