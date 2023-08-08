import { createContext, useEffect, useState, useReducer } from 'react'
import axios from 'axios'

//this initial state will be updated with user info if user passes login authentication
export const UserContext = createContext({});

export const ContextProvider = ({ children }) => {

    /* ----------------------------- USER CONTEXT -------------------------------------------------------------- */

    //using state to store and update user information
    //set to null till user data is fetched
    //also creating a initial_friends variable to store info about users friendsList
    const [ loggedInUser, setLoggedInUser ] = useState(null)

    //function to get user information after user logs in
    //then the user info is passed into our context using setLoggedInUser
    useEffect(() => {
        const getLoggedInUser = async() => {
            await axios.get(
                'https://dost-production.up.railway.app/auth/getuser',
                { withCredentials: true }
            )
            .then(res => {
                setLoggedInUser(res.data)
                dispatch({ type: 'REFRESH_FRIENDSLIST' , payload: res.data.friendsList })
                console.log('context loggedInUser', loggedInUser)
            })
            .catch(err => console.log(err))
        }
        getLoggedInUser()
    }, [])

    //using useReducer to update friendsList in state after user adds a friend to their friendlist.
    //this will allow rerendering of add/remove friend icons and user's FriendList component to display current friends after adding/removing a friend
    
    const [ friends, dispatch ] = useReducer( friendReducer, null )

    function friendReducer(friends, action){
        switch (action.type){
            case 'REFRESH_FRIENDSLIST':
                return friends = action.payload
        }
    }

    /* ------------------------------------------------------------------------------------------------------- */

    /* ------------------------------- DARK MODE ------------------------------------------------------------  */

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

    /* ------------------------------------------------------------------------------------------------------- */

    return (
        <UserContext.Provider 
            value={{ loggedInUser, darkMode, toggleDarkMode, friends, dispatch }}
        > 
            {children} 
        </UserContext.Provider>
    )
}