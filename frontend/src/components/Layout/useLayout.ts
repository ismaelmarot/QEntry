import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export function useLayout() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    const handleNav = (path: string) => {
        navigate(path)
        setMenuOpen(false)
    }

    return {
        menuOpen,
        setMenuOpen,
        handleLogout,
        handleNav,
        location,
    }
}