import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineArrowLeft, HiOutlinePlus, HiOutlineCheck, HiOutlineX, HiOutlineCalendar, HiOutlineClock } from 'react-icons/hi';
import { api } from '../services/api';

const Container = styled.div`
  padding: 20px;
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const BackButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 10px;
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

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #1C1C1E;
  margin-bottom: 16px;
`;

const CardSection = styled.div`
  padding: 20px;
  border-bottom: 1px solid #E5E5EA;
  &:last-of-type { border-bottom: none; }
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

const DateTimeRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const DateTimeInput = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
  align-items: center;
`;

const DateTimeLabel = styled.span`
  font-size: 14px;
  color: #8E8E93;
`;

interface ManualLog {
  person_id: number;
  type: 'entry' | 'exit';
  date: string;
  time: string;
}

export function ManualLoad() {
  const navigate = useNavigate();
  const [personId, setPersonId] = useState('');
  const [logType, setLogType] = useState<'entry' | 'exit'>('entry');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!personId) return;
    
    setLoading(true);
    try {
      const logData: ManualLog = {
        person_id: Number(personId),
        type: logType,
        date,
        time
      };
      
      await api.logs.create(logData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setPersonId('');
        setLogType('entry');
        setDate(new Date().toISOString().split('T')[0]);
        setTime(new Date().toTimeString().slice(0, 5));
      }, 2000);
    } catch (err: any) {
      alert(err.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate('/history')}>
          <HiOutlineArrowLeft size={22} />
        </BackButton>
        <Title>Carga Manual</Title>
      </Header>

      <Card>
        <CardHeader>
          <SectionTitle>Registro de Ingreso/Egreso</SectionTitle>
        </CardHeader>

        <CardSection>
          <Form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="personId" className="block text-sm font-medium mb-2">
                ID de Persona
              </label>
              <Input
                id="personId"
                type="number"
                placeholder="Ingrese el ID de la persona"
                value={personId}
                onChange={(e) => setPersonId(e.target.value)}
                required
              />
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="logType" className="block text-sm font-medium mb-2">
                  Tipo de registro
                </label>
                <Select
                  id="logType"
                  value={logType}
                  onChange={(e) => setLogType(e.target.value as 'entry' | 'exit')}
                >
                  <option value="entry">Ingreso</option>
                  <option value="exit">Egreso</option>
                </Select>
              </div>

              <DateTimeRow>
                <DateTimeInput>
                  <DateTimeLabel>Fecha</DateTimeLabel>
                  <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </DateTimeInput>
                
                <DateTimeInput>
                  <DateTimeLabel>Hora</DateTimeLabel>
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </DateTimeInput>
              </DateTimeRow>

              <ButtonRow>
                <Button type="button" $variant="secondary" onClick={() => navigate('/history')}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? 'Registrando...' : 'Registrar'}
                </Button>
              </ButtonRow>
            </div>
          </Form>
        </CardSection>

        {success && (
          <div style={{ 
            textAlign: 'center', 
            padding: '20px',
            backgroundColor: '#E6F4EA',
            borderRadius: '12px',
            marginTop: '20px'
          }}>
            <HiOutlineCheck size={24} color="#34C759" />
            <p style={{ marginTop: '8px', color: '#1C1C1E', fontWeight: '600' }}>
              Registro exitoso
            </p>
          </div>
        )}
      </Card>
    </Container>
  );
}
