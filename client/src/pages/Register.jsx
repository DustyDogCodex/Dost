import axios from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

function Register() {
    //setting up react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            profilePic: ''
        }
    })

    //if user email is already in our database, an alert will popup and ask the user to use a new email
    const [ invalidEmail, setInvalidEmail ] = useState(false)

    //variable for tracking user file upload
    const [ image, setImage ] = useState('')

    //function to submit login data
    async function createAccount(data){
        //setting up formdata for submitting files and user info
        const formData = new FormData()
        formData.append("firstName", data.firstName)
        formData.append("lastName", data.lastName)
        formData.append("email", data.email)
        formData.append("password", data.password)
        formData.append("location", data.location)
        
        //if user has uploaded an image for their profile pic, append that to formdata object
        if(image){
            formData.append('image', image)
        }

        //axios post request to submit formdata and create new user account 
        axios.post('http://localhost:5000/auth/register',
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" }
            },
            { withCredentials: true }
        )
        .then(res => {
            console.log(res)
            if(res.data == 'success'){
                window.location.replace('/')
            }
        })
        .catch(err => { 
            if (err.response.data == "failed"){
                //if failed, post invalid email alert and console.log errr status
                setInvalidEmail(true)
                console.log(err)
                setTimeout(() => {
                    setInvalidEmail(false)
                }, 5000) 
            }
        })
    }

    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-slate-200"
        >
            {/* left side of page withe welcome text */}
            <div
                className="p-5 m-5"
            >
                <h1
                    className="text-5xl"
                >
                    Welcome to <span className="text-7xl text-green-400 font-marker">Dost</span> 
                </h1>
                <p
                    className="text-xl"
                >
                    Create an account to connect with old and new friends!
                </p>
                {invalidEmail && 
                    <div
                        className='bg-amber-300 text-red-600 p-3 w-96 mt-5 text-center rounded-lg'
                    >
                        This email is already associated with a user account. Please choose a different email or login.
                    </div>
                }
            </div>

            {/* form for registering an account */}
            <div
                className="flex flex-col items-center justify-center p-10 m-10 bg-white rounded-lg"
            >
                <form
                    className="flex flex-col items-center justify-center border-b-2 pb-8"
                    onSubmit={handleSubmit(createAccount)}
                >
                    <input
                        {...register("firstName", { required: 'Please enter your first name', min: 2, max: 50 })} 
                        type="text" 
                        placeholder='Enter your first name'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    {errors.firstName?.message && (
                        <span className='bg-red-300 text-red-700 text-sm p-1 rounded-lg'>{errors.firstName.message}</span>
                    )}

                    <input
                        {...register("lastName", { required: "Please enter your last name", min: 2, max: 50 })} 
                        type="text" 
                        placeholder='Enter your last name'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    {errors.lastName?.message && (
                        <span className='bg-red-300 text-red-700 text-sm p-1 rounded-lg'>{errors.lastName.message}</span>
                    )}

                    <input
                        {...register("email", 
                            { 
                                required: "Please enter an email address", 
                                validate: {
                                    maxLength: (v) => v.length <= 50 || "The email should have at most 50 characters",
                                    matchPattern: (v) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || "Email address must be a valid address",
                                }
                            }
                        )} 
                        type="email" 
                        placeholder='Enter your email'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    {errors.email?.message && (
                        <span className='bg-red-300 text-red-700 text-sm p-1 rounded-lg'>{errors.email.message}</span>
                    )}

                    <input
                        {...register("password", 
                            { 
                                required: "Please enter a password", 
                                minLength:{ value: 6, message:"Password needs to be 6 characters or more" }
                            }
                        )} 
                        type="password" 
                        placeholder='Choose a password'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    {errors.password?.message && (
                        <span className='bg-red-300 text-red-700 text-sm p-1 rounded-lg'>{errors.password.message}</span>
                    )}

                    <input
                        {...register("location")} 
                        type="text" 
                        placeholder='Enter location (optional)'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />

                    <span className='text-gray-400'>Add a profile picture</span>
                    <input
                        name='image' 
                        type="file" 
                        onChange={e => setImage(e.target.files[0])}
                        className="border border-blue-400 rounded-lg p-2 m-2 text-lg text-gray-400"
                    />

                    {/* form submission button */}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white text-xl py-3 px-8 mt-3 rounded-full"
                    >
                        Create account
                    </button>           
                </form>

                {/* option to redirect to login page if user already has an account */}
                <div
                    className="mt-8 flex flex-col items-center"
                >
                    <p
                        className="text-lg"
                    >
                        Already have an account?
                    </p>
                    <Link
                        to={`/`}
                        className="mt-3 bg-green-500 text-white  py-2 px-6 rounded-full"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register