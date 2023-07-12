import CreatePost from "../components/CreatePost"
import Navbar from "../components/Navbar"
import UserProfileWidget from "../components/UserProfileWidget"
import { useContext } from "react"
import { UserContext } from "../LoggedInUserContext"

function Homepage() {
    //using context to get loggedInUser's info. This will be passed as props to the components on this page
    const { loggedInUser } = useContext(UserContext)

    return (
        <div
            className="h-screen bg-slate-200 dark:bg-gray-900"
        >
            <Navbar firstName={loggedInUser.firstName} />
            <div
                className="flex"
            >
                <UserProfileWidget 
                    name={`${loggedInUser.firstName} ${loggedInUser.lastName}`}
                    numFriends={loggedInUser.friendsList.length}
                    location={loggedInUser.location}
                    status={loggedInUser.status}
                    views={loggedInUser.profileViews}
                />
                <div
                    className="w-1/2"
                >
                    <CreatePost />
                </div>
            </div>
        </div>
    )
}

export default Homepage