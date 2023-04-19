import { login } from '@lib/api'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const defaultModel = {
    email: "",
    password: ""
}

function validateModel(model) {
    const errors = {
        email: "Email shouldn't be empty",
        password: "Password shouldn't be empty"
    }
    let isValid = true

    if (model.email == "") {
        errors.email
        isValid = false
    }
    if (model.password == "") {
        errors.password
        isValid = false
    }

    return { errors, isValid }
}

export default function LoginForm({ session }) {
    const router = useRouter()
    const [errors, setErrors] = useState(defaultModel)
    const [model, setModel] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setModel({
            ...model,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const resp = await login(model)
        session.login(resp)
        router.push('/')
    }

    return (
        <div className='add'>
            <form onSubmit={handleSubmit} className='form'>
                <fieldset>
                    <label>Email:</label>
                    <input type='text' name='email' onChange={handleChange} value={model.username} />
                    { errors.email && <div>{errors.email}</div> }
                </fieldset>
                <fieldset>
                    <label>Password:</label>
                    <input type='password' name='password' onChange={handleChange} value={model.password} />
                    { errors.password && <div>{errors.password}</div>}
                </fieldset>
                <button className='button' type='submit' value="Login">Login</button>
            </form>
        </div>
    )
}
