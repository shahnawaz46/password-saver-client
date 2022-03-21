import React, { useState } from 'react'
import './Login.scss';

import { useNavigate, Link } from 'react-router-dom';
import { axiosInstance } from '../../axios/Axios';
import ShowError from '../show_error/ShowError';

const Login = () => {
    const navigate = useNavigate()

    const [otp, setOtp] = useState()
    const [error, setError] = useState({})

    const formHandle = async (e, button) => {
        e.preventDefault()

        if (!otp) {
            setError({ type: "error", message: "Please Fill Email" })
            return
        }

        try {
            const data = {
                otp,
                _id: sessionStorage.getItem("id")
            }


            const res = await axiosInstance.post('/api/otp/verfication', data)

            sessionStorage.removeItem("id")

            sessionStorage.setItem("p_s_user", JSON.stringify({ 'userLogin': true, 'name': res.data.name }))
            navigate('/', { replace: true })
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
                    <form className='login-form'>
                        <h2>Enter Otp</h2>
                        <p>Otp has send to your email address</p>
                        <input type="text" maxLength={4} onChange={(e) => setOtp(e.target.value)} required />
                        <button className='login-button' onClick={formHandle}>Submit</button>
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