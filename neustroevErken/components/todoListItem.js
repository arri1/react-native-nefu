import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#3b444b",
    },
    text1: {
        marginTop: 5,
        marginHorizontal: 10,
        fontSize: 14,
        color: '#F6F6F6'
    },
    text2: {
        marginBottom: 5,
        marginHorizontal: 10,
        fontSize: 12,
        color: '#898989',
    }

})

const TodoListItem = ({ title, body }) => {
    return (
        <View
            style={styles.container}
        >
            <Text
                style={styles.text1}
            >
                {title}
            </Text>
            <Text
                style={styles.text2}
            >
                {body}
            </Text>
        </View>
    )
}

export default TodoListItem