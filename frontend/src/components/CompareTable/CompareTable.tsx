import { useCompareTable } from './useCompareTable';
import { 
  CompareContainer, 
  CompareSelector, 
  CompareLabel, 
  MultiSelect, 
  PersonChip, 
  CompareTable as CompareTableBase, 
  CompareRow, 
  CompareCell 
} from './CompareTable.styles';
import { HiOutlineUserGroup } from 'react-icons/hi';
import styled from 'styled-components';

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

interface CompareTableProps {
  persons: any[];
  logs: any[];
}

export function CompareTableComponent({ persons, logs }: CompareTableProps) {
  const { selectedPersons, togglePerson, compareStats, employees } = useCompareTable(persons, logs);

  return (
    <CompareContainer>
      <CompareSelector>
        <CompareLabel>Seleccionar empleados a comparar:</CompareLabel>
        <MultiSelect>
          {employees.map(person => (
            <PersonChip
              key={person.id}
              $selected={selectedPersons.includes(String(person.id))}
              onClick={() => togglePerson(String(person.id))}
            >
              {person.last_name} {person.first_name}
            </PersonChip>
          ))}
        </MultiSelect>
      </CompareSelector>

      {selectedPersons.length > 0 && (
        <CompareTableBase>
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
          {compareStats.map(stat => (
            <CompareRow key={stat.id}>
              <CompareCell $highlight>{stat.name}</CompareCell>
              <CompareCell>{stat.total}</CompareCell>
              <CompareCell>{stat.ingresos}</CompareCell>
              <CompareCell>{stat.egresos}</CompareCell>
              <CompareCell style={{ color: stat.llegadesTarde > 0 ? '#FF9500' : '#1C1C1E' }}>
                {stat.llegadesTarde}
              </CompareCell>
              <CompareCell 
                $color={stat.latePercent > 20 ? '#FF3B30' : stat.latePercent > 10 ? '#FF9500' : '#34C759'}
              >
                {stat.latePercent}%
              </CompareCell>
              <CompareCell>{stat.totalHours}h</CompareCell>
              <CompareCell 
                $color={stat.avgHoursPerDay >= 8 ? '#34C759' : stat.avgHoursPerDay >= 6 ? '#FF9500' : '#FF3B30'}
              >
                {stat.avgHoursPerDay}h
              </CompareCell>
            </CompareRow>
          ))}
        </CompareTableBase>
      )}

      {selectedPersons.length === 0 && (
        <EmptyState>
          <EmptyIcon><HiOutlineUserGroup size={64} /></EmptyIcon>
          <p>Selecciona empleados para comparar sus métricas</p>
        </EmptyState>
      )}
    </CompareContainer>
  );
}

export {
  CompareContainer,
  CompareSelector,
  CompareLabel,
  MultiSelect,
  PersonChip,
  CompareTableBase as CompareTable,
  CompareRow,
  CompareCell,
};