import axios from "axios"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

function Login() {
    //setting up react-hook-form
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    //using watch to track user inputs. Passport expects email and password to be the fieldnames used for authentication so i'll be setting those equal to their corresponding watch variables
    const watchEmail = watch('email')
    const watchPassword = watch('password')

    //state variables for toggling incorrect credentials alerts
    const [ incorrectLogin, setIncorrectLogin ] = useState(false)

    //function to submit login data
    async function submitLogin(){
        await axios.post("http://localhost:5000/auth/login",
            { email: watchEmail, password: watchPassword },
            { withCredentials: true } 
        )
        .then(res => {
            console.log('login res.data',res.data)
            if(res.data == 'Successfully authenticated. Logging in user.'){
                window.location.assign('/homepage')
            }
        })
        .catch(err => {
            console.log(err)
            //this will toggle an alert and then remove the alert after 5 seconds
            setIncorrectLogin(true)
            setTimeout(() => {
                setIncorrectLogin(false)
            }, 5000)
        })
    }

    return (
        <div
            className="w-screen h-screen flex items-center justify-center bg-slate-200"
        >
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
                    Connect with old friends and make some new ones!
                </p>
                {incorrectLogin && 
                    <div
                        className='bg-amber-300 text-red-600 p-3 w-96 mt-5 text-center rounded-lg'
                    >
                        Incorrect credentials. Please try again.
                    </div>
                }
            </div>
            <div
                className="flex flex-col items-center justify-center p-10 m-10 bg-white rounded-lg"
            >
                <form
                    className="flex flex-col items-center justify-center border-b-2 pb-8"
                    onSubmit={handleSubmit(submitLogin)}
                >
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
                        placeholder="Enter your email"
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
                        placeholder="Enter your password" 
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    {errors.password?.message && (
                        <span className='bg-red-300 text-red-700 text-sm p-1 rounded-lg'>{errors.password.message}</span>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-500 text-white text-xl py-3 px-8 mt-3 rounded-full"
                    >
                        Login
                    </button>
                </form>
                <div
                    className="mt-8 flex flex-col items-center"
                >
                    <p
                        className="text-lg"
                    >
                        Don't have an account?
                    </p>
                    <Link
                        to={`/register`}
                        className="mt-3 bg-green-500 text-white  py-2 px-6 rounded-full"
                    >
                        Create an account
                    </Link>
                </div>
            </div>
        </div>        
    )
}

export default Login