import styled from 'styled-components';

export const StatsFilters = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

export const FilterSelect = styled.select`
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

export const FilterInput = styled.input`
  padding: 10px 16px;
  border: 1px solid #E5E5EA;
  border-radius: 12px;
  font-size: 14px;
  background: white;
  &:focus {
    outline: none;
    border-color: #007AFF;
  }
`;