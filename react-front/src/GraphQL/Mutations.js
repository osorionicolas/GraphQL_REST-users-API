import {gql} from "@apollo/client"

export const DELETE_USER_MUTATION = gql`
    mutation deleteUser($userId: Long!) {
        deleteUser(userId: $userId){
            id
            username
        }
    }
`