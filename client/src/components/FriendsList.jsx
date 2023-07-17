/* small widget that will display a list of the user's friends */

import axios from "axios"
import { useState } from "react"
import FriendBox from "./FriendBox"
import { useEffect } from "react"

function FriendsList({ userId, profile }) {
    //state variable to store friendsList
    const [ friends, setFriends ] = useState([])

    //get request to get an up-to date friendsList including any recent additions/deletions by the user
    useEffect(() => {
        const getFriends = async() => {
            axios.get(`http://localhost:5000/user/friends/${userId}`)
            .then(res => setFriends(res.data))
            .catch(err => console.log(err))
        }
        getFriends()
    },[])

    return (
        <div
            className="w-[350px] m-3 p-3 rounded-lg bg-white dark:bg-slate-800"
        >
            <h3
                className="text-2xl dark:text-white text-center"
            >
                Friends List
            </h3>
            <div>
                {
                    friends.length 
                    ? 
                        friends.map(friend => {
                            <FriendBox 
                                key={friend._id}
                                friendId={friend._id}
                                userName={`${friend.firstName} ${friend.lastName}`}
                                status={friend.status}
                                userProfilePic={friend.userProfilePic}                    
                            />
                        })
                    : 
                        <div>
                            <p
                                className="text-center dark:text-white"
                            >
                                {profile ? "User has not added any friends. Add them to your friend's list to be their friend!" : 'No friends currently in your friend\'s list. Explore Dost to make some friends and add them to your list!'}
                            </p>      
                        </div>                  
                }
            </div>
        </div>
    )
}

export default FriendsList