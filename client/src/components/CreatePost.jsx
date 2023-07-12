import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faImage } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState } from "react"

function CreatePost({ userId }) {
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
        formData.append("userId", userId)
        formData.append("postText", watchPostText)
        console.log(image)
        console.log(image.name)
        if(image){
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }

        //axios post request to create a new post
        axios.post('http://localhost:5000/posts/new',
            { userId, formData },
            { withCredentials: true }
        ).then(res => {
            setImage(null)
            setAddImage(false)
        })
        .catch(err => console.log(err))
    }

    return (
        <div
            className="m-3 rounded-xl bg-white dark:bg-slate-500 dark:text-white"
        >   
            {/* top part with usrr image and create post input */}
            <div
                className="flex items-center m-3 py-3 border-b border-sky-400"
            >
                <FontAwesomeIcon 
                    icon={faUser} 
                    style={{ color: "#00bfff", height:'40px', width:'40px', marginRight:'20px' }} 
                />
                <div
                    className="w-full"
                >
                    <textarea
                    { ...register("postText", 
                        { 
                            required: "Please enter a caption",
                            maxLength: {
                                value: 250,
                                message: "Caption cannot be more than 250 characters"
                            }
                        })}
                    type="text" 
                    className="w-full bg-slate-200 rounded-lg p-2 dark:text-black"
                    placeholder="What's on your mind?"
                />  
                {errors.postText?.message && (
                    <div
                        className="w-full flex items-center justify-center"
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
                        name="picture"
                        type="file"
                        className="m-3 border border-fuchsia-300 p-2 rounded-lg self-center" 
                        onChange={(e) => setImage(e.target.files[0])}
                    /> 
                </div>   
            }

            {/* bottom of the component. Includes Image icon + text and post button */}
            <div
                className="flex items-center justify-center"
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
                    className="bg-sky-400 text-white text-lg py-1 px-6 m-3 rounded-full ml-10"
                    onClick={handleSubmit(submitPost)}
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost