import FriendBox from "./FriendBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faComments } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useContext, useState } from "react"
import { UserContext } from "../LoggedInUserContext"

function Post({ postId, postUserId, userName, location, description, imagePath, userProfilePic, likes, comments }) {

    //using context to grab userID for logged in user
    const { loggedInUser } = useContext(UserContext)

    //variables for tracking likes and comments for a post
    const [ postLikes, setPostLikes ] = useState(likes)
    const [ postComments, setPostComments ] = useState(comments)
    const [ showComments, setShowComments ] = useState(false)
    
    //making a patch request to update post when a user likes/unlikes the post
    const likeUnlikePost = async() => {
        await axios.patch(`http://localhost:5000/posts/${postId}/like`,
            { userId : loggedInUser._id }
        )
        .then(res => setPostLikes([ ...res.data.likes ]))
        .catch(err => console.log(err))
    }

    //making a post request to add new comments on a post
    const addComment = async() => {
        await axios.post(`http://localhost:5000/posts/${postId}/comment`,
            { author: `${loggedInUser.firstName} ${loggedInUser.lastName}`, text: data.text }
        )
        .then(res => setPostComments([ ...res.data.comments ]))
        .catch(err => console.log(err))
    }

    return (
        <div
            className="w-fit bg-white rounded-lg p-4 mb-3 flex flex-col dark:bg-slate-800"
        >
            {/* top of post component which includes friendBox component. FriendBox component has info on the user who created the post and can be used to add them to a user's friendlist. */}
            <FriendBox 
                friendId={postUserId}
                userName={userName}
                status={location}
                userProfilePic={userProfilePic}
            />

            <p
                className="text-lg dark:text-white m-3"
            >
                {description}
            </p>

            {imagePath && (
                <img 
                    src={`http://localhost:5000/uploads/${imagePath}`} 
                    alt="post image"
                    className="max-h-[600px] rounded-lg" 
                />
            )}
            
            {/* row containing like and comments icon */}
            <div 
                className="flex"
            >
                {
                    postLikes.includes(loggedInUser._id)
                        ?
                            <div
                                className="my-2 mr-2"
                            >
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    style={{color: "#f70258", cursor:'pointer'}} 
                                    onClick={() => likeUnlikePost()}
                                />
                                <span className="ml-2 dark:text-white">{ postLikes.length ? postLikes.length : 0 }</span>
                            </div>
                        :
                            <div
                                className="my-2 mr-2"
                            >
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    style={{color: "#b3bccc", cursor:'pointer'}} 
                                    onClick={() => likeUnlikePost()}
                                /> 
                                <span className="ml-2 dark:text-white">{ postLikes.length ? postLikes.length : 0 }</span>
                            </div>
                }
                
                {/* comments icon used to toggle comments section display */}
                <div
                    className="my-2 mr-2"
                >
                    <FontAwesomeIcon 
                        icon={faComments} 
                        style={{color: "#a1aab5", cursor:'pointer'}} 
                        onClick={() => setShowComments(!showComments)}
                    />
                    <span className="ml-2 dark:text-white">{ comments.length }</span>
                </div>
            </div>

            {/* comments section. This is hidden by default until user clicks on the comments icon above to toggle its display. */}
            <div
                className={`${showComments ? '' : 'hidden'}`}
            >
                {
                    postComments.length == 0 
                        ?
                            <div
                                className="rounded-lg p-1 dark:bg-slate-500"
                            >
                                <p className="dark:text-white">This post has no comments yet.</p>
                            </div>
                        : 
                            postComments.map(comment => 
                                <div>
                                   <p>{comment.text}</p>
                                   <p>{comment.author}</p>
                                </div>    
                            )
                }

                {/* input to add comment to a post */}
                <div
                    className='flex items-center mt-3'
                >
                    <input 
                        
                        type="text" 
                        placeholder="Add a comment..."
                        className="w-full p-1 rounded-lg dark:bg-slate-300"
                    />
                    <button
                        className="bg-blue-400 text-white py-1 px-2 mx-2 rounded-xl"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Post