import { useState } from "react"
import { Navigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"

function UserProfileWidget() {
    //state variable for storing user info gtom context
    const [ user, SetUser ] = useState({})
    
    //adding a loading spinner/animation while waiting on user info to load
    if(!user){
        return null
    }

    return (
        <div
            className="border p-5 w-1/4 m-3"
        >
            {/* top of widget: username + profilePic + friends */}
            <div
                className="flex items-center gap-2 pb-5 border-b-2 border-fuchsia-400"
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
                        User Name
                    </h2>
                    <p
                        className="text-sm"
                    >
                        1234 friends
                    </p>
                </div>
            </div>
        </div>
    )
}

export default UserProfileWidget