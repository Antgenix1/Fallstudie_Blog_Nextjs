import { useEffect, useState } from "react"
import styles from "./PostForm.module.css"
import { useRouter } from "next/router"
import { createPost, updatePost } from "@lib/api"

const defaultModel = {
    title: "",
    text: ""
}

function validateModel(post) {
    const errors = {
        title: "Title shouldn't be empty",
        text: "Text shouldn't be empty"
    }
    let isValid = true

    if (post.title == "") {
        errors.title
        isValid = false
    }
    if (post.text == "") {
        errors.text
        isValid = false
    }

    return { errors, isValid }
}

export default function PostForm({ session, postToEdit }) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [errors, setErrors] = useState(defaultModel)
    const [post, setPost] = useState(defaultModel)

    useEffect(() => {
        if (postToEdit) {
            setPost(postToEdit)
        }
    }, [postToEdit])

    const handleChange = (e) => {
        const newPost = structuredClone(post)
        newPost[e.target.name] = e.target.value
        setPost(newPost)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setErrors(defaultModel)

        const result = validateModel(post)

        if (!result.isValid) {
            setErrors(result.errors)
            setIsLoading(false)
            return
        }

        console.log(post)
        if (post.id) {
            updatePost(post, session.token)

        } else {
            createPost(post, session.token)
        }

        setIsLoading(false)
    }

    const sendBack = () => {
        router.push('/')
    }

    return (
        <div className="add">
            <form onSubmit={handleSubmit} className="form">
                <fieldset>
                    <label>Title:</label>
                    <input type="text" name="title" value={post.title} onChange={handleChange}/>
                    { errors.title && <div className={styles.error}>{errors.title}</div>}
                </fieldset>
                <fieldset>
                    <label>Text:</label>
                    <textarea type="text" name="text" value={post.text} onChange={handleChange}/>
                    { errors.text && <div className={styles.error}>{errors.text}</div>}
                </fieldset>
                <button type="submit" className="button" onClick={sendBack}>Submit</button>
            </form>
        </div>
    )
}