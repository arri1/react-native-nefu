import React, { useState } from 'react';
import {Dimensions, StyleSheet, Text, View, TouchableOpacity, Button
} from "react-native";

const { height, width } = Dimensions.get('window')

const App = (props) => {
    const [backgroundColor, setColor] = useState()
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity
                style={[
                    styles.container,
                    { backgroundColor: "white" }
                ]}
            >
                <Text style={styles.instructions}>HELLOW WORLD!</Text>
            </TouchableOpacity>
        </View >
        
    );
}

const styles = StyleSheet.create({
    container: {
        height,
        width,
        justifyContent: "center",
        alignItems: "center",
    },
    instructions: {
        color: "black",
    },
    mainContainer: {
        height,
        width
    }
});

export default App