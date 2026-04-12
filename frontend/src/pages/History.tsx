import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { HiOutlineClock, HiOutlineLogout, HiOutlineDocumentText } from 'react-icons/hi';
import { api } from '../services/api';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.div`
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1C1C1E;

  @media (min-width: 768px) {
    font-size: 34px;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(p) => (p.$active ? '#007AFF' : '#F2F2F7')};
  color: ${(p) => (p.$active ? 'white' : '#1C1C1E')};

  &:hover {
    background: ${(p) => (p.$active ? '#007AFF' : '#E5E5EA')};
  }
`;

const DateSection = styled.div`
  margin-bottom: 16px;
`;

const DateHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #8E8E93;
  padding: 8px 12px;
  background: #F2F2F7;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const PersonRow = styled.div`
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`;

const PersonName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
`;

const Category = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 12px;
  background: #F2F2F7;
  color: #8E8E93;
`;

const TimeRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  font-size: 14px;
`;

const TimeItem = styled.span<{ $hasValue: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${(p) => (p.$hasValue ? '#1C1C1E' : '#C7C7CC')};
`;

const TimeLabel = styled.span`
  color: #8E8E93;
  min-width: 60px;
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

const defaultCategories = [
  { id: 'employee', name: 'Empleado', color: '#007AFF' },
  { id: 'visitor', name: 'Visitante', color: '#FF9500' },
  { id: 'contractor', name: 'Contratista', color: '#AF52DE' },
];

export function History() {
  const [logs, setLogs] = useState<any[]>([]);
  const [tab, setTab] = useState<'all' | 'in' | 'out'>('all');
  const [categories, setCategories] = useState<any[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const loadLogs = async () => {
    try {
      const data = await api.logs.getAll();
      setLogs(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    if (tab === 'in') return logs.filter(l => l.check_in);
    if (tab === 'out') return logs.filter(l => l.check_out);
    return logs;
  }, [logs, tab]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof logs> = {};
    filteredLogs.forEach(log => {
      const dateKey = log.date;
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(log);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filteredLogs]);

  const formatDate = (dateStr: string) => {
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return dateStr;
  };

  return (
    <Container>
      <Header>
        <Title>Historial</Title>
      </Header>
      
      <Tabs>
        <Tab $active={tab === 'all'} onClick={() => setTab('all')}>Todos</Tab>
        <Tab $active={tab === 'in'} onClick={() => setTab('in')}>Ingresos</Tab>
        <Tab $active={tab === 'out'} onClick={() => setTab('out')}>Egresos</Tab>
      </Tabs>

      {groupedByDate.length > 0 ? (
        groupedByDate.map(([date, items]) => (
          <DateSection key={date}>
            <DateHeader>FECHA {formatDate(date)}</DateHeader>
            {items.map((log) => (
              <PersonRow key={log.id}>
                <PersonName>
                  {log.last_name} {log.first_name}
                  <Category>{categories.find(c => c.id === log.type)?.name || (log.type === 'uncategorized' ? 'Sin categoría' : log.type)}</Category>
                </PersonName>
                <TimeRow>
                  {tab !== 'out' && (
                    <TimeItem $hasValue={!!log.check_in}>
                      <HiOutlineClock size={16} />
                      <TimeLabel>ingreso:</TimeLabel>
                      {log.check_in || '-'}
                    </TimeItem>
                  )}
                  {tab !== 'in' && (
                    <TimeItem $hasValue={!!log.check_out}>
                      <HiOutlineLogout size={16} />
                      <TimeLabel>egreso:</TimeLabel>
                      {log.check_out || '-'}
                    </TimeItem>
                  )}
                </TimeRow>
              </PersonRow>
            ))}
          </DateSection>
        ))
      ) : (
        <EmptyState>
          <EmptyIcon><HiOutlineDocumentText size={64} /></EmptyIcon>
          <p>No hay registros aún</p>
        </EmptyState>
      )}
    </Container>
  );
}