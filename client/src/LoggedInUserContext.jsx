import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

//this initial state will be updated with user info if user passes login authentication
export const UserContext = createContext({});

export const ContextProvider = ({ children }) => {

    //using state to store and update user information
    //set to false till user data is fetched
    const [ loggedInUser, setLoggedInUser ] = useState(null)

    //function to get user information after user logs in
    //then the user info is passed into our context using setUserInfo
    useEffect(() => {
        const getLoggedInUser = async() => {
            await axios.get(
                'http://localhost:5000/auth/getuser',
                { withCredentials: true }
            )
            .then(res => setLoggedInUser(res.data))
            .catch(err => console.log(err))
        }
        getLoggedInUser()
    }, [])

    return (
        <UserContext.Provider 
            value={{ loggedInUser }}
        > 
            {children} 
        </UserContext.Provider>
    )
}