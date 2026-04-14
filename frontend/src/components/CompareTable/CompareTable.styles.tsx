import styled from 'styled-components';

export const CompareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CompareSelector = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CompareLabel = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #1C1C1E;
`;

export const MultiSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const PersonChip = styled.button<{ $selected?: boolean }>`
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${(p) => p.$selected ? '#007AFF' : '#E5E5EA'};
  background: ${(p) => p.$selected ? '#007AFF' : 'white'};
  color: ${(p) => p.$selected ? 'white' : '#1C1C1E'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    border-color: #007AFF;
  }
`;

export const CompareTable = styled.div`
  display: grid;
  gap: 12px;
`;

export const CompareRow = styled.div<{ $header?: boolean }>`
  display: grid;
  grid-template-columns: 2fr repeat(7, 1fr);
  gap: 8px;
  padding: 12px 16px;
  background: ${(p) => p.$header ? '#F2F2F7' : 'white'};
  border-radius: 12px;
  font-size: 14px;
  font-weight: ${(p) => p.$header ? '600' : '400'};
  color: ${(p) => p.$header ? '#8E8E93' : '#1C1C1E'};
  align-items: center;
`;

export const CompareCell = styled.div<{ $highlight?: boolean; $color?: string }>`
  text-align: center;
  font-weight: ${(p) => p.$highlight ? '600' : '400'};
  color: ${(p) => p.$color || '#1C1C1E'};
`;