/* this component will display information about the user that created a post. This component will allow a user to add or remove another user depending on whether or not they are already in the user's friendsList */
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserMinus, faUserPlus, faUser } from "@fortawesome/free-solid-svg-icons"

function FriendBox({ friendId, userName, userProfilePic, status }) {
    
    //checking if user is already in friendsList
    const friendOrNah = false /* friendsList.find(friend => friend._id === friendId) */

    //adding or removing friend from friendsList depending on whether user is already a friend or not
    const addFriend = async() =>{
        axios.patch(`http://localhost:5000/user/${userId}/${friendId}`)
    }

    return (
        <div
            className="flex items-center justify-between"
        >
            <div 
                className="flex items-center"
            >   
                {/* left side of the component that contains userProfilePic, username and status/location */}
                {
                    userProfilePic 
                    ?   
                        <img 
                            src={`http://localhost:5000/uploads/${userProfilePic}`}
                            alt="user profile picture" 
                            className=""
                        />
                    :
                        <FontAwesomeIcon 
                            icon={faUser} 
                            style={{color: "#4dd2ff", height:"40px", width:"40px"}} 
                        />
                }
                <div
                    className="ml-3"
                >
                    <h5 
                        className="text-xl dark:text-white"
                    >
                        {userName}
                    </h5>
                    <p 
                        className="text-sm"
                    >
                        {status}
                    </p>
                </div>
            </div>

            {/* depending on whether or not this person's userid is in our friendsList we will display an add user or remove user icon */}
            {friendOrNah 
                ?   
                    <div
                        className="flex items-center justify-center p-2 rounded-full bg-slate-300 dark:bg-slate-950"
                    >
                        <FontAwesomeIcon 
                            icon={faUserMinus} 
                            style={{color: "#06b0f9", height:"30px", width:"30px"}}
                            onClick={() => addFriend}
                        />
                    </div>
                :   
                    <div
                        className="flex items-center justify-cente p-2 rounded-full bg-slate-300 dark:bg-slate-950"
                    >
                        <FontAwesomeIcon 
                            icon={faUserPlus} 
                            style={{color: "#06b0f9", height:"30px", width:"30px"}} 
                            onClick={() => addFriend}
                        /> 
                    </div>
            }
        </div>
    )
}

export default FriendBox