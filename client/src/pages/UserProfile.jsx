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
            axios.get(`http://localhost:5000/user/${userId}`)
            .then(res => setUser(res.data))
            .catch(err => console.log(err))
        }
        getUserInfo()
        console.log("profile user", user)
    }, [])

    if(!user){
        return null
    }

    return (
        <>
            <Navbar firstName={loggedInUser.firstName} />
            <div
                className="h-screen flex flex-col items-center bg-slate-200 dark:bg-black"
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
                        <PostsDisplay />
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile