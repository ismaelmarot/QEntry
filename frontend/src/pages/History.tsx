import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineClock, HiOutlineLogout, HiOutlineDocumentText } from 'react-icons/hi';
import { api } from '../services/api';

const Container = styled.div`
  max-width: 800px;
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

const Filters = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  flex-wrap: wrap;
`;

const Input = styled.input`
  padding: 12px 14px;
  border: 1px solid #E5E5EA;
  border-radius: 34px;
  font-size: 15px;
  background: white;
  min-width: 150px;

  &:focus {
    border-color: #007AFF;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LogCard = styled.div`
  background: white;
  border-radius: 14px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
`;

const PersonInfo = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #1C1C1E;
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 6px;
`;

const DateInfo = styled.span`
  font-size: 13px;
  color: #8E8E93;
`;

const TimeRow = styled.div`
  display: flex;
  gap: 12px;
  font-size: 14px;
  color: #1C1C1E;
`;

const TimeItem = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const RightInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
`;

const StatusBadge = styled.span<{ $status: string }>`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${(p) => {
    switch (p.$status) {
      case 'on_time': return '#34C759';
      case 'late': return '#FF3B30';
      case 'early_exit': return '#FF9500';
      case 'visitor': return '#007AFF';
      default: return '#8E8E93';
    }
  }};
  color: white;
`;

const Duration = styled.div`
  font-size: 14px;
  color: #8E8E93;
  font-weight: 500;
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

const ClearButton = styled.button`
  padding: 12px 14px;
  background: #F2F2F7;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  color: #8E8E93;
  cursor: pointer;

  &:hover {
    background: #E5E5EA;
  }
`;

export function History() {
  const [logs, setLogs] = useState<any[]>([]);
  const [dateFilter, setDateFilter] = useState('');
  const [personIdFilter, setPersonIdFilter] = useState('');

  const loadLogs = async () => {
    try {
      const params: any = {};
      if (dateFilter) params.date = dateFilter;
      if (personIdFilter) params.personId = personIdFilter;
      
      const data = await api.logs.getAll(Object.keys(params).length > 0 ? params : undefined);
      setLogs(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadLogs();
  }, [dateFilter, personIdFilter]);

  const clearFilters = () => {
    setDateFilter('');
    setPersonIdFilter('');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'on_time': return 'A tiempo';
      case 'late': return 'Tarde';
      case 'early_exit': return 'Temprano';
      case 'visitor': return 'Visitante';
      default: return status || '-';
    }
  };

  const formatDuration = (minutes: number) => {
    if (!minutes) return '-';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const hasFilters = dateFilter || personIdFilter;

  return (
    <Container>
      <Header>
        <Title>Historial</Title>
      </Header>
      
      <Filters>
        <Input 
          type="date" 
          value={dateFilter} 
          onChange={(e) => setDateFilter(e.target.value)}
          placeholder="Filtrar por fecha"
        />
        <Input 
          placeholder="ID de persona" 
          value={personIdFilter} 
          onChange={(e) => setPersonIdFilter(e.target.value)}
        />
        {hasFilters && (
          <ClearButton onClick={clearFilters}>Limpiar</ClearButton>
        )}
      </Filters>

      {logs.length > 0 ? (
        <List>
          {logs.map((log) => (
            <LogCard key={log.id}>
              <div>
                <PersonInfo>{log.first_name} {log.last_name}</PersonInfo>
                <MetaInfo>
                  <DateInfo>{formatDate(log.date)}</DateInfo>
                  <TimeRow>
                    {log.check_in && <TimeItem><HiOutlineClock size={14} /> {log.check_in}</TimeItem>}
                    {log.check_out && <TimeItem><HiOutlineLogout size={14} /> {log.check_out}</TimeItem>}
                  </TimeRow>
                </MetaInfo>
              </div>
              <RightInfo>
                <StatusBadge $status={log.status}>{getStatusLabel(log.status)}</StatusBadge>
                {log.duration_minutes && <Duration>{formatDuration(log.duration_minutes)}</Duration>}
              </RightInfo>
            </LogCard>
          ))}
        </List>
      ) : (
        <EmptyState>
          <EmptyIcon><HiOutlineDocumentText size={64} /></EmptyIcon>
          <p>{hasFilters ? 'No hay registros con estos filtros' : 'No hay registros aun'}</p>
        </EmptyState>
      )}
    </Container>
  );
}