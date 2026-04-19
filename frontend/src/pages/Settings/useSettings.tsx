import { useState, useEffect, useMemo } from 'react'
import { api } from '@/services'
import { defaultCategories } from '@/constants'
import { colors, darkColors } from '@/constants/colors'
import { Category } from '@/types'

export function useSettings() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('darkMode')
        return saved ? JSON.parse(saved) : false
    })

    const [systemMode, setSystemMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('systemMode')
        return saved ? JSON.parse(saved) : true // Default: seguir sistema
    })

    const [language, setLanguage] = useState<string>(() => {
        return localStorage.getItem('language') || 'es'
    })

    const [categories, setCategories] = useState<Category[]>(() => {
        const saved = localStorage.getItem('categories')
        return saved
            ? (JSON.parse(saved) as Category[])
            : defaultCategories
    })

    const [showAddCategory, setShowAddCategory] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState('')
    const [newCategoryColor, setNewCategoryColor] = useState('#007AFF')
    const [deleteCategory, setDeleteCategory] = useState<Category | null>(null)

    const currentColors = useMemo(() => {
        return darkMode ? darkColors : colors
    }, [darkMode])

    // Helper to apply theme
    const applyTheme = (isDark: boolean) => {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
        localStorage.setItem('darkMode', JSON.stringify(isDark))
    }

    // Initialize theme on mount
    useEffect(() => {
        if (systemMode) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            applyTheme(prefersDark)
        } else {
            applyTheme(darkMode)
        }
    }, [])

    // Apply theme when darkMode changes (manual toggle)
    useEffect(() => {
        if (!systemMode) {
            applyTheme(darkMode)
        }
    }, [darkMode, systemMode])

    // When systemMode changes to true, follow system theme
    useEffect(() => {
        if (systemMode) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
            applyTheme(prefersDark)
        }
    }, [systemMode])

    // Listen for system theme changes
    useEffect(() => {
        if (!systemMode) return
        
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const handleChange = (e: MediaQueryListEvent) => {
            applyTheme(e.matches)
        }
        mediaQuery.addEventListener('change', handleChange)
        return () => mediaQuery.removeEventListener('change', handleChange)
    }, [systemMode])

    useEffect(() => {
        localStorage.setItem('language', language)
    }, [language])

    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories))
    }, [categories])

    // Handlers
    const handleAddCategory = () => {
        if (!newCategoryName.trim()) return

        const id = newCategoryName.toLowerCase().replace(/\s+/g, '_')

        setCategories(prev => [
            ...prev,
            { id, name: newCategoryName, color: newCategoryColor }
        ])

        setNewCategoryName('')
        setNewCategoryColor('#007AFF')
        setShowAddCategory(false)
    }

    const handleDeleteCategory = async () => {
        if (!deleteCategory) return

        try {
            await api.person.updateCategory(deleteCategory.id, 'uncategorized')

        setCategories(prev =>
            prev.filter(c => c.id !== deleteCategory.id)
        )

        setDeleteCategory(null)
        } catch (err) {
            console.error(err)
            alert('Error al actualizar personas')
        }
    }

  return {
    // state
    darkMode,
    systemMode,
    language,
    categories,
    showAddCategory,
    newCategoryName,
    newCategoryColor,
    deleteCategory,
    currentColors,

    // setters
    setDarkMode,
    setSystemMode,
    setLanguage,
    setShowAddCategory,
    setNewCategoryName,
    setNewCategoryColor,
    setDeleteCategory,

    // actions
    handleAddCategory,
    handleDeleteCategory,
  }
}