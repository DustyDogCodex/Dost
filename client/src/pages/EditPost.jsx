import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import Navbar from "../components/Navbar"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../LoggedInUserContext"
import { useParams } from "react-router-dom"
import axios from "axios"

function EditPost() {
    //getting user info from context
    const { loggedInUser } = useContext(UserContext)

    //grab postId from params
    const { postId } = useParams()

    //variables for tracking user input
    const [ editDescription, setEditDescription ] = useState('')
    const [ editImagePath, setEditImagePath ] = useState('')
    const [ newImage, setNewImage ] = useState('')

    //delete post modal toggle
    const [ deletePostConfirm, setDeletePostConfirm ] = useState(false)

    //api call to get post info
    useEffect(() => {
        const getPostInfo = async() => {
            axios.get(`https://dost-production.up.railway.app/posts/edit/${postId}`)
            .then(res => {
                setEditDescription(res.data.description)
                setEditImagePath(res.data.imagePath)
            })
            .catch(err => console.log(err))
        }
        getPostInfo()
    }, [])

    //reseting file input to empty 
    function resetFile() {
        const file = document.querySelector('#newFile');
        file.value = '';
    }
    
    //api call to update post with new parameters
    async function updatePost(){
        //submitting formData with uploaded image to update post
        const formData = new FormData()
        formData.append("description", editDescription)
        
        if(newImage || !editImagePath){
            formData.append("image", newImage)
            formData.append('newImage', true)
        }

        //sending patch request to update post info on server
        axios.patch(`https://dost-production.up.railway.app/posts/update/${postId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            },
            { withCredentials: true } 
        )
        .then(res => {
            if(res){
                window.location.replace('/homepage')
            }
        })
        .catch(err => console.log(err))
    }

    //api call to delete entire post from database
    async function deletePost(){
        axios.delete(`https://dost-production.up.railway.app/posts/delete/${postId}`)
        .then(res => {
            if(res){
                window.location.replace('/homepage')
            }
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <Navbar firstName={loggedInUser.firstName} />
            <div
                className="p-2 flex items-center justify-center w-full h-screen bg-slate-200 dark:bg-black"
            >
                <div
                    className="flex flex-col justify-center rounded-lg p-3 bg-white dark:bg-slate-600"
                >
                    <h1 
                        className="text-2xl text-center dark:text-white mb-5"
                    >
                        Edit Post
                    </h1>

                    <div>
                        <textarea 
                            type="text" 
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            className="w-full p-1 rounded-lg mb-5 bg-slate-200"
                        />

                        {editImagePath && 
                            (
                                <div
                                    className="relative"
                                >
                                    <img 
                                        src={`https://dost-production.up.railway.app/uploads/${editImagePath}`} 
                                        alt="image with post"
                                        className="max-h-[600px] rounded-lg w-fit"
                                    />
                                    <div
                                        className="bg-white rounded-full p-2 absolute top-4 right-4 flex items-center justify-center"
                                    >
                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            style={{color: "#fa0000", height:'25px', width:'25px', cursor:'pointer'}} 
                                            onClick={() => setEditImagePath('')}
                                        /> 
                                    </div>
                                </div>
                            )
                        }

                        {/* input element for uploading a new file if user deletes previously uploaded file/did not upload an image with post */}
                        {!editImagePath && 
                            (
                                <div>
                                    <input 
                                        id="newFile"
                                        type="file" 
                                        onChange={(e) => setNewImage(e.target.files[0])}
                                        className="p-1 border border-blue-400 rounded-lg"
                                    />
                                    <FontAwesomeIcon 
                                        icon={faTrash} 
                                        style={{color: "#fa0000", height:'25px', width:'25px', cursor:'pointer'}} 
                                        onClick={resetFile}
                                    /> 
                                </div>
                            )
                        }

                        <div
                            className="flex items-center justify-between"
                        >
                            <button
                                className="bg-green-400 px-3 py-1 rounded-full mt-3 text-white"
                                onClick={updatePost}
                            >
                                Save Post
                            </button>
                            
                            <button
                                className="bg-sky-400 px-3 py-1 rounded-full mt-3 text-white"
                                onClick={() => window.location.replace('/homepage')}
                            >
                                Cancel
                            </button>

                            <button
                                className="bg-red-700 px-3 py-1 rounded-full mt-3 text-white"
                                onClick={() => setDeletePostConfirm(!deletePostConfirm)}
                            >
                                Delete Post
                            </button>
                        </div>

                        {/* small modal to confirm deleting post */}
                        {deletePostConfirm && 
                            (
                                <div
                                    className="flex flex-col p-5 mt-5 bg-white rounded-lg"
                                >
                                    <p>Are you sure you want to delete your post?</p>
                                    <div
                                        className="flex items-center justify-center"
                                    >
                                        <button
                                            className="bg-red-700 px-3 py-1 rounded-full mt-3 text-white"
                                            onClick={deletePost}
                                        >
                                            Yes
                                        </button>

                                        <button
                                            className="bg-green-700 px-3 py-1 rounded-full mt-3 text-white"
                                            onClick={() => setDeletePostConfirm(!deletePostConfirm)}
                                        >
                                            No
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPost