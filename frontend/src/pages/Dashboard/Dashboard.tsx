import { useNavigate } from 'react-router-dom'
import { HiOutlineQrcode, HiOutlineUserAdd, HiOutlineClipboardList } from 'react-icons/hi'
import { RecentLog } from '@/interface'
import { useDashboard } from './useDashboard'
import {
  ButtonLabel,
  Container,
  DurationBadge,
  EmptyMessage,
  EntriesList,
  EntryButton,
  EntryButtons,
  EntryDetail,
  EntryInfo,
  EntryItem,
  EntryName,
  EntrySection,
  EntryTime,
  EntryTitle,
  EntryType,
  FilterTab,
  FilterTabs,
  IconWrapper,
  ManualButton,
  QuickActions,
  RecentEntriesSection,
  SecondaryButton,
  SectionTitle,
  StatCard,
  StatLabel,
  StatsGrid,
  StatValue,
  Title
} from './Dashboard.styles'

export function Dashboard() {
  const navigate = useNavigate()

  const {
    stats,
    recentLogs,
    filter,
    setFilter,
    formatTime,
    formatDate,
    calculateDuration
  } = useDashboard()

  const renderLogDetails = (log: RecentLog) => {
    const entryTime = log.check_in
      ? `${log.date}T${log.check_in}:00`
      : log.timestamp

    const exitTime = log.check_out
      ? `${log.date}T${log.check_out}:00`
      : undefined

    if (filter === 'inside') {
      return (
        <EntryTime>
          Ingreso: {formatDate(entryTime)} {formatTime(entryTime)}
        </EntryTime>
      )
    }

    if (filter === 'exits') {
      const time = exitTime || log.timestamp
      return (
        <EntryTime>
          Egreso: {formatDate(time)} {formatTime(time)}
        </EntryTime>
      )
    }

    const duration = calculateDuration(entryTime, exitTime)

    return (
      <>
        <EntryDetail>
          <span>Ingreso: {formatTime(entryTime)}</span>
          {exitTime && <span>Salida: {formatTime(exitTime)}</span>}
        </EntryDetail>
        {duration && <DurationBadge>{duration}</DurationBadge>}
      </>
    )
  }

  return (
    <Container>
      <Title>Dashboard</Title>

      {/* Stats */}
      <StatsGrid>
        <StatCard>
          <StatValue>{stats.inside}</StatValue>
          <StatLabel>Ingresados</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.completed}</StatValue>
          <StatLabel>Egresados</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{stats.todayEntries}</StatValue>
          <StatLabel>Ingresados Hoy</StatLabel>
        </StatCard>
      </StatsGrid>

      {/* Entry Section */}
      <EntrySection>
        <EntryTitle>Ingreso / Egreso</EntryTitle>

        <EntryButtons>
          <EntryButton onClick={() => navigate('/scanner')}>
            <IconWrapper>
              <HiOutlineQrcode size={32} />
            </IconWrapper>
            <ButtonLabel>Escanear QR</ButtonLabel>
          </EntryButton>

          <ManualButton onClick={() => navigate('/manual')}>
            <IconWrapper>
              <HiOutlineClipboardList size={32} />
            </IconWrapper>
            <ButtonLabel>Carga Manual</ButtonLabel>
          </ManualButton>
        </EntryButtons>
      </EntrySection>

      {/* Quick actions */}
      <SectionTitle>Acciones rápidas</SectionTitle>

      <QuickActions>
        <SecondaryButton onClick={() => navigate('/persons')}>
          <IconWrapper>
            <HiOutlineUserAdd size={22} />
          </IconWrapper>
          Nueva persona
        </SecondaryButton>
      </QuickActions>

      {/* Logs */}
      <RecentEntriesSection>
        <SectionTitle>Registros</SectionTitle>

        <FilterTabs>
          <FilterTab
            $active={filter === 'inside'}
            onClick={() => setFilter('inside')}
          >
            Ingresados
          </FilterTab>

          <FilterTab
            $active={filter === 'exits'}
            onClick={() => setFilter('exits')}
          >
            Egresados
          </FilterTab>

          <FilterTab
            $active={filter === 'entries'}
            onClick={() => setFilter('entries')}
          >
            Ingresados Hoy
          </FilterTab>
        </FilterTabs>

        {recentLogs.length === 0 ? (
          <EmptyMessage>No hay registros</EmptyMessage>
        ) : (
          <EntriesList>
            {recentLogs.map((log) => (
              <EntryItem key={log.id}>
                <EntryInfo>
                  <EntryName>
                    {log.person?.name} {log.person?.lastname}
                  </EntryName>
                  {renderLogDetails(log)}
                </EntryInfo>

                <EntryType $type={log.type}>
                  {log.type === 'entry' ? 'Entrada' : 'Salida'}
                </EntryType>
              </EntryItem>
            ))}
          </EntriesList>
        )}
      </RecentEntriesSection>
    </Container>
  )
}