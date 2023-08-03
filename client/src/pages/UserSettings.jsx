import { useContext, useEffect } from "react"
import Navbar from "../components/Navbar"
import { UserContext } from "../LoggedInUserContext"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

function UserSettings() {
    //grabbing user info from context
    const { loggedInUser } = useContext(UserContext)

    //variables to track user input
    const [ location, setLocation ] = useState('')
    const [ status, setStatus ] = useState('')
    const [ profilePic, setProfilePic ] = useState('')

    //toggle inputs to enter new user info
    const [ editLocation, setEditLocation ] = useState(false)
    const [ editStatus, setEditStatus ] = useState(false)
    const [ editPicture, setEditPicture ] = useState(false)

    //save user settings function
    async function saveSettings(){
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
                    className='h-fit mt-5 p-5 flex flex-col rounded-lg bg-white dark:text-white dark:bg-slate-800'
                >
                    <h1
                        className="text-3xl text-center"
                    >
                        User Settings
                    </h1>
                    
                    <div
                        className="mt-5 flex items-center justify-between"
                    >
                        <label className="font-bold text-xl">Location</label>

                        <div
                            className={`${editLocation ? 'hidden' : ''} flex items-center justify-around`}
                        >
                            <p 
                                className="dark:text-white"
                            >
                                {loggedInUser.location ? loggedInUser.location : 'Off the grid'}
                            </p>
                            <FontAwesomeIcon 
                                icon={faPenToSquare} 
                                style={{color: "#00e9fa", cursor:'pointer', marginLeft:'10px'}} 
                                onClick={() => setEditLocation(!editLocation)}
                            />
                        </div>

                        {/* this section will be displayed after user clicks the edit button first */}
                        <div
                            className={`${editLocation ? '' : 'hidden'}`}
                        >
                            <input 
                                type="text"
                                value={location} 
                                onChange={(e) => setLocation(e.target.value)}
                                className="rounded-lg p-1"
                            />
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                style={{color: "#05fa2e", cursor:'pointer', marginLeft:'5px'}} 
                            />
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                style={{color: "#ff0000", cursor:'pointer', marginLeft:'5px'}}
                                onClick={() => setEditLocation(!editLocation)} 
                            />
                        </div>
                    </div>

                    <div
                        className="mt-5 flex items-center justify-between"
                    >
                        <label className="font-bold text-xl">Status</label>

                        <div
                            className={`${editStatus ? 'hidden' : ''} flex items-center justify-around`}
                        >
                            <p 
                                className="dark:text-white"
                            >
                                {loggedInUser.status ? loggedInUser.status : 'No status'}
                            </p>
                            <FontAwesomeIcon 
                                icon={faPenToSquare} 
                                style={{color: "#00e9fa", cursor:'pointer', marginLeft:'10px'}} 
                                onClick={() => setEditStatus(!editStatus)}
                            />
                        </div>

                        {/* this section will be displayed after user clicks the edit button first */}
                       <div
                            className={`${editStatus ? '' : 'hidden'}`}
                        >
                            <input 
                                type="text"
                                value={status} 
                                className="rounded-lg p-1"
                            />
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                style={{color: "#05fa2e", cursor:'pointer', marginLeft:'5px'}} 
                            />
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                style={{color: "#ff0000", cursor:'pointer', marginLeft:'5px'}}
                                onClick={() => setEditStatus(!editStatus)} 
                            />
                        </div>
                    </div>

                    <div
                        className="mt-5 flex items-center justify-between"
                    >
                        <label className="font-bold text-xl">Profile Picture</label>
                        
                        <div
                            className={`${editPicture ? 'hidden' : ''} flex items-center justify-around`}
                        >
                            <img 
                                src={`http://localhost:5000/uploads/${loggedInUser.profilePic}`} 
                                alt="user profile picture" 
                                className="w-48 h-48 rounded-lg ml-10"
                            />
                            <FontAwesomeIcon 
                                icon={faPenToSquare} 
                                style={{color: "#00e9fa", cursor:'pointer', marginLeft:'10px'}}
                                onClick={() => setEditPicture(!editPicture)}
                            />
                        </div>

                        {/* this section will be displayed after user clicks the edit button first */}
                        <div
                            className={`${editPicture ? '' : 'hidden'}`}
                        >
                            <input 
                                type="file"
                                onChange={(e) => setProfilePic(e.target.files[0])}
                                className="rounded-lg p-1 border border-sky-500 ml-5"
                            />
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                style={{color: "#05fa2e", cursor:'pointer', marginLeft:'5px'}} 
                            />
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                style={{color: "#ff0000", cursor:'pointer', marginLeft:'5px'}}
                                onClick={() => setEditPicture(!editPicture)} 
                            />
                        </div>
                    </div>

                    <button
                        className="bg-sky-400 mt-5 py-1 px-5 w-fit rounded-lg text-white"
                        onClick={saveSettings}
                    >
                        Save Settings
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserSettings