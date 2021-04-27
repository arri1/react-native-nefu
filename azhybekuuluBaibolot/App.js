import React from 'react';
import {Dimensions, View} from "react-native"
import {NavigationContainer} from '@react-navigation/native';
import FlashMessage from "react-native-flash-message";
import RootStackNavigator from "./navigators/rootStackNavigator"
import TabNavigator from "./navigators/tabNavigators"
import MainNavigator from "./navigators/mainNavigators"

const {width, height} = Dimensions.get('screen')

const App = () => {
    return (
        <View style={
            {
                width,
                height
            }
        }>
            <NavigationContainer>
                <RootStackNavigator/>
            </NavigationContainer>
            <NavigationContainer>
                <TabNavigator/>
            </NavigationContainer>
            <NavigationContainer>
                <MainNavigator/>
            </NavigationContainer>
        </View>
    )
}

export default App;
