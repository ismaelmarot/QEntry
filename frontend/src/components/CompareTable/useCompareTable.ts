import { useState } from 'react';

export function useCompareTable(persons: any[], logs: any[]) {
  const [selectedPersons, setSelectedPersons] = useState<string[]>([]);

  const togglePerson = (personId: string) => {
    setSelectedPersons(prev => 
      prev.includes(personId) 
        ? prev.filter(p => p !== personId) 
        : [...prev, personId]
    );
  };

  const compareStats = selectedPersons.map(personId => {
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

  return {
    selectedPersons,
    togglePerson,
    compareStats,
    employees: persons.filter(p => p.type === 'employee'),
  };
}