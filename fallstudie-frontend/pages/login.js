import LoginForm from '@components/LoginForm'
import { useRedirectToHome } from '@lib/session'
import React from 'react'

export default function LoginPage({ session }) {
    useRedirectToHome(session)

    return (
        <div>
            <LoginForm session={session} />
        </div>
    )
}
