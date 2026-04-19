import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { colors, darkColors } from '@/constants/colors'

type ThemeColors = typeof colors

interface ThemeContextType {
    colors: ThemeColors
    isDarkMode: boolean
    setIsDarkMode: (value: boolean) => void
    systemMode: boolean
    setSystemMode: (value: boolean) => void
}

const ThemeContext = createContext<ThemeContextType>({
    colors,
    isDarkMode: false,
    setIsDarkMode: () => {},
    systemMode: true,
    setSystemMode: () => {},
})

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeContextProvider({ children }: { children: ReactNode }) {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('darkMode')
        return saved ? JSON.parse(saved) : false
    })

    const [systemMode, setSystemMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('systemMode')
        return saved ? JSON.parse(saved) : true
    })

    useEffect(() => {
        if (systemMode) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light')
        } else {
            document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
        }
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
        localStorage.setItem('systemMode', JSON.stringify(systemMode))
    }, [isDarkMode, systemMode])

    useEffect(() => {
        if (!systemMode) return
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light')
        }
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [systemMode])

    const currentColors = systemMode 
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? darkColors : colors)
        : (isDarkMode ? darkColors : colors)

    const value = {
        colors: currentColors,
        isDarkMode,
        setIsDarkMode,
        systemMode,
        setSystemMode,
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}