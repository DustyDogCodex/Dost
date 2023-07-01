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