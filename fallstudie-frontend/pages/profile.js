import { useRedirectToLogin } from '@lib/session'
import React from 'react'

export default function ProfilePage({ session }) {
    useRedirectToLogin(session)
    
    return (
        <div>
            <pre className='data'>{JSON.stringify(session, null, 4)}</pre>
        </div>
    )
}
