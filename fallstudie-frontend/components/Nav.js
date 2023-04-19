import Link from 'next/link'
import React from 'react'

export default function Nav({ session }) {

  const handleLogout = () => {
    session.logout()
  }

  return (
    <div className='topnav' id='myTopnav'>
        <Link className='link' href={`/`}>Home</Link>
        {session.user && <Link id='name' className='loginlink' href={`/profile`}>{session.user.name}</Link>}
        {session.user && <Link className='link' href={`/posts/create`}>Add Blog</Link>}
        {session.user && <Link className='loginlink' href={`/`} onClick={handleLogout}>Logout</Link>}
        {!session.user && <Link className='loginlink' href={`/login`}>Login</Link>}
    </div>
  )
}
