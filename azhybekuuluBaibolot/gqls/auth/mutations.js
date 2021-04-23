import gql from 'graphql-tag'

export const REGISTER_USER = gql`
    mutation($data:RegistrationUserInput!){
        registerUser(data:$data){
            token
        }
    }
`