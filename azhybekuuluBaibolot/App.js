import 'react-native-gesture-handler'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {ApolloProvider} from '@apollo/client'
import apollo from './utils/apollo'
import RootStackNavigator from './navigators/rootStackNavigator'

const App = () => {
    return (
    <ApolloProvider client={apollo}>
        <NavigationContainer>
            <RootStackNavigator/>
        </NavigationContainer>
    </ApolloProvider>

)
}
export default App;