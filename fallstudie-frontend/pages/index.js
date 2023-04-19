import styles from "./index.module.css"
import { useState, useEffect } from 'react'
import { getAllPosts } from '@lib/api'
import Link from 'next/link'

export default function IndexPage() {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        try {
            getAllPosts().then((p) => setPosts(p))
        } catch(e) {
            console.log(e)
        }
    }, [])

    return (
        <div className={styles.posts}>
            <h1 className="blog-title">Welcome to my blog!</h1>
            <ul>
                {
                    posts.map((post) => {
                        return(
                            <li key={post.id}>
                                <Link href={`posts/${post.id}`}>
                                    <div className="posts">
                                    <h2 className="text-home">{post.title}</h2>
                                    </div>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}