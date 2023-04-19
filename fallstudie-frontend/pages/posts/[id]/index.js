import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"
import { getPostById, deletePost } from '@lib/api'
import Link from 'next/link'

export default function PostPage({ session }) {
    const router = useRouter()
    const { id } = router.query
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(!id) return
        try{
            getPostById(id).then((p) => setPosts(p))
        } catch(e) {
            console.log(e)
        }
    }, [id])

    const handleDelete = () => {
        deletePost(posts.id, session.token)
        router.push('/')
    }



    return (
        <div>
            <div>
                <h1 className='blog-title'>{posts.title}</h1>
                <p className='text'>{posts.text}</p>
            </div>
            <div className='buttons'>
                <form>
                { session.user && <button type='submit' className='button' onClick={handleDelete}>Delete Blog</button>}
                { session.user && <Link href={`./${posts.id}/edit`}><button className='button'>Edit</button></Link>}
                </form>
            </div>
        </div>
        
    )
}
