import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import axios from 'axios'
import TodoListItem from '../components/todoListItem'

const TodoList = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://mocki.io/v1/e48e2059-fca0-4484-88d8-a67c6374c02b').then(({ data }) => {
            setData(data)
        })
    }, [])
    return (
        <SafeAreaView style={styles.MainContainer}>
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
    )
}

const styles = StyleSheet.create(
    {
        MainContainer:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#2c2c2c',
        }
    });

export default TodoList