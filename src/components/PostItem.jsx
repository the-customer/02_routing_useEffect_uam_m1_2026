import { useNavigate } from "react-router-dom";
import { DEFAULT_IMG_PROFILE } from "../consts/Const";

export default function PostItem({ posts, handleDeletePost }) {
    const navigate = useNavigate()
    function handleUpdatePost(id) {
        navigate(`/create`, { state: { id } })
    }
    return (
        <>
            {posts.length == 0 && <p className="text-sm text-red-400 text-center">No posts founds!</p>}
            {
                posts.map(post => (
                    <div key={post.id} className="relative p-6 border-b mb-2 border-indigo-300">
                        <img className="absolute top-0 left-0 w-full h-full object-cover opacity-[0.09] z-[-1]" src={post.image} alt={post.title} />
                        <div className="mb-4 flex justify-between items-start">
                            <div className="flex flex-col items-start">
                                <h2 className="font-bold text-lg mb-2 text-indigo-400">{post.title}</h2>
                                <div className="flex items-center">
                                    <img className="mr-2 w-60 h-40 object-cover" src={post.image} alt={post.title} />
                                    <p className="text-gray-600 text-sm">
                                        {post.body.length > 500 ? post.body.slice(0, 500) + '...' : post.body}
                                    </p>
                                </div>
                                <small className="text-gray-500 text-xs">Posted on : {post.created_at}</small>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleDeletePost(post.id)}
                                    className="cursor-pointer">
                                    <i className="fa-solid fa-trash text-red-500"></i>
                                </button>
                                <button
                                    onClick={() => handleUpdatePost(post.id)}
                                    className="cursor-pointer">
                                    <i className="fa-solid fa-pen-to-square text-yellow-500"></i>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <img className="rounded-full mr-8 w-8 h-8 object-cover" src={DEFAULT_IMG_PROFILE} alt="user" />
                                <span className="text-gray-500 text-xs">Posted by {post.user}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 text-xs mr-2">
                                    <i className="fas fa-comment mr-1 text-indigo-400"></i>{post.comments.length}
                                </span>
                                <span className="text-gray-500 text-xs mr-2">
                                    <i className="fas fa-heart mr-1 text-red-400"></i>{post.likes}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}
