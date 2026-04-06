import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineArrowLeft, HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi';
import { api } from '../services/api';
import { formatDni } from '../services/utils';

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 32px;
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #F2F2F7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007AFF;
  transition: background 0.2s;
  &:hover { background: #E5E5EA; }
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 700;
  color: #1C1C1E;
  letter-spacing: -0.5px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const CardHeader = styled.div`
  padding: 24px 20px;
  border-bottom: 1px solid #E5E5EA;
`;

const PersonName = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1C1C1E;
  margin-bottom: 4px;
`;

const PersonDni = styled.span`
  font-size: 15px;
  color: #8E8E93;
`;

const TypeBadge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  background: ${p => p.$color};
  color: white;
  margin-top: 8px;
`;

const CardSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #E5E5EA;
  &:last-of-type { border-bottom: none; }
`;

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #8E8E93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 12px;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: end;
  padding: 8px 0;
`;

const InfoLabel = styled.span`
  font-size: 17px;
  color: #8E8E93;
  margin-right: .5rem;
`;

const InfoValue = styled.span`
  font-size: 1.4rem;
  font-weight: 600;
  color: #000000;
`;

const ScheduleGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const ScheduleChip = styled.div`
  background: #F2F2F7;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 14px;
  color: #1C1C1E;
  font-weight: 500;
`;

const IconButton = styled.button<{ $danger?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 12px 22px;
  border-radius: 34px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background: ${p => p.$danger ? '#FF3B30' : '#F2F2F7'};
  color: ${p => p.$danger ? 'white' : '#007AFF'};
  transition: opacity 0.2s ease, background 0.2s ease, transform 0.2s ease;
  &:hover { 
    transform: scale(1.05);
  }
  
  span {
    display: none;
  }
  
  @media (min-width: 640px) {
    span {
      display: block;
    }
  }
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border-radius: 14px;
  font-size: 17px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${p => p.$danger ? '#FF3B30' : '#F2F2F7'};
  color: ${p => p.$danger ? 'white' : '#007AFF'};
  transition: opacity 0.2s;
  &:hover { opacity: 0.9; }
`;

const CardActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 20px;
  border-top: 1px solid #E5E5EA;
`;

const Modal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #1C1C1E;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #F2F2F7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8E8E93;
  &:hover { background: #E5E5EA; }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Input = styled.input`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #E5E5EA;
  font-size: 16px;
  &:focus { outline: none; border-color: #007AFF; }
`;

const Select = styled.select`
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #E5E5EA;
  font-size: 16px;
  background: white;
  &:focus { outline: none; border-color: #007AFF; }
`;

const Button = styled.button<{ $variant?: string }>`
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${p => p.$variant === 'secondary' ? '#F2F2F7' : '#007AFF'};
  color: ${p => p.$variant === 'secondary' ? '#1C1C1E' : 'white'};
  &:hover { opacity: 0.9; }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Popup = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`;

const PopupContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 300px;
  text-align: center;
`;

const PopupTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #1C1C1E;
  margin-bottom: 8px;
`;

const PopupText = styled.p`
  font-size: 15px;
  color: #8E8E93;
  margin-bottom: 24px;
`;

const PopupButton = styled.button<{ $danger?: boolean }>`
  padding: 14px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  width: 100%;
  background: ${p => p.$danger ? '#FF3B30' : '#F2F2F7'};
  color: ${p => p.$danger ? 'white' : '#1C1C1E'};
  &:hover { opacity: 0.9; }
`;

interface Person {
  id: number;
  first_name: string;
  last_name: string;
  dni: string;
  type: string;
  role_code: string;
  visit_reason: string;
  work_schedule: string;
}

interface WorkSchedule {
  [key: string]: { enabled: boolean; entry: string; exit: string };
}

const getTypeLabel = (type: string, categories: {id: string; name: string}[]) => {
  const cat = categories.find(c => c.id === type);
  return cat ? cat.name : (type === 'uncategorized' ? 'Sin categoría' : type);
};

const getTypeColor = (type: string, categories: {id: string; name: string; color: string}[]) => {
  const cat = categories.find(c => c.id === type);
  return cat ? cat.color : '#8E8E93';
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
  const [categories, setCategories] = useState<{id: string; name: string; color: string}[]>([]);

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
        workSchedule: editPerson.type === 'employee' ? editWorkSchedule : null,
      });
      setPerson({ ...editPerson, work_schedule: editWorkSchedule ? JSON.stringify(editWorkSchedule) : '' });
      setEditPerson(null);
      setEditWorkSchedule(null);
    } catch (err: any) { alert(err.message); }
  };

  if (!person) return <Container>Cargando...</Container>;

  return (
    <Container>
      <Header>
        <Title>Detalles</Title>
        <BackButton onClick={() => navigate('/persons')}>
          <HiOutlineArrowLeft size={22} />
        </BackButton>
      </Header>

      <Card>
        <CardHeader>
          <PersonName>{person.last_name} {person.first_name}</PersonName>
           {person.dni && <PersonDni>DNI {formatDni(person.dni)}</PersonDni>}
          <br />
          <TypeBadge $color={getTypeColor(person.type, categories)}>
            {getTypeLabel(person.type, categories)}
          </TypeBadge>
        </CardHeader>

        {person.type === 'employee' && person.role_code && (
          <CardSection>
            <InfoRow>
              <InfoLabel>Código de rol</InfoLabel>
              <InfoValue>{person.role_code}</InfoValue>
            </InfoRow>
          </CardSection>
        )}

        {person.visit_reason && (
          <CardSection>
            <InfoRow>
              <InfoLabel>Motivo de visita</InfoLabel>
              <InfoValue>{person.visit_reason}</InfoValue>
            </InfoRow>
          </CardSection>
        )}

        {(() => {
          const ws = person.work_schedule;
          if (!ws) return null;
          try {
            const dayNames: Record<string, string> = { monday: 'Lun', tuesday: 'Mar', wednesday: 'Mié', thursday: 'Jue', friday: 'Vie', saturday: 'Sáb', sunday: 'Dom' };
            const schedule = JSON.parse(ws);
            const enabledDays = Object.keys(schedule).filter(day => schedule[day]?.enabled);
            if (enabledDays.length === 0) return null;
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

         <CardActions>
           <IconButton onClick={() => {
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
             <HiOutlinePencil size={20} />
             <span>Editar</span>
           </IconButton>
           <IconButton $danger onClick={() => setDeleteId(person.id)}>
             <HiOutlineTrash size={20} />
             <span>Eliminar</span>
           </IconButton>
         </CardActions>
      </Card>

      {editPerson && (
        <Modal onClick={() => setEditPerson(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Editar persona</ModalTitle>
              <CloseButton onClick={() => setEditPerson(null)}><HiOutlinePencil size={18} /></CloseButton>
            </ModalHeader>
            <Form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
              <Select value={editPerson.type} onChange={(e) => setEditPerson({ ...editPerson, type: e.target.value })}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
              <Input placeholder="Apellido" value={editPerson.last_name || ''} onChange={(e) => setEditPerson({ ...editPerson, last_name: e.target.value })} required />
              <Input placeholder="Nombre" value={editPerson.first_name || ''} onChange={(e) => setEditPerson({ ...editPerson, first_name: e.target.value })} required />
              <Input placeholder="DNI (opcional)" value={editPerson.dni || ''} onChange={(e) => setEditPerson({ ...editPerson, dni: e.target.value })} />
              {editPerson.type === 'employee' && (
                <>
                  <Input placeholder="Código de rol (ej: S1, A2)" value={editPerson.role_code || ''} onChange={(e) => setEditPerson({ ...editPerson, role_code: e.target.value })} />
                  <Button type="button" $variant="secondary" onClick={() => setEditShowSchedule(!editShowSchedule)}>
                    {editShowSchedule ? 'Ocultar horario' : 'Mostrar horario'}
                  </Button>
                  {editShowSchedule && editWorkSchedule && (
                    <>
                      {Object.entries(editWorkSchedule).map(([day, schedule]: [string, any]) => (
                        <div key={day}>
                          <Button type="button" $variant={schedule.enabled ? undefined : 'secondary'} onClick={() => setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, enabled: !schedule.enabled } })}>
                            {day === 'monday' ? 'Lunes' : day === 'tuesday' ? 'Martes' : day === 'wednesday' ? 'Miércoles' : day === 'thursday' ? 'Jueves' : day === 'friday' ? 'Viernes' : day === 'saturday' ? 'Sábado' : 'Domingo'}
                          </Button>
                          {schedule.enabled && (
                            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                              <Input type="time" value={schedule.entry} onChange={(e) => setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, entry: e.target.value } })} />
                              <Input type="time" value={schedule.exit} onChange={(e) => setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, exit: e.target.value } })} />
                            </div>
                          )}
                        </div>
                      ))}
                    </>
                  )}
                </>
              )}
              <ButtonRow>
                <Button type="button" $variant="secondary" onClick={() => setEditPerson(null)}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
              </ButtonRow>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {deleteId && (
        <Popup onClick={() => setDeleteId(null)}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupTitle>Eliminar persona</PopupTitle>
            <PopupText>¿Estás seguro de que deseas eliminar esta persona?</PopupText>
            <PopupButton $danger onClick={handleDelete}>Eliminar</PopupButton>
          </PopupContent>
        </Popup>
      )}
    </Container>
  );
}
