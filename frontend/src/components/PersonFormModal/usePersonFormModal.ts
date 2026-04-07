import { useState } from 'react'
import { api } from '@/services'
import { PersonFormModalProps } from '@/types'
import { initialForm } from '@/constants'

export function usePersonFormModal({ onClose, onSuccess }: PersonFormModalProps) {
  const [form, setForm] = useState(initialForm)
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.person.create(form)
      setForm({ ...initialForm })
      onClose()
      onSuccess()
    } catch (err: any) {
      alert(err.message)
    }
  }

  return {
    form,
    setForm,
    handleSubmit,
    showEmployeeDetails,
    setShowEmployeeDetails,
  }
}