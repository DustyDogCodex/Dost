import { Search, DarkMode, LightMode } from "@mui/icons-material";
import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../LoggedInUserContext";
import useMediaQuery from "../hooks/useMediaQuery"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar({ firstName }) {
    //grabbing darkMode settings from context
    const { darkMode, toggleDarkMode } = useContext(UserContext)

    //using state to toggle navbar menu
    const [ menuToggled, setMenuToggled ] = useState(false)

    //checking to see if window is above a small screen with custom hook
    const aboveSmallScreens = useMediaQuery("(min-width: 768px)")

    //API call to logout user
    const logoutUser = async() => {
        axios.get('http://localhost:5000/auth/logout',
            { withCredentials: true }
        )
        .then(res => {
            /* upon successful logout, redirect user to home page */
            if(res.data == 'success'){
                window.location.replace('/')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <nav
            className="sticky top-0 flex items-center justify-between py-3 px-10 bg-white dark:bg-slate-800 xl:px-72"
        >
            {/* app brand. Will always redirect to user's homepage */}
            <Link
                to={'/homepage'}
                className="font-marker text-4xl dark:text-sky-400"
            >
                Dost
            </Link>

            {/* conditionally rendering navbar based on screen size using aboveSmallScreens*/}
            {aboveSmallScreens 
            ? (
                /* search bar etc */    
                <>
                    <div
                        className=""
                    >
                        <input 
                            type="text" 
                            placeholder="Search..." 
                            className="bg-slate-200 text-gray-500 py-2 px-8 rounded-lg mx-3 w-48 lg:w-80"
                        />
                        <Search className="dark:text-slate-200"/>
                    </div>

                    <div 
                        className="flex items-center"
                    >
                        <p 
                            className="dark:text-sky-400"
                        >
                            Hi, {firstName}
                        </p>
                
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
                            <Link
                                to={'/settings'}
                                className="flex items-center"
                            >
                                <SettingsIcon className="dark:text-slate-200"/>
                            </Link>
                        </IconButton>

                        <button
                            className="bg-red-500 py-1 px-3 rounded-lg text-white ml-3"
                            onClick={logoutUser}
                        >
                            Logout
                        </button>
                    </div>
                </>
            ) : (
                /* this is what NavBar will look like for smaller screens when menu is toggled off */
                <button
                    className="rounded-full bg-red p-2 flex items-center justify-center"
                    onClick={() => setMenuToggled(true)}
                >
                    <FontAwesomeIcon 
                        icon={faBars} 
                        style={{color: "#f5c211", height:'30px', width:'30px'}} 
                    />
                </button>
            )}
        </nav>
    )
}

export default Navbar