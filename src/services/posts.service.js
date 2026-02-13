export default {
    getAllPosts: () => {
        let post = null;
        fetch("http://localhost:3000/posts")
            .then(response => response.json())
            .then(data => {
                console.log(data)
                post = data;
            })
            .catch(error => {
                throw new Error("Erreur " + error)
            })
        return post;
    }
}