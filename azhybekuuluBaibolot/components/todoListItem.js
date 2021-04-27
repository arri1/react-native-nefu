import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: "silver",
    }
})

const TodoListItem = ({ title, body }) => {
    return (
        <View
            style={styles.container}
        >
            <Text
                style={{ fontSize: 18 }}
            >
                {title}
            </Text>
            <Text
                style={{ marginTop: 8, fontSize: 12 }}
            >
                {body}
            </Text>
        </View>
    )
}

export default TodoListItem