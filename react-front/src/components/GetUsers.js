import React, { useEffect, useState } from 'react'
import { useQuery, gql } from "@apollo/client"
import { LOAD_USERS } from "../GraphQL/Queries"

export const GetUsers = () => {
    const {error, loading, data} = useQuery(LOAD_USERS, {
        variables: { query: "", page: 1 }
    })
    const [users, setUsers] = useState([])

    useEffect(() => {
        console.log(data)
        if(data) setUsers(data.courses)
    }, [data])

    return(
        <div>
            {users && users.map(user => <h1>{user.title}</h1>)}
        </div>
    )
}