import { useForm } from 'react-hook-form'

function Register() {
    //setting up react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm()

    //function to submit login data
    async function createAccount(data){
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
                    Create an account to connect with old and new friends!
                </p>
            </div>
            <div
                className="flex flex-col items-center justify-center p-10 m-10 bg-white rounded-lg"
            >
                <form
                    className="flex flex-col items-center justify-center"
                    onSubmit={handleSubmit(createAccount)}
                >
                    <input
                        {...register("firstName", { required: true })} 
                        type="text" 
                        placeholder='Enter your first name'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    <input
                        {...register("lastName", { required: true })} 
                        type="text" 
                        placeholder='Enter your last name'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    <input
                        {...register("email", { required: true })} 
                        type="email" 
                        placeholder='Enter your email'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    <input
                        {...register("password", { required: true })} 
                        type="password" 
                        placeholder='Choose a password'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    <input
                        {...register("location")} 
                        type="text" 
                        placeholder='Enter location (optional)'
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg"
                    />
                    <label>Add a profile picture (optional)</label>
                    <input
                        {...register("profilePic")} 
                        type="file"
                        className="border border-blue-400 rounded-full p-2 m-2 text-lg" 
                    />                
                </form>
            </div>
        </div>
    )
}

export default Register