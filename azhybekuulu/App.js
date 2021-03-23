import React from 'react';
import {Dimensions, View} from "react-native"
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider} from '@apollo/client'
import FlashMessage from "react-native-flash-message";
import apollo from './utils/apollo'
import MainNavigators from "./navigators/mainNavigators"

const {width, height} = Dimensions.get('screen')

const App = () => {
    return (
        <View style={
            {
                width,
                height
            }
        }>
            <ApolloProvider client={apollo}>
                <NavigationContainer>
                    <MainNavigators/>
                </NavigationContainer>
            </ApolloProvider>
            <FlashMessage position="top"/>
        </View>
    )
}

export default App;
