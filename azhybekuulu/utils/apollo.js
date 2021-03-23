import { ApolloClient, createHttpLink, InMemoryCache, ApolloLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import {AsyncStorage} from 'react-native'


const url = 'https://nefu-server.herokuapp.com/'

const authLink = setContext(async (_, {headers}) => {
    let token
    if (typeof window !== 'undefined') {
        token = await AsyncStorage.getItem('token')
    }
    return {
        headers: {
            ...headers,
            authorization: token ? token : ''
        }
    }
})

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.map(({message, locations, path}) =>
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
        )
    if (networkError) console.log(`[Network error]: ${networkError}`);
})

const httpLink  = createHttpLink({
    uri: url
})

const link = ApolloLink.from([authLink, errorLink, httpLink])

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})

export default client
