import React, { useEffect } from 'react';
import './ShowError.scss';
import Alert from '@mui/material/Alert';

const ShowError = ({ error, setError }) => {

    useEffect(() => {
        setTimeout(() => {
            setError({})
        }, 2000)
    }, [])

    return (
        <div className='showerror-main-div'>
            <Alert severity={error.type}>{error.message}</Alert>
        </div>
    )
}

export default ShowError