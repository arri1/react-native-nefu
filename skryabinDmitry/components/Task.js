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
        marginBottom: 5,
        height: 60,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingLeft: 10,
        elevation: 1
    }
})
export default Task