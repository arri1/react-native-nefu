import React, {useEffect, useState} from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
} from "react-native"

import TodoItem from '../components/TodoItem'
import axios from 'react-native-axios'


const styles = StyleSheet.create({
    item: {
        padding: 25,
        borderRadius: 25,
        marginBottom: 25,
        marginLeft: 25,
        marginRight: 25,
        borderColor: 'black',
        borderWidth: StyleSheet.hairlineWidth
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const TodoListItem = (props) => {
    const [data, setData] = useState()

    useEffect(() => {
        axios
            .get(
                'https://jsonplaceholder.typicode.com/posts'
            )
            .then(({data}) => {
                const lessData = data.filter(
                     (item) => item.userId == 2
                )
                setData(lessData)
            })
            .catch((error) => {
                console.error(error.message)
            })
    })
    const content = () => {
        return (
            <ScrollView>{
                data.map(
                    (item, index) => {
                        return (
                            <View style={styles.item}>
                                <TodoItem
                                    key={index}
                                    item={item}
                                />
                                <Text style={{marginTop: 25}}>
                                     {item.body}
                                </Text>
                            </View>
                        )
                    }
                )}
            </ScrollView>
        )
    }
    return (
        <View style={styles.container}>
            {data ? content() :
                <ActivityIndicator
                    size={50}
                    color={'grey'}
                />
            }
        </View>
    )
}

export default TodoListItem
