import { useForm } from 'react-hook-form'

function Register() {
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
                <label>First Name</label>
                <input
                    {...register("firstName", { required: true })} 
                    type="text" 
                />
                <label>Last Name</label>
                <input
                    {...register("lastName", { required: true })} 
                    type="text" 
                />
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
                <label>Location</label>
                <input
                    {...register("location")} 
                    type="text" 
                />
                <label>Profile Picture</label>
                <input
                    {...register("profilePic")} 
                    type="file" 
                />                
            </form>
        </div>
    )
}

export default Register