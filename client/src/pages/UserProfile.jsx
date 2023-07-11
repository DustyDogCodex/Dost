import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import PostsDisplay from "../components/PostsDisplay"

function UserProfile() {
    //grabbing userId for requested profile page from params
    const { userId } = useParams()

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
    }, [])

    if(!user){
        return null
    }

    return (
        <div>
            <Navbar/>
            <div
                className="flex"
            >
                <UserProfileWidget />
                <PostsDisplay />
            </div>
        </div>
    )
}

export default UserProfile