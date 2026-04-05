import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineQrcode, HiOutlineUserAdd, HiOutlineClipboardList } from 'react-icons/hi';
import { api } from '../services/api';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1C1C1E;

  @media (min-width: 768px) {
    font-size: 34px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #007AFF;
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 48px;
  }
`;

const StatLabel = styled.div`
  font-size: 13px;
  color: #8E8E93;
  margin-top: 8px;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1C1C1E;
`;

const QuickActions = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 24px;
  background: #007AFF;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 34px;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }

  &:active {
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    padding: 20px 32px;
    font-size: 17px;
  }
`;

const SecondaryButton = styled(ActionButton)`
  background: #34C759;
  box-shadow: 0 4px 12px rgba(52, 199, 89, 0.3);

  &:hover {
    box-shadow: 0 6px 16px rgba(52, 199, 89, 0.4);
  }
`;

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
`;

const EntrySection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const EntryTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1C1C1E;
  text-align: center;
`;

const EntryButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const EntryButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 28px 20px;
  background: #007AFF;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border-radius: 20px;
  transition: transform 0.2s, opacity 0.2s;
  box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  border: none;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    opacity: 0.95;
  }

  &:active {
    transform: translateY(0);
  }
`;

const ManualButton = styled(EntryButton)`
  background: #FF9500;
  box-shadow: 0 4px 12px rgba(255, 149, 0, 0.3);

  &:hover {
    box-shadow: 0 6px 16px rgba(255, 149, 0, 0.4);
  }
`;

const ButtonLabel = styled.span`
  font-size: 15px;
`;

const RecentEntriesSection = styled.div`
  margin-top: 32px;
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const EntriesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const EntryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #F2F2F7;
  border-radius: 12px;
`;

const EntryInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const EntryName = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #1C1C1E;
`;

const EntryTime = styled.span`
  font-size: 13px;
  color: #8E8E93;
`;

const EntryType = styled.span<{ $type: string }>`
  font-size: 13px;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 8px;
  background: ${props => props.$type === 'entry' ? '#34C759' : '#FF3B30'};
  color: white;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #8E8E93;
  font-size: 14px;
  padding: 20px;
`;

interface RecentLog {
  id: number;
  personId: number;
  type: 'entry' | 'exit';
  timestamp: string;
  person?: {
    name: string;
    lastname: string;
  };
}

export function Dashboard() {
  const [stats, setStats] = useState({ inside: 0, todayEntries: 0, completed: 0 });
  const [recentLogs, setRecentLogs] = useState<RecentLog[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
    loadRecentLogs();
  }, []);

  const loadStats = async () => {
    try {
      const data = await api.logs.getStats();
      setStats(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadRecentLogs = async () => {
    try {
      const data = await api.logs.getRecent(10);
      setRecentLogs(data);
    } catch (e) {
      console.error(e);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
  };

  return (
    <Container>
      <Title>Dashboard</Title>
      <StatsGrid>
        <StatCard>
          <StatValue>{stats.inside}</StatValue>
          <StatLabel>Dentro ahora</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.todayEntries}</StatValue>
          <StatLabel>Ingresos hoy</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.completed}</StatValue>
          <StatLabel>Completados</StatLabel>
        </StatCard>
      </StatsGrid>

      <EntrySection>
        <EntryTitle>Ingreso / Egreso</EntryTitle>
        <EntryButtons>
          <EntryButton onClick={() => navigate('/scanner')}>
            <IconWrapper><HiOutlineQrcode size={32} /></IconWrapper>
            <ButtonLabel>Escanear QR</ButtonLabel>
          </EntryButton>
          <ManualButton onClick={() => navigate('/scanner/manual')}>
            <IconWrapper><HiOutlineClipboardList size={32} /></IconWrapper>
            <ButtonLabel>Carga Manual</ButtonLabel>
          </ManualButton>
        </EntryButtons>
      </EntrySection>

      <SectionTitle>Acciones rápidas</SectionTitle>
      <QuickActions>
        <SecondaryButton onClick={() => navigate('/persons')}>
          <IconWrapper><HiOutlineUserAdd size={22} /></IconWrapper>
          Nueva persona
        </SecondaryButton>
      </QuickActions>

      <RecentEntriesSection>
        <SectionTitle>Últimos ingresos</SectionTitle>
        {recentLogs.length === 0 ? (
          <EmptyMessage>No hay registros recientes</EmptyMessage>
        ) : (
          <EntriesList>
            {recentLogs.map(log => (
              <EntryItem key={log.id}>
                <EntryInfo>
                  <EntryName>{log.person?.name} {log.person?.lastname}</EntryName>
                  <EntryTime>{formatDate(log.timestamp)} {formatTime(log.timestamp)}</EntryTime>
                </EntryInfo>
                <EntryType $type={log.type}>{log.type === 'entry' ? 'Entrada' : 'Salida'}</EntryType>
              </EntryItem>
            ))}
          </EntriesList>
        )}
      </RecentEntriesSection>
    </Container>
  );
}