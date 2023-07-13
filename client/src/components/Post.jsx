import FriendBox from "./FriendBox"

function Post({ postId, postUserId, userName, location, description, imagePath, userProfilePic, likes, comments }) {
    
    return (
        <div
            className="w-fit bg-white rounded-lg p-4 mb-3 flex flex-col dark:bg-slate-800"
        >
            <FriendBox 
                friendId={postUserId}
                userName={userName}
                status={location}
                userProfilePic={userProfilePic}
            />
            <p
                className="text-lg dark:text-white m-3"
            >
                {description}
            </p>
            {imagePath && (
                <img 
                    src={`http://localhost:5000/uploads/${imagePath}`} 
                    alt="post image"
                    className="max-w-[800px] max-h-[700px]" 
                />
            )}
        </div>
    )
}

export default Post