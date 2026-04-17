import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineArrowLeft, HiOutlinePencil, HiOutlineTrash, HiOutlineUser, HiOutlineQrcode, HiOutlineCamera, HiOutlinePhotograph, HiOutlineClock, HiOutlineX, HiOutlineDownload } from 'react-icons/hi';
import { QRCodeSVG } from 'qrcode.react';
import { api } from '../services/api';
import { formatDni } from '../services/utils';
import { PersonCard } from '../components/PersonCard';

const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #F2F2F7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007AFF;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  &:hover { background: #E5E5EA; transform: scale(1.02); }
  &:active { transform: scale(0.98); }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1C1C1E;
`;

const ProfileCard = styled.div`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
`;

const ProfileHeader = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, ${p => p.$color} 0%, ${p => p.$color}99 100%);
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
`;

const AvatarLarge = styled.div<{ $src?: string }>`
  width: 100px;
  height: 100px;
  border-radius: 24px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : 'rgba(255,255,255,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`;

const HeaderInfo = styled.div`
  flex: 1;
  color: white;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProfileDni = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
`;

const QRBadge = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  background: white;
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover { transform: scale(1.05); }
  &:active { transform: scale(0.95); }
`;

const QRModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
  cursor: pointer;
`;

const QRModalContent = styled.div`
  background: white;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: default;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

const QRModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #1C1C1E;
  margin: 0;
  text-align: center;
`;

const QRModalSubtitle = styled.p`
  font-size: 14px;
  color: #8E8E93;
  margin: 0;
`;

const QRModalClose = styled.button`
  margin-top: 16px;
  padding: 12px 32px;
  background: #007AFF;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`;

const EditModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
  backdrop-filter: blur(4px);
`;

const EditModalContent = styled.div`
  background: white;
  border-radius: 24px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const EditHeader = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, ${p => p.$color} 0%, ${p => p.$color}99 100%);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`;

const EditAvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const EditAvatar = styled.div<{ $src?: string }>`
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
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
`;

const EditAvatarButtons = styled.div`
  display: flex;
  gap: 6px;
`;

const EditAvatarButton = styled.button<{ $danger?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: ${(p) => p.$danger ? 'rgba(255,59,48,0.3)' : 'rgba(255,255,255,0.25)'};
  color: ${(p) => p.$danger ? '#FF3B30' : 'white'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;
  &:hover { transform: scale(1.1); }
`;

const EditInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EditName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin: 0;
`;

const EditDni = styled.p`
  font-size: 13px;
  color: rgba(255,255,255,0.8);
  margin: 0;
`;

const EditQRBadge = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  background: white;
  border-radius: 10px;
  padding: 6px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover { transform: scale(1.05); }
`;

const EditCloseButton = styled.button`
  position: absolute;
  left: 16px;
  top: 16px;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(255,255,255,0.25);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover { background: rgba(255,255,255,0.35); }
`;

const EditForm = styled.form`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const FormLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #8E8E93;
  padding-left: 4px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #E5E5EA;
  border-radius: 14px;
  font-size: 15px;
  background: #F2F2F7;
  transition: all 0.2s;
  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 16px;
  border: 1px solid #E5E5EA;
  border-radius: 14px;
  font-size: 15px;
  background: #F2F2F7;
  cursor: pointer;
  transition: all 0.2s;
  &:focus {
    border-color: #007AFF;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  }
`;

const ToggleSection = styled.div`
  margin-top: 4px;
`;

const ToggleButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$active ? '#007AFF' : '#F2F2F7'};
  color: ${(p) => p.$active ? 'white' : '#1C1C1E'};
  transition: all 0.2s;
  &:hover { opacity: 0.9; }
`;

const EditScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
  background: #F2F2F7;
  border-radius: 14px;
`;

const EditScheduleItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const EditDayButton = styled.button<{ $enabled?: boolean }>`
  padding: 12px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$enabled ? '#007AFF' : 'white'};
  color: ${(p) => p.$enabled ? 'white' : '#8E8E93'};
  transition: all 0.2s;
  &:hover { transform: scale(1.05); }
`;

const EditTimeInputs = styled.div`
  display: flex;
  gap: 4px;
`;

const EditTimeInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #E5E5EA;
  border-radius: 8px;
  font-size: 11px;
  background: white;
  text-align: center;
  &:focus {
    border-color: #007AFF;
    outline: none;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const CancelButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  background: #F2F2F7;
  color: #1C1C1E;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: #E5E5EA; }
`;

const SaveButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  background: #007AFF;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
  transition: all 0.2s;
  &:hover { background: #0066CC; transform: translateY(-1px); }
`;

const InfoSection = styled.div`
  padding: 20px 24px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #F2F2F7;
  &:last-child { border-bottom: none; }
`;

const InfoLabel = styled.span`
  font-size: 15px;
  color: #8E8E93;
`;

const InfoValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #1C1C1E;
`;

const CategoryBadge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  background: ${p => p.$color}15;
  color: ${p => p.$color};
`;

const RoleCodeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F2F2F7;
  padding: 16px 20px;
  border-radius: 35px;
  margin-top: 8px;
`;

const RoleCodeLabel = styled.span`
  font-size: 14px;
  color: #8E8E93;
`;

const RoleCodeValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: #1C1C1E;
  font-family: 'SF Mono', monospace;
  letter-spacing: 1px;
`;

const ActionsSection = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 24px 24px;
`;

const ActionButton = styled.button<{ $primary?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-radius: 35px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  ${(p) => p.$primary ? `
    background: #007AFF;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
    &:hover { background: #0066CC; transform: translateY(-1px); }
  ` : `
    background: #F2F2F7;
    color: #1C1C1E;
    &:hover { background: #E5E5EA; }
  `}
  &:active { transform: scale(0.98); }
`;

const DangerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  background: #FFF2F2;
  color: #FF3B30;
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 12px;
  transition: all 0.2s;
  &:hover { background: #FFE5E5; }
`;

const CardSection = styled.div`
  padding: 20px 24px;
  border-top: 1px solid #F2F2F7;
`;

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #8E8E93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`;

const ScheduleGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ScheduleChip = styled.span`
  padding: 10px 14px;
  background: #F2F2F7;
  border-radius: 12px;
  font-size: 13px;
  color: #1C1C1E;
  font-weight: 500;
`;

const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`;

const DeleteModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
`;

const DeleteModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1C1C1E;
  margin: 0 0 12px 0;
`;

const DeleteModalText = styled.p`
  font-size: 15px;
  color: #8E8E93;
  margin: 0 0 24px 0;
`;

const DeleteModalButton = styled.button<{ $danger?: boolean }>`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$danger ? '#FF3B30' : '#007AFF'};
  color: white;
  &:hover { opacity: 0.9; }
`;

const CameraModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const CameraVideo = styled.video`
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
`;

const CameraButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`;

const CaptureButton = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: white;
  border: 4px solid #007AFF;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover { transform: scale(1.05); }
  &:active { transform: scale(0.95); }
`;

const CloseCameraButton = styled.button`
  padding: 14px 28px;
  background: #FF3B30;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`;

interface WorkSchedule {
  [key: string]: { enabled: boolean; entry: string; exit: string };
}

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  dni: string;
  type: string;
  role_code: string;
  visit_reason: string;
  work_schedule: string;
  photo_url?: string;
}

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