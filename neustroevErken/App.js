import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ApolloProvider } from '@apollo/client'
import client from './utils/apollo'
import RootStackNavigator from './navigators/rootStackNavigator'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <RootStackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  )
}

export default App;