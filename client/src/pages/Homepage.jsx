import CreatePost from "../components/CreatePost"
import Navbar from "../components/Navbar"
import UserProfileWidget from "../components/UserProfileWidget"
import PostsDisplay from "../components/PostsDisplay"
import { useContext } from "react"
import { UserContext } from "../LoggedInUserContext"
import FriendsList from "../components/FriendsList"
import Advert from "../components/Advert"

function Homepage() {
    //using context to get loggedInUser's info. This will be passed as props to the components on this page
    const { loggedInUser } = useContext(UserContext)

    return (
        <>
            <Navbar firstName={loggedInUser.firstName} />
            <div
                className="h-screen flex flex-col items-center bg-slate-200 dark:bg-black"
            >
                <div
                    className="flex justify-center lg:w-4/5"
                >
                    <UserProfileWidget 
                        userId={loggedInUser._id}
                        name={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                        numFriends={loggedInUser.friendsList.length}
                        location={loggedInUser.location}
                        status={loggedInUser.status}
                        views={loggedInUser.profileViews}
                    />
                    <div
                        className="w-1/2"
                    >
                        <CreatePost userId={loggedInUser._id}/>
                        <PostsDisplay profile={false}/>
                    </div>
                    <div 
                        className="max-w-[400px]"
                    >
                        <Advert />
                        <FriendsList userId={loggedInUser._id} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage