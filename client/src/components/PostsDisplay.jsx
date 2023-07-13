/* this component will be used to display posts for both the user homepage and user profile page. On the homepage, it will display all available posts. On the user profile page, it will only display posts from that particular user. */

import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import Post from "./Post"
import { useLocation } from "react-router-dom"

function PostsDisplay() {
    //state variable for storing all fetched posts to display on userfeed
    const [ posts, setPosts ] = useState([])

    //isUserProfile will check if postsDisplay is being used on users homepage or on user's profile page using location
    const isProfile = useLocation()
    console.log(isProfile.pathname)
    
    //function to fetch all posts from our server
    useEffect(() => {
        const getPosts = async() => {
            axios.get('http://localhost:5000/posts/')
            .then(res => setPosts([ ...res.data ]))
            .catch(err => console.log(err))
        } 
        getPosts()
        console.log('posts', posts)
    }, [])

    return (
        <div
            className="border border-fuchsia-800 p-2 m-2 flex flex-col items-center justify-center"
        >
            {posts && posts.map(post => 
                <Post 
                    key={post._id}
                    postId={post._id} 
                    postUserId={post.userId} 
                    userName={`${post.firstName} ${post.lastName}`} 
                    location={post.location} 
                    description={post.description} 
                    imagePath={post.imagePath} 
                    userProfilePic={post.userProfilePic} 
                    likes={post.likes} 
                    comments={post.comments}   
                />
            )}
        </div>
    )
}

export default PostsDisplay