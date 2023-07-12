import { Search, DarkMode, LightMode, Notifications, Menu, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar({ firstName, userId }) {

    //checking for darkmode settings
    const [ darkMode, setDarkMode ] = useState(false)

    //checking for previously stored darkMode preference
    useEffect(() => {
        const darkMode = JSON.parse(localStorage.getItem(`${userId} darkMode`));
        setDarkMode(darkMode)
    }, []);

    //changing darkmode settings in localStorage
    //this only happens when user toggles darkmode settings
    useEffect(() => {
        localStorage.setItem(`${userId} darkMode`, JSON.stringify(darkMode));
        console.log('darkmode',JSON.parse(localStorage.getItem(`${userId} darkMode`)))
    }, [darkMode]);

    //API call to logout user
    const logoutUser = async() => {
        axios.get('http://localhost:5000/auth/logout',
            { withCredentials: true }
        )
        .then(res => {
            if(res.data == 'success'){
                window.location.replace('/')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <div
            className="flex items-center justify-between py-3 px-10 bg-white"
        >
            <Link
                to={'/homepage'}
                className="font-marker text-4xl"
            >
                Dost
            </Link>
            <div>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-slate-200 text-gray-500 py-2 px-8 rounded-lg mx-3"
                />
                <Search />
            </div>
            <div 
                className="flex items-center"
            >
                {darkMode 
                    ?
                        <IconButton onClick={() => setDarkMode(!darkMode)}>
                            <DarkMode />
                        </IconButton>
                    :
                        <IconButton onClick={() => setDarkMode(!darkMode)}>
                            <LightMode />
                        </IconButton>
                }
                <IconButton>
                    <Notifications />
                </IconButton>
                <p>{firstName}</p>
                <button
                    className="bg-red-500 py-1 px-3 rounded-lg text-white ml-3"
                    onClick={logoutUser}
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar