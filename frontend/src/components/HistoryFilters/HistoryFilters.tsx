import { useHistoryFilters } from './useHistoryFilters';
import { StatsFilters, FilterSelect, FilterInput } from './HistoryFilters.styles';

interface HistoryFiltersProps {
  persons: any[];
}

export function HistoryFilters({ persons }: HistoryFiltersProps) {
  const { statsPersonId, setStatsPersonId, statsDays, setStatsDays } = useHistoryFilters();

  return (
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
  );
}

export { StatsFilters, FilterSelect, FilterInput, useHistoryFilters };