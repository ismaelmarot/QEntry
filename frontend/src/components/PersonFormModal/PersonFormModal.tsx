import { HiOutlineX } from 'react-icons/hi'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Select,
  Input,
  TextArea,
  ButtonRow,
  Button,
  SectionLabel,
  ExpandableSection,
  ExpandableHeader,
  DayChip,
  DayHoursRow,
  DayHoursContainer,
  SmallInput,
} from '@/pages/Persons/Persons.styles'

import { usePersonFormModal } from './usePersonFormModal'
import { formatDni } from '@/services'
import { PersonFormModalProps } from '@/types'

type Props = {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  categories: any[]
}

export function PersonFormModal({ open, onClose, onSuccess, categories }: Props) {
  const {
    form,
    setForm,
    handleSubmit,
    showEmployeeDetails,
    setShowEmployeeDetails,
  } = usePersonFormModal({ onClose, onSuccess })

  if (!open) return null

  return (
    <Modal onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Nueva persona</ModalTitle>
          <CloseButton onClick={onClose}>
            <HiOutlineX size={18} />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <Select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Select>

          <Input
            placeholder="Apellido"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            required
          />

          <Input
            placeholder="Nombre"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            required
          />

          <Input
            placeholder="DNI (opcional)"
            value={form.dni}
            onChange={(e) => {
              const numbersOnly = e.target.value.replace(/[^0-9]/g, '')
              setForm({ ...form, dni: numbersOnly })
            }}
          />

          {form.dni && (
            <div style={{ marginTop: 4, fontSize: 14, color: '#8E8E93' }}>
              {formatDni(form.dni)}
            </div>
          )}

          {form.type === 'visitor' && (
            <>
              <SectionLabel>Motivo de visita</SectionLabel>
              <TextArea
                placeholder="Describe el motivo de la visita..."
                value={form.visitReason}
                onChange={(e) =>
                  setForm({ ...form, visitReason: e.target.value })
                }
              />
            </>
          )}

          {form.type === 'employee' && (
            <>
              <SectionLabel>Detalles de empleado</SectionLabel>

              <Input
                placeholder="Código de rol (ej: S1, A2)"
                value={form.roleCode}
                onChange={(e) =>
                  setForm({ ...form, roleCode: e.target.value })
                }
              />

              <ExpandableSection>
                <ExpandableHeader
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowEmployeeDetails(!showEmployeeDetails)
                  }}
                >
                  <span>Horario laboral</span>
                  <span>{showEmployeeDetails ? '−' : '+'}</span>
                </ExpandableHeader>

                {showEmployeeDetails && (
                  <>
                    {Object.entries(form.workSchedule).map(
                      ([day, schedule]) => (
                        <div key={day}>
                          <DayHoursRow>
                            <DayChip
                              type="button"
                              $active={schedule.enabled}
                              onClick={(e) => {
                                e.stopPropagation()
                                setForm({
                                  ...form,
                                  workSchedule: {
                                    ...form.workSchedule,
                                    [day]: {
                                      ...schedule,
                                      enabled: !schedule.enabled,
                                    },
                                  },
                                })
                              }}
                            >
                              {day === 'monday'
                                ? 'Lunes'
                                : day === 'tuesday'
                                ? 'Martes'
                                : day === 'wednesday'
                                ? 'Miércoles'
                                : day === 'thursday'
                                ? 'Jueves'
                                : day === 'friday'
                                ? 'Viernes'
                                : day === 'saturday'
                                ? 'Sábado'
                                : 'Domingo'}
                            </DayChip>
                          </DayHoursRow>

                          {schedule.enabled && (
                            <DayHoursContainer>
                              <SmallInput
                                type="time"
                                value={schedule.entry}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    workSchedule: {
                                      ...form.workSchedule,
                                      [day]: {
                                        ...schedule,
                                        entry: e.target.value,
                                      },
                                    },
                                  })
                                }
                              />
                              <SmallInput
                                type="time"
                                value={schedule.exit}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    workSchedule: {
                                      ...form.workSchedule,
                                      [day]: {
                                        ...schedule,
                                        exit: e.target.value,
                                      },
                                    },
                                  })
                                }
                              />
                            </DayHoursContainer>
                          )}
                        </div>
                      )
                    )}
                  </>
                )}
              </ExpandableSection>
            </>
          )}

          <ButtonRow>
            <Button type="button" $variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Crear</Button>
          </ButtonRow>
        </form>
      </ModalContent>
    </Modal>
  )
}