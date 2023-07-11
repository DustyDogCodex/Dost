/* this component will be used to display posts for both the user homepage and user profile page. On the homepage, it will display all available posts. On the user profile page, it will only display posts from that particular user. */

import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import Post from "./Post"

function PostsDisplay() {
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
            {posts.map(
                (
                    { 
                        _id, 
                        userId, 
                        firstName, 
                        lastName, 
                        location, 
                        description, 
                        imagePath, 
                        userProfilePic, 
                        likes, 
                        comments 
                    }
                ) => {
                    <Post 
                        key={_id}
                        postId={_id} 
                        postUserId={userId} 
                        userName={`${firstName} ${lastName}`} 
                        location={location} 
                        description={description} 
                        imagePath={imagePath} 
                        userProfilePic={userProfilePic} 
                        likes={likes} 
                        comments={comments}   
                    />
                }
            )}
        </div>
    )
}

export default PostsDisplay