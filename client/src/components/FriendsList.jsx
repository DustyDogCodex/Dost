/* small widget that will display a list of the user's friends */

import axios from "axios"
import { useState } from "react"
import FriendBox from "./FriendBox"
import { useEffect } from "react"

function FriendsList() {
    //state variable to store friendsList
    const [ friends, setFriends ] = useState([])

    //get request to get an up-to date friendsList including any recent additions/deletions by the user
    useEffect(() => {
        const getFriends = async() => {
            axios.get(`http://localhost:5000/user/${userId}/friends`)
            .then(res => setFriends(res.data))
            .catch(err => console.log(err))
        }
        getFriends()
    })

    return (
        <div>
            <h3>Friend's List</h3>
            <div>
                {friends.map(friend => {
                    <FriendBox 
                        key={friend._id}
                        friendId={friend._id}
                        userName={`${firstName} ${lastName}`}
                        status={friend.status}
                        userProfilePic={friend.userProfilePic}                    
                    />
                })}
            </div>
        </div>
    )
}

export default FriendsList