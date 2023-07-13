import { Navigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLocationPin, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

function UserProfileWidget({ name, numFriends, location, status, views }) {    
    return (
        <div
            className="p-5 max-w-[400px] h-1/4 m-3 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
        >
            {/* top of widget: username + profilePic + friends */}
            <div
                className="flex items-center gap-2 pb-5 border-b border-fuchsia-400"
                onClick={() => Navigate(`/profile/${user}`)}
            >
                {/* will change this to a conditional rendering statement later. Using a basic user icon for now. It will be this icon if user doesn't have an uploaded profilePic or the user's profilePic if it exists*/}
                <FontAwesomeIcon 
                    icon={faUser} 
                    style={{color:'black', height:'40px', width:'40px', borderRadius:'100%'}}
                />
                <div>
                    <h2
                        className="text-xl"
                    >
                        {name}
                    </h2>
                    <p
                        className="text-sm"
                    >
                        {numFriends} {numFriends == 1 ? 'friend' : 'friends'}
                    </p>
                </div>
            </div>

            {/* Second row: location and status */}
            <div
                className="gap-2 py-3 border-b border-fuchsia-400"
            >
                <div
                    className="flex items-center justify-start m-2"
                >
                    <FontAwesomeIcon 
                        icon={faLocationPin} 
                        style={{color: "#0ab6ff", height:'25px', width:'25px', marginRight: '20px'}} 
                    />
                    {location ? location : 'Off the grid'}
                </div>
                <div
                    className="flex items-center justify-start m-2"
                >
                    <FontAwesomeIcon 
                        icon={faPaperPlane} 
                        style={{color: "#0ab6ff", height:'25px', width:'25px',marginRight: '20px'}}
                    />
                    {status ? status : 'Set status in user settings'}
                </div>
            </div>

            {/* Third row: Profile views and maybe links to other social media accounts? */}
            <div
                className="gap-2 py-3 border-b border-fuchsia-400"
            >
                <div
                    className="flex items-center justify-between m-2"
                >
                    <p
                        className="text-slate-400 dark:text-white"
                    >
                        Profile Views
                    </p>
                    <p>{views} views</p>
                </div>
            </div>
        </div>
    )
}

export default UserProfileWidget