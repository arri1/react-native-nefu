import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const Task = ({ task, onCompleate }) => {
    return (
        <TouchableOpacity
            onLongPress = { () => onCompleate(task.id) }
        >
            <View style = { styles.task }>
                <Text>
                    { task.taskname }
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    task: {
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#374e8c',
        borderRadius: 10
    }
})
export default Task