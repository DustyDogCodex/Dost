import FriendBox from "./FriendBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faComments } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useContext } from "react"
import { UserContext } from "../LoggedInUserContext"

function Post({ postId, postUserId, userName, location, description, imagePath, userProfilePic, likes, comments }) {

    //using context to grab userID for logged in user
    const { loggedInUser } = useContext(UserContext)
    
    //making a patch request to update post when a user likes/unlikes the post
    const likeUnlikePost = async() => {
        await axios.patch(`http://localhost:5000/posts/${postId}/like`,
            { userId : loggedInUser._id }
        )
        .then(res => console.log(res.data))
        //maybe turn comments and likes into their own state variables? That way they can update instantly once user clicks on them
        //or I can make them update instantly by setting setLikes and setComments to res.data
    }

    return (
        <div
            className="w-fit bg-white rounded-lg p-4 mb-3 flex flex-col dark:bg-slate-800"
        >
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
            
            <div 
                className="flex"
            >
                {
                    likes.includes(loggedInUser._id)
                        ?
                            <div
                                className="my-2 mr-2"
                            >
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    style={{color: "#f70258", cursor:'pointer'}} 
                                    onClick={() => likeUnlikePost()}
                                />
                                <span className="ml-2 dark:text-white">{ likes.length ? likes.length : 0 }</span>
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
                                <span className="ml-2 dark:text-white">{ likes.length ? likes.length : 0 }</span>
                            </div>
                }
                
                <div
                    className="my-2 mr-2"
                >
                    <FontAwesomeIcon icon={faComments} style={{color: "#a1aab5",}} />
                    <span className="ml-2 dark:text-white">{ comments.length }</span>
                </div>
            </div>
        </div>
    )
}

export default Post