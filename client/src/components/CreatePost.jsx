import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faImage } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState } from "react"

function CreatePost({ userId, profilePic }) {
    //using react-hook-form for tracking and sending user inputs to backend
    const { register, handleSubmit, formState: { errors }, watch } = useForm()

    //watching postText using watch hook from useForm
    const watchPostText = watch('postText')

    //state variable to toggle input field for adding image
    //by default, this input is hidden till user clicks on it to add an image
    const [ addImage, setAddImage ] = useState(false)

    //variable for tracking user uploaded images to the post
    const [ image, setImage ] = useState(null)

    //function for submitting post
    async function submitPost(){
        //setting up formdata for submitting user info
        const formData = new FormData()
        formData.append("userId", userId);
        formData.append("description", watchPostText);

        if(image){
            formData.append("image", image);
        }

        //axios post request to create a new post
        axios.post('http://localhost:5000/posts/new',
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

    return (
        <div
            className="m-3 rounded-xl bg-white dark:bg-slate-800 dark:text-white"
        >   
            {/* top part with usrr image and create post input */}
            <div
                className="flex flex-col items-center m-2 px-2 py-3 border-b border-sky-400"
            >
                <div
                    className="flex items-center w-full"
                >
                    {/* Conditional rendering: if user profilePic exists then display profile pic else display font awesome user icon */}
                    {profilePic 
                        ? 
                            <img 
                                src={`http://localhost:5000/uploads/${profilePic}`} 
                                alt={'profile picture'} 
                                className="w-14 h-14 rounded-full"
                            />
                        :
                            <FontAwesomeIcon 
                                icon={faUser} 
                                style={{color:'skyblue', height:'40px', width:'40px', borderRadius:'100%'}}
                            />
                    }
                    <textarea
                        { ...register("postText", 
                            { 
                                required: "Please enter a caption",
                                maxLength: {
                                    value: 1000,
                                    message: "Caption cannot be more than 1000 characters"
                                }
                            })}
                        type="text" 
                        className="w-full bg-slate-200 rounded-lg p-2 mx-5 dark:text-black"
                        placeholder="What's on your mind?"
                    />  
                </div>
                
                {/* div for displaying error if user exceeds 250 character limit */}
                <div>
                    {errors.postText?.message && (
                        <div
                            className="w-full flex items-center justify-center mt-2"
                        >
                            <span className='bg-red-300 text-red-700 text-sm p-1 rounded-lg align-center'>{errors.postText.message}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* area to add an image. This will only pop-up once the user clicks on the image icon or text to toggle it. User can then add an image to their post here */}
            {addImage && 
                <div
                    className="flex items-center justify-center"
                >
                    <input 
                        name="image"
                        type="file"
                        className="m-2 border border-fuchsia-300 rounded-lg self-center" 
                        onChange={e => setImage(e.target.files[0])}
                    /> 
                </div>   
            }

            {/* bottom of the component. Includes Image icon + text and post button */}
            <div
                className="flex items-center justify-center pb-2"
            >
                <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => setAddImage(!addImage)}
                >
                    <FontAwesomeIcon 
                        icon={faImage} 
                        style={{color: "#a8a29e", height:'25px', width:'25px', marginRight:'10px'}} 
                    />
                    <p className="text-stone-400">Image</p>
                </div>
                <button
                    type="submit"
                    className="bg-sky-400 text-white text-lg px-6 rounded-full ml-10"
                    onClick={handleSubmit(submitPost)}
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost