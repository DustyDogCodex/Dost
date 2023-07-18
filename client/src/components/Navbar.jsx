import { Search, DarkMode, LightMode, Notifications, Menu, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../LoggedInUserContext";

function Navbar({ firstName }) {
    //grabbing darkMode settings from context
    const { darkMode, toggleDarkMode } = useContext(UserContext)

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
            className="sticky top-0 flex items-center justify-between py-3 px-10 bg-white dark:bg-slate-800 lg:px-72"
        >
            {/* app brand */}
            <Link
                to={'/homepage'}
                className="font-marker text-4xl dark:text-sky-400"
            >
                Dost
            </Link>

            {/* search bar */}
            <div
                className=""
            >
                <input 
                    type="text" 
                    placeholder="Search..." 
                    className="bg-slate-200 text-gray-500 py-2 px-8 rounded-lg mx-3 w-[400px]"
                />
                <Search className="dark:text-slate-200"/>
            </div>

            {/* dark modee toggle, user settings, logout */}
            <div 
                className="flex items-center"
            >
                {/* conditionally rendering light or dark mode icon depending on whether or not darkMode is on */}
                {darkMode 
                    ?
                        <IconButton onClick={toggleDarkMode} >
                            <LightMode className="dark:text-slate-200"/>
                        </IconButton>
                    :
                        <IconButton onClick={toggleDarkMode} >
                            <DarkMode className="dark:text-slate-200"/>
                        </IconButton>
                }
                <IconButton>
                    <Notifications className="dark:text-slate-200"/>
                </IconButton>
                <p 
                    className="dark:text-sky-400"
                >
                    {firstName}
                </p>
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