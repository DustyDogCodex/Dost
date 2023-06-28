import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

function Login() {
    //setting up react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm()

    //function to submit login data
    async function submitLogin(data){
        console.log(data)
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