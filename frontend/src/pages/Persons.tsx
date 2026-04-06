import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineUserGroup, HiOutlineX, HiOutlineTrash, HiOutlinePencil, HiOutlineSearch } from 'react-icons/hi';
import { api } from '../services/api';
import { formatDni } from '../services/utils';

const defaultCategories = [
  { id: 'employee', name: 'Empleado', color: '#007AFF' },
  { id: 'visitor', name: 'Visitante', color: '#FF9500' },
  { id: 'contractor', name: 'Contratista', color: '#AF52DE' },
];

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1C1C1E;
  @media (min-width: 768px) { font-size: 34px; }
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 12px 20px;
  background: #34C759;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 34px;
  &:hover { background: #2DB84C; transform: translateY(-1px); }
  &:active { transform: scale(0.98); }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
  &::-webkit-scrollbar { display: none; }
`;

const FilterChip = styled.button<{ $active: boolean }>`
  padding: 10px 18px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  background: ${(p) => (p.$active ? '#007AFF' : 'white')};
  color: ${(p) => (p.$active ? 'white' : '#1C1C1E')};
  border: 1px solid ${(p) => (p.$active ? '#007AFF' : '#E5E5EA')};
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #8E8E93;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 0;
  margin-bottom: 8px;
`;

const LetterSection = styled.div`
  margin-bottom: 16px;
`;

const LetterHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #8E8E93;
  padding: 8px 0;
  border-bottom: 1px solid #E5E5EA;
  margin-bottom: 8px;
`;

const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  gap: 12px;
`;

const PersonInfo = styled.div`
  flex: 1;
`;

const PersonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`;

const PersonName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
  flex: 1;
`;

const PersonMeta = styled.div`
  font-size: 14px;
  color: #8E8E93;
`;

const Type = styled.span<{ $type: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${(p) => p.$type};
  color: white;
  flex-shrink: 0;
`;

const RowActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button<{ $danger?: boolean }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #F2F2F7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(p) => (p.$danger ? '#FF3B30' : '#007AFF')};
  flex-shrink: 0;
  &:hover { background: ${(p) => (p.$danger ? '#FFE5E5' : '#E5F0FF')}; }
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
  max-width: 480px;
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
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid #E5E5EA;
  border-radius: 34px;
  font-size: 16px;
  background: #F2F2F7;
  &:focus { border-color: #007AFF; background: white; outline: none; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }
  &::placeholder { color: #8E8E93; }
`;

const Select = styled.select`
  padding: 14px 16px;
  border: 1px solid #E5E5EA;
  border-radius: 34px;
  font-size: 16px;
  background: #F2F2F7;
  &:focus { border-color: #007AFF; outline: none; }
`;

const SectionLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #8E8E93;
  margin-top: 8px;
  margin-bottom: 4px;
`;

const TextArea = styled.textarea`
  padding: 14px 16px;
  border: 1px solid #E5E5EA;
  border-radius: 12px;
  font-size: 16px;
  background: #F2F2F7;
  min-height: 80px;
  resize: vertical;
  &:focus { border-color: #007AFF; background: white; outline: none; }
  &::placeholder { color: #8E8E93; }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 16px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 34px;
  background: ${(p) => (p.$variant === 'secondary' ? '#F2F2F7' : '#007AFF')};
  color: ${(p) => (p.$variant === 'secondary' ? '#1C1C1E' : 'white')};
  &:active { transform: scale(0.98); }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #8E8E93;
`;

const EmptyIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  color: #C7C7CC;
`;

const ExpandableSection = styled.div`
  margin-top: 12px;
  padding: 16px;
  background: #F2F2F7;
  border-radius: 12px;
`;

const ExpandableHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: #1C1C1E;
  cursor: pointer;
  padding: 0;
  type: button;
`;

const DayChip = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${(p) => (p.$active ? '#007AFF' : '#E5E5EA')};
  background: ${(p) => (p.$active ? '#007AFF' : 'white')};
  color: ${(p) => (p.$active ? 'white' : '#1C1C1E')};
  cursor: pointer;
`;

const DayHoursContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
`;

const SmallInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #E5E5EA;
  border-radius: 10px;
  font-size: 14px;
  background: white;
  &:focus { border-color: #007AFF; outline: none; }
`;

const DayHoursRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const Popup = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`;

const PopupContent = styled.div`
  background: white;
  border-radius: 14px;
  padding: 24px;
  width: 100%;
  max-width: 340px;
  text-align: center;
  animation: slideUp 0.3s ease;
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`;

const PopupTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #1C1C1E;
  margin-bottom: 8px;
`;

const PopupText = styled.div`
  font-size: 14px;
  color: #8E8E93;
  margin-bottom: 24px;
`;

const PopupButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const PopupButton = styled.button<{ $danger?: boolean }>`
  flex: 1;
  padding: 14px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  background: ${(p) => (p.$danger ? '#FF3B30' : '#F2F2F7')};
  color: ${(p) => (p.$danger ? 'white' : '#1C1C1E')};
  cursor: pointer;
  &:active { transform: scale(0.98); }
`;

const ViewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const ViewRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ViewLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #8E8E93;
`;

const ViewValue = styled.span`
  font-size: 16px;
  color: #1C1C1E;
`;

export function Persons() {
  const navigate = useNavigate();
  const [persons, setPersons] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [personToDelete, setPersonToDelete] = useState<any>(null);
  const [showEmployeeDetails, setShowEmployeeDetails] = useState(false);
  const [categories, setCategories] = useState<any[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });
  const [editPerson, setEditPerson] = useState<any>(null);
  const [editShowSchedule, setEditShowSchedule] = useState(false);
  const [editWorkSchedule, setEditWorkSchedule] = useState<any>(null);
  const [viewPerson, setViewPerson] = useState<any>(null);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    type: 'visitor',
    roleCode: '',
    host: '',
    visitReason: '',
    workSchedule: {
      monday: { enabled: false, entry: '', exit: '' },
      tuesday: { enabled: false, entry: '', exit: '' },
      wednesday: { enabled: false, entry: '', exit: '' },
      thursday: { enabled: false, entry: '', exit: '' },
      friday: { enabled: false, entry: '', exit: '' },
      saturday: { enabled: false, entry: '', exit: '' },
      sunday: { enabled: false, entry: '', exit: '' },
    },
  });

  const loadPersons = async () => {
    try {
      const data = await api.person.getAll(filter ? { type: filter } : undefined);
      setPersons(data);
    } catch (e) { console.error(e); }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await api.person.delete(deleteId);
      setDeleteId(null);
      setPersonToDelete(null);
      loadPersons();
    } catch (err: any) { alert(err.message); }
  };

  useEffect(() => { loadPersons(); }, [filter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.person.create(form);
      setShowModal(false);
      setForm({
        firstName: '', lastName: '', dni: '', type: 'visitor', roleCode: '',
        host: '', visitReason: '',
        workSchedule: {
          monday: { enabled: false, entry: '', exit: '' },
          tuesday: { enabled: false, entry: '', exit: '' },
          wednesday: { enabled: false, entry: '', exit: '' },
          thursday: { enabled: false, entry: '', exit: '' },
          friday: { enabled: false, entry: '', exit: '' },
          saturday: { enabled: false, entry: '', exit: '' },
          sunday: { enabled: false, entry: '', exit: '' },
        },
      });
      loadPersons();
    } catch (err: any) { alert(err.message); }
  };

  const getTypeLabel = (type: string) => {
    const cat = categories.find(c => c.id === type);
    return cat ? cat.name : (type === 'uncategorized' ? 'Sin categoría' : type);
  };

  const getTypeColor = (type: string) => {
    const cat = categories.find(c => c.id === type);
    return cat ? cat.color : '#8E8E93';
  };

  const filters = useMemo(() => {
    return [
      { value: '', label: 'Todos' },
      ...categories.map(c => ({ value: c.id, label: c.name + 's' }))
    ];
  }, [categories]);

  const employeesSorted = useMemo(() => {
    return [...persons]
      .filter(p => p.type === 'employee')
      .sort((a, b) => a.last_name.localeCompare(b.last_name));
  }, [persons]);

  const employeesByLetter = useMemo(() => {
    const groups: Record<string, typeof employeesSorted> = {};
    employeesSorted.forEach(p => {
      const letter = p.last_name.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(p);
    });
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [employeesSorted]);

  const others = useMemo(() => {
    return persons.filter(p => p.type !== 'employee');
  }, [persons]);

  const othersByLetter = useMemo(() => {
    const sorted = [...others].sort((a, b) => a.last_name.localeCompare(b.last_name));
    const groups: Record<string, typeof sorted> = {};
    sorted.forEach(p => {
      const letter = p.last_name.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(p);
    });
    return Object.entries(groups).sort((a, b) => a[0].localeCompare(b[0]));
  }, [others]);

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
          <FilterChip key={f.value} $active={filter === f.value} onClick={() => setFilter(f.value)}>
            {f.label}
          </FilterChip>
        ))}
      </FilterRow>

      {persons.length > 0 ? (
        <>
          {employeesByLetter.length > 0 && (
            <ListContainer>
              <SectionTitle>Empleados</SectionTitle>
              {employeesByLetter.map(([letter, items]) => (
                <LetterSection key={letter}>
                  <LetterHeader>{letter}</LetterHeader>
                  {items.map((p) => (
                    <ListItem key={p.id}>
                      <PersonInfo>
                        <PersonRow>
                          <PersonName>{p.last_name} {p.first_name}</PersonName>
                          <Type $type={getTypeColor(p.type)}>{getTypeLabel(p.type)}</Type>
                          <ActionButton onClick={() => navigate('/persons/' + p.id, { state: { person: p } })}>
                            <HiOutlineSearch size={18} />
                          </ActionButton>
                        </PersonRow>
                        <PersonMeta>
                          {formatDni(p.dni) || 'Sin DNI'}{p.role_code ? ' - ' + p.role_code : ''}
                        </PersonMeta>
                      </PersonInfo>
                    </ListItem>
                  ))}
                </LetterSection>
              ))}
            </ListContainer>
          )}

          {othersByLetter.length > 0 && (
            <ListContainer style={{ marginTop: employeesByLetter.length > 0 ? '32px' : 0 }}>
              <SectionTitle>Otros</SectionTitle>
              {othersByLetter.map(([letter, items]) => (
                <LetterSection key={letter}>
                  <LetterHeader>{letter}</LetterHeader>
                  {items.map((p) => (
                    <ListItem key={p.id}>
                      <PersonInfo>
                        <PersonRow>
                          <PersonName>{p.last_name} {p.first_name}</PersonName>
                          <Type $type={getTypeColor(p.type)}>{getTypeLabel(p.type)}</Type>
                          <ActionButton onClick={() => navigate('/persons/' + p.id, { state: { person: p } })}>
                            <HiOutlineSearch size={18} />
                          </ActionButton>
                        </PersonRow>
                         <PersonMeta>
                           {formatDni(p.dni) || 'Sin DNI'}{p.type === 'visitor' && p.visit_reason ? ' - ' + p.visit_reason : ''}
                         </PersonMeta>
                      </PersonInfo>
                    </ListItem>
                  ))}
                </LetterSection>
              ))}
            </ListContainer>
          )}
        </>
      ) : (
        <EmptyState>
          <EmptyIcon><HiOutlineUserGroup size={64} /></EmptyIcon>
          <p>No hay personas registradas</p>
        </EmptyState>
      )}

      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Nueva persona</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}><HiOutlineX size={18} /></CloseButton>
            </ModalHeader>
            <Form onSubmit={handleSubmit}>
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
              <Input placeholder="Apellido" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} required />
              <Input placeholder="Nombre" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} required />
               <Input 
                 placeholder="DNI (opcional)" 
                 value={form.dni} 
                 onChange={(e) => {
                   const value = e.target.value;
                   // Solo permitir números
                   const numbersOnly = value.replace(/[^0-9]/g, '');
                   setForm({ ...form, dni: numbersOnly });
                 }}
               />
                {form.dni && (
                  <div style={{ marginTop: '4px', fontSize: '14px', color: '#8E8E93' }}>
                    {formatDni(form.dni)}
                  </div>
                )}
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
                    <ExpandableHeader type="button" onClick={(e) => { e.stopPropagation(); setShowEmployeeDetails(!showEmployeeDetails); }}>
                      <span>Horario laboral</span>
                      <span>{showEmployeeDetails ? '−' : '+'}</span>
                    </ExpandableHeader>
                    {showEmployeeDetails && (
                      <>
                        {Object.entries(form.workSchedule).map(([day, schedule]) => (
                          <div key={day}>
                            <DayHoursRow>
                              <DayChip type="button" $active={schedule.enabled} onClick={(e) => { e.stopPropagation(); setForm({ ...form, workSchedule: { ...form.workSchedule, [day]: { ...schedule, enabled: !schedule.enabled } } }); }}>
                                {day === 'monday' ? 'Lunes' : day === 'tuesday' ? 'Martes' : day === 'wednesday' ? 'Miércoles' : day === 'thursday' ? 'Jueves' : day === 'friday' ? 'Viernes' : day === 'saturday' ? 'Sábado' : 'Domingo'}
                              </DayChip>
                            </DayHoursRow>
                            {schedule.enabled && (
                              <DayHoursContainer>
                                <SmallInput type="time" placeholder="Entrada" value={schedule.entry} onChange={(e) => { e.stopPropagation(); setForm({ ...form, workSchedule: { ...form.workSchedule, [day]: { ...schedule, entry: e.target.value } } }); }} />
                                <SmallInput type="time" placeholder="Salida" value={schedule.exit} onChange={(e) => { e.stopPropagation(); setForm({ ...form, workSchedule: { ...form.workSchedule, [day]: { ...schedule, exit: e.target.value } } }); }} />
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
                <Button type="button" $variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                <Button type="submit">Crear</Button>
              </ButtonRow>
            </Form>
          </ModalContent>
        </Modal>
      )}

      {deleteId && personToDelete && (
        <Popup onClick={() => setDeleteId(null)}>
          <PopupContent onClick={(e) => e.stopPropagation()}>
            <PopupTitle>Eliminar persona</PopupTitle>
            <PopupText>¿Estás seguro de que deseas eliminar a {personToDelete.first_name} {personToDelete.last_name}?</PopupText>
            <PopupButtons>
              <PopupButton onClick={() => setDeleteId(null)}>Cancelar</PopupButton>
              <PopupButton $danger onClick={handleDelete}>Eliminar</PopupButton>
            </PopupButtons>
          </PopupContent>
        </Popup>
      )}

      {editPerson && (
        <Modal onClick={() => setEditPerson(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Editar persona</ModalTitle>
              <CloseButton onClick={() => setEditPerson(null)}><HiOutlineX size={18} /></CloseButton>
            </ModalHeader>
            <Form onSubmit={async (e) => {
              e.preventDefault();
              try {
                await api.person.update(editPerson.id, {
                  firstName: editPerson.first_name,
                  lastName: editPerson.last_name,
                  dni: editPerson.dni,
                  type: editPerson.type,
                  roleCode: editPerson.role_code,
                  workSchedule: editPerson.type === 'employee' ? editWorkSchedule : null,
                });
                setEditPerson(null);
                setEditWorkSchedule(null);
                loadPersons();
              } catch (err: any) { alert(err.message); }
            }}>
              <Select value={editPerson.type} onChange={(e) => setEditPerson({ ...editPerson, type: e.target.value })}>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </Select>
              <Input placeholder="Apellido" value={editPerson.last_name || ''} onChange={(e) => setEditPerson({ ...editPerson, last_name: e.target.value })} required />
              <Input placeholder="Nombre" value={editPerson.first_name || ''} onChange={(e) => setEditPerson({ ...editPerson, first_name: e.target.value })} required />
               <Input placeholder="DNI (opcional)" value={editPerson.dni || ''} onChange={(e) => setEditPerson({ ...editPerson, dni: e.target.value })} />
               {editPerson.dni && (
                 <div style={{ marginTop: '4px', fontSize: '14px', color: '#8E8E93' }}>
                   {formatDni(editPerson.dni)}
                 </div>
               )}
              {editPerson.type === 'employee' && (
                <>
                  <Input placeholder="Código de rol (ej: S1, A2)" value={editPerson.role_code || ''} onChange={(e) => setEditPerson({ ...editPerson, role_code: e.target.value })} />
                  <ExpandableSection>
                    <ExpandableHeader type="button" onClick={(e) => { e.stopPropagation(); setEditShowSchedule(!editShowSchedule); }}>
                      <span>Horario laboral</span>
                      <span>{editShowSchedule ? '−' : '+'}</span>
                    </ExpandableHeader>
                    {editShowSchedule && editWorkSchedule && (
                      <>
                        {Object.entries(editWorkSchedule).map(([day, schedule]: [string, any]) => (
                          <div key={day}>
                            <DayHoursRow>
                              <DayChip type="button" $active={schedule.enabled} onClick={(e) => { e.stopPropagation(); setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, enabled: !schedule.enabled } }); }}>
                                {day === 'monday' ? 'Lunes' : day === 'tuesday' ? 'Martes' : day === 'wednesday' ? 'Miércoles' : day === 'thursday' ? 'Jueves' : day === 'friday' ? 'Viernes' : day === 'saturday' ? 'Sábado' : 'Domingo'}
                              </DayChip>
                            </DayHoursRow>
                            {schedule.enabled && (
                              <DayHoursContainer>
                                <SmallInput type="time" placeholder="Entrada" value={schedule.entry} onChange={(e) => { e.stopPropagation(); setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, entry: e.target.value } }); }} />
                                <SmallInput type="time" placeholder="Salida" value={schedule.exit} onChange={(e) => { e.stopPropagation(); setEditWorkSchedule({ ...editWorkSchedule, [day]: { ...schedule, exit: e.target.value } }); }} />
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
                <Button type="button" $variant="secondary" onClick={() => setEditPerson(null)}>Cancelar</Button>
                <Button type="submit">Guardar</Button>
              </ButtonRow>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}