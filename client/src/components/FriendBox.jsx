/* this component will display information about the user that created a post. This component will allow a user to add or remove another user depending on whether or not they are already in the user's friendsList */
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons"

function FriendBox({ friendId, userName, userProfilePic, status }) {
    
    //checking if user is already in friendsList
    const friendOrNah = friendsList.find(friend => friend._id === friendId)

    //adding or removing friend from friendsList depending on whether user is already a friend or not
    const addFriend = async() =>{
        axios.patch(`http://localhost:5000/user/${userId}/${friendId}`)
    }

    return (
        <div
            className="flex items-center"
        >
            <img 
                src={`${userProfilePic}`}
                alt="user profile picture" 
                className=""
            />
            <div>
                <h5>{userName}</h5>
                <p className="text-sm">{status}</p>
            </div>
            {friendOrNah 
                ?   <FontAwesomeIcon 
                        icon={faUserMinus} 
                        style={{color: "#06b0f9",}}
                        onClick={() => addFriend}
                    />
                :   <FontAwesomeIcon 
                        icon={faUserPlus} 
                        style={{color: "#06b0f9",}} 
                        onClick={() => addFriend}
                    /> 
            }
        </div>
    )
}

export default FriendBox