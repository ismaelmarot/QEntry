import { useEffect, useState, useRef } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { HiOutlineArrowLeft, HiOutlinePencil, HiOutlineTrash, HiOutlineUser, HiOutlineQrcode, HiOutlineCamera, HiOutlinePhotograph, HiOutlineClock, HiOutlineX, HiOutlineDownload } from 'react-icons/hi'
import { QRCodeSVG } from 'qrcode.react'
import { api } from '../../services/api'
import { formatDni } from '../../services/utils'
import { PersonCard } from '../../components/PersonCard'
import { Person, WorkSchedule } from '@/interface'
import { ActionButton, ActionsSection, AvatarLarge, BackButton, ButtonRow, CameraButtons, CameraModal, CameraVideo, CancelButton, CaptureButton, CardSection, CategoryBadge, CloseCameraButton, Container, DeleteModal, DeleteModalButton, DeleteModalContent, DeleteModalText, DeleteModalTitle, EditAvatar, EditAvatarButton, EditAvatarButtons, EditAvatarSection, EditCloseButton, EditDayButton, EditDni, EditForm, EditHeader, EditInfo, EditModal, EditModalContent, EditName, EditQRBadge, EditScheduleGrid, EditScheduleItem, EditTimeInput, EditTimeInputs, FormGroup, FormInput, FormLabel, FormSelect, Header, HeaderInfo, InfoLabel, InfoRow, InfoSection, InfoValue, ProfileCard, ProfileDni, ProfileHeader, ProfileName, QRBadge, QRModal, QRModalClose, QRModalContent, QRModalSubtitle, QRModalTitle, RoleCodeBox, RoleCodeLabel, RoleCodeValue, SaveButton, ScheduleChip, ScheduleGrid, SectionTitle, Title, ToggleButton, ToggleSection } from './PersonDetail.styles'

const getTypeColor = (type: string, categories: {id: string; color: string}[]) => {
  const cat = categories.find(c => c.id === type);
  return cat?.color || '#8E8E93';
};

const getTypeLabel = (type: string, categories: {id: string; name: string}[]) => {
  const cat = categories.find(c => c.id === type);
  return cat ? cat.name : (type === 'uncategorized' ? 'Sin categoría' : type);
};

