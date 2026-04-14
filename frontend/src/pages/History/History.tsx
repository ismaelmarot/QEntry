import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { HiOutlineClock, HiOutlineLogout, HiOutlineDocumentText, HiOutlineChartBar } from 'react-icons/hi';
import { api } from '@/services';

import { StatCardComponent, SummaryCardComponent, StatsGrid, SummaryRow, useStatsCard } from '@/components/StatsCard';
import { StatsCharts } from '@/components/StatsCharts';
import { CompareTableComponent } from '@/components/CompareTable';
import { HistoryFilters, useHistoryFilters } from '@/components/HistoryFilters';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
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
  flex-wrap: wrap;
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

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const defaultCategories = [
  { id: 'employee', name: 'Empleado', color: '#007AFF' },
  { id: 'visitor', name: 'Visitante', color: '#FF9500' },
  { id: 'contractor', name: 'Contratista', color: '#AF52DE' },
];

type TabType = 'all' | 'in' | 'out' | 'stats' | 'compare';

export function History() {
  const [logs, setLogs] = useState<any[]>([]);
  const [persons, setPersons] = useState<any[]>([]);
  const [tab, setTab] = useState<TabType>('all');
  const [categories] = useState<any[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });

  const { statsPersonId, statsDays } = useHistoryFilters();
  
  const loadLogs = async () => {
    try {
      const data = await api.logs.getAll();
      setLogs(data);
    } catch (e) {
      console.error(e);
    }
  };

  const loadPersons = async () => {
    try {
      const data = await api.person.getAll();
      setPersons(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadLogs();
    loadPersons();
  }, []);

  const filteredLogs = useMemo(() => {
    let filtered = logs;
    if (tab === 'in') filtered = filtered.filter(l => l.check_in);
    if (tab === 'out') filtered = filtered.filter(l => l.check_out);
    if (statsPersonId !== 'all') {
      filtered = filtered.filter(l => String(l.person_id) === statsPersonId);
    }
    return filtered;
  }, [logs, tab, statsPersonId]);

  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof logs> = {};
    filteredLogs.forEach(log => {
      const dateKey = log.date;
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(log);
    });
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]));
  }, [filteredLogs]);

  const stats = useMemo(() => {
    const now = new Date();
    const startDate = new Date(now.getTime() - statsDays * 24 * 60 * 60 * 1000);
    
    const periodLogs = logs.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= startDate && logDate <= now;
    });

    const employeeLogs = periodLogs.filter(log => log.type === 'employee');
    
    const uniqueDays = new Set(periodLogs.map(l => l.date)).size;
    const totalEmployees = persons.filter(p => p.type === 'employee').length;
    const totalExpectedAttendances = totalEmployees * uniqueDays;
    const actualAttendances = employeeLogs.filter(l => l.check_in).length;
    
    const presentismo = totalExpectedAttendances > 0 ? Math.round((actualAttendances / totalExpectedAttendances) * 100) : 0;
    
    const ingresos = periodLogs.filter(l => l.check_in).length;
    const egresos = periodLogs.filter(l => l.check_out).length;
    
    const llegadesTarde = employeeLogs.filter(log => {
      if (!log.check_in) return false;
      const [hour] = log.check_in.split(':').map(Number);
      return hour >= 9;
    }).length;
    
    const salidasTarde = employeeLogs.filter(log => {
      if (!log.check_out) return false;
      const [hour] = log.check_out.split(':').map(Number);
      return hour >= 18;
    }).length;
    
    const ausentes = totalExpectedAttendances - actualAttendances;

    const avgCheckInTime = employeeLogs.filter(l => l.check_in).reduce((acc, log) => {
      const [h, m] = log.check_in.split(':').map(Number);
      return acc + (h * 60 + m);
    }, 0);
    const avgCheckIn = employeeLogs.filter(l => l.check_in).length > 0 
      ? Math.round(avgCheckInTime / employeeLogs.filter(l => l.check_in).length)
      : 0;
    const avgCheckInHours = Math.floor(avgCheckIn / 60);
    const avgCheckInMins = avgCheckIn % 60;

    const avgCheckOutTime = employeeLogs.filter(l => l.check_out).reduce((acc, log) => {
      const [h, m] = log.check_out.split(':').map(Number);
      return acc + (h * 60 + m);
    }, 0);
    const avgCheckOut = employeeLogs.filter(l => l.check_out).length > 0 
      ? Math.round(avgCheckOutTime / employeeLogs.filter(l => l.check_out).length)
      : 0;
    const avgCheckOutHours = Math.floor(avgCheckOut / 60);
    const avgCheckOutMins = avgCheckOut % 60;

    return {
      presentismo,
      ingresos,
      egresos,
      llegadesTarde,
      salidasTarde,
      ausentes,
      totalEmployees,
      uniqueDays,
      avgCheckIn: `${avgCheckInHours.toString().padStart(2, '0')}:${avgCheckInMins.toString().padStart(2, '0')}`,
      avgCheckOut: `${avgCheckOutHours.toString().padStart(2, '0')}:${avgCheckOutMins.toString().padStart(2, '0')}`,
      employeeLogs,
      periodLogs,
    };
  }, [logs, persons, statsDays]);

  const previousStats = useMemo(() => {
    const now = new Date();
    const prevStart = new Date(now.getTime() - statsDays * 2 * 24 * 60 * 60 * 1000);
    const prevEnd = new Date(now.getTime() - statsDays * 24 * 60 * 60 * 1000);
    
    const prevLogs = logs.filter(log => {
      const logDate = new Date(log.date);
      return logDate >= prevStart && logDate < prevEnd;
    });
    
    const prevEmployeeLogs = prevLogs.filter(l => l.type === 'employee');
    const prevUniqueDays = new Set(prevLogs.map(l => l.date)).size;
    const totalEmployees = persons.filter(p => p.type === 'employee').length;
    const prevExpected = totalEmployees * prevUniqueDays;
    const prevActual = prevEmployeeLogs.filter(l => l.check_in).length;
    
    return {
      presentismo: prevExpected > 0 ? Math.round((prevActual / prevExpected) * 100) : 0,
      llegadesTarde: prevEmployeeLogs.filter(l => {
        if (!l.check_in) return false;
        const [h] = l.check_in.split(':').map(Number);
        return h >= 9;
      }).length,
    };
  }, [logs, persons, statsDays]);

  const { metrics, summaries } = useStatsCard(stats, previousStats);

  const personsNoMovement = useMemo(() => {
    const now = new Date();
    const threshold = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    
    return persons.filter(p => {
      const lastLog = logs.filter(l => String(l.person_id) === String(p.id));
      if (lastLog.length === 0) return true;
      const lastDate = new Date(Math.max(...lastLog.map(l => new Date(l.date).getTime())));
      return lastDate < threshold;
    }).length;
  }, [logs, persons]);

  const formatDate = (dateStr: string) => {
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return dateStr;
  };

  const renderStats = () => (
    <StatsContainer>
      <HistoryFilters persons={persons} />

      <StatsGrid>
        {metrics.map((m: any) => (
          <StatCardComponent
            key={m.id}
            color={m.color}
            label={m.label}
            value={m.value}
            subtext={m.subtext}
            icon={<m.icon size={18} />}
          />
        ))}
      </StatsGrid>

      <SummaryRow>
        {summaries.map((s, i) => (
          <SummaryCardComponent
            key={i}
            color={s.color}
            value={s.value}
            label={s.label}
            icon={<s.icon size={20} />}
          />
        ))}
      </SummaryRow>

      <SummaryRow>
        <SummaryCardComponent color="#34C759" value={stats.totalEmployees} label="Empleados activos" icon={<HiOutlineDocumentText size={20} />} />
        <SummaryCardComponent color="#FF3B30" value={personsNoMovement} label="Sin movimiento (14 días)" icon={<HiOutlineDocumentText size={20} />} />
        <SummaryCardComponent color="#AF52DE" value={stats.uniqueDays} label="Días con movimiento" icon={<HiOutlineDocumentText size={20} />} />
      </SummaryRow>

      <StatsCharts stats={stats} logsData={{ logs, categories }} />
    </StatsContainer>
  );

  return (
    <Container>
      <Header>
        <Title>Historial</Title>
      </Header>
      
      <Tabs>
        <Tab $active={tab === 'all'} onClick={() => setTab('all')}>
          <HiOutlineDocumentText size={16} /> Todos
        </Tab>
        <Tab $active={tab === 'in'} onClick={() => setTab('in')}>
          <HiOutlineClock size={16} /> Ingresos
        </Tab>
        <Tab $active={tab === 'out'} onClick={() => setTab('out')}>
          <HiOutlineLogout size={16} /> Egresos
        </Tab>
        <Tab $active={tab === 'stats'} onClick={() => setTab('stats')}>
          <HiOutlineChartBar size={16} /> Estadísticas
        </Tab>
        <Tab $active={tab === 'compare'} onClick={() => setTab('compare')}>
          <HiOutlineDocumentText size={16} /> Comparar
        </Tab>
      </Tabs>

      {tab === 'stats' ? renderStats() : tab === 'compare' ? (
        <CompareTableComponent persons={persons} logs={logs} />
      ) : (
        groupedByDate.length > 0 ? (
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
                        {log.check_in || '-'}h
                      </TimeItem>
                    )}
                    {tab !== 'in' && (
                      <TimeItem $hasValue={!!log.check_out}>
                        <HiOutlineLogout size={16} />
                        <TimeLabel>egreso:</TimeLabel>
                        {log.check_out || '-'}h
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
        )
      )}
    </Container>
  );
}