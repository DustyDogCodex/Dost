import { useContext } from "react"
import Navbar from "../components/Navbar"
import { UserContext } from "../LoggedInUserContext"
import { useForm } from "react-hook-form"
import axios from "axios"

function UserSettings() {
    //grabbing user info from context
    const { loggedInUser } = useContext(UserContext)

    //react-hook-form
    const { register, handleSubmit, formState: { errors} } = useForm({
        defaultValues: {
            location: loggedInUser.location,
            status: loggedInUser.status,
        }
    })

    //save user settings function
    function saveSettings(){
        axios.patch(`http://localhost:5000/user/settings/${loggedInUser._id}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar firstName={loggedInUser.firstName}/>
            <div
                className="h-screen p-2 flex justify-center bg-slate-200 dark:bg-black"
            >
                <div
                    className='h-fit mt-5 p-5 flex flex-col rounded-lg dark:text-white dark:bg-slate-800'
                >
                    <h1
                        className="text-3xl text-center"
                    >
                        User Settings
                    </h1>
                    
                    <div
                        className="mt-5 flex items-center justify-between"
                    >
                        <label>Location</label>
                        <input 
                            {...register('location')}
                            type="text" 
                            className="w-4/5 rounded-lg p-1"
                        />
                    </div>

                    <div
                        className="mt-5 flex items-center justify-between"
                    >
                        <label>Status</label>
                        <input 
                            {...register('status')}
                            type="text" 
                            className="w-4/5 rounded-lg p-1"
                        />
                    </div>

                    <div
                        className="mt-5 flex items-center justify-between"
                    >
                        <label>Profile Picture</label>
                        <input 
                            type="file" 
                            className="border border-sky-400"
                        />
                    </div>

                    <button
                        className="bg-sky-400 mt-5 py-1 px-5 w-fit rounded-lg"
                        onClick={handleSubmit(saveSettings)}
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserSettings