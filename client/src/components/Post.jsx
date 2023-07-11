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
            <p>{description}</p>
            {imagePath && (
                <img 
                    src={`${imagePath}`} 
                    alt="post image"
                    className="w-full h-auto" 
                />
            )}
        </div>
    )
}

export default Post