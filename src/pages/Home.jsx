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
                setAllPosts(data);
                setLoading(false);
            })
            .catch(error => {
                throw new Error("Erreur " + error)
            })
    }, [])
    return (
        <>
            {loading && <Loader />}
            <PostItem posts={allPosts} />
        </>
    )
}

