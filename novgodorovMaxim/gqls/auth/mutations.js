import gql from 'graphql-tag'

export const AUTH_USER = gql`
    mutation ($data:AuthUserInput!){
        authUser(data: $data){
            token
            user{
                id
                name
                group
                login
            }
        }
    }
`

export const REGISTER_USER = gql`
    mutation($data:RegistrationUserInput!){
        registerUser(data:$data){
            token
            user{
                id
                name
                group
                login
            }
        }
    }
`

export const UPDATE_USER = gql`
    mutation ($data:UserUpdateInput!){
        updateUser(data: $data){
            id
            name
            group
            login
        }
    }
`