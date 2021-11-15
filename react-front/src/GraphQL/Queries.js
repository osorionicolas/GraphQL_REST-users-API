import {gql} from "@apollo/client"

export const LOAD_USERS = gql`
    query Courses($query: String!, $page: Int!){ 
        courses(query: $query, page: $page) { 
            id
            title
            topic
        } 
    }
`