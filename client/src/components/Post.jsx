import FriendBox from "./FriendBox"

function Post({ postId, postUserId, userName, location, description, imagePath, userProfilePic, likes, comments }) {
    
    return (
        <div>
            <FriendBox 
                friendId={postUserId}
                name={userName}
                status={location}
                userProfilePic={userProfilePic}
            />
            <p
                className="text-white"
            >
                {description}
            </p>
            {imagePath && (
                <img 
                    src={`http://localhost:5000/uploads/${imagePath}`} 
                    alt="post image"
                    className="max-w-[700px] max-h-[600px]" 
                />
            )}
        </div>
    )
}

export default Post