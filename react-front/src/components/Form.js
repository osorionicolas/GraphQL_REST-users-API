import React, { useState, useEffect } from 'react'
import { useMutation, gql } from "@apollo/client"
import { DELETE_USER_MUTATION } from "../GraphQL/Mutations"

export const Form = () => {
    //const [username, setUsername] = useState("")
    //const [email, setEmail] = useState("")
    const [userId, setUserId] = useState()
    const [deleteUser, { error }] = useMutation(DELETE_USER_MUTATION)


    const removeUser = () => {
        deleteUser({
            variables: {
                userId: userId
            }
        })

        if(error){
            console.log(error)
        }
    }

    useEffect(() => {
        /*Notification.requestPermission().then(() => {
            var img = '/to-do-notifications/img/icon-128.png';
            var text = 'HEY! Your task is now overdue.';
            new Notification('To do list', { body: text, icon: img });
        })*/
    })

    return(
        <div>
            <input
                type="text"
                placeholder="UserId"
                onChange={e => setUserId(e.target.value)}
            />
            {/*
            <input
                type="text"
                placeholder="Username"
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="text"
                placeholder="Email"
                onChange={e => setEmail(e.target.value)}
            />
            */}
            <button onClick={removeUser}>Delete User</button>
        </div>
    )
}