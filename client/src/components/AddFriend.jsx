import axios from "axios"

function AddFriend({ friendId, userName, userProfilePic, status }) {
    
    //checking if user is already in friendsList
    const friendOrNah = friendsList.find(friend => friend._id === friendId)

    //adding or removing friend from friendsList depending on whether user is already a friend or not
    const patchFriend = async() =>{
        axios.patch(`http://localhost:5000/user/${userId}/${friendId}`)
    }

    return (
        <div>
            AddFriend
        </div>
    )
}

export default AddFriend