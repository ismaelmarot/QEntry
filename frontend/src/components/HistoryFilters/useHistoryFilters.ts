import { useState } from 'react';

export function useHistoryFilters() {
  const [statsPersonId, setStatsPersonId] = useState<string>('all');
  const [statsDays, setStatsDays] = useState<number>(30);

  return {
    statsPersonId,
    setStatsPersonId,
    statsDays,
    setStatsDays,
  };
}