export function PersonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const personFromState = location.state?.person as Person | undefined;
  
  const [person, setPerson] = useState<Person | null>(personFromState || null);
  const [editPerson, setEditPerson] = useState<Person | null>(null);
  const [editWorkSchedule, setEditWorkSchedule] = useState<WorkSchedule | null>(null);
  const [editShowSchedule, setEditShowSchedule] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showQR, setShowQR] = useState(false);
  const [categories, setCategories] = useState<{id: string; name: string; color: string}[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      api.person.get(id).then(setPerson).catch(console.error);
    }
  }, [id]);

  useEffect(() => {
    if (personFromState && !person) {
      setPerson(personFromState);
    }
  }, [personFromState, person]);

  useEffect(() => {
    const stored = localStorage.getItem('categories');
    if (stored) setCategories(JSON.parse(stored));
  }, []);

  useEffect(() => { 
    return () => { 
      if (videoRef.current?.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.person.delete(String(deleteId));
      navigate('/persons');
    } catch (err: any) { alert(err.message); }
  };

  const handleSave = async () => {
    if (!editPerson) return;
    try {
      await api.person.update(String(editPerson.id), {
        firstName: editPerson.first_name,
        lastName: editPerson.last_name,
        dni: editPerson.dni,
        type: editPerson.type,
        roleCode: editPerson.role_code,
        photoUrl: editPerson.photo_url,
        workSchedule: editPerson.type === 'employee' ? editWorkSchedule : null,
      });
      setPerson({ ...editPerson, work_schedule: editWorkSchedule ? JSON.stringify(editWorkSchedule) : '' });
      setEditPerson(null);
      setEditWorkSchedule(null);
    } catch (err: any) { alert(err.message); }
  };

  const handleCapturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, 200, 200);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setEditPerson({ ...editPerson!, photo_url: dataUrl });
      }
    }
    setShowCamera(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editPerson) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPerson({ ...editPerson, photo_url: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    if (editPerson) {
      setEditPerson({ ...editPerson, photo_url: undefined });
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  if (!person) return <Container>Cargando...</Container>;

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/persons')}>
          <HiOutlineArrowLeft size={20} />
        </BackButton>
        <Title>Detalles</Title>
        <div style={{ width: 40 }} />
      </Header>

      <ProfileCard>
        <ProfileHeader $color={getTypeColor(person.type, categories)}>
          <AvatarLarge $src={person.photo_url}>
            {!person.photo_url && <HiOutlineUser />}
          </AvatarLarge>
          <HeaderInfo>
            <ProfileName>{person.last_name} {person.first_name}</ProfileName>
            {person.dni && <ProfileDni>DNI {formatDni(person.dni)}</ProfileDni>}
          </HeaderInfo>
          <QRBadge onClick={() => setShowQR(true)}>
            <QRCodeSVG value={String(person.id)} size={48} />
          </QRBadge>
        </ProfileHeader>

        <InfoSection>
          <InfoRow>
            <InfoLabel>Categoría</InfoLabel>
            <CategoryBadge $color={getTypeColor(person.type, categories)}>
              {getTypeLabel(person.type, categories)}
            </CategoryBadge>
          </InfoRow>
          
          {person.type === 'employee' && person.role_code && (
            <RoleCodeBox>
              <RoleCodeLabel>Código de rol</RoleCodeLabel>
              <RoleCodeValue>{person.role_code}</RoleCodeValue>
            </RoleCodeBox>
          )}

          {person.visit_reason && (
            <InfoRow>
              <InfoLabel>Motivo de visita</InfoLabel>
              <InfoValue>{person.visit_reason}</InfoValue>
            </InfoRow>
          )}
        </InfoSection>

        {(() => {
          const ws = person.work_schedule;
          if (!ws) return null;
          try {
            const schedule = JSON.parse(ws);
            const enabledDays = Object.keys(schedule).filter(day => schedule[day]?.enabled);
            if (enabledDays.length === 0) return null;
            const dayNames: Record<string, string> = { monday: 'Lun', tuesday: 'Mar', wednesday: 'Mié', thursday: 'Jue', friday: 'Vie', saturday: 'Sáb', sunday: 'Dom' };
            return (
              <CardSection>
                <SectionTitle>Horario laboral</SectionTitle>
                <ScheduleGrid>
                  {enabledDays.map(day => (
                    <ScheduleChip key={day}>
                      {dayNames[day]}: {schedule[day].entry} - {schedule[day].exit}
                    </ScheduleChip>
                  ))}
                </ScheduleGrid>
              </CardSection>
            );
          } catch (e) { return null; }
        })()}

        <ActionsSection>
          <ActionButton $primary onClick={() => {
            setEditPerson(person);
            setEditWorkSchedule(person.work_schedule ? JSON.parse(person.work_schedule) : {
              monday: { enabled: false, entry: '', exit: '' },
              tuesday: { enabled: false, entry: '', exit: '' },
              wednesday: { enabled: false, entry: '', exit: '' },
              thursday: { enabled: false, entry: '', exit: '' },
              friday: { enabled: false, entry: '', exit: '' },
              saturday: { enabled: false, entry: '', exit: '' },
              sunday: { enabled: false, entry: '', exit: '' },
            });
          }}>
            <HiOutlinePencil size={18} />
            Editar
          </ActionButton>
          <ActionButton onClick={() => setDeleteId(person.id)}>
            <HiOutlineTrash size={18} />
            Eliminar
          </ActionButton>
        </ActionsSection>

        <CardSection>
          <SectionTitle>Tarjeta de identificación</SectionTitle>
          <PersonCard
            person={{
              first_name: person.first_name,
              last_name: person.last_name,
              dni: person.dni,
              type: person.type,
              role_code: person.role_code,
              categoryLabel: getTypeLabel(person.type, categories),
              categoryColor: getTypeColor(person.type, categories),
              qrValue: String(person.id),
            }}
          />
        </CardSection>
      </ProfileCard>

      {editPerson && (
        <EditModal onClick={() => setEditPerson(null)}>
          <EditModalContent onClick={(e) => e.stopPropagation()}>
            <EditHeader $color={getTypeColor(editPerson.type, categories)}>
              <EditCloseButton onClick={() => setEditPerson(null)}>
                <HiOutlineX size={20} />
              </EditCloseButton>
              <EditAvatarSection>
                <EditAvatar $src={editPerson.photo_url}>
                  {!editPerson.photo_url && <HiOutlineUser size={32} />}
                </EditAvatar>
                <EditAvatarButtons>
                  <EditAvatarButton onClick={startCamera}>
                    <HiOutlineCamera size={14} />
                  </EditAvatarButton>
                  <EditAvatarButton onClick={() => fileInputRef.current?.click()}>
                    <HiOutlinePhotograph size={14} />
                  </EditAvatarButton>
                  {editPerson.photo_url && (
                    <EditAvatarButton $danger onClick={handleRemovePhoto}>
                      <HiOutlineTrash size={14} />
                    </EditAvatarButton>
                  )}
                </EditAvatarButtons>
              </EditAvatarSection>
              <EditInfo>
                <EditName>{editPerson.last_name} {editPerson.first_name}</EditName>
                {editPerson.dni && <EditDni>DNI {formatDni(editPerson.dni)}</EditDni>}
              </EditInfo>
              <EditQRBadge onClick={() => setShowQR(true)}>
                <QRCodeSVG value={String(editPerson.id)} size={36} />
              </EditQRBadge>
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileSelect}
              />
            </EditHeader>
            <EditForm onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <FormGroup>
                <FormLabel>Nombre</FormLabel>
                <FormInput 
                  placeholder="Nombre" 
                  value={editPerson.first_name || ''} 
                  onChange={(e) => setEditPerson({ ...editPerson, first_name: e.target.value })} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Apellido</FormLabel>
                <FormInput 
                  placeholder="Apellido" 
                  value={editPerson.last_name || ''} 
                  onChange={(e) => setEditPerson({ ...editPerson, last_name: e.target.value })} 
                  required 
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>DNI</FormLabel>
                <FormInput 
                  placeholder="DNI (opcional)" 
                  value={editPerson.dni || ''} 
                  onChange={(e) => setEditPerson({ ...editPerson, dni: e.target.value })} 
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Categoría</FormLabel>
                <FormSelect value={editPerson.type} onChange={(e) => setEditPerson({ ...editPerson, type: e.target.value })}>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </FormSelect>
              </FormGroup>
              {editPerson.type === 'employee' && (
                <>
                  <FormGroup>
                    <FormLabel>Código de rol</FormLabel>
                    <FormInput 
                      placeholder="Ej: S1, A2" 
                      value={editPerson.role_code || ''} 
                      onChange={(e) => setEditPerson({ ...editPerson, role_code: e.target.value })} 
                    />
                  </FormGroup>
                  <ToggleSection>
                    <ToggleButton 
                      type="button" 
                      $active={editShowSchedule} 
                      onClick={() => setEditShowSchedule(!editShowSchedule)}
                    >
                      <HiOutlineClock size={18} />
                      Horario laboral
                    </ToggleButton>
                  </ToggleSection>
                  {editShowSchedule && editWorkSchedule && (
                    <EditScheduleGrid>
                      {Object.entries(editWorkSchedule).map(([day, schedule]: [string, any]) => (
                        <EditScheduleItem key={day}>
                          <EditDayButton 
                            type="button" 
                            $enabled={schedule.enabled}
                            onClick={() => setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, enabled: !schedule.enabled } })}
                          >
                            {day === 'monday' ? 'Lun' : day === 'tuesday' ? 'Mar' : day === 'wednesday' ? 'Mié' : day === 'thursday' ? 'Jue' : day === 'friday' ? 'Vie' : day === 'saturday' ? 'Sáb' : 'Dom'}
                          </EditDayButton>
                          {schedule.enabled && (
                            <EditTimeInputs>
                              <EditTimeInput 
                                type="time" 
                                value={schedule.entry} 
                                onChange={(e) => setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, entry: e.target.value } })} 
                              />
                              <EditTimeInput 
                                type="time" 
                                value={schedule.exit} 
                                onChange={(e) => setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, exit: e.target.value } })} 
                              />
                            </EditTimeInputs>
                          )}
                        </EditScheduleItem>
                      ))}
                    </EditScheduleGrid>
                  )}
                </>
              )}
              <ButtonRow>
                <CancelButton type="button" onClick={() => setEditPerson(null)}>Cancelar</CancelButton>
                <SaveButton type="submit">Guardar</SaveButton>
              </ButtonRow>
            </EditForm>
          </EditModalContent>
        </EditModal>
      )}

      {deleteId && (
        <DeleteModal onClick={() => setDeleteId(null)}>
          <DeleteModalContent onClick={(e) => e.stopPropagation()}>
            <DeleteModalTitle>Eliminar persona</DeleteModalTitle>
            <DeleteModalText>¿Estás seguro de que deseas eliminar esta persona?</DeleteModalText>
            <DeleteModalButton $danger onClick={handleDelete}>Eliminar</DeleteModalButton>
          </DeleteModalContent>
        </DeleteModal>
      )}

      {showCamera && (
        <CameraModal>
          <CameraVideo ref={videoRef} autoPlay playsInline />
          <CameraButtons>
            <CaptureButton onClick={handleCapturePhoto} />
            <CloseCameraButton onClick={stopCamera}>Cerrar</CloseCameraButton>
          </CameraButtons>
        </CameraModal>
      )}

      {showQR && (
        <QRModal onClick={() => setShowQR(false)}>
          <QRModalContent onClick={(e) => e.stopPropagation()}>
            <QRModalTitle>Código QR</QRModalTitle>
            <QRModalSubtitle>{person.last_name} {person.first_name}</QRModalSubtitle>
            <QRCodeSVG value={String(person.id)} size={200} />
            <QRModalClose onClick={() => setShowQR(false)}>Cerrar</QRModalClose>
          </QRModalContent>
        </QRModal>
      )}
    </Container>
  );
}