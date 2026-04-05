import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineUserGroup, HiOutlineX } from 'react-icons/hi';
import { api } from '../services/api';

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

  @media (min-width: 768px) {
    font-size: 34px;
  }
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
  transition: all 0.2s;

  &:hover {
    background: #2DB84C;
    transform: translateY(-1px);
  }

  &:active {
    transform: scale(0.98);
  }
`;

const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;

  &::-webkit-scrollbar {
    display: none;
  }
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
  transition: all 0.2s;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PersonCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-2px);
  }
`;

const AvatarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

const Avatar = styled.div`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 600;
  color: white;
`;

const Name = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: #1C1C1E;
`;

const Info = styled.div`
  font-size: 14px;
  color: #8E8E93;
  margin-top: 4px;
`;

const Type = styled.span<{ $type: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${(p) => {
    switch (p.$type) {
      case 'employee': return '#007AFF';
      case 'visitor': return '#FF9500';
      case 'contractor': return '#AF52DE';
      default: return '#8E8E93';
    }
  }};
  color: white;
  margin-top: 12px;
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
  border-radius: 12px;
  font-size: 16px;
  background: #F2F2F7;
  transition: all 0.2s;

  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
  }

  &::placeholder {
    color: #8E8E93;
  }
`;

const Select = styled.select`
  padding: 14px 16px;
  border: 1px solid #E5E5EA;
  border-radius: 12px;
  font-size: 16px;
  background: #F2F2F7;

  &:focus {
    border-color: #007AFF;
    outline: none;
  }
`;

const SectionLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #8E8E93;
  margin-top: 8px;
  margin-bottom: 4px;
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
  border-radius: 12px;
  background: ${(p) => (p.$variant === 'secondary' ? '#F2F2F7' : '#007AFF')};
  color: ${(p) => (p.$variant === 'secondary' ? '#1C1C1E' : 'white')};
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
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

export function Persons() {
  const [persons, setPersons] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    dni: '',
    type: 'employee',
    roleCode: '',
    host: '',
    visitReason: '',
    workEntryTime: '',
    workExitTime: '',
  });

  const loadPersons = async () => {
    try {
      const data = await api.person.getAll(filter ? { type: filter } : undefined);
      setPersons(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPersons();
  }, [filter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.person.create(form);
      setShowModal(false);
      setForm({
        firstName: '', lastName: '', dni: '', type: 'employee', roleCode: '',
        host: '', visitReason: '', workEntryTime: '', workExitTime: '',
      });
      loadPersons();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'employee': return 'Empleado';
      case 'visitor': return 'Visitante';
      case 'contractor': return 'Contratista';
      default: return type;
    }
  };

  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
  };

  const filters = [
    { value: '', label: 'Todos' },
    { value: 'employee', label: 'Empleados' },
    { value: 'visitor', label: 'Visitantes' },
    { value: 'contractor', label: 'Contratistas' },
  ];

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
        <Grid>
          {persons.map((p) => (
            <PersonCard key={p.id}>
              <AvatarWrapper>
                <Avatar>{getInitials(p.first_name, p.last_name)}</Avatar>
                <div>
                  <Name>{p.first_name} {p.last_name}</Name>
                  <Info>{p.dni || 'Sin DNI'}</Info>
                </div>
              </AvatarWrapper>
              {p.role_code && <Info>Código: {p.role_code}</Info>}
              <Type $type={p.type}>{getTypeLabel(p.type)}</Type>
            </PersonCard>
          ))}
        </Grid>
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
              <Input
                placeholder="Nombre"
                value={form.firstName}
                onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                required
              />
              <Input
                placeholder="Apellido"
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
              <Input
                placeholder="DNI (opcional)"
                value={form.dni}
                onChange={(e) => setForm({ ...form, dni: e.target.value })}
              />
              <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                <option value="employee">Empleado</option>
                <option value="visitor">Visitante</option>
                <option value="contractor">Contratista</option>
              </Select>
              <Input
                placeholder="Código de rol (ej: S1, A2)"
                value={form.roleCode}
                onChange={(e) => setForm({ ...form, roleCode: e.target.value })}
              />

              {form.type === 'visitor' && (
                <>
                  <SectionLabel>Información de visita</SectionLabel>
                  <Input
                    placeholder="Motivo de visita"
                    value={form.visitReason}
                    onChange={(e) => setForm({ ...form, visitReason: e.target.value })}
                  />
                  <Input
                    placeholder="Anfitrión"
                    value={form.host}
                    onChange={(e) => setForm({ ...form, host: e.target.value })}
                  />
                </>
              )}

              {form.type === 'employee' && (
                <>
                  <SectionLabel>Horario laboral</SectionLabel>
                  <Input
                    type="time"
                    value={form.workEntryTime}
                    onChange={(e) => setForm({ ...form, workEntryTime: e.target.value })}
                  />
                  <Input
                    type="time"
                    value={form.workExitTime}
                    onChange={(e) => setForm({ ...form, workExitTime: e.target.value })}
                  />
                </>
              )}

              <ButtonRow>
                <Button type="button" $variant="secondary" onClick={() => setShowModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Crear</Button>
              </ButtonRow>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}