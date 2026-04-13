import { useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { HiOutlineClock, HiOutlineLogout, HiOutlineDocumentText, HiOutlineTrendingUp, HiOutlineTrendingDown, HiOutlineCalendar, HiOutlineUserGroup, HiOutlineChartBar } from 'react-icons/hi';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart, Line, AreaChart, Area } from 'recharts';
import { api } from '../services/api';

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

const StatsFilters = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #E5E5EA;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  color: #1C1C1E;
  cursor: pointer;
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`;

const StatCard = styled.div<{ $color?: string }>`
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid ${(p) => p.$color || '#007AFF'};
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StatIcon = styled.div<{ $color?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${(p) => p.$color || '#007AFF'}15;
  color: ${(p) => p.$color || '#007AFF'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StatLabel = styled.div`
  font-size: 12px;
  color: #8E8E93;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
`;

const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1C1C1E;
`;

const StatSubtext = styled.div`
  font-size: 11px;
  color: #8E8E93;
  margin-top: 4px;
`;

const TrendBadge = styled.span<{ $positive?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  font-weight: 600;
  color: ${(p) => p.$positive ? '#34C759' : '#FF3B30'};
  background: ${(p) => p.$positive ? '#E8F5E9' : '#FFEBEE'};
  padding: 4px 8px;
  border-radius: 8px;
`;

const ChartCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const ChartTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
  margin: 0 0 16px 0;
`;

const ChartContainer = styled.div`
  width: 100%;
  height: 250px;
`;

const ChartsRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const HourDistributionRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`;

const HourChip = styled.div<{ $highlight?: boolean }>`
  padding: 8px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  background: ${(p) => p.$highlight ? '#007AFF' : '#F2F2F7'};
  color: ${(p) => p.$highlight ? 'white' : '#1C1C1E'};
`;

const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const SummaryCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const SummaryIcon = styled.div<{ $color?: string }>`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: ${(p) => p.$color || '#007AFF'}15;
  color: ${(p) => p.$color || '#007AFF'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #1C1C1E;
`;

const SummaryLabel = styled.div`
  font-size: 12px;
  color: #8E8E93;
  margin-top: 4px;
`;

const CompareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CompareSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const CompareLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #1C1C1E;
`;

const MultiSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const PersonChip = styled.button<{ $selected?: boolean }>`
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${(p) => p.$selected ? '#007AFF' : '#E5E5EA'};
  background: ${(p) => p.$selected ? '#007AFF' : 'white'};
  color: ${(p) => p.$selected ? 'white' : '#1C1C1E'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #007AFF;
  }
`;

const CompareTable = styled.div`
  display: grid;
  gap: 12px;
`;

const CompareRow = styled.div<{ $header?: boolean }>`
  display: grid;
  grid-template-columns: 2fr repeat(7, 1fr);
  gap: 8px;
  padding: 12px 16px;
  background: ${(p) => p.$header ? '#F2F2F7' : 'white'};
  border-radius: 12px;
  font-size: 14px;
  font-weight: ${(p) => p.$header ? '600' : '400'};
  color: ${(p) => p.$header ? '#8E8E93' : '#1C1C1E'};
  align-items: center;
`;

const CompareCell = styled.div<{ $highlight?: boolean; $color?: string }>`
  text-align: center;
  font-weight: ${(p) => p.$highlight ? '600' : '400'};
  color: ${(p) => p.$color || '#1C1C1E'};
`;

const COLORS = ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE', '#5856D6'];

const defaultCategories = [
  { id: 'employee', name: 'Empleado', color: '#007AFF' },
  { id: 'visitor', name: 'Visitante', color: '#FF9500' },
  { id: 'contractor', name: 'Contratista', color: '#AF52DE' },
];

export function History() {
  const [logs, setLogs] = useState<any[]>([]);
  const [persons, setPersons] = useState<any[]>([]);
  const [tab, setTab] = useState<'all' | 'in' | 'out' | 'stats' | 'compare'>('all');
  const [categories, setCategories] = useState<any[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : defaultCategories;
  });
  
  const [statsPersonId, setStatsPersonId] = useState<string>('all');
  const [statsDays, setStatsDays] = useState<number>(30);
  const [comparePersons, setComparePersons] = useState<string[]>([]);

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

  const presentismoTrend = stats.presentismo - previousStats.presentismo;
  const lateTrend = stats.llegadesTarde - previousStats.llegadesTarde;

  const pieData = useMemo(() => {
    const total = stats.presentismo + stats.ausentes;
    if (total === 0) return [];
    return [
      { name: 'Presentes', value: stats.presentismo, color: '#34C759' },
      { name: 'Ausentes', value: stats.ausentes, color: '#FF3B30' },
    ];
  }, [stats]);

  const categoryPieData = useMemo(() => {
    const counts: Record<string, number> = {};
    stats.periodLogs.forEach(log => {
      const cat = categories.find(c => c.id === log.type);
      const name = cat?.name || log.type;
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      color: categories.find(c => c.name === name)?.color || COLORS[i % COLORS.length],
    }));
  }, [stats, categories]);

  const dailyData = useMemo(() => {
    const last7Days: Record<string, { in: number; out: number; late: number }> = {};
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      last7Days[dateStr] = { in: 0, out: 0, late: 0 };
    }
    
    logs.forEach(log => {
      if (last7Days[log.date]) {
        if (log.check_in) {
          last7Days[log.date].in++;
          const [hour] = log.check_in.split(':').map(Number);
          if (hour >= 9) last7Days[log.date].late++;
        }
        if (log.check_out) {
          last7Days[log.date].out++;
        }
      }
    });
    
    return Object.entries(last7Days).map(([date, data]) => ({
      date: new Date(date).toLocaleDateString('es-AR', { weekday: 'short' }),
      ...data,
    }));
  }, [logs]);

  const hourlyDistribution = useMemo(() => {
    const hours: Record<number, number> = {};
    stats.employeeLogs.forEach(log => {
      if (log.check_in) {
        const [hour] = log.check_in.split(':').map(Number);
        hours[hour] = (hours[hour] || 0) + 1;
      }
    });
    return Object.entries(hours)
      .map(([hour, count]) => ({ hour: Number(hour), count }))
      .sort((a, b) => a.hour - b.hour);
  }, [stats]);

  const monthlyTrend = useMemo(() => {
    const monthly: Record<string, { presentismo: number; total: number; actual: number }> = {};
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toISOString().slice(0, 7);
      monthly[monthKey] = { presentismo: 0, total: 0, actual: 0 };
    }
    
    logs.forEach(log => {
      const monthKey = log.date.slice(0, 7);
      if (monthly[monthKey]) {
        monthly[monthKey].total++;
        if (log.check_in) monthly[monthKey].actual++;
      }
    });
    
    return Object.entries(monthly).map(([month, data]) => ({
      month: new Date(month + '-01').toLocaleDateString('es-AR', { month: 'short' }),
      presentismo: data.total > 0 ? Math.round((data.actual / data.total) * 100) : 0,
    }));
  }, [logs]);

  const personStats = useMemo(() => {
    if (statsPersonId === 'all') return null;
    
    const personLogs = logs.filter(l => String(l.person_id) === statsPersonId);
    const person = persons.find(p => String(p.id) === statsPersonId);
    
    const total = personLogs.length;
    const ingresos = personLogs.filter(l => l.check_in).length;
    const egresos = personLogs.filter(l => l.check_out).length;
    const llegadesTarde = personLogs.filter(l => {
      if (!l.check_in) return false;
      const [hour] = l.check_in.split(':').map(Number);
      return hour >= 9;
    }).length;
    const salidasTarde = personLogs.filter(l => {
      if (!l.check_out) return false;
      const [hour] = l.check_out.split(':').map(Number);
      return hour >= 18;
    }).length;
    
    const avgCheckInTime = personLogs.filter(l => l.check_in).reduce((acc, log) => {
      const [h, m] = log.check_in.split(':').map(Number);
      return acc + (h * 60 + m);
    }, 0);
    const avgCheckIn = personLogs.filter(l => l.check_in).length > 0 
      ? Math.round(avgCheckInTime / personLogs.filter(l => l.check_in).length)
      : 0;
    
    const totalHours = personLogs.filter(l => l.check_in && l.check_out).reduce((acc, log) => {
      const [h1, m1] = (log.check_in || '0:0').split(':').map(Number);
      const [h2, m2] = (log.check_out || '0:0').split(':').map(Number);
      return acc + ((h2 * 60 + m2) - (h1 * 60 + m1));
    }, 0);
    const daysWithBoth = personLogs.filter(l => l.check_in && l.check_out).length;
    const avgHours = daysWithBoth > 0 ? Math.round(totalHours / daysWithBoth / 60 * 10) / 10 : 0;
    
    return {
      person,
      total,
      ingresos,
      egresos,
      llegadesTarde,
      salidasTarde,
      avgCheckIn: `${Math.floor(avgCheckIn / 60).toString().padStart(2, '0')}:${(avgCheckIn % 60).toString().padStart(2, '0')}`,
      avgHours,
    };
  }, [logs, persons, statsPersonId]);

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

  const peakHour = useMemo(() => {
    const hourCounts: Record<number, number> = {};
    stats.periodLogs.forEach(log => {
      if (log.check_in) {
        const [hour] = log.check_in.split(':').map(Number);
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      }
    });
    const sorted = Object.entries(hourCounts).sort((a, b) => b[1] - a[1]);
    return sorted.length > 0 ? `${sorted[0][0]}:00 - ${Number(sorted[0][0]) + 1}:00` : '-';
  }, [stats]);

  const formatDate = (dateStr: string) => {
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }
    return dateStr;
  };

  const compareStats = useMemo(() => {
    return comparePersons.map(personId => {
      const personLogs = logs.filter(l => String(l.person_id) === personId);
      const person = persons.find(p => String(p.id) === personId);
      
      const total = personLogs.length;
      const ingresos = personLogs.filter(l => l.check_in).length;
      const egresos = personLogs.filter(l => l.check_out).length;
      const llegadesTarde = personLogs.filter(l => {
        if (!l.check_in) return false;
        const [h] = l.check_in.split(':').map(Number);
        return h >= 9;
      }).length;
      
      const latePercent = ingresos > 0 ? Math.round((llegadesTarde / ingresos) * 100) : 0;
      
      const totalMinutes = personLogs.filter(l => l.check_in && l.check_out).reduce((acc, log) => {
        const [h1, m1] = (log.check_in || '0:0').split(':').map(Number);
        const [h2, m2] = (log.check_out || '0:0').split(':').map(Number);
        const minutes = (h2 * 60 + m2) - (h1 * 60 + m1);
        return acc + (minutes > 0 ? minutes : 0);
      }, 0);
      
      const totalHours = Math.round(totalMinutes / 60 * 10) / 10;
      const daysWithWork = personLogs.filter(l => l.check_in && l.check_out).length;
      const avgHoursPerDay = daysWithWork > 0 ? Math.round((totalMinutes / daysWithWork / 60) * 10) / 10 : 0;
      
      return {
        id: personId,
        name: person ? `${person.last_name} ${person.first_name}` : 'Unknown',
        total,
        ingresos,
        egresos,
        llegadesTarde,
        latePercent,
        totalHours,
        avgHoursPerDay,
      };
    });
  }, [logs, persons, comparePersons]);

  const renderCompare = () => (
    <CompareContainer>
      <CompareSelector>
        <CompareLabel>Seleccionar empleados a comparar:</CompareLabel>
        <MultiSelect>
          {persons.filter(p => p.type === 'employee').map(person => (
            <PersonChip
              key={person.id}
              $selected={comparePersons.includes(String(person.id))}
              onClick={() => {
                const id = String(person.id);
                setComparePersons(prev => 
                  prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
                );
              }}
            >
              {person.last_name} {person.first_name}
            </PersonChip>
          ))}
        </MultiSelect>
      </CompareSelector>

      {comparePersons.length > 0 && (
        <CompareTable>
          <CompareRow $header>
            <CompareCell>Empleado</CompareCell>
            <CompareCell>Días</CompareCell>
            <CompareCell>Ingresos</CompareCell>
            <CompareCell>Egresos</CompareCell>
            <CompareCell>Llegadas Tarde</CompareCell>
            <CompareCell>% Tarde</CompareCell>
            <CompareCell>Hs. Totales</CompareCell>
            <CompareCell>Hs./Día</CompareCell>
          </CompareRow>
          {compareStats.map((stat, idx) => (
            <CompareRow key={stat.id}>
              <CompareCell $highlight>{stat.name}</CompareCell>
              <CompareCell>{stat.total}</CompareCell>
              <CompareCell>{stat.ingresos}</CompareCell>
              <CompareCell>{stat.egresos}</CompareCell>
              <CompareCell style={{ color: stat.llegadesTarde > 0 ? '#FF9500' : '#1C1C1E' }}>
                {stat.llegadesTarde}
              </CompareCell>
              <CompareCell $color={stat.latePercent > 20 ? '#FF3B30' : stat.latePercent > 10 ? '#FF9500' : '#34C759'}>
                {stat.latePercent}%
              </CompareCell>
              <CompareCell>{stat.totalHours}h</CompareCell>
              <CompareCell $color={stat.avgHoursPerDay >= 8 ? '#34C759' : stat.avgHoursPerDay >= 6 ? '#FF9500' : '#FF3B30'}>
                {stat.avgHoursPerDay}h
              </CompareCell>
            </CompareRow>
          ))}
        </CompareTable>
      )}

      {comparePersons.length === 0 && (
        <EmptyState>
          <EmptyIcon><HiOutlineUserGroup size={64} /></EmptyIcon>
          <p>Selecciona empleados para comparar sus métricas</p>
        </EmptyState>
      )}
    </CompareContainer>
  );

  const renderStats = () => (
    <StatsContainer>
      <StatsFilters>
        <FilterSelect value={statsPersonId} onChange={(e) => setStatsPersonId(e.target.value)}>
          <option value="all">Todas las personas</option>
          {persons.map(p => (
            <option key={p.id} value={p.id}>{p.last_name} {p.first_name}</option>
          ))}
        </FilterSelect>
        <FilterSelect value={statsDays} onChange={(e) => setStatsDays(Number(e.target.value))}>
          <option value={7}>Últimos 7 días</option>
          <option value={30}>Últimos 30 días</option>
          <option value={90}>Últimos 90 días</option>
        </FilterSelect>
      </StatsFilters>

      <StatsGrid>
        <StatCard $color="#34C759">
          <StatHeader>
            <StatIcon $color="#34C759"><HiOutlineTrendingUp size={18} /></StatIcon>
            <StatLabel>Presentismo</StatLabel>
          </StatHeader>
          <StatValue>{stats.presentismo}%</StatValue>
          <StatSubtext>
            {stats.uniqueDays} días • {presentismoTrend >= 0 ? '+' : ''}{presentismoTrend}% vs período anterior
          </StatSubtext>
        </StatCard>
        <StatCard $color="#007AFF">
          <StatHeader>
            <StatIcon $color="#007AFF"><HiOutlineUserGroup size={18} /></StatIcon>
            <StatLabel>Ingresos</StatLabel>
          </StatHeader>
          <StatValue>{stats.ingresos}</StatValue>
          <StatSubtext>Total registros</StatSubtext>
        </StatCard>
        <StatCard $color="#5856D6">
          <StatHeader>
            <StatIcon $color="#5856D6"><HiOutlineLogout size={18} /></StatIcon>
            <StatLabel>Egresos</StatLabel>
          </StatHeader>
          <StatValue>{stats.egresos}</StatValue>
          <StatSubtext>Total registros</StatSubtext>
        </StatCard>
        <StatCard $color="#FF9500">
          <StatHeader>
            <StatIcon $color="#FF9500"><HiOutlineClock size={18} /></StatIcon>
            <StatLabel>Llegadas Tarde</StatLabel>
          </StatHeader>
          <StatValue>{stats.llegadesTarde}</StatValue>
          <StatSubtext>
            Después de 9:00 • {lateTrend <= 0 ? '-' : '+'}{Math.abs(lateTrend)} vs anterior
          </StatSubtext>
        </StatCard>
        <StatCard $color="#AF52DE">
          <StatHeader>
            <StatIcon $color="#AF52DE"><HiOutlineLogout size={18} /></StatIcon>
            <StatLabel>Salidas Tarde</StatLabel>
          </StatHeader>
          <StatValue>{stats.salidasTarde}</StatValue>
          <StatSubtext>Después de 18:00</StatSubtext>
        </StatCard>
        <StatCard $color="#FF3B30">
          <StatHeader>
            <StatIcon $color="#FF3B30"><HiOutlineDocumentText size={18} /></StatIcon>
            <StatLabel>Ausentes</StatLabel>
          </StatHeader>
          <StatValue>{stats.ausentes}</StatValue>
          <StatSubtext>Sin registro</StatSubtext>
        </StatCard>
      </StatsGrid>

      <SummaryRow>
        <SummaryCard>
          <SummaryIcon $color="#007AFF"><HiOutlineClock size={20} /></SummaryIcon>
          <SummaryValue>{stats.avgCheckIn}</SummaryValue>
          <SummaryLabel>Hora promedio de ingreso</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon $color="#5856D6"><HiOutlineLogout size={20} /></SummaryIcon>
          <SummaryValue>{stats.avgCheckOut}</SummaryValue>
          <SummaryLabel>Hora promedio de egreso</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon $color="#FF9500"><HiOutlineCalendar size={20} /></SummaryIcon>
          <SummaryValue>{peakHour}</SummaryValue>
          <SummaryLabel>Horario pico de ingresos</SummaryLabel>
        </SummaryCard>
      </SummaryRow>

      <SummaryRow>
        <SummaryCard>
          <SummaryIcon $color="#34C759"><HiOutlineUserGroup size={20} /></SummaryIcon>
          <SummaryValue>{stats.totalEmployees}</SummaryValue>
          <SummaryLabel>Empleados activos</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon $color="#FF3B30"><HiOutlineDocumentText size={20} /></SummaryIcon>
          <SummaryValue>{personsNoMovement}</SummaryValue>
          <SummaryLabel>Sin movimiento (14 días)</SummaryLabel>
        </SummaryCard>
        <SummaryCard>
          <SummaryIcon $color="#AF52DE"><HiOutlineCalendar size={20} /></SummaryIcon>
          <SummaryValue>{stats.uniqueDays}</SummaryValue>
          <SummaryLabel>Días con movimiento</SummaryLabel>
        </SummaryCard>
      </SummaryRow>

      <ChartsRow>
        <ChartCard>
          <ChartTitle>Presencial vs Ausente</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ value }) => `${value}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>

        <ChartCard>
          <ChartTitle>Por Categoría</ChartTitle>
          <ChartContainer>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {categoryPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </ChartContainer>
        </ChartCard>
      </ChartsRow>

      <ChartCard>
        <ChartTitle>Movimiento por Día (7 días)</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer>
            <BarChart data={dailyData}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="in" name="Ingresos" fill="#007AFF" radius={[4, 4, 0, 0]} />
              <Bar dataKey="out" name="Egresos" fill="#5856D6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartCard>

      <ChartCard>
        <ChartTitle>Tendencia de Presentismo (6 meses)</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer>
            <AreaChart data={monthlyTrend}>
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `${value}%`} />
              <Area type="monotone" dataKey="presentismo" name="Presentismo" stroke="#34C759" fill="#34C759" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartCard>

      <ChartCard>
        <ChartTitle>Distribución de Ingresos por Hora</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer>
            <BarChart data={hourlyDistribution}>
              <XAxis dataKey="hour" tick={{ fontSize: 12 }} tickFormatter={(h) => `${h}:00`} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="count" name="Ingresos" fill="#007AFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartCard>

      <ChartCard>
        <ChartTitle>Tendencia de Llegadas Tarde (7 días)</ChartTitle>
        <ChartContainer>
          <ResponsiveContainer>
            <LineChart data={dailyData}>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="late" name="Llegadas Tarde" stroke="#FF9500" strokeWidth={2} dot={{ fill: '#FF9500' }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartCard>

      {personStats && (
        <ChartCard>
          <ChartTitle>Estadísticas de {personStats.person?.last_name} {personStats.person?.first_name}</ChartTitle>
          <StatsGrid>
            <StatCard $color="#007AFF">
              <StatLabel>Total Días</StatLabel>
              <StatValue>{personStats.total}</StatValue>
            </StatCard>
            <StatCard $color="#34C759">
              <StatLabel>Ing. Promedio</StatLabel>
              <StatValue>{personStats.avgCheckIn}</StatValue>
            </StatCard>
            <StatCard $color="#5856D6">
              <StatLabel>Hs. Promedio/Día</StatLabel>
              <StatValue>{personStats.avgHours}h</StatValue>
            </StatCard>
            <StatCard $color="#FF9500">
              <StatLabel>Llegadas Tarde</StatLabel>
              <StatValue>{personStats.llegadesTarde}</StatValue>
            </StatCard>
          </StatsGrid>
        </ChartCard>
      )}
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
          <HiOutlineUserGroup size={16} /> Ingresos
        </Tab>
        <Tab $active={tab === 'out'} onClick={() => setTab('out')}>
          <HiOutlineLogout size={16} /> Egresos
        </Tab>
        <Tab $active={tab === 'stats'} onClick={() => setTab('stats')}>
          <HiOutlineChartBar size={16} /> Estadísticas
        </Tab>
        <Tab $active={tab === 'compare'} onClick={() => setTab('compare')}>
          <HiOutlineUserGroup size={16} /> Comparar
        </Tab>
      </Tabs>

      {tab === 'stats' ? renderStats() : tab === 'compare' ? renderCompare() : (
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