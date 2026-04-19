import { useMemo } from 'react';
import { HiOutlineTrendingUp, HiOutlineUserGroup, HiOutlineLogout, HiOutlineClock, HiOutlineDocumentText, HiOutlineCalendar } from 'react-icons/hi';

interface StatsData {
  presentismo: number;
  ingresos: number;
  egresos: number;
  llegadesTarde: number;
  salidasTarde: number;
  ausentes: number;
  totalEmployees: number;
  uniqueDays: number;
  avgCheckIn: string;
  avgCheckOut: string;
  employeeLogs: any[];
  periodLogs: any[];
}

interface PreviousStats {
  presentismo: number;
  llegadesTarde: number;
}

export function useStatsCard(stats: StatsData, previousStats: PreviousStats) {
  const presentismoTrend = stats.presentismo - previousStats.presentismo;
  const lateTrend = stats.llegadesTarde - previousStats.llegadesTarde;

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
  }, [stats.periodLogs]);

  const metrics = useMemo(() => [
    {
      id: 'presentismo',
      label: 'Presentismo',
      value: `${stats.presentismo}%`,
      subtext: `${stats.uniqueDays} días • ${presentismoTrend >= 0 ? '+' : ''}${presentismoTrend}% vs período anterior`,
      color: 'var(--success)',
      icon: HiOutlineTrendingUp,
    },
    {
      id: 'ingresos',
      label: 'Ingresos',
      value: stats.ingresos,
      subtext: 'Total registros',
      color: 'var(--primary)',
      icon: HiOutlineUserGroup,
    },
    {
      id: 'egresos',
      label: 'Egresos',
      value: stats.egresos,
      subtext: 'Total registros',
      color: 'var(--info)',
      icon: HiOutlineLogout,
    },
    {
      id: 'llegadasTarde',
      label: 'Llegadas Tarde',
      value: stats.llegadesTarde,
      subtext: `Después de 9:00 • ${lateTrend <= 0 ? '-' : '+'}${Math.abs(lateTrend)} vs anterior`,
      color: 'var(--warning)',
      icon: HiOutlineClock,
    },
    {
      id: 'salidasTarde',
      label: 'Salidas Tarde',
      value: stats.salidasTarde,
      subtext: 'Después de 18:00',
      color: '#AF52DE',
      icon: HiOutlineLogout,
    },
    {
      id: 'ausentes',
      label: 'Ausentes',
      value: stats.ausentes,
      subtext: 'Sin registro',
      color: 'var(--error)',
      icon: HiOutlineDocumentText,
    },
  ], [stats, presentismoTrend, lateTrend]);

  const summaries = useMemo(() => [
    {
      value: stats.avgCheckIn,
      label: 'Hora promedio de ingreso',
      color: 'var(--primary)',
      icon: HiOutlineClock,
    },
    {
      value: stats.avgCheckOut,
      label: 'Hora promedio de egreso',
      color: 'var(--info)',
      icon: HiOutlineLogout,
    },
    {
      value: peakHour,
      label: 'Horario pico de ingresos',
      color: 'var(--warning)',
      icon: HiOutlineCalendar,
    },
  ], [stats, peakHour]);

  return {
    metrics,
    summaries,
    peakHour,
  };
}