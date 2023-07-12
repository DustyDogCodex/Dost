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
            className="flex items-center justify-between py-3 px-10 bg-white dark:bg-black"
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
                        <IconButton onClick={toggleDarkMode}>
                            <LightMode />
                        </IconButton>
                    :
                        <IconButton onClick={toggleDarkMode}>
                            <DarkMode />
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