import 'react-native-gesture-handler'

import React from 'react'
import { View, StyleSheet } from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {ApolloProvider} from '@apollo/client'
import FlashMessage from "react-native-flash-message";


import apollo from './utils/apollo'


import LoginNavigator from './navigators/loginNavigator'

const App = () => {
  return (
    <View style={ styles.container }>
      <ApolloProvider client={ apollo }>
        <NavigationContainer>
            <LoginNavigator />
        </NavigationContainer>
      </ApolloProvider>
      <FlashMessage position="top"/>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1
    }
})

export default App;


