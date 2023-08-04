import FriendBox from "./FriendBox"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHeart, faComments, faPenToSquare, faCircleXmark, faTrash } from "@fortawesome/free-solid-svg-icons"
import axios from "axios"
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../LoggedInUserContext"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

function Post({ postId, postUserId, userName, location, description, createdAt, imagePath, userProfilePic, likes, comments }) {

    //using context to grab userID for logged in user
    const { loggedInUser } = useContext(UserContext)

    //variables for tracking likes & comments for a post, toggle comments and toggle editting modal.
    const [ postLikes, setPostLikes ] = useState(likes)
    const [ postComments, setPostComments ] = useState(comments)
    const [ showComments, setShowComments ] = useState(false)

    //variable for tracking when to reset input to empty after submission
    const [ resetReady, setResetReady ] = useState(false) 

    //setting up react-hook-form for submitting comments 
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            comment: ''
        }
    })

    //making a patch request to update post when a user likes/unlikes the post
    const likeUnlikePost = async() => {
        await axios.patch(`https://dost-production.up.railway.app/posts/${postId}/like`,
            { userId : loggedInUser._id }
        )
        .then(res => setPostLikes([ ...res.data.likes ]))
        .catch(err => console.log(err))
    }

    //making a post request to add new comments on a post
    const addComment = async(data) => {
        await axios.post(`https://dost-production.up.railway.app/posts/${postId}/comment`,
            { author: `${loggedInUser.firstName} ${loggedInUser.lastName}`, data }
        )
        .then(res =>  { 
            setPostComments([ ...res.data ])
            //setting resetReady to true so that useEffect can call reset() to clear input field
            setResetReady(true)
        })
        .catch(err => console.log(err))
    }
    
    //using useEffect to reset form values after submission
    useEffect(() => {
        if (!resetReady) return;
        reset(); // asynchronously reset form values
        setResetReady(false)
    }, [resetReady])

    return (
        <div
            className="w-full bg-white rounded-lg p-4 mb-3 flex flex-col dark:bg-slate-800"
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

            <span className="text-xs mx-3 mb-2 dark:text-white">{new Date(createdAt).toLocaleDateString()}</span>

            {imagePath && (
                <div
                    className="flex items-center justify-center rounded-lg bg-slate-500 dark:bg-slate-900"
                >
                    <img 
                        src={`https://dost-production.up.railway.app/uploads/${imagePath}`} 
                        alt="post image"
                        className="max-h-[600px] rounded-lg w-fit" 
                    />
                </div>                
            )}
            
            {/* row containing like, comments and edit icons */}
            <div 
                className="flex justify-between px-5"
            >
                <div
                    className="flex"
                >
                    {
                    postLikes?.includes(loggedInUser._id)
                        ?
                            <div
                                className="my-2 mr-2 flex items-center"
                            >
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    style={{color: "#f70258", cursor:'pointer', height:'25px', width:'25px'}} 
                                    onClick={() => likeUnlikePost()}
                                />
                                <span className="ml-2 dark:text-white">{ postLikes.length ? postLikes.length : 0 }</span>
                            </div>
                        :
                            <div
                                className="my-2 mr-2 flex items-center"
                            >
                                <FontAwesomeIcon 
                                    icon={faHeart} 
                                    style={{color: "#b3bccc", cursor:'pointer', height:'25px', width:'25px'}} 
                                    onClick={() => likeUnlikePost()}
                                /> 
                                <span className="ml-2 dark:text-white">{ postLikes.length ? postLikes.length : 0 }</span>
                            </div>
                    }
                
                    {/* comments icon used to toggle comments section display */}
                    <div
                        className="my-2 mr-2 flex items-center"
                    >
                        <FontAwesomeIcon 
                            icon={faComments} 
                            style={{color: "#a1aab5", cursor:'pointer', height:'25px', width:'25px'}} 
                            onClick={() => setShowComments(!showComments)}
                        />
                        <span className="ml-2 dark:text-white">{ postComments.length }</span>
                    </div>
                </div>

                {/* if loggedInUser id is the same as the friendId (meaning the loggedInUser is the same as the user who created this post), an icon to edit the post will be displayed */}
                {/* after clicking the edit icon, the user can edit or delete their post. */}
                {loggedInUser._id === postUserId &&
                    (
                        <Link
                            to={`/edit/${postId}`}
                            className="flex items-center justify-center px-2 py-1 mt-1 rounded-lg bg-slate-300 dark:bg-slate-950"
                        >
                            <FontAwesomeIcon 
                                icon={faPenToSquare} 
                                style={{color: "#25bb07", height:'20px', width:'20px', cursor:'pointer'}} 
                            /> 
                        </Link>
                    )
                }
            </div>

            {/* comments section. This is hidden by default until user clicks on the comments icon above to toggle its display. */}
            <div
                className={`${showComments ? '' : 'hidden'}`}
            >
                {
                    postComments?.length == 0 
                        ?
                            <div
                                className="rounded-lg p-1 dark:bg-slate-500"
                            >
                                <p className="dark:text-white">This post has no comments yet.</p>
                            </div>
                        : 
                            postComments.map((comment,index) => 
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-1 my-1 rounded-lg bg-slate-200 dark:bg-slate-400 dark:text-white"
                                >
                                   <p>{comment.comment}</p>
                                   <p className="text-blue-800">by {comment.author}</p>
                                </div>    
                            )
                }

                {/* input to add comment to a post */}
                <div
                    className='mt-3'
                >
                    <div
                        className="flex items-center"
                    >
                        <input 
                            {...register('comment', { required: true })}
                            type="text" 
                            placeholder="Add a comment..."
                            className="w-full p-1 rounded-lg bg-slate-200 dark:bg-slate-300"
                        />
                        <button
                            onClick={handleSubmit(addComment)}
                            className="bg-blue-400 text-white py-1 px-2 mx-2 rounded-xl"
                        >
                            Add
                        </button>
                    </div>

                    {/* error handling for empty comments */}
                    {errors.comment?.type === 'required' && (
                        <p className="bg-red-300 text-red-700 px-2 py-1 text-sm rounded-lg mt-1 text-center">Comment cannot be empty</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Post