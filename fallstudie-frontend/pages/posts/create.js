import PostForm from '@components/PostForm'
import { useRedirectToLogin } from '@lib/session'
import React from 'react'

export default function PostCreatePage({session}) {
  useRedirectToLogin(session)

  return (
    <div>
        <PostForm session={session}/>
    </div>
  )
}
