import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faLocationPin, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"

function UserProfileWidget({ userId, name, profilePic, numFriends, location, status, views, profile }) {    
    return (
        <div
            className="p-5 md:w-80 md:h-80 m-3 rounded-lg bg-white dark:bg-slate-800 dark:text-white"
        >
            {/* top of widget: username + profilePic + friends */}
            <Link
                to={`/profile/${userId}`}
                className="flex flex-col md:flex-row items-center gap-2 pb-5 border-b border-fuchsia-400"
            >
                {/* Conditional rendering: if user profilePic exists then display profile pic else display font awesome user icon */}
                {profilePic 
                    ? 
                        <img 
                            src={`http://localhost:5000/uploads/${profilePic}`} 
                            alt={`${name}'s profile picture`} 
                            className="w-16 h-16 rounded-full"
                        />
                    :
                        <FontAwesomeIcon 
                            icon={faUser} 
                            style={{color:'skyblue', height:'40px', width:'40px', borderRadius:'100%'}}
                        />
                }
                <div>
                    <h2
                        className="text-xl"
                    >
                        {name}
                    </h2>
                    <p
                        className="text-sm text-center md:text-left"
                    >
                        {numFriends} {numFriends == 1 ? 'friend' : 'friends'}
                    </p>
                </div>
            </Link>

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
                        style={{color: "#0ab6ff", height:'25px', width:'25px', marginRight: '20px'}}
                    />
                    {status ? status : (profile ? 'No status' : 'Set status in user settings')}
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