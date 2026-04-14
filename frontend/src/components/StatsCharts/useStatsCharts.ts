import { useMemo } from 'react';

interface StatsData {
  presentismo: number;
  ausentes: number;
  periodLogs: any[];
}

interface LogsData {
  logs: any[];
  categories: { id: string; name: string; color: string }[];
}

export function useStatsCharts(stats: StatsData, logsData: LogsData) {
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
    const { categories } = logsData;
    stats.periodLogs.forEach(log => {
      const cat = categories.find((c: any) => c.id === log.type);
      const name = cat?.name || log.type;
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value], i) => ({
      name,
      value,
      color: categories.find((c: any) => c.name === name)?.color || ['#007AFF', '#34C759', '#FF9500', '#FF3B30', '#AF52DE', '#5856D6'][i % 6],
    }));
  }, [stats, logsData]);

  const dailyData = useMemo(() => {
    const last7Days: Record<string, { in: number; out: number; late: number }> = {};
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split('T')[0];
      last7Days[dateStr] = { in: 0, out: 0, late: 0 };
    }
    
    logsData.logs.forEach(log => {
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
  }, [logsData.logs]);

  const hourlyDistribution = useMemo(() => {
    const hours: Record<number, number> = {};
    stats.periodLogs.filter(l => l.type === 'employee').forEach(log => {
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
    
    logsData.logs.forEach(log => {
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
  }, [logsData.logs]);

  return {
    pieData,
    categoryPieData,
    dailyData,
    hourlyDistribution,
    monthlyTrend,
  };
}