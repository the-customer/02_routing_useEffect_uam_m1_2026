import { useEffect, useState } from "react";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import { API_URL } from "../consts/Const";

export default function Home() {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`${API_URL}/posts`)
            .then(response => response.json())
            .then(data => {
                //trier les donnees
                setAllPosts(data);
                setLoading(false);
            })
            .catch(error => {
                throw new Error("Erreur " + error)
            })
    }, []);

    async function deletePost(id) {
        const rep = confirm("Are you sure? You want to delete this post?");

        if (rep) {
            //suppression cote FRONT
            const undeletedPosts = allPosts.filter(post => post.id !== id);
            setAllPosts(undeletedPosts);
            //Suppression cote BACK
            await fetch(`${API_URL}/posts/${id}`, { method: "DELETE" });
        }
    }
    return (
        <>
            {loading && <Loader />}
            <PostItem
                posts={allPosts}
                handleDeletePost={deletePost} />
        </>
    )
}

