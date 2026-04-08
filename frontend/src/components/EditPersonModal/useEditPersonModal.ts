import { useState, useEffect } from 'react'
import { api } from '@/services'

type Props = {
    person: any
    onClose: () => void
    onSuccess: () => void
}

export function useEditPersonModal({ person, onClose, onSuccess }: Props) {
    const [editPerson, setEditPerson] = useState<any>(person)
    const [editWorkSchedule, setEditWorkSchedule] = useState<any>(null)
    const [showSchedule, setShowSchedule] = useState(false)

    useEffect(() => {
        if (person) {
            setEditPerson(person)
            setEditWorkSchedule(person.work_schedule || null)
        }
    }, [person])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            await api.person.update(editPerson.id, {
                firstName: editPerson.first_name,
                lastName: editPerson.last_name,
                dni: editPerson.dni,
                type: editPerson.type,
                roleCode: editPerson.role_code,
                workSchedule: editPerson.type === 'employee' ? editWorkSchedule : null,
            })

            onClose()
            onSuccess()

        } catch (err: any) {
            alert(err.message)
        }
    }

    return {
        editPerson,
        setEditPerson,
        editWorkSchedule,
        setEditWorkSchedule,
        showSchedule,
        setShowSchedule,
        handleSubmit,
    }
}