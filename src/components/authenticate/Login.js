import React, { useState } from 'react'
import './Login.scss';

import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../../axios/Axios';
import ShowError from '../show_error/ShowError';

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState()
    const [error, setError] = useState({})

    const formHandle = async (e) => {
        e.preventDefault()

        if (!email) {
            setError({ type: "error", message: "Please Fill Email" })
            return
        }

        try {
            const res = await axiosInstance.post('/api/login', { email })

            sessionStorage.setItem("id", res.data._id)
            navigate('/otp')
            return

        } catch (error) {
            error.response &&
                setError({ type: "error", message: error.response.data.err });
        }
    }

    if (sessionStorage.getItem('p_s_user')) {
        navigate('/', { replace: true })
        return
    }

    return (
        <>
            <div className="login-main-div">
                <div className="login-form-div">
                    <form className='login-form' onSubmit={formHandle}>
                        <h2>Admin Panel</h2>
                        <input type="email" placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
                        <button className='login-button'>Login</button>
                    </form>
                    <div className='login-button-div'>
                        <span>Or</span> <br />
                        <Link to={'/signup'}>
                            <button className='login-button'>Signup</button>
                        </Link>
                    </div>
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