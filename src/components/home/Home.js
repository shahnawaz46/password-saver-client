import React, { useState } from 'react'
import './Home.scss'
import { axiosInstance } from '../../axios/Axios'
import ShowError from '../show_error/ShowError'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate()

    const [field, setField] = useState()
    const [rpassword, setRpassword] = useState('')
    const [range, setRange] = useState('0')
    const [error, setError] = useState({})

    // state for save password
    const [websiteName, setWebsiteName] = useState()
    const [userName, setUserName] = useState()
    const [password, setPassword] = useState()

    // state for get password
    const [webName, getWebName] = useState()
    const [userN, getUserN] = useState()
    const [pass, getPass] = useState()

    const generateRandomPassword = () => {
        if (webName || userN || pass) {
            getWebName('')
            getUserN('')
            getPass('')
        }

        // console.log(typeof range);
        if (range === '0') return

        const string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
        let password = ''

        for (var i = 0; i < range; i++) {
            password += string.charAt(Math.floor(Math.random() * string.length))
        }

        // console.log("Password generator fnc", password);
        setRpassword(password)
    }

    const savePassword = async () => {
        if (webName || userN || pass) {
            getWebName('')
            getUserN('')
            getPass('')
        }

        if (!websiteName || !userName || !password) {
            setError({ type: "error", message: "Please Fill All The Field" })
            return
        }

        const detail = {
            websiteName,
            userName,
            password
        }

        try {
            const res = await axiosInstance.post('/api/save/password', detail)
            setError({ type: "success", message: res.data.message });

        } catch (error) {
            error.response &&
                setError({ type: "error", message: error.response.data.err });
        }

        setWebsiteName('')
        setUserName('')
        setPassword('')
    }

    const getPassword = async () => {
        if (!webName) {
            setError({ type: "error", message: "Please Enter Website Name" })
            return
        }

        try {
            const res = await axiosInstance.post('/api/get/password', { webName })

            const userName = res.data.userName.split('-')
            const password = res.data.password.split('-')

            let hashUserName = ''
            let hashPassword = ''

            for (let j = 0; j < userName.length - 1; j++) {
                hashUserName += String.fromCharCode(Math.round((userName[j] * 0.43710342) / 59.602))
            }

            for (let j = 0; j < password.length - 1; j++) {
                hashPassword += String.fromCharCode(Math.round((password[j] * 0.43710342) / 59.602))
            }

            // setWebsiteName(res.data.websiteName)
            getUserN(hashUserName)
            getPass(hashPassword)

        } catch (error) {
            error.response &&
                setError({ type: "error", message: error.response.data.err });
        }
    }

    const logout = () => {
        sessionStorage.removeItem("userLogin")
        navigate("/login", { replace: true })
    }

    return (
        <>
            <div className="home-main-div">
                <div className="home-logout-button-div">
                    <button onClick={logout}>Logout</button>
                </div>
                <h2>Here You Can Create Password and Store Password</h2>
                <div className="home-div">
                    <div className="home-create-password">
                        <button onClick={() => setField(1)}>Create Password</button>
                    </div>

                    <div className="home-save-password">
                        <button onClick={() => setField(2)}>Save Password</button>
                    </div>

                    <div className="home-get-password">
                        <button onClick={() => setField(3)}>Get Password</button>
                    </div>
                </div>

                {
                    field === 1 &&
                    <div className="create">
                        <input className='create-input' value={rpassword} readOnly />
                        <div className='create-password-length' >
                            <input type="range" min={0} max={15} value={range || 0} style={{ width: '70%' }} onChange={e => setRange(e.target.value)} />
                            <span>{range}</span>
                        </div>
                        <button className='create-button' onClick={generateRandomPassword}>Generate Password</button>
                    </div>
                }
                {
                    field === 2 &&
                    <div className="save">
                        <h3>enter website name, user name and password to save</h3>
                        <div className="save-website-name">
                            <span className='save-span'>website name : </span>
                            <input type="text" placeholder='website name' className='save-input' value={websiteName || ''} onChange={(e) => setWebsiteName(e.target.value)} />
                        </div>
                        <div className="save-user-name">
                            <span className='save-span'>user name : </span>
                            <input type="text" placeholder='user name' className='save-input' value={userName || ''} onChange={(e) => setUserName(e.target.value)} />
                        </div>
                        <div className="save-password">
                            <span className='save-span'>password : </span>
                            <input type="text" placeholder='password' className='save-input' value={password || ''} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className='save-button-div'>
                            <button onClick={savePassword} className='save-button'>Submit</button>
                        </div>
                    </div>
                }

                {
                    field === 3 &&
                    <div className="get">
                        <h3>enter website name to get user name and password</h3>
                        <div className="get-website-name">
                            <span className='get-span'>website name : </span>
                            <input type="text" placeholder='website name' className='get-input' value={webName || ''} onChange={(e) => getWebName(e.target.value)} />
                        </div>
                        <div className='get-user-name-password-div'>
                            <div className="get-user-name-password">
                                <span>{userN}</span>
                                <span>{pass}</span>
                            </div>
                        </div>
                        {/* <div className="get-user-name">
                            <input className='get-input' value={userName || ''} readOnly />
                        </div>
                        <div className="get-password">
                            <input className='get-input' value={password || ''} readOnly />
                        </div> */}
                        <div className="get-button-div">
                            <button onClick={getPassword} className='get-button'>get password</button>
                        </div>
                    </div>
                }
            </div>

            {
                Object.keys(error).length > 0 &&
                <ShowError error={error} setError={setError} />
            }
        </>
    )
}

export default Home