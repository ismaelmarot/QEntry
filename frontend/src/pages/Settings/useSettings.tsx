import { useState, useEffect } from 'react'
import { api } from '@/services'
import { defaultCategories } from '@/constants'
import { Category } from '@/types'

export function useSettings() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const saved = localStorage.getItem('darkMode')
        return saved ? JSON.parse(saved) : false
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

    // Effects
    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode))
        document.body.style.background = darkMode ? '#1C1C1E' : '#F2F2F7'
    }, [darkMode])

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
    language,
    categories,
    showAddCategory,
    newCategoryName,
    newCategoryColor,
    deleteCategory,

    // setters
    setDarkMode,
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