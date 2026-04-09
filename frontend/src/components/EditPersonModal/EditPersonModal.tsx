import { HiOutlineX, HiOutlinePhotograph, HiOutlineCamera } from 'react-icons/hi'
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
  PhotoSection,
  PhotoPreview,
  PhotoButtons,
  PhotoButton,
  HiddenInput,
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
          <PhotoSection>
            <PhotoPreview $src={editPerson.photo_url} />
            <PhotoButtons>
              <PhotoButton as="label">
                <HiddenInput
                  type="file"
                  accept="image/*"
                  onChange={(e: any) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      const reader = new FileReader()
                      reader.onloadend = () => {
                        setEditPerson({ ...editPerson, photo_url: reader.result as string })
                      }
                      reader.readAsDataURL(file)
                    }
                  }}
                />
                <HiOutlinePhotograph size={16} />
                Cambiar
              </PhotoButton>
              {editPerson.photo_url && (
                <PhotoButton 
                  type="button" 
                  onClick={() => setEditPerson({ ...editPerson, photo_url: null })}
                >
                  Eliminar
                </PhotoButton>
              )}
            </PhotoButtons>
          </PhotoSection>

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