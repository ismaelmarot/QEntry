import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { HiOutlineArrowLeft, HiOutlinePhotograph, HiOutlineCamera, HiOutlineX, HiOutlineTrash } from 'react-icons/hi'
import { api, formatDni } from '@/services'
import { initialForm } from '@/constants'
import {
  Container,
  Header,
  BackButton,
  Title,
  Form as StyledForm,
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
  PhotoSection,
  PhotoPreview,
  PhotoActions,
  PhotoActionButton,
  RemovePhotoButton,
  HiddenInput,
  CameraContainer,
  CameraPreview,
  CameraVideo,
  CameraOverlay,
  CameraButton,
  CameraInstructions,
  CloseCameraButton,
  Popup,
  PopupContent,
  PopupTitle,
  PopupText,
  PopupButtons,
  PopupButton,
} from './PersonForm.styles'

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

export function PersonForm({ categories }: PersonFormProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  
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
  const [deleting, setDeleting] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

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
    <Container>
      <Header>
        <Title>{isEdit ? 'Editar persona' : 'Nueva persona'}</Title>
        <BackButton onClick={() => navigate('/persons')}>
          <HiOutlineArrowLeft size={24} />
        </BackButton>

      </Header>

      {showCamera ? (
        <CameraContainer>
          <CameraPreview>
            <CameraVideo ref={videoRef} autoPlay playsInline />
            <CameraOverlay />
            <CloseCameraButton onClick={stopCamera}>
              <HiOutlineX size={18} />
            </CloseCameraButton>
          </CameraPreview>
          <CameraButton onClick={capturePhoto}>
            Capturar
          </CameraButton>
          <CameraInstructions>
            La foto se ajustará al formato de perfil
          </CameraInstructions>
        </CameraContainer>
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <PhotoSection>
            {form.photo_url ? (
              <>
                <PhotoPreview $src={form.photo_url} />
                <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
                  <label style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px', 
                    borderRadius: '28px', background: '#007AFF', color: 'white', fontSize: '16px', 
                    fontWeight: 600, cursor: 'pointer', flex: 1, justifyContent: 'center'
                  }}>
                    <HiddenInput type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
                    <HiOutlinePhotograph size={20} />
                    Cambiar
                  </label>
                  <button 
                    type="button" onClick={startCamera}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px', 
                      borderRadius: '28px', background: '#34C759', color: 'white', fontSize: '16px', 
                      fontWeight: 600, cursor: 'pointer', border: 'none', flex: 1, justifyContent: 'center' }}
                  >
                    <HiOutlineCamera size={20} />
                    Nueva foto
                  </button>
                </div>
                <RemovePhotoButton type="button" onClick={() => setForm({ ...form, photo_url: undefined })}>
                  Eliminar foto
                </RemovePhotoButton>
              </>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', width: '100%' }}>
                <PhotoPreview $src={undefined}>
                  <HiOutlinePhotograph size={48} color="#C7C7CC" />
                </PhotoPreview>
                <div style={{ display: 'flex', gap: '12px', width: '100%', justifyContent: 'center' }}>
                  <label style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px', 
                    borderRadius: '28px', background: '#007AFF', color: 'white', fontSize: '16px', 
                    fontWeight: 600, cursor: 'pointer', flex: 1, justifyContent: 'center'
                  }}>
                    <HiddenInput type="file" accept="image/*" capture="environment" onChange={handleFileChange} />
                    <HiOutlinePhotograph size={20} />
                    Subir
                  </label>
                  <button 
                    type="button" onClick={startCamera}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 24px', 
                      borderRadius: '28px', background: '#34C759', color: 'white', fontSize: '16px', 
                      fontWeight: 600, cursor: 'pointer', border: 'none', flex: 1, justifyContent: 'center' }}
                  >
                    <HiOutlineCamera size={20} />
                    Cámara
                  </button>
                </div>
              </div>
            )}
          </PhotoSection>

          <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            {categories.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </Select>

          <Input placeholder="Apellido" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
          <Input placeholder="Nombre" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
          <Input placeholder="DNI (opcional)" value={formatDni(form.dni)} onChange={(e) => {
            const numbersOnly = e.target.value.replace(/[^0-9]/g, '')
            setForm({ ...form, dni: numbersOnly })
          }} />

          {form.type === 'visitor' && (
            <>
              <SectionLabel>Motivo de visita</SectionLabel>
              <TextArea placeholder="Describe el motivo de la visita..." value={form.visitReason} onChange={(e) => setForm({ ...form, visitReason: e.target.value })} />
            </>
          )}

          {form.type === 'employee' && (
            <>
              <SectionLabel>Detalles de empleado</SectionLabel>
              <Input placeholder="Código de rol (ej: S1, A2)" value={form.roleCode} onChange={(e) => setForm({ ...form, roleCode: e.target.value })} />

              <ExpandableSection>
                <ExpandableHeader type="button" onClick={() => setShowEmployeeDetails(!showEmployeeDetails)}>
                  <span>Horario laboral</span>
                  <span>{showEmployeeDetails ? '−' : '+'}</span>
                </ExpandableHeader>

                {showEmployeeDetails && (
                  <>
                    {Object.entries(form.workSchedule).map(([day, schedule]) => (
                      <div key={day}>
                        <DayHoursRow>
                          <DayChip type="button" $active={schedule.enabled} onClick={() => setForm({ ...form, workSchedule: { ...form.workSchedule, [day]: { ...schedule, enabled: !schedule.enabled } } })}>
                            {day === 'monday' ? 'Lunes' : day === 'tuesday' ? 'Martes' : day === 'wednesday' ? 'Miércoles' : day === 'thursday' ? 'Jueves' : day === 'friday' ? 'Viernes' : day === 'saturday' ? 'Sábado' : 'Domingo'}
                          </DayChip>
                        </DayHoursRow>
                        {schedule.enabled && (
                          <DayHoursContainer>
                            <SmallInput type="time" value={schedule.entry} onChange={(e) => setForm({ ...form, workSchedule: { ...form.workSchedule, [day]: { ...schedule, entry: e.target.value } } })} />
                            <SmallInput type="time" value={schedule.exit} onChange={(e) => setForm({ ...form, workSchedule: { ...form.workSchedule, [day]: { ...schedule, exit: e.target.value } } })} />
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
            {isEdit && (
              <Button type="button" $variant="danger" onClick={() => setShowDeleteConfirm(true)}>
                <HiOutlineTrash size={18} />
                Eliminar
              </Button>
            )}
            <Button type="button" $variant="secondary" onClick={() => navigate('/persons')}>Cancelar</Button>
            <Button type="submit" disabled={loading}>{loading ? (isEdit ? 'Guardando...' : 'Creando...') : (isEdit ? 'Guardar' : 'Crear')}</Button>
          </ButtonRow>
        </StyledForm>
      )}

      {showDeleteConfirm && (
        <Popup onClick={() => setShowDeleteConfirm(false)}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupTitle>Eliminar persona</PopupTitle>
            <PopupText>
              ¿Estás seguro de que deseas eliminar a {editPerson?.first_name} {editPerson?.last_name}? Esta acción no se puede deshacer.
            </PopupText>
            <PopupButtons>
              <PopupButton onClick={() => setShowDeleteConfirm(false)}>Cancelar</PopupButton>
              <PopupButton $danger onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Eliminando...' : 'Eliminar'}
              </PopupButton>
            </PopupButtons>
          </PopupContent>
        </Popup>
      )}
    </Container>
  )
}