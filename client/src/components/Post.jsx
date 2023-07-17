import FriendBox from "./FriendBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faComments } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"

function Post({ postId, postUserId, userId, userName, location, description, imagePath, userProfilePic, likes, comments }) {
    //making a patch request to update post when a user likes/unlikes the post
    const likeUnlikePost = async() => {
        axios.patch(`http://localhost:5000/posts/${postId}/like`,
            userId,
            { withCredentials: true }
        )
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
                    likes.includes(userId)
                        ?
                            <div
                                className="my-2 mr-2"
                            >
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    style={{color: "#f70258", cursor:'pointer'}} 
                                />
                                <span className="ml-2 dark:text-white">{ likes.size ? likes.size : 0 } likes</span>
                            </div>
                        :
                            <div
                                className="my-2 mr-2"
                            >
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    style={{color: "#b3bccc", cursor:'pointer'}} 
                                /> 
                                <span className="ml-2 dark:text-white">{ likes.size ? likes.size : 0 } likes</span>
                            </div>
                }
                
                <div
                    className="my-2 mr-2"
                >
                    <FontAwesomeIcon icon={faComments} style={{color: "#a1aab5",}} />
                    <span className="ml-2 dark:text-white">{ comments.length } comments</span>
                </div>
            </div>
        </div>
    )
}

export default Post