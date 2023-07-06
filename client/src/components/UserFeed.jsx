import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"

function UserFeed() {
    //state variable for storing all fetched posts to display on userfeed
    const [ posts, setPosts ] = useState([])
    
    //function to fetch all posts from our server
    useEffect(() => {
        const getPosts = async() => {
            axios.get('http://localhost:5000/posts/')
            .then(res => setPosts(res.data))
            .catch(err => console.log(err))
        } 
        getPosts()
    }, [])

    return (
        <div>
            
        </div>
    )
}

export default UserFeed