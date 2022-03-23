import React, { useEffect, useRef, useState } from 'react'
import './Login.scss';

import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../axios/Axios';
import ShowError from '../show_error/ShowError';

const Otp = () => {
    const navigate = useNavigate()

    const [otp, setOtp] = useState()
    const [error, setError] = useState({})
    const [time, setTime] = useState(120)
    const timeRef = useRef(120)
    const [startTimer, setStartTimer] = useState(true)

    const formHandle = async (e) => {
        e.preventDefault()

        if (!otp) {
            setError({ type: "error", message: "Please Fill OTP" })
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

    const resendCode = async () => {
        if (!sessionStorage.getItem("id")) setError({ type: "error", message: "Please Login/Signup First" });

        try {
            const id = sessionStorage.getItem("id")
            const res = await axiosInstance.post('/api/reset/otp', { id })

            setError({ type: "success", message: res.data.message });

            timeRef.current = 120
            setTime(120)
            setStartTimer(!startTimer)

        } catch (error) {
            error.response &&
                setError({ type: "error", message: error.response.data.err });
        }
    }

    useEffect(() => {
        const timeInterval = setInterval(() => {
            timeRef.current -= 1
            setTime(prev => prev - 1)

            if (timeRef.current <= 0) {
                clearInterval(timeInterval)
            }

        }, 1000);

        return () => {
            clearInterval(timeInterval)
        }

    }, [startTimer])


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
                        <p>OTP has been sent to your email</p>
                        <input type="text" maxLength={4} onChange={(e) => setOtp(e.target.value)} required />
                        <button className='login-button' onClick={formHandle}>Submit</button>
                    </form>
                    <div style={{ color: 'white', marginBottom: '10px' }}>
                        {
                            time <= 0 ?
                                <span style={{ color: 'white', cursor: 'pointer', textDecoration: 'underline' }} onClick={resendCode}> resend in </span>
                                :
                                <span style={{ color: 'grey' }}>resend in </span>
                        }
                        : {time}
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

export default Otp