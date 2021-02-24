import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from "react-native";

let randomHex = () => {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

export default class randomBackground extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);

        this.state = {
            backgroundColor: randomHex(),
        };
    }

    onClick() {
        console.log("clicked ");
        this.setState({ backgroundColor: randomHex() });
    }

    render() {
        return (
            <TouchableHighlight
                onPress={this.onClick}
                style={[
                    styles.container,
                    { backgroundColor: this.state.backgroundColor },
                ]}
            >
                <View>
                    <Text style={styles.instructions}>Tap to change the background color</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: randomHex(),
    },
    instructions: {
        color: "white",
    },
});

AppRegistry.registerComponent("randomBackground", () => randomBackground);