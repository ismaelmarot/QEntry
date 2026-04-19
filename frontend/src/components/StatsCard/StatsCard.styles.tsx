import styled from 'styled-components';

export const StatCard = styled.div<{ $color?: string }>`
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border-left: 4px solid ${(p) => p.$color || 'var(--primary)'};
  border: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StatIcon = styled.div<{ $color?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: ${(p) => p.$color || 'var(--primary)'}15;
  color: ${(p) => p.$color || 'var(--primary)'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StatLabel = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
`;

export const StatSubtext = styled.div`
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 4px;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 12px;
`;

export const SummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div`
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid var(--border-color);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const SummaryIcon = styled.div<{ $color?: string }>`
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: ${(p) => p.$color || 'var(--primary)'}15;
  color: ${(p) => p.$color || 'var(--primary)'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SummaryValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
`;

export const SummaryLabel = styled.div`
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
`;