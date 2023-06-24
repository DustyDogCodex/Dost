import { useForm } from "react-hook-form"

function Login() {
    //setting up react-hook-form
    const { register, handleSubmit, formState: { errors } } = useForm()

    //function to submit login data
    async function submitLogin(data){
        console.log(data)
    }

    return (
        <div>
            <form
                className="flex flex-col items-center justify-center"
                onSubmit={handleSubmit(submitLogin)}
            >
                <label>Email</label>
                <input
                    {...register("email", { required: true })} 
                    type="email" 
                />
                <label>Password</label>
                <input
                    {...register("password", { required: true })} 
                    type="password" 
                />
                <button
                    className="bg-blue-400"
                >
                    Login
                </button>
            </form>
        </div>
  )
}

export default Login