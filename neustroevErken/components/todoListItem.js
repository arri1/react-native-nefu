import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        height: 80,
        maxWidth: '95%',
        top: 10,
        margin: 5,
        borderRadius: 10,
        backgroundColor: "#3b444b",

    }
})

const TodoListItem = ({ title, body }) => {
    return (
        <View
            style={styles.container}
        >
            <Text
                style={{ left: 10, fontSize: 14, color: '#F6F6F6', }}
            >
                {title}
            </Text>
            <Text
                style={{ left: 10, fontSize: 12, color: '#898989', }}
            >
                {body}
            </Text>
        </View>
    )
}

export default TodoListItem