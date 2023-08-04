/* small widget that will display a list of the user's friends */

import axios from "axios"
import { useState, useEffect, useContext } from "react"
import FriendBox from "./FriendBox"
import { UserContext } from "../LoggedInUserContext"

function FriendsList({ userId, profile }) {
    //grabbing updated friends list from context
    const { friends } = useContext(UserContext)

    //state variable to store friendsList
    const [ friendsList, setFriendsList ] = useState([])

    //get request to get an up-to date friendsList including any recent additions/deletions by the user
    //added friends from context into dependency array so friendsList refreshes everytime a new friend is added/removed to fetch the relevant friends user info to populate the FriendBox component
    useEffect(() => {
        const getFriends = async() => {
            axios.get(`https://dost-production.up.railway.app/user/friends/${userId}`)
            .then(res => setFriendsList([ ...res.data ]))
            .catch(err => console.log(err))
        }
        getFriends()
    },[ friends ])

    return (
        <div
            className="w-80 m-3 p-3 rounded-lg bg-white dark:bg-slate-800"
        >
            <h3
                className="text-2xl dark:text-white text-center"
            >
                Friends List
            </h3>
            <div>
                {
                    friendsList?.length 
                    ? 
                        friendsList.map(friend => 
                            <FriendBox 
                                key={friend._id}
                                friendId={friend._id}
                                userName={`${friend.firstName} ${friend.lastName}`}
                                status={friend.location}
                                userProfilePic={friend.userProfilePic}                    
                            />
                        )
                    : 
                        <div>
                            <p
                                className="text-center dark:text-white"
                            >
                                {
                                    profile 
                                        ? 
                                            "User has not added any friends. Add them to your friend's list to be their friend!" 
                                        : 
                                            'No friends currently in your friend\'s list. Explore Dost to make some friends and add them to your list!'
                                }
                            </p>      
                        </div>                  
                }
            </div>
        </div>
    )
}

export default FriendsList