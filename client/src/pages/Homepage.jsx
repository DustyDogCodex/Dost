import CreatePost from "../components/CreatePost"
import Navbar from "../components/Navbar"
import UserProfileWidget from "../components/UserProfileWidget"
import PostsDisplay from "../components/PostsDisplay"
import { useContext } from "react"
import { UserContext } from "../LoggedInUserContext"
import FriendsList from "../components/FriendsList"
import Advert from "../components/Advert"
import useMediaQuery from "../hooks/useMediaQuery"
import UserProfileWidgetSmallScreen from "../components/UserProfileWidgetSmallScreen"

function Homepage() {
    //using context to get loggedInUser's info. This will be passed as props to the components on this page
    const { loggedInUser } = useContext(UserContext)

    //checking to see if window is above a small screen with custom hook
    const aboveSmallScreens = useMediaQuery("(min-width: 780px)")

    return (
        <>
            <Navbar firstName={loggedInUser.firstName} />
            <div
                className="min-h-screen h-full bg-slate-200 dark:bg-black"
            >
                {aboveSmallScreens 
                ?
                    (
                        <div
                            className="flex flex-col items-center"
                        >
                            <div
                                className="flex justify-center xl:w-4/5"
                            >
                                <UserProfileWidget 
                                    userId={loggedInUser._id}
                                    name={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                                    profilePic={loggedInUser.profilePic}
                                    numFriends={loggedInUser.friendsList.length}
                                    location={loggedInUser.location}
                                    status={loggedInUser.status}
                                    views={loggedInUser.profileViews}
                                />
                                
                                <div
                                    className="w-1/2"
                                >
                                    <CreatePost 
                                        userId={loggedInUser._id} 
                                        profilePic={loggedInUser.profilePic}
                                    />
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
                    )
                : 
                    (
                        <div
                            className="p-3 bg-slate-200 dark:bg-black"
                        >
                            <UserProfileWidgetSmallScreen 
                                userId={loggedInUser._id}
                                name={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                                profilePic={loggedInUser.profilePic}
                                numFriends={loggedInUser.friendsList.length}
                                location={loggedInUser.location}
                                status={loggedInUser.status}
                                views={loggedInUser.profileViews}
                            />
                            <Advert />
                            <CreatePost 
                                userId={loggedInUser._id} 
                                profilePic={loggedInUser.profilePic}
                            />
                            <PostsDisplay profile={false}/>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default Homepage