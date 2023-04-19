import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import PostForm from '@components/PostForm'
import { useRedirectToLogin } from '@lib/session'
import { getPostById } from '@lib/api'

export default function EditPage({ session }) {
  useRedirectToLogin(session)
  const router = useRouter()
  const { id } = router.query

  const [post, setPosts] = useState([])

  useEffect(() => {
    if(!id) return
    try{
        getPostById(id).then((p) => setPosts(p))
    } catch(e) {
        console.log(e)
    }
}, [id])


  return (
    <div>
      <PostForm session={session} postToEdit={{...post, id: parseInt(id)}}/>      
    </div>
  )
}
