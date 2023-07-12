import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser, faImage } from "@fortawesome/free-solid-svg-icons"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState } from "react"

function CreatePost() {
    //using react-hook-form for tracking and sending user inputs to backend
    const { register, handleSubmit, formState: { errors } } = useForm()

    //state variable to toggle input field for adding image
    //by default, this input is hidden till user clicks on it to add an image
    const [ addImage, setAddImage ] = useState(false)

    return (
        <div
            className="m-3 border rounded-xl bg-white"
        >   
            <div
                className="flex items-center m-3 pb-3 border-b border-sky-400"
            >
                <FontAwesomeIcon 
                    icon={faUser} 
                    style={{ color: "#00bfff", height:'40px', width:'40px', marginRight:'10px' }} 
                />
                <input
                    { ...register("postText", 
                        { 
                            required: "Please enter a caption",
                            maxLength: {
                                value: 250,
                                message: "Caption cannot be more than 250 characters"
                            }
                        })}
                    type="text" 
                    className="border w-full bg-slate-200 rounded-full p-2"
                    placeholder="What's on your mind?"
                />  
            </div>
            {addImage && 
                <div
                    className="flex items-center justify-center"
                >
                    <input 
                        { ...register("postPicture")}
                        type="file"
                        className="m-3 border border-fuchsia-300 p-2 rounded-lg self-center" 
                    /> 
                </div>   
            }
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
                    className="bg-sky-400 text-white text-lg py-1 px-6 m-3 rounded-full ml-10"
                >
                    Post
                </button>
            </div>
        </div>
    )
}

export default CreatePost