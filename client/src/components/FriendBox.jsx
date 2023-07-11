/* this component will display information about a user's friends in a widget on the user's homepage.  */
import axios from "axios"

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
        </div>
    )
}

export default FriendBox