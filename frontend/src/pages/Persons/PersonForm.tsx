import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { HiOutlineArrowLeft, HiOutlinePhotograph, HiOutlineCamera, HiOutlineX, HiOutlineTrash, HiOutlineQrcode, HiOutlineClock } from 'react-icons/hi'
import { QRCodeSVG } from 'qrcode.react'
import { api, formatDni } from '@/services'
import { initialForm } from '@/constants'
import styled from 'styled-components'
import { flex } from '@/mixins'

const PageContainer = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
`

const HeaderSection = styled.div`
  margin: -20px -20px 0 -20px;
  padding: 24px 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: rgba(255,255,255,0.3); }
`

const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 700;
`

const ProfileCard = styled.div`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  margin-top: -20px;
`

const ProfileHeader = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`

const AvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const Avatar = styled.div<{ $src?: string }>`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : 'rgba(255,255,255,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
`

const AvatarButtons = styled.div`
  display: flex;
  gap: 8px;
`

const AvatarButton = styled.button<{ $danger?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #007AFF;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover { transform: scale(1.1); }
`

const ProfileInfo = styled.div`
  flex: 1;
  color: white;
`

const ProfileName = styled.h2`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 4px 0;
`

const ProfileDni = styled.p`
  font-size: 13px;
  opacity: 0.9;
  margin: 0;
`

const QRBadge = styled.div`
  background: white;
  border-radius: 10px;
  padding: 6px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover { transform: scale(1.05); }
`

const FormSection = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const FormLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #8E8E93;
  padding-left: 4px;
`

const FormInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #E5E5EA;
  border-radius: 35px;
  font-size: 15px;
  background: #F2F2F7;
  transition: all 0.2s;
  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  }
`

const FormSelect = styled.select`
  width: 100%;
  padding: 16px;
  border: 1px solid #E5E5EA;
  border-radius: 35px;
  font-size: 15px;
  background: #F2F2F7;
  cursor: pointer;
  transition: all 0.2s;
  &:focus {
    border-color: #007AFF;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  }
`

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 16px;
  border: 1px solid #E5E5EA;
  border-radius: 14px;
  font-size: 15px;
  background: #F2F2F7;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;
  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  }
`

const ToggleSection = styled.div`
  margin-top: 4px;
`

const ToggleButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  border-radius: 35px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$active ? '#007AFF' : '#F2F2F7'};
  color: ${(p) => p.$active ? 'white' : '#1C1C1E'};
  transition: all 0.2s;
  &:hover { opacity: 0.9; }
`

const ScheduleGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #F2F2F7;
  border-radius: 16px;
`

const ScheduleItem = styled.div<{ $enabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: ${(p) => p.$enabled ? 'white' : 'transparent'};
  border-radius: 12px;
  opacity: ${(p) => p.$enabled ? 1 : 0.5};
`

const DayButton = styled.button<{ $enabled?: boolean }>`
  min-width: 60px;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 1px solid ${(p) => p.$enabled ? '#007AFF' : '#E5E5EA'};
  background: ${(p) => p.$enabled ? '#007AFF' : 'white'};
  color: ${(p) => p.$enabled ? 'white' : '#8E8E93'};
  cursor: pointer;
  transition: all 0.2s;
  &:hover { transform: scale(1.02); }
`

