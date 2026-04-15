import { useEffect, useState, useMemo } from 'react'
import { api } from '@/services'
import { defaultCategories, Icons } from '@/constants'
import { TabType } from '@/types'
import {
  CompareTableComponent,
  StatCardComponent,
  SummaryCardComponent,
  StatsGrid,
  SummaryRow,
  useStatsCard,
  StatsCharts,
  HistoryFilters,
  useHistoryFilters,
} from '@/components'

import {
  Category,
  Container,
  DateHeader,
  DateSection,
  EmptyIcon,
  EmptyState,
  Header,
  PersonName,
  PersonRow,
  StatsContainer,
  Tab,
  Tabs,
  TimeItem,
  TimeLabel,
  TimeRow,
  Title
} from './History.styles'

export function History() {
  const [logs, setLogs] = useState<any[]>([])
  const [persons, setPersons] = useState<any[]>([])
  const [tab, setTab] = useState<TabType>('all')
  const [categories] = useState<any[]>(() => {
    const saved = localStorage.getItem('categories')
    return saved ? JSON.parse(saved) : defaultCategories
  })

  const { statsPersonId, statsDays } = useHistoryFilters()
  
  const loadLogs = async () => {
    try {
      const data = await api.logs.getAll()
      setLogs(data)
    } catch (e) {
      console.error(e)
    }
  }

  const loadPersons = async () => {
    try {
      const data = await api.person.getAll()
      setPersons(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    loadLogs()
    loadPersons()
  }, [])

  const filteredLogs = useMemo(() => {
    let filtered = logs
    if (tab === 'in') filtered = filtered.filter(l => l.check_in)
    if (tab === 'out') filtered = filtered.filter(l => l.check_out)
    if (statsPersonId !== 'all') {
      filtered = filtered.filter(l => String(l.person_id) === statsPersonId)
    }
    return filtered;
  }, [logs, tab, statsPersonId])

  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof logs> = {}
    filteredLogs.forEach(log => {
      const dateKey = log.date
      if (!groups[dateKey]) groups[dateKey] = []
      groups[dateKey].push(log)
    })
    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
  }, [filteredLogs])

  const stats = useMemo(() => {
    const now = new Date()
    const startDate = new Date(now.getTime() - statsDays * 24 * 60 * 60 * 1000)
    
    const periodLogs = logs.filter(log => {
      const logDate = new Date(log.date)
      return logDate >= startDate && logDate <= now
    })

    const employeeLogs = periodLogs.filter(log => log.type === 'employee')
    
    const uniqueDays = new Set(periodLogs.map(l => l.date)).size
    const totalEmployees = persons.filter(p => p.type === 'employee').length
    const totalExpectedAttendances = totalEmployees * uniqueDays
    const actualAttendances = employeeLogs.filter(l => l.check_in).length
    
    const presentismo = totalExpectedAttendances > 0 ? Math.round((actualAttendances / totalExpectedAttendances) * 100) : 0
    
    const ingresos = periodLogs.filter(l => l.check_in).length
    const egresos = periodLogs.filter(l => l.check_out).length
    
    const llegadesTarde = employeeLogs.filter(log => {
      if (!log.check_in) return false
      const [hour] = log.check_in.split(':').map(Number)
      return hour >= 9
    }).length
    
    const salidasTarde = employeeLogs.filter(log => {
      if (!log.check_out) return false
      const [hour] = log.check_out.split(':').map(Number)
      return hour >= 18
    }).length
    
    const ausentes = totalExpectedAttendances - actualAttendances

    const avgCheckInTime = employeeLogs.filter(l => l.check_in).reduce((acc, log) => {
      const [h, m] = log.check_in.split(':').map(Number)
      return acc + (h * 60 + m)
    }, 0)
    const avgCheckIn = employeeLogs.filter(l => l.check_in).length > 0 
      ? Math.round(avgCheckInTime / employeeLogs.filter(l => l.check_in).length)
      : 0
    const avgCheckInHours = Math.floor(avgCheckIn / 60)
    const avgCheckInMins = avgCheckIn % 60

    const avgCheckOutTime = employeeLogs.filter(l => l.check_out).reduce((acc, log) => {
      const [h, m] = log.check_out.split(':').map(Number)
      return acc + (h * 60 + m)
    }, 0)
    const avgCheckOut = employeeLogs.filter(l => l.check_out).length > 0 
      ? Math.round(avgCheckOutTime / employeeLogs.filter(l => l.check_out).length)
      : 0
    const avgCheckOutHours = Math.floor(avgCheckOut / 60)
    const avgCheckOutMins = avgCheckOut % 60

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
    }
  }, [logs, persons, statsDays])

  const previousStats = useMemo(() => {
    const now = new Date()
    const prevStart = new Date(now.getTime() - statsDays * 2 * 24 * 60 * 60 * 1000)
    const prevEnd = new Date(now.getTime() - statsDays * 24 * 60 * 60 * 1000)
    
    const prevLogs = logs.filter(log => {
      const logDate = new Date(log.date)
      return logDate >= prevStart && logDate < prevEnd
    })
    
    const prevEmployeeLogs = prevLogs.filter(l => l.type === 'employee')
    const prevUniqueDays = new Set(prevLogs.map(l => l.date)).size
    const totalEmployees = persons.filter(p => p.type === 'employee').length
    const prevExpected = totalEmployees * prevUniqueDays
    const prevActual = prevEmployeeLogs.filter(l => l.check_in).length
    
    return {
      presentismo: prevExpected > 0 ? Math.round((prevActual / prevExpected) * 100) : 0,
      llegadesTarde: prevEmployeeLogs.filter(l => {
        if (!l.check_in) return false
        const [h] = l.check_in.split(':').map(Number)
        return h >= 9
      }).length,
    };
  }, [logs, persons, statsDays])

  const { metrics, summaries } = useStatsCard(stats, previousStats)

  const personsNoMovement = useMemo(() => {
    const now = new Date()
    const threshold = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)
    
    return persons.filter(p => {
      const lastLog = logs.filter(l => String(l.person_id) === String(p.id))
      if (lastLog.length === 0) return true
      const lastDate = new Date(Math.max(...lastLog.map(l => new Date(l.date).getTime())))
      return lastDate < threshold
    }).length
  }, [logs, persons])

  const formatDate = (dateStr: string) => {
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-')
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
    }
    return dateStr
  }

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
        <SummaryCardComponent color="#34C759" value={stats.totalEmployees} label="Empleados activos" icon={<Icons.documetnHiOut size={20} />} />
        <SummaryCardComponent color="#FF3B30" value={personsNoMovement} label="Sin movimiento (14 días)" icon={<Icons.documetnHiOut size={20} />} />
        <SummaryCardComponent color="#AF52DE" value={stats.uniqueDays} label="Días con movimiento" icon={<Icons.documetnHiOut size={20} />} />
      </SummaryRow>

      <StatsCharts stats={stats} logsData={{ logs, categories }} />
    </StatsContainer>
  )

  return (
    <Container>
      <Header>
        <Title>Historial</Title>
      </Header>
      
      <Tabs>
        <Tab $active={tab === 'all'} onClick={() => setTab('all')}>
          <Icons.documetnHiOut size={16} /> Todos
        </Tab>
        <Tab $active={tab === 'in'} onClick={() => setTab('in')}>
          <Icons.documetnHiOut size={16} /> Ingresos
        </Tab>
        <Tab $active={tab === 'out'} onClick={() => setTab('out')}>
          <Icons.clockHiOut size={16} /> Egresos
        </Tab>
        <Tab $active={tab === 'stats'} onClick={() => setTab('stats')}>
          <Icons.charBarHiOut size={16} /> Estadísticas
        </Tab>
        <Tab $active={tab === 'compare'} onClick={() => setTab('compare')}>
          <Icons.documetnHiOut size={16} /> Comparar
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
                        <Icons.clockHiOut size={16} />
                        <TimeLabel>ingreso:</TimeLabel>
                        {log.check_in || '-'}h
                      </TimeItem>
                    )}
                    {tab !== 'in' && (
                      <TimeItem $hasValue={!!log.check_out}>
                        <Icons.logout size={16} />
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
            <EmptyIcon><Icons.documetnHiOut size={64} /></EmptyIcon>
            <p>No hay registros aún</p>
          </EmptyState>
        )
      )}
    </Container>
  )
}