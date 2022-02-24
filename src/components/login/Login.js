import React, { useState } from 'react'
import './Login.scss';

import { Navigate, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios/Axios';
import ShowError from '../show_error/ShowError';

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState({})

    const formHandle = async (e, button) => {
        e.preventDefault()

        if (!email || !password) {
            setError({ type: "error", message: "Please Fill All The Field" })
            return
        }

        try {
            await axiosInstance.post(`/api/${button}`, { email, password })

            sessionStorage.setItem('userLogin', true)
            navigate('/', { replace: true })
            return

        } catch (error) {
            error.response &&
                setError({ type: "error", message: error.response.data.err });
        }

    }

    if (sessionStorage.getItem('userLogin')) {
        return <Navigate to={'/'} />
    }

    return (
        <>
            <div className="login-main-div">
                <div className="login-form-div">
                    <form className='login-form'>
                        <h2>Admin Panel</h2>
                        <input type="text" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                        <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button id="login" className='login-button' onClick={(e) => formHandle(e, "login")}>Login</button>
                            <button id="signup" className='login-button' onClick={(e) => formHandle(e, "signup")}>Signup</button>
                        </div>
                    </form>
                </div>
            </div>

            {
                Object.keys(error).length > 0 &&
                <ShowError error={error} setError={setError} />
            }
        </>
    )
}

export default Login