const TimeInputs = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
`

const TimeInput = styled.input`
  flex: 1;
  max-width: 120px;
  padding: 10px 14px;
  border: 1px solid #E5E5EA;
  border-radius: 35px;
  font-size: 14px;
  background: white;
  text-align: center;
  &:focus {
    border-color: #007AFF;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
  padding: 0 24px 24px;
`

const CancelButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 35px;
  font-size: 15px;
  font-weight: 600;
  background: #F2F2F7;
  color: #1C1C1E;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #E5E5EA; }
`

const SaveButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 35px;
  font-size: 15px;
  font-weight: 600;
  background: #007AFF;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
  transition: all 0.2s;
  &:hover { background: #0066CC; transform: translateY(-1px); }
`

const DangerButton = styled.button`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-radius: 35px;
  font-size: 15px;
  font-weight: 600;
  background: #FFF2F2;
  color: #FF3B30;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #FFE5E5; }
`

const CameraContainer = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const CameraVideo = styled.video`
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
`

const CameraButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`

const CaptureButton = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: white;
  border: 4px solid #007AFF;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover { transform: scale(1.05); }
`

const CloseCameraButton = styled.button`
  padding: 14px 28px;
  background: #FF3B30;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`

const DeleteModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`

const DeleteModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
`

const DeleteModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1C1C1E;
  margin: 0 0 12px 0;
`

const DeleteModalText = styled.p`
  font-size: 15px;
  color: #8E8E93;
  margin: 0 0 24px 0;
`

const DeleteModalButtons = styled.div`
  display: flex;
  gap: 12px;
`

const DeleteModalButton = styled.button<{ $danger?: boolean }>`
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$danger ? '#FF3B30' : '#F2F2F7'};
  color: ${(p) => p.$danger ? 'white' : '#1C1C1E'};
  transition: all 0.2s;
  &:hover { opacity: 0.9; }
`

interface PersonFormProps {
  categories: { id: string; name: string; color: string }[]
}

type PersonData = {
  id: string
  first_name: string
  last_name: string
  dni?: string
  type: string
  role_code?: string
  photo_url?: string
  visit_reason?: string
  work_schedule?: any
} | null

type WorkScheduleDay = {
  enabled: boolean
  entry: string
  exit: string
}

type WorkSchedule = {
  monday: WorkScheduleDay
  tuesday: WorkScheduleDay
  wednesday: WorkScheduleDay
  thursday: WorkScheduleDay
  friday: WorkScheduleDay
  saturday: WorkScheduleDay
  sunday: WorkScheduleDay
}

const defaultWorkSchedule: WorkSchedule = {
  monday: { enabled: false, entry: '', exit: '' },
  tuesday: { enabled: false, entry: '', exit: '' },
  wednesday: { enabled: false, entry: '', exit: '' },
  thursday: { enabled: false, entry: '', exit: '' },
  friday: { enabled: false, entry: '', exit: '' },
  saturday: { enabled: false, entry: '', exit: '' },
  sunday: { enabled: false, entry: '', exit: '' },
}

function parseWorkSchedule(workScheduleStr?: string): WorkSchedule {
  if (!workScheduleStr) return defaultWorkSchedule
  try {
    return JSON.parse(workScheduleStr) as WorkSchedule
  } catch {
    return defaultWorkSchedule
  }
}

const getTypeColor = (type: string, categories: {id: string; color: string}[]) => {
  const cat = categories.find(c => c.id === type)
  return cat?.color || '#8E8E93'
}

export function PersonForm({ categories }: PersonFormProps) {
  const navigate = useNavigate()
  const location = useLocation()
  
  const editPerson = (location.state as { person?: PersonData })?.person || null
  const isEdit = !!editPerson
  
  const [form, setForm] = useState({
    firstName: editPerson?.first_name || '',
    lastName: editPerson?.last_name || '',
    dni: editPerson?.dni || '',
    type: editPerson?.type || 'visitor',
    roleCode: editPerson?.role_code || '',
    visitReason: editPerson?.visit_reason || '',
    photo_url: editPerson?.photo_url || undefined,
    workSchedule: parseWorkSchedule(editPerson?.work_schedule),
  })
  
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showCamera, setShowCamera] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [showQR, setShowQR] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (showCamera && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [showCamera])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const startCamera = async () => {
    try {
      let stream = null
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 }, height: { ideal: 720 } }
        })
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
      }
      streamRef.current = stream
      setShowCamera(true)
      setTimeout(() => {
        if (videoRef.current && streamRef.current) {
          videoRef.current.srcObject = streamRef.current
        }
      }, 100)
    } catch (err) {
      console.error('Camera error:', err)
      alert('No se pudo acceder a la cámara')
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null
    }
    setShowCamera(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && videoRef.current.videoWidth > 0) {
      const videoWidth = videoRef.current.videoWidth
      const videoHeight = videoRef.current.videoHeight
      const canvas = document.createElement('canvas')
      const size = Math.min(videoWidth, videoHeight)
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext('2d')
      if (ctx) {
        const sx = (videoWidth - size) / 2
        const sy = (videoHeight - size) / 2
        ctx.drawImage(videoRef.current, sx, sy, size, size, 0, 0, size, size)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
        setForm({ ...form, photo_url: dataUrl })
      }
    }
    stopCamera()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setForm({ ...form, photo_url: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = {
        ...form,
        photoUrl: form.photo_url,
      }
      if (isEdit && editPerson) {
        await api.person.update(editPerson.id, data)
        navigate('/persons')
      } else {
        await api.person.create(data)
        navigate('/persons')
      }
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!editPerson) return
    setDeleting(true)
    try {
      await api.person.delete(editPerson.id)
      navigate('/persons')
    } catch (err: any) {
      alert(err.message)
    } finally {
      setDeleting(false)
      setShowDeleteConfirm(false)
    }
  }

  return (
    <PageContainer>
      <HeaderSection>
        <Header>
          <HeaderTitle>{isEdit ? 'Editar persona' : 'Nueva persona'}</HeaderTitle>
          <BackButton onClick={() => navigate('/persons')}>
            <HiOutlineArrowLeft size={20} />
          </BackButton>
        </Header>
      </HeaderSection>

      {showCamera ? (
        <CameraContainer>
          <CameraVideo ref={videoRef} autoPlay playsInline />
          <CameraButtons>
            <CaptureButton onClick={capturePhoto} />
            <CloseCameraButton onClick={stopCamera}>Cerrar</CloseCameraButton>
          </CameraButtons>
        </CameraContainer>
      ) : (
        <form onSubmit={handleSubmit}>
          <ProfileCard>
            <ProfileHeader>
              <AvatarSection>
                <Avatar $src={form.photo_url}>
                  {!form.photo_url && <HiOutlinePhotograph size={32} />}
                </Avatar>
                <AvatarButtons>
                  <AvatarButton onClick={startCamera} title="Cámara">
                    <HiOutlineCamera size={14} />
                  </AvatarButton>
                  <AvatarButton onClick={() => fileInputRef.current?.click()} title="Galería">
                    <HiOutlinePhotograph size={14} />
                  </AvatarButton>
                  {form.photo_url && (
                    <AvatarButton $danger onClick={() => setForm({ ...form, photo_url: undefined })} title="Eliminar">
                      <HiOutlineTrash size={14} />
                    </AvatarButton>
                  )}
                </AvatarButtons>
              </AvatarSection>
              <ProfileInfo>
                <ProfileName>{form.lastName || 'Apellido'} {form.firstName || 'Nombre'}</ProfileName>
                {form.dni && <ProfileDni>DNI {formatDni(form.dni)}</ProfileDni>}
              </ProfileInfo>
              {isEdit && editPerson && (
                <QRBadge>
                  <QRCodeSVG value={editPerson.id} size={56} />
                </QRBadge>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
              />
            </ProfileHeader>

            <FormSection>
              <FormGroup>
                <FormLabel>Categoría</FormLabel>
                <FormSelect value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </FormSelect>
              </FormGroup>

              <FormGroup>
                <FormLabel>Apellido</FormLabel>
                <FormInput 
                  placeholder="Apellido" 
                  value={form.lastName} 
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })} 
                  required 
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>Nombre</FormLabel>
                <FormInput 
                  placeholder="Nombre" 
                  value={form.firstName} 
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })} 
                  required 
                />
              </FormGroup>

              <FormGroup>
                <FormLabel>DNI</FormLabel>
                <FormInput 
                  placeholder="DNI (opcional)" 
                  value={form.dni} 
                  onChange={(e) => {
                    const numbersOnly = e.target.value.replace(/[^0-9]/g, '')
                    setForm({ ...form, dni: numbersOnly })
                  }} 
                />
              </FormGroup>

              {form.type === 'visitor' && (
                <FormGroup>
                  <FormLabel>Motivo de visita</FormLabel>
                  <FormTextArea 
                    placeholder="Describe el motivo de la visita..." 
                    value={form.visitReason} 
                    onChange={(e) => setForm({ ...form, visitReason: e.target.value })} 
                  />
                </FormGroup>
              )}

              {form.type === 'employee' && (
                <>
                  <FormGroup>
                    <FormLabel>Código de rol</FormLabel>
                    <FormInput 
                      placeholder="Ej: S1, A2" 
                      value={form.roleCode} 
                      onChange={(e) => setForm({ ...form, roleCode: e.target.value })} 
                    />
                  </FormGroup>
                  <ToggleSection>
                    <ToggleButton 
                      type="button" 
                      $active={showEmployeeDetails} 
                      onClick={() => setShowEmployeeDetails(!showEmployeeDetails)}
                    >
                      <HiOutlineClock size={18} />
                      Horario laboral
                    </ToggleButton>
                  </ToggleSection>
                  {showEmployeeDetails && (
                    <ScheduleGrid>
                      {Object.entries(form.workSchedule).map(([day, schedule]) => (
                        <ScheduleItem key={day} $enabled={schedule.enabled}>
                          <DayButton 
                            type="button" 
                            $enabled={schedule.enabled}
                            onClick={() => setForm({ ...form, workSchedule: { ...form.workSchedule, [day]: { ...schedule, enabled: !schedule.enabled } } })}
                          >
                            {day === 'monday' ? 'Lunes' : day === 'tuesday' ? 'Martes' : day === 'wednesday' ? 'Miércoles' : day === 'thursday' ? 'Jueves' : day === 'friday' ? 'Viernes' : day === 'saturday' ? 'Sábado' : 'Domingo'}
                          </DayButton>
                          {schedule.enabled && (
                            <TimeInputs>
                              <TimeInput 
                                type="time" 
                                value={schedule.entry} 
                                onChange={(e) => setForm({ ...form, workSchedule: { ...form.workSchedule, [day]: { ...schedule, entry: e.target.value } } })} 
                              />
                              <span style={{ color: '#8E8E93', fontSize: '14px', fontWeight: 500 }}>a</span>
                              <TimeInput 
                                type="time" 
                                value={schedule.exit} 
                                onChange={(e) => setForm({ ...form, workSchedule: { ...form.workSchedule, [day]: { ...schedule, exit: e.target.value } } })} 
                              />
                            </TimeInputs>
                          )}
                        </ScheduleItem>
                      ))}
                    </ScheduleGrid>
                  )}
                </>
              )}
            </FormSection>
          </ProfileCard>

          <ButtonRow>
            {isEdit && (
              <DangerButton type="button" onClick={() => setShowDeleteConfirm(true)}>
                <HiOutlineTrash size={18} />
                Eliminar
              </DangerButton>
            )}
            <CancelButton type="button" onClick={() => navigate('/persons')}>Cancelar</CancelButton>
            <SaveButton type="submit" disabled={loading}>
              {loading ? (isEdit ? 'Guardando...' : 'Creando...') : (isEdit ? 'Guardar' : 'Crear')}
            </SaveButton>
          </ButtonRow>
        </form>
      )}

      {showDeleteConfirm && (
        <DeleteModal onClick={() => setShowDeleteConfirm(false)}>
          <DeleteModalContent onClick={(e) => e.stopPropagation()}>
            <DeleteModalTitle>Eliminar persona</DeleteModalTitle>
            <DeleteModalText>
              ¿Estás seguro de que deseas eliminar a {editPerson?.first_name} {editPerson?.last_name}? Esta acción no se puede deshacer.
            </DeleteModalText>
            <DeleteModalButtons>
              <DeleteModalButton onClick={() => setShowDeleteConfirm(false)}>Cancelar</DeleteModalButton>
              <DeleteModalButton $danger onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Eliminando...' : 'Eliminar'}
              </DeleteModalButton>
            </DeleteModalButtons>
          </DeleteModalContent>
        </DeleteModal>
      )}
    </PageContainer>
  )
}