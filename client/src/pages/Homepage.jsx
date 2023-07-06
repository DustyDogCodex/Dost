import CreatePost from "../components/CreatePost"
import Navbar from "../components/Navbar"
import UserProfileWidget from "../components/UserProfileWidget"

function Homepage() {
    return (
        <div>
            <Navbar/>
            <div
                className="flex"
            >
                <UserProfileWidget />
                <CreatePost />
            </div>
        </div>
    )
}

export default Homepage