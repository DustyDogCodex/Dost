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
    const [ editDescription, setEditDescription ] = useState(null)
    const [ editImagePath, setEditImagePath ] = useState(null)
    const [ newImage, setNewImage ] = useState(false)

    //api call to get post info
    useEffect(() => {
        const getPostInfo = async() => {
            axios.get(`http://localhost:5000/posts/edit/${postId}`)
            .then(res => {
                setEditDescription(res.data.description)
                setEditImagePath(res.data.imagePath)
            })
            .catch(err => console.log(err))
        }
        getPostInfo()
    }, [])
    
    //api call to update post with new parameters
    async function updatePost(){
        const formData = new FormData()
        formData.append("description", editDescription);

        if(newImage){
            formData.append("image", newImage);
            formData.append('newImage', true)
        }

        //if editImagePath is null that means user has not uploaded an image previously or has deleted the image with the post
        if(!editImagePath){
            formData.append('deletePrevImage', true)
        }

        //sending patch request to update post info on server
        axios.patch(`http://localhost:5000/posts/update/${postId}`,
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
        axios.delete(`http://localhost:5000/posts/update/${postId}`)
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
                                        src={`http://localhost:5000/uploads/${editImagePath}`} 
                                        alt="image with post"
                                        className="max-h-[600px] rounded-lg w-fit"
                                    />
                                    <div
                                        className="bg-white rounded-full p-2 absolute top-4 right-4 flex items-center justify-center"
                                    >
                                        <FontAwesomeIcon 
                                            icon={faTrash} 
                                            style={{color: "#fa0000", height:'25px', width:'25px', cursor:'pointer'}} 
                                            onClick={() => setEditImagePath(null)}
                                        /> 
                                    </div>
                                </div>
                            )
                        }

                        {!editImagePath && 
                            (
                                <div>
                                    <input 
                                        type="file" 
                                        onChange={(e) => setNewImage(e.target.files[0])}
                                        className="p-1 border border-blue-400 rounded-lg"
                                    />
                                </div>
                            )
                        }

                        <div
                            className="flex items-center justify-between"
                        >
                            <button
                                className="bg-green-400 px-3 py-1 rounded-full mt-3 text-white"
                            >
                                Save Post
                            </button>
                            
                            <button
                                className="bg-sky-400 px-3 py-1 rounded-full mt-3 text-white"
                            >
                                Cancel
                            </button>

                            <button
                                className="bg-red-700 px-3 py-1 rounded-full mt-3 text-white"
                            >
                                Delete Post
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditPost