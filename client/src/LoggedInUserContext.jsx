import { createContext, useEffect, useState } from 'react'
import axios from 'axios'

//this initial state will be updated with user info if user passes login authentication
export const UserContext = createContext({});

export const ContextProvider = ({ children }) => {

    //using state to store and update user information
    //set to null till user data is fetched
    const [ loggedInUser, setLoggedInUser ] = useState(null)

    //checking for darkmode settings
    //if no previous settings, it will default to false/light theme
    const [ darkMode, setDarkMode ] = useState(JSON.parse(localStorage.getItem('Dost darkMode') || false))

    //toggling between darl and light mode
    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
        localStorage.setItem('Dost darkmode', JSON.stringify(darkMode))
    }

    //changing themes for the entire app once darkMode is changed
    useEffect(() => {
        if (darkMode) document.body.classList.remove('dark')
        else document.body.classList.add('dark')
    }, [darkMode])

    //function to get user information after user logs in
    //then the user info is passed into our context using setLoggedInUser
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
            value={{ loggedInUser, darkMode, toggleDarkMode }}
        > 
            {children} 
        </UserContext.Provider>
    )
}