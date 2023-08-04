import axios from "axios"
import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import PostsDisplay from "../components/PostsDisplay"
import Navbar from "../components/Navbar"
import UserProfileWidget from "../components/UserProfileWidget"
import FriendsList from "../components/FriendsList"
import { UserContext } from "../LoggedInUserContext"

function UserProfile() {
    //grabbing userId for requested profile page from params
    const { userId } = useParams()

    //loggedIn user infor from context to populate navbar
    const { loggedInUser } = useContext(UserContext)

    //state variable for storing fetched user information
    const [ user, setUser ] = useState(null)

    //making an API call to fetch users data from our database
    useEffect(() => {
        const getUserInfo = async() => {
            axios.get(`https://dost-production.up.railway.app/user/${userId}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
        }
        getUserInfo()
    }, [])

    if(!user){
        return null
    }

    return (
        <>
            <Navbar firstName={loggedInUser.firstName} />
            <div
                className="min-h-screen h-full flex flex-col items-center bg-slate-200 dark:bg-black"
            >
                <div
                    className="flex justify-center lg:w-4/5"
                >
                    <div
                        className="max-w-[400px]"
                    >
                        <UserProfileWidget 
                            userId={userId}
                            name={`${user.firstName} ${user.lastName}`}
                            profilePic={user.profilePic}
                            numFriends={user.friendsList.length}
                            location={user.location}
                            status={user.status}
                            views={user.profileViews}
                            profile={true}
                        />
                        <FriendsList 
                            userId={userId} 
                            profile={true}    
                        />
                    </div>
                    <div
                        className="w-1/2"
                    >
                        <PostsDisplay 
                            profile={true}
                            userId={userId}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile