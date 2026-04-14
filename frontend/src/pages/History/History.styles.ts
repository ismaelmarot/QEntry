import styled from 'styled-components'

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`

export const Header = styled.div`
    margin-bottom: 24px;
`

export const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #1C1C1E;

    @media (min-width: 768px) {
        font-size: 34px;
    }
`

export const Tabs = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    flex-wrap: wrap;
`

export const Tab = styled.button<{ $active: boolean }>`
    padding: 10px 20px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    background: ${(p) => (p.$active ? '#007AFF' : '#F2F2F7')};
    color: ${(p) => (p.$active ? 'white' : '#1C1C1E')};

    &:hover {
        background: ${(p) => (p.$active ? '#007AFF' : '#E5E5EA')};
    }
`

export const DateSection = styled.div`
    margin-bottom: 16px;
`

export const DateHeader = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #8E8E93;
    padding: 8px 12px;
    background: #F2F2F7;
    border-radius: 8px;
    margin-bottom: 8px;
`

export const PersonRow = styled.div`
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`

export const PersonName = styled.div`
    font-size: 16px;
    font-weight: 600;
    color: #1C1C1E;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
`

export const Category = styled.span`
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 12px;
    background: #F2F2F7;
    color: #8E8E93;
`

export const TimeRow = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 24px;
    font-size: 14px;
`

export const TimeItem = styled.span<{ $hasValue: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${(p) => (p.$hasValue ? '#1C1C1E' : '#C7C7CC')};
`

export const TimeLabel = styled.span`
    color: #8E8E93;
    min-width: 60px;
`

export const EmptyState = styled.div`
    text-align: center;
    padding: 60px 20px;
    color: #8E8E93;
`

export const EmptyIcon = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 16px;
    color: #C7C7CC;
`

export const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const StatsFilters = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 16px;
`

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
`

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
`

export const StatCard = styled.div<{ $color?: string }>`
    background: white;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    border-left: 4px solid ${(p) => p.$color || '#007AFF'};
    display: flex;
    flex-direction: column;
    gap: 8px;
`

export const StatHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`

export const StatIcon = styled.div<{ $color?: string }>`
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: ${(p) => p.$color || '#007AFF'}15;
    color: ${(p) => p.$color || '#007AFF'};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const StatLabel = styled.div`
    font-size: 12px;
    color: #8E8E93;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    flex: 1;
`

export const StatValue = styled.div`
    font-size: 28px;
    font-weight: 700;
    color: #1C1C1E;
`

export const StatSubtext = styled.div`
    font-size: 11px;
    color: #8E8E93;
    margin-top: 4px;
`

export const TrendBadge = styled.span<{ $positive?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    font-weight: 600;
    color: ${(p) => p.$positive ? '#34C759' : '#FF3B30'};
    background: ${(p) => p.$positive ? '#E8F5E9' : '#FFEBEE'};
    padding: 4px 8px;
    border-radius: 8px;
`

export const ChartCard = styled.div`
    background: white;
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`

export const ChartTitle = styled.h3`
    font-size: 16px;
    font-weight: 600;
    color: #1C1C1E;
    margin: 0 0 16px 0;
`

export const ChartContainer = styled.div`
    width: 100%;
    height: 250px;
`

export const ChartsRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    
    @media (max-width: 600px) {
        grid-template-columns: 1fr;
    }
`

export const HourDistributionRow = styled.div`
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    justify-content: center;
`

export const HourChip = styled.div<{ $highlight?: boolean }>`
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
    background: ${(p) => p.$highlight ? '#007AFF' : '#F2F2F7'};
    color: ${(p) => p.$highlight ? 'white' : '#1C1C1E'};
`

export const SummaryRow = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    
    @media (max-width: 500px) {
        grid-template-columns: 1fr;
    }
`

export const SummaryCard = styled.div`
    background: white;
    border-radius: 16px;
    padding: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
`

export const SummaryIcon = styled.div<{ $color?: string }>`
    width: 36px;
    height: 36px;
    border-radius: 12px;
    background: ${(p) => p.$color || '#007AFF'}15;
    color: ${(p) => p.$color || '#007AFF'};
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SummaryValue = styled.div`
    font-size: 24px;
    font-weight: 700;
    color: #1C1C1E;
`

export const SummaryLabel = styled.div`
    font-size: 12px;
    color: #8E8E93;
    margin-top: 4px;
`

export const CompareContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

export const CompareSelector = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const CompareLabel = styled.label`
    font-size: 14px;
    font-weight: 600;
    color: #1C1C1E;
`

export const MultiSelect = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`

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
`

export const CompareTable = styled.div`
    display: grid;
    gap: 12px;
`

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
`

export const CompareCell = styled.div<{ $highlight?: boolean; $color?: string }>`
    text-align: center;
    font-weight: ${(p) => p.$highlight ? '600' : '400'};
    color: ${(p) => p.$color || '#1C1C1E'};
`