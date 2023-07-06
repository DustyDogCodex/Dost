import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUser } from "@fortawesome/free-solid-svg-icons"
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
            className="m-3 border rounded-xl"
        >   
            <div
                className="flex items-center m-3"
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
                <input 
                    { ...register("postPicture")}
                    type="file" 
                />    
            }
        </div>
    )
}

export default CreatePost