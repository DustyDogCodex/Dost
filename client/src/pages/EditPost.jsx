function EditPost() {
    return (
        <div
            className="absolute flex flex-col justify-center rounded-lg p-3 bg-slate-200"
        >
            <div
                className="flex items-center justify-between mb-4"
            >
                <h1 className="text-xl">Edit Post</h1>
                    <FontAwesomeIcon 
                                icon={faCircleXmark} 
                                style={{color: "#f20707", height:'25px', width:'25px', cursor:'pointer'}} 
                                onClick={() => setShowModal(!showModal)}
                            /> 
                        </div>
                        
                        <div>
                            <textarea 
                                type="text" 
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full p-1 rounded-lg"
                            />

                            {editImagePath && 
                                (
                                    <div
                                        className="relative"
                                    >
                                        <img 
                                            src={`http://localhost:5000/uploads/${imagePath}`} 
                                            alt="image with post"
                                            className="max-h-[600px] rounded-lg w-fit"
                                        />
                                        <div
                                            className="bg-white rounded-full p-2 absolute top-4 right-4 flex items-center justify-center"
                                        >
                                            <FontAwesomeIcon 
                                                icon={faTrash} 
                                                style={{color: "#fa0000", height:'25px', width:'25px', cursor:'pointer'}} 
                                                onClick={() => setEditImagePath(null)}
                                            /> 
                                        </div>
                                    </div>
                                )
                            }

                            {!editImagePath && 
                                (
                                    <div>
                                        <input 
                                            type="file" 
                                            onChange={(e) => setEditImagePath(e.target.files[0])}
                                            className="p-1 border border-blue-400 rounded-lg"
                                        />
                                    </div>
                                )
                            }

                            <div
                                className="flex items-center justify-between"
                            >
                                <button
                                    className="bg-green-400 px-3 py-1 rounded-full mt-3 text-white"
                                >
                                    Save Post
                                </button>
                                
                                <button
                                    className="bg-red-700 px-3 py-1 rounded-full mt-3 text-white"
                                >
                                    Delete Post
                                </button>
                            </div>
                        </div>
                    </div>
    )
}

export default EditPost