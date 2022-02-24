import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const user = sessionStorage.getItem("userLogin")
    if (user) {
        return children

    } else {
        return <Navigate to={'/login'} />
    }
}

export default ProtectedRoute