import { useNavigate } from 'react-router-dom'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { usePersons } from './usePersons'
import { EditPersonModal, PersonFormModal, PersonList } from '@/components'
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
    // state
    persons,
    filter,
    showModal,
    deleteId,
    personToDelete,
    categories,
    editPerson,
    // setters
    setFilter,
    setShowModal,
    setDeleteId,
    setPersonToDelete,
    setEditPerson,
    // actions
    loadPersons,
    deletePerson,
    // helpers
    getTypeLabel,
    getTypeColor,
    filters,
    employeesByLetter,
    othersByLetter
  } = usePersons()

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
          />

          <PersonList
            title="Otros"
            groups={othersByLetter}
            getTypeColor={getTypeColor}
            getTypeLabel={getTypeLabel}
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
