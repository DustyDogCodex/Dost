import { Search, DarkMode, LightMode, Notifications, Menu, Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
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
            <div>
                <IconButton>
                    <DarkMode />
                </IconButton>
                <IconButton>
                    <LightMode />
                </IconButton>
                <IconButton>
                    <Notifications />
                </IconButton>
                Varun
                <button
                    className="bg-red-500 py-1 px-3 rounded-lg text-white ml-3"
                >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Navbar