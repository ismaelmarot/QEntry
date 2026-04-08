import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineUserGroup, HiOutlineX, HiOutlineSearch } from 'react-icons/hi'
import { api, formatDni } from '@/services/'
import { defaultCategories } from '@/constants'
import { EditPersonModal, PersonFormModal } from '@/components'
import { ActionButton, AddButton, Container, SectionTitle, EmptyIcon, EmptyState, FilterChip, FilterRow, Header, LetterHeader, LetterSection, ListContainer, ListItem, PersonInfo, PersonMeta, PersonName, PersonRow, Popup, PopupButton, PopupButtons, PopupContent, PopupText, PopupTitle, Title, Type } from './Persons.styles'

export function Persons() {
  const navigate = useNavigate()
  const [persons, setPersons] = useState<any[]>([])
  const [filter, setFilter] = useState<string>('')
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [personToDelete, setPersonToDelete] = useState<any>(null)
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)
  const [categories, setCategories] = useState<any[]>(() => {
    const saved = localStorage.getItem('categories')
    return saved ? JSON.parse(saved) : defaultCategories
  })
  const [editPerson, setEditPerson] = useState<any>(null)
  const [editShowSchedule, setEditShowSchedule] = useState(false)
  const [editWorkSchedule, setEditWorkSchedule] = useState<any>(null)
  const [viewPerson, setViewPerson] = useState<any>(null)
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    type: 'visitor',
    roleCode: '',
    host: '',
    visitReason: '',
    photo_url: undefined as string | undefined,
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
      setPersons(data);
    } catch (e) { console.error(e); }
  }

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.person.delete(deleteId)
      setDeleteId(null);
      setPersonToDelete(null);
      loadPersons();
    } catch (err: any) { alert(err.message); }
  }

  useEffect(() => { loadPersons(); }, [filter])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await api.person.create(form);
      setShowModal(false);
      setForm({
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
  }, [employeesSorted]);

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

  return (
    <Container>
      <Header>
        <Title>Personas</Title>
        <AddButton onClick={() => setShowModal(true)}>
          <span>+</span> Nueva persona
        </AddButton>
      </Header>

      <FilterRow>
        {filters.map((f) => (
          <FilterChip key={f.value} $active={filter === f.value} onClick={() => setFilter(f.value)}>
            {f.label}
          </FilterChip>
        ))}
      </FilterRow>

      {persons.length > 0 ? (
        <>
          {employeesByLetter.length > 0 && (
            <ListContainer>
              <SectionTitle>Empleados</SectionTitle>
              {employeesByLetter.map(([letter, items]) => (
                <LetterSection key={letter}>
                  <LetterHeader>{letter}</LetterHeader>
                  {items.map((p) => (
                    <ListItem key={p.id}>
                      <PersonInfo>
                        <PersonRow>
                          <PersonName>{p.last_name} {p.first_name}</PersonName>
                          <Type $type={getTypeColor(p.type)}>{getTypeLabel(p.type)}</Type>
                          <ActionButton onClick={() => navigate('/persons/' + p.id, { state: { person: p } })}>
                            <HiOutlineSearch size={18} />
                          </ActionButton>
                        </PersonRow>
                        <PersonMeta>
                          {formatDni(p.dni) || 'Sin DNI'}{p.role_code ? ' - ' + p.role_code : ''}
                        </PersonMeta>
                      </PersonInfo>
                    </ListItem>
                  ))}
                </LetterSection>
              ))}
            </ListContainer>
          )}

          {othersByLetter.length > 0 && (
            <ListContainer style={{ marginTop: employeesByLetter.length > 0 ? '32px' : 0 }}>
              <SectionTitle>Otros</SectionTitle>
              {othersByLetter.map(([letter, items]) => (
                <LetterSection key={letter}>
                  <LetterHeader>{letter}</LetterHeader>
                  {items.map((p) => (
                    <ListItem key={p.id}>
                      <PersonInfo>
                        <PersonRow>
                          <PersonName>{p.last_name} {p.first_name}</PersonName>
                          <Type $type={getTypeColor(p.type)}>{getTypeLabel(p.type)}</Type>
                          <ActionButton onClick={() => navigate('/persons/' + p.id, { state: { person: p } })}>
                            <HiOutlineSearch size={18} />
                          </ActionButton>
                        </PersonRow>
                        <PersonMeta>
                          {formatDni(p.dni) || 'Sin DNI'}{p.type === 'visitor' && p.visit_reason ? ' - ' + p.visit_reason : ''}
                        </PersonMeta>
                      </PersonInfo>
                    </ListItem>
                  ))}
                </LetterSection>
              ))}
            </ListContainer>
          )}
        </>
      ) : (
        <EmptyState>
          <EmptyIcon><HiOutlineUserGroup size={64} /></EmptyIcon>
          <p>No hay personas registradas</p>
        </EmptyState>
      )}

      <PersonFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={loadPersons}
        categories={categories}
      />

      {deleteId && personToDelete && (
        <Popup onClick={() => setDeleteId(null)}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupTitle>Eliminar persona</PopupTitle>
            <PopupText>¿Estás seguro de que deseas eliminar a {personToDelete.first_name} {personToDelete.last_name}?</PopupText>
            <PopupButtons>
              <PopupButton onClick={() => setDeleteId(null)}>Cancelar</PopupButton>
              <PopupButton $danger onClick={handleDelete}>Eliminar</PopupButton>
            </PopupButtons>
          </PopupContent>
        </Popup>
      )}

      <EditPersonModal
        open={!!editPerson}
        person={editPerson}
        onClose={() => setEditPerson(null)}
        onSuccess={loadPersons}
        categories={categories}
      />
    </Container>
  )
}