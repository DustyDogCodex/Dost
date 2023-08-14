/* this component will be used to display posts for both the user homepage and user profile page. On the homepage, it will display all available posts. On the user profile page, it will only display posts from that particular user. */
import axios from "axios"
import { useState, useEffect } from "react"
import Post from "./Post"
import pikachu from "../assets/pikachu.gif"

function PostsDisplay({ userId, profile }) {
    //state variable for storing all fetched posts to display on userfeed
    const [ posts, setPosts ] = useState([])

    //toggle for loading animation while data is fetched from server
    const [ loading, setLoading ] = useState(true)
    
    //function to fetch all posts from server
    //this will be called if component is present in a user homepage
    const getAllPosts = async() => {
        axios.get('https://dost-production.up.railway.app/posts/')
        .then(res => { 
            setPosts([ ...res.data ])
            setLoading(false)
        })
        .catch(err => console.log(err))
    } 
    
    //function to fetch all posts from server
    //this will be called if component is present in the user profile page
    const getUserPosts = async() => {
        axios.get(`https://dost-production.up.railway.app/posts/${userId}`)
        .then(res => { 
            setPosts([ ...res.data ])
            setLoading(false)
        })
        .catch(err => console.log(err))
    } 

    //function to fetch all posts from our server
    useEffect(() => {
        //depending on whether user profile or homepage is being rendered, a different function is called to fetch posts. 
        profile ? getUserPosts() : getAllPosts()
    }, [])

    return (
        <div
            className="p-2 m-2 flex flex-col items-center justify-center"
        >
            {loading 
                ?
                /* loading screen with a running pikachu animation :) */
                (
                    <div 
                        className="w-full h-full flex justify-center items-center"
                    >
                        <img 
                            src={pikachu}
                            alt="pikachu running loading animation" 
                            className="w-60 h-60"
                        />
                    </div>
                )
                :
                <>
                {posts.length == 0 
                    ? 
                    <div>
                        <p
                            className="dark:text-white"
                        >
                            User has not created any posts yet.
                        </p>
                    </div>
                    : 
                    posts.map(post => 
                        <Post 
                            key={post._id}
                            postId={post._id} 
                            postUserId={post.userId} 
                            userName={`${post.firstName} ${post.lastName}`} 
                            location={post.location} 
                            description={post.description} 
                            createdAt={post.createdAt}
                            imagePath={post.imagePath} 
                            userProfilePic={post.userProfilePic} 
                            likes={post.likes} 
                            comments={post.comments}   
                        />
                    ).reverse()
                }
                </>
            }
        </div>
    )
}

export default PostsDisplay