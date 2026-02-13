import { useEffect, useState } from "react";
import { API_URL } from "../consts/Const";
import { useLocation, useNavigate } from "react-router-dom";

export default function PostCreate() {
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {}
    function initValue() {
        setTitle("");
        setImage("");
        setContent("");
    }
    useEffect(() => {
        if (id) {
            fetch(`${API_URL}/posts/${id}`)
                .then(response => response.json())
                .then(data => {
                    setTitle(data.title);
                    setImage(data.image);
                    setContent(data.body);
                })
        } else {
            initValue();
        }
    }, [id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !image || !content) return;
        //
        let newPost = {
            title,
            image,
            body: content,
            likes: 0,
            comments: [],
            created_at: new Date().toLocaleDateString(),
            user: "TheCustomer"
        }
        newPost = id ? { ...newPost, id } : newPost;
        //save or update
        fetch(!id ? `${API_URL}/posts` : `${API_URL}/posts/${id}`, {
            method: !id ? "POST" : "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPost)
        }).then(() => {
            navigate("/");
        })
    }
    return (
        <>
            <div className="max-w-2xl mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="mb-8 flex flex-col items-start">
                        <label>Title</label>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            className="border-0 outline-0 p-2 ring-1 ring-indigo-400 rounded-lg w-full block mt-1 focus:ring-2" />
                    </div>
                    <div className="mb-8 flex flex-col items-start">
                        <label>Image Url</label>
                        <input
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            type="link"
                            className="border-0 outline-0 p-2 ring-1 ring-indigo-400 rounded-lg w-full block mt-1 focus:ring-2" />
                    </div>
                    <div className="mb-8 flex flex-col items-start">
                        <label>Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            type="text"
                            className="border-0 outline-0 p-2 ring-1 ring-indigo-400 rounded-lg w-full block mt-1 focus:ring-2" />
                    </div>
                    <button className="bg-indigo-400 text-white block w-full p-2 rounded-lg hover:bg-indigo-600">
                        {id ? "Update" : "Create"}
                    </button>
                </form>
            </div>
        </>
    )
}
