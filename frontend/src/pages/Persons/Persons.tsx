import { useNavigate } from 'react-router-dom'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { usePersons } from './usePersons'
import { PersonList } from '@/components'
import {
  AddButton,
  Container,
  EmptyIcon,
  EmptyState,
  FilterChip,
  FilterRow,
  Header,
  Popup,
  PopupButton,
  PopupButtons,
  PopupContent,
  PopupText,
  PopupTitle,
  Title
} from './Persons.styles'

export function Persons() {
  const navigate = useNavigate()
  const {
    persons,
    filter,
    deleteId,
    personToDelete,
    categories,
    editPerson,
    setFilter,
    setDeleteId,
    setPersonToDelete,
    loadPersons,
    deletePerson,
    getTypeLabel,
    getTypeColor,
    filters,
    employeesByLetter,
    othersByLetter
  } = usePersons()

  const handleEdit = (person: any) => {
    navigate(`/persons/${person.id}/edit`, { state: { person } })
  }

  return (
    <Container>
      <Header>
        <Title>Personas</Title>
        <AddButton onClick={() => navigate('/persons/new')}>
          <span>+</span> Nueva persona
        </AddButton>
      </Header>

      <FilterRow>
        {filters.map((f) => (
          <FilterChip
            key={f.value}
            $active={filter === f.value}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </FilterChip>
        ))}
      </FilterRow>

      {persons.length > 0 ? (
        <>
          <PersonList
            title="Empleados"
            groups={employeesByLetter}
            getTypeColor={getTypeColor}
            getTypeLabel={getTypeLabel}
            onEdit={handleEdit}
          />

          <PersonList
            title="Otros"
            groups={othersByLetter}
            getTypeColor={getTypeColor}
            getTypeLabel={getTypeLabel}
            onEdit={handleEdit}
          />
        </>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <HiOutlineUserGroup size={64} />
          </EmptyIcon>
          <p>No hay personas registradas</p>
        </EmptyState>
      )}

      {deleteId && personToDelete && (
        <Popup onClick={() => setDeleteId(null)}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupTitle>Eliminar persona</PopupTitle>
            <PopupText>
              ¿Estás seguro de que deseas eliminar a{' '}
              {personToDelete.first_name} {personToDelete.last_name}?
            </PopupText>
            <PopupButtons>
              <PopupButton onClick={() => setDeleteId(null)}>
                Cancelar
              </PopupButton>
              <PopupButton $danger onClick={deletePerson}>
                Eliminar
              </PopupButton>
            </PopupButtons>
          </PopupContent>
        </Popup>
      )}
    </Container>
  )
}
