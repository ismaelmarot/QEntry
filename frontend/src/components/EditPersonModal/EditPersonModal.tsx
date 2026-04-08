import { HiOutlineX } from 'react-icons/hi'
import { formatDni } from '@/services'
import { useEditPersonModal } from './useEditPersonModal'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Select,
  Input,
  ButtonRow,
  Button,
  ExpandableSection,
  ExpandableHeader,
  DayChip,
  DayHoursRow,
  DayHoursContainer,
  SmallInput,
} from './EditPersonModal.styles'

type Props = {
  open: boolean
  person: any
  onClose: () => void
  onSuccess: () => void
  categories: any[]
}

export function EditPersonModal({ open, person, onClose, onSuccess, categories }: Props) {
  const {
    editPerson,
    setEditPerson,
    editWorkSchedule,
    setEditWorkSchedule,
    showSchedule,
    setShowSchedule,
    handleSubmit,
  } = useEditPersonModal({ person, onClose, onSuccess })

  if (!open || !editPerson) return null

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Editar persona</ModalTitle>
          <CloseButton onClick={onClose}>
            <HiOutlineX size={18} />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <Select
            value={editPerson.type}
            onChange={(e) =>
              setEditPerson({ ...editPerson, type: e.target.value })
            }
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Input
            value={editPerson.last_name || ''}
            onChange={(e) =>
              setEditPerson({ ...editPerson, last_name: e.target.value })
            }
          />

          <Input
            value={editPerson.first_name || ''}
            onChange={(e) =>
              setEditPerson({ ...editPerson, first_name: e.target.value })
            }
          />
          <Input
            value={editPerson.dni || ''}
            onChange={(e) =>
              setEditPerson({ ...editPerson, dni: e.target.value })
            }
          />
          {editPerson.dni && <div>{formatDni(editPerson.dni)}</div>}

          {editPerson.type === 'employee' && (
            <>
              <Input
                value={editPerson.role_code || ''}
                onChange={(e) =>
                  setEditPerson({
                    ...editPerson,
                    role_code: e.target.value,
                  })
                }
              />

              <ExpandableSection>
                <ExpandableHeader
                  type='button'
                  onClick={() => setShowSchedule(!showSchedule)}
                >
                  Horario laboral
                </ExpandableHeader>

                {showSchedule &&
                  editWorkSchedule &&
                  Object.entries(editWorkSchedule).map(([day, schedule]: any) => (
                    <div key={day}>
                      <DayHoursRow>
                        <DayChip
                          $active={schedule.enabled}
                          onClick={() =>
                            setEditWorkSchedule({
                              ...editWorkSchedule,
                              [day]: {
                                ...schedule,
                                enabled: !schedule.enabled,
                              },
                            })
                          }
                        >
                          {day}
                        </DayChip>
                      </DayHoursRow>

                      {schedule.enabled && (
                        <DayHoursContainer>
                          <SmallInput
                            type='time'
                            value={schedule.entry}
                            onChange={(e) =>
                              setEditWorkSchedule({
                                ...editWorkSchedule,
                                [day]: {
                                  ...schedule,
                                  entry: e.target.value,
                                },
                              })
                            }
                          />
                          <SmallInput
                            type='time'
                            value={schedule.exit}
                            onChange={(e) =>
                              setEditWorkSchedule({
                                ...editWorkSchedule,
                                [day]: {
                                  ...schedule,
                                  exit: e.target.value,
                                },
                              })
                            }
                          />
                        </DayHoursContainer>
                      )}
                    </div>
                  ))}
              </ExpandableSection>
            </>
          )}

          <ButtonRow>
            <Button type='button' onClick={onClose}>
              Cancelar
            </Button>
            <Button type='submit'>Guardar</Button>
          </ButtonRow>
        </form>
      </ModalContent>
    </Modal>
  )
}