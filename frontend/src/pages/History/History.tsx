import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiOutlineCalendar } from 'react-icons/hi'
import { defaultCategories, Icons } from '@/constants'
import { TabType } from '@/types'
import { useHistoryData } from './hooks/useHistoryData'
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
  DateButton,
  DateHeader,
  DateLabel,
  DateSection,
  DateSeparator,
  ClearButton,
  EmptyIcon,
  EmptyState,
  FilterRow,
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
  const navigate = useNavigate()

  const [tab, setTab] = useState<TabType>('all')
  const { logs, persons } = useHistoryData(tab)

  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  const [categories] = useState<any[]>(() => {
    const saved = localStorage.getItem('categories')
    return saved ? JSON.parse(saved) : defaultCategories
  })

  const { statsPersonId, statsDays } = useHistoryFilters()

  const formatDateForDisplay = (date: string) => {
    if (!date) return ''
    const d = new Date(date + 'T00:00:00')
    return d.toLocaleDateString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatDate = (dateStr: string) => {
    if (dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-')
      const date = new Date(+year, +month - 1, +day)
      return date.toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      })
    }
    return dateStr
  }

  const filteredLogs = useMemo(() => {
    let filtered = logs

    if (tab === 'in') filtered = filtered.filter(l => l.check_in)
    if (tab === 'out') filtered = filtered.filter(l => l.check_out)

    if (statsPersonId !== 'all') {
      filtered = filtered.filter(l => String(l.person_id) === statsPersonId)
    }

    if (dateFrom || dateTo) {
      filtered = filtered.filter(log => {
        if (dateFrom && log.date < dateFrom) return false
        if (dateTo && log.date > dateTo) return false
        return true
      })
    }

    return filtered
  }, [logs, tab, statsPersonId, dateFrom, dateTo])

  const groupedByDate = useMemo(() => {
    const groups: Record<string, typeof logs> = {}

    filteredLogs.forEach(log => {
      if (!groups[log.date]) groups[log.date] = []
      groups[log.date].push(log)
    })

    return Object.entries(groups).sort((a, b) => b[0].localeCompare(a[0]))
  }, [filteredLogs])

  const stats = useMemo(() => {
    const now = new Date()
    const startDate = new Date(now.getTime() - statsDays * 86400000)

    const periodLogs = logs.filter(log => {
      const d = new Date(log.date)
      return d >= startDate && d <= now
    })

    const employeeLogs = periodLogs.filter(l => l.person_type === 'employee')

    const uniqueDays = new Set(periodLogs.map(l => l.date)).size
    const totalEmployees = persons.filter(p => p.type === 'employee').length
    const expected = totalEmployees * uniqueDays
    const actual = employeeLogs.filter(l => l.check_in).length

    const presentismo = expected ? Math.round((actual / expected) * 100) : 0
    const ingresos = periodLogs.filter(l => l.check_in).length
    const egresos = periodLogs.filter(l => l.check_out).length

    const llegadesTarde = employeeLogs.filter(l => {
      if (!l.check_in) return false
      return Number(l.check_in.split(':')[0]) >= 9
    }).length

    const salidasTarde = employeeLogs.filter(l => {
      if (!l.check_out) return false
      return Number(l.check_out.split(':')[0]) >= 18
    }).length

    const ausentes = expected - actual

    const avgIn = employeeLogs
      .filter(l => l.check_in)
      .reduce((acc, l) => {
        const [h, m] = l.check_in.split(':').map(Number)
        return acc + h * 60 + m
      }, 0)

    const avgInCount = employeeLogs.filter(l => l.check_in).length
    const avgInMin = avgInCount ? Math.round(avgIn / avgInCount) : 0

    const avgOut = employeeLogs
      .filter(l => l.check_out)
      .reduce((acc, l) => {
        const [h, m] = l.check_out.split(':').map(Number)
        return acc + h * 60 + m
      }, 0)

    const avgOutCount = employeeLogs.filter(l => l.check_out).length
    const avgOutMin = avgOutCount ? Math.round(avgOut / avgOutCount) : 0

    const format = (min: number) =>
      `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

    return {
      presentismo,
      ingresos,
      egresos,
      llegadesTarde,
      salidasTarde,
      ausentes,
      totalEmployees,
      uniqueDays,
      avgCheckIn: format(avgInMin),
      avgCheckOut: format(avgOutMin),
      employeeLogs,
      periodLogs,
    }
  }, [logs, persons, statsDays])

  const previousStats = useMemo(() => {
    const now = new Date()
    const prevStart = new Date(now.getTime() - statsDays * 2 * 86400000)
    const prevEnd = new Date(now.getTime() - statsDays * 86400000)

    const prevLogs = logs.filter(l => {
      const d = new Date(l.date)
      return d >= prevStart && d < prevEnd
    })

    const emp = prevLogs.filter(l => l.person_type === 'employee')
    const uniqueDays = new Set(prevLogs.map(l => l.date)).size
    const totalEmployees = persons.filter(p => p.type === 'employee').length

    const expected = totalEmployees * uniqueDays
    const actual = emp.filter(l => l.check_in).length

    return {
      presentismo: expected ? Math.round((actual / expected) * 100) : 0,
      llegadesTarde: emp.filter(l => l.check_in && Number(l.check_in.split(':')[0]) >= 9).length,
    }
  }, [logs, persons, statsDays])

  const { metrics, summaries } = useStatsCard(stats, previousStats)

  const personsNoMovement = useMemo(() => {
    const limit = new Date(Date.now() - 14 * 86400000)

    return persons.filter(p => {
      const personLogs = logs.filter(l => String(l.person_id) === String(p.id))
      if (!personLogs.length) return true
      const last = new Date(Math.max(...personLogs.map(l => +new Date(l.date))))
      return last < limit
    }).length
  }, [logs, persons])

  const renderStats = () => (
    <StatsContainer>
      <HistoryFilters persons={persons} />

      <StatsGrid>
        {metrics.map((m: any) => (
          <StatCardComponent key={m.id} {...m} icon={<m.icon size={18} />} />
        ))}
      </StatsGrid>

      <SummaryRow>
        {summaries.map((s, i) => (
          <SummaryCardComponent key={i} {...s} icon={<s.icon size={20} />} />
        ))}
      </SummaryRow>

      <SummaryRow>
        <SummaryCardComponent color="var(--success)" value={stats.totalEmployees} label="Empleados activos" icon={<Icons.documetnHiOut size={20} />} />
        <SummaryCardComponent color="var(--error)" value={personsNoMovement} label="Sin movimiento (14 días)" icon={<Icons.documetnHiOut size={20} />} />
        <SummaryCardComponent color="var(--contractor)" value={stats.uniqueDays} label="Días con movimiento" icon={<Icons.documetnHiOut size={20} />} />
      </SummaryRow>

      <StatsCharts stats={stats} logsData={{ logs, categories }} />
    </StatsContainer>
  )

  return (
    <Container>
      <Header>
        <Title>Historial</Title>

        <FilterRow>
          <HiOutlineCalendar size={16} style={{ color: 'var(--primary)', marginRight: 4 }} />

          <DateSeparator>-</DateSeparator>
          <DateLabel>Desde:</DateLabel>

          <DateButton
            onClick={() => {
              const input = document.getElementById('date-from-input') as HTMLInputElement
              input?.showPicker()
            }}
          >
            {dateFrom ? formatDateForDisplay(dateFrom) : 'dd/mm/yyyy'}
          </DateButton>

          <input id="date-from-input" type="date" value={dateFrom} onChange={e => setDateFrom(e.target.value)} hidden />

          <DateSeparator>-</DateSeparator>
          <DateLabel>Hasta:</DateLabel>

          <DateButton
            onClick={() => {
              const input = document.getElementById('date-to-input') as HTMLInputElement
              input?.showPicker()
            }}
          >
            {dateTo ? formatDateForDisplay(dateTo) : 'dd/mm/yyyy'}
          </DateButton>

          <input id="date-to-input" type="date" value={dateTo} onChange={e => setDateTo(e.target.value)} hidden />

           <ClearButton onClick={() => { setDateFrom(''); setDateTo('') }}>
             Limpiar
           </ClearButton>
        </FilterRow>
      </Header>

      <Tabs>
        <Tab $active={tab === 'all'} onClick={() => setTab('all')}>Todos</Tab>
        <Tab $active={tab === 'in'} onClick={() => setTab('in')}>Ingresos</Tab>
        <Tab $active={tab === 'out'} onClick={() => setTab('out')}>Egresos</Tab>
        <Tab $active={tab === 'stats'} onClick={() => setTab('stats')}>Estadísticas</Tab>
        <Tab $active={tab === 'compare'} onClick={() => setTab('compare')}>Comparar</Tab>
      </Tabs>

      {tab === 'stats'
        ? renderStats()
        : tab === 'compare'
        ? <CompareTableComponent persons={persons} logs={logs} />
        : groupedByDate.length
        ? groupedByDate.map(([date, items]) => (
            <DateSection key={date}>
              <DateHeader>{formatDate(date)}</DateHeader>

              {items.map(log => (
                <PersonRow key={log.id}>
                  <PersonName>
                    {log.last_name} {log.first_name}
                    <Category>{categories.find(c => c.id === log.person_type)?.name || log.person_type}</Category>
                  </PersonName>

                  <TimeRow>
                    {tab !== 'out' && (
                      <TimeItem $hasValue={!!log.check_in}>
                        {log.check_in || '-'}h
                      </TimeItem>
                    )}
                    {tab !== 'in' && (
                      <TimeItem $hasValue={!!log.check_out}>
                        {log.check_out || '-'}h
                      </TimeItem>
                    )}
                  </TimeRow>
                </PersonRow>
              ))}
            </DateSection>
          ))
        : (
          <EmptyState>
            <EmptyIcon><Icons.documetnHiOut size={64} /></EmptyIcon>
            <p>No hay registros aún</p>
          </EmptyState>
        )}
    </Container>
  )
}