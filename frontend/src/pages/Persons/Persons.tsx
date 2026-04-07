import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineUserGroup, HiOutlineX, HiOutlineSearch } from 'react-icons/hi'
import { api, formatDni } from '@/services/'
import { SectionTitle } from '@/components/ApparanceSection/ApparanceSection.styles'
import { defaultCategories } from '@/constants'
import { PersonFormModal } from '@/components'
import { ActionButton, AddButton, Button, ButtonRow, CloseButton, Container, DayChip, DayHoursContainer, DayHoursRow, EmptyIcon, EmptyState, ExpandableHeader, ExpandableSection, FilterChip, FilterRow, Header, Input, LetterHeader, LetterSection, ListContainer, ListItem, Modal, ModalContent, ModalHeader, ModalTitle, PersonInfo, PersonMeta, PersonName, PersonRow, Popup, PopupButton, PopupButtons, PopupContent, PopupText, PopupTitle, SectionLabel, Select, SmallInput, TextArea, Title, Type } from './Persons.styles'

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

      {editPerson && (
        <Modal onClick={() => setEditPerson(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Editar persona</ModalTitle>
              <CloseButton onClick={() => setEditPerson(null)}><HiOutlineX size={18} /></CloseButton>
            </ModalHeader>
            <form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await api.person.update(editPerson.id, {
                  firstName: editPerson.first_name,
                  lastName: editPerson.last_name,
                  dni: editPerson.dni,
                  type: editPerson.type,
                  roleCode: editPerson.role_code,
                  workSchedule: editPerson.type === 'employee' ? editWorkSchedule : null,
                });
                setEditPerson(null);
                setEditWorkSchedule(null);
                loadPersons();
              } catch (err: any) { alert(err.message); }
            }}>
              <Select value={editPerson.type} onChange={(e) => setEditPerson({ ...editPerson, type: e.target.value })}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
              <Input placeholder="Apellido" value={editPerson.last_name || ''} onChange={(e) => setEditPerson({ ...editPerson, last_name: e.target.value })} required />
              <Input placeholder="Nombre" value={editPerson.first_name || ''} onChange={(e) => setEditPerson({ ...editPerson, first_name: e.target.value })} required />
              <Input placeholder="DNI (opcional)" value={editPerson.dni || ''} onChange={(e) => setEditPerson({ ...editPerson, dni: e.target.value })} />
              {editPerson.dni && (
                <div style={{ marginTop: '4px', fontSize: '14px', color: '#8E8E93' }}>
                  {formatDni(editPerson.dni)}
                </div>
              )}
              {editPerson.type === 'employee' && (
                <>
                  <Input placeholder="Código de rol (ej: S1, A2)" value={editPerson.role_code || ''} onChange={(e) => setEditPerson({ ...editPerson, role_code: e.target.value })} />
                  <ExpandableSection>
                    <ExpandableHeader type="button" onClick={(e) => { e.stopPropagation(); setEditShowSchedule(!editShowSchedule); }}>
                      <span>Horario laboral</span>
                      <span>{editShowSchedule ? '−' : '+'}</span>
                    </ExpandableHeader>
                    {editShowSchedule && editWorkSchedule && (
                      <>
                        {Object.entries(editWorkSchedule).map(([day, schedule]: [string, any]) => (
                          <div key={day}>
                            <DayHoursRow>
                              <DayChip type="button" $active={schedule.enabled} onClick={(e) => { e.stopPropagation(); setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, enabled: !schedule.enabled } }); }}>
                                {day === 'monday' ? 'Lunes' : day === 'tuesday' ? 'Martes' : day === 'wednesday' ? 'Miércoles' : day === 'thursday' ? 'Jueves' : day === 'friday' ? 'Viernes' : day === 'saturday' ? 'Sábado' : 'Domingo'}
                              </DayChip>
                            </DayHoursRow>
                            {schedule.enabled && (
                              <DayHoursContainer>
                                <SmallInput type="time" placeholder="Entrada" value={schedule.entry} onChange={(e) => { e.stopPropagation(); setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, entry: e.target.value } }); }} />
                                <SmallInput type="time" placeholder="Salida" value={schedule.exit} onChange={(e) => { e.stopPropagation(); setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, exit: e.target.value } }); }} />
                              </DayHoursContainer>
                            )}
                            </div>
                          ))}
                        </>
                      )}
                    </ExpandableSection>
                  </>
                )}
              <ButtonRow>
                <Button type="button" $variant="secondary" onClick={() => setEditPerson(null)}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
              </ButtonRow>
            </form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}