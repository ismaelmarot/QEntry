import { useEffect, useState, useMemo } from 'react'
import { api } from '@/services'
import { defaultCategories } from '@/constants'
import { EditPerson, PersonForm } from '@/interface'

export function usePersons() {
  const [persons, setPersons] = useState<any[]>([])
  const [filter, setFilter] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [personToDelete, setPersonToDelete] = useState<any>(null)
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)
  const [editPerson, setEditPerson] = useState<EditPerson | null>(null)
  const [editShowSchedule, setEditShowSchedule] = useState(false)
  const [editWorkSchedule, setEditWorkSchedule] = useState<any>(null)
  const [viewPerson, setViewPerson] = useState<any>(null)
  
  const [categories, setCategories] = useState<any[]>(() => {
    const saved = localStorage.getItem('categories')
    return saved ? JSON.parse(saved) : defaultCategories
  })

  const [form, setForm] = useState<PersonForm>({
    firstName: '',
    lastName: '',
    dni: '',
    type: 'visitor',
    roleCode: '',
    host: '',
    visitReason: '',
    photo_url: undefined,
    workSchedule: {
      monday: { enabled: false, entry: '', exit: '' },
      tuesday: { enabled: false, entry: '', exit: '' },
      wednesday: { enabled: false, entry: '', exit: '' },
      thursday: { enabled: false, entry: '', exit: '' },
      friday: { enabled: false, entry: '', exit: '' },
      saturday: { enabled: false, entry: '', exit: '' },
      sunday: { enabled: false, entry: '', exit: '' },
    },
  })

  const loadPersons = async () => {
    try {
      const data = await api.person.getAll(filter ? { type: filter } : undefined)
      setPersons(data)
    } catch (e) { console.error(e); }
  }

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.person.delete(deleteId)
      setDeleteId(null)
      setPersonToDelete(null)
      loadPersons()
    } catch (err: any) { alert(err.message)}
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.person.create(form)
      setShowModal(false)
      setForm({
        firstName: '', lastName: '', dni: '', type: 'visitor', roleCode: '',
        host: '', visitReason: '', photo_url: undefined,
        workSchedule: {
          monday: { enabled: false, entry: '', exit: '' },
          tuesday: { enabled: false, entry: '', exit: '' },
          wednesday: { enabled: false, entry: '', exit: '' },
          thursday: { enabled: false, entry: '', exit: '' },
          friday: { enabled: false, entry: '', exit: '' },
          saturday: { enabled: false, entry: '', exit: '' },
          sunday: { enabled: false, entry: '', exit: '' },
        },
      })
      loadPersons();
    } catch (err: any) { alert(err.message)}
  }

  const getTypeLabel = (type: string) => {
    const cat = categories.find(c => c.id === type)
    return cat ? cat.name : (type === 'uncategorized' ? 'Sin categoría' : type)
  }

  const getTypeColor = (type: string) => {
    const cat = categories.find(c => c.id === type)
    return cat ? cat.color : '#8E8E93'
  }

  const filters = useMemo(() => {
    return [
      { value: '', label: 'Todos' },
      ...categories.map(c => ({ value: c.id, label: c.name + 's' }))
    ]
  }, [categories])

  const employeesSorted = useMemo(() => {
    return [...persons]
      .filter(p => p.type === 'employee')
      .sort((a, b) => a.last_name.localeCompare(b.last_name))
  }, [persons])

  const employeesByLetter = useMemo(() => {
    const groups: Record<string, typeof employeesSorted> = {}
    employeesSorted.forEach(p => {
      const letter = p.last_name.charAt(0).toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(p)
    })
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]))
  }, [employeesSorted])

  const others = useMemo(() => {
    return persons.filter(p => p.type !== 'employee')
  }, [persons])

  const othersByLetter = useMemo(() => {
    const sorted = [...others].sort((a, b) => a.last_name.localeCompare(b.last_name))
    const groups: Record<string, typeof sorted> = {}
    sorted.forEach(p => {
      const letter = p.last_name.charAt(0).toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(p)
    })
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]))
  }, [others])

  // Effects
  useEffect(() => { loadPersons(); }, [filter])

  return {
    // State
    persons,
    filter,
    showModal,
    deleteId,
    personToDelete,
    showEmployeeDetails,
    categories,
    editPerson,
    editShowSchedule,
    editWorkSchedule,
    viewPerson,
    form,
    
    // Setters State
    setPersons,
    setFilter,
    setShowModal,
    setDeleteId,
    setPersonToDelete,
    setShowEmployeeDetails,
    setCategories,
    setEditPerson,
    setEditShowSchedule,
    setEditWorkSchedule,
    setViewPerson,
    setForm,
    
    // Functions
    loadPersons,
    handleDelete,
    handleSubmit,
    
    // Helpers
    getTypeLabel,
    getTypeColor,
    filters,
    employeesSorted,
    employeesByLetter,
    others,
    othersByLetter
  }
}