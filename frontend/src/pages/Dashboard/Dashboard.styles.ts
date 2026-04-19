import styled from 'styled-components'

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
`

export const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 24px;
    color: var(--text-primary);

    @media (min-width: 768px) {
        font-size: 34px;
    }
`

export const StatsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 32px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
        gap: 10px;
    }
`

export const StatCard = styled.div`
    background: var(--bg-primary);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    text-align: center;
    border: 1px solid var(--border-color);
`

export const StatValue = styled.div`
    font-size: 40px;
    font-weight: 700;
    color: #007AFF;
    line-height: 1;

    @media (min-width: 768px) {
        font-size: 48px;
    }
`

export const StatLabel = styled.div`
    font-size: 13px;
    color: var(--text-secondary);
    margin-top: 8px;
    font-weight: 500;
`

export const SectionTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text-primary);
`

export const QuickActions = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`

export const ActionButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 18px 24px;
    background: #007AFF;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border-radius: 34px;
    transition: transform 0.2s, opacity 0.2s;
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
    border: none;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        opacity: 0.95;
    }

    &:active {
        transform: translateY(0);
    }

    @media (min-width: 768px) {
        padding: 20px 32px;
        font-size: 17px;
    }
`

export const SecondaryButton = styled(ActionButton)`
    background: #34C759;
    box-shadow: 0 4px 12px rgba(52, 199, 89, 0.3);

    &:hover {
        box-shadow: 0 6px 16px rgba(52, 199, 89, 0.4);
    }
`

export const IconWrapper = styled.span`
    display: flex;
    align-items: center;
`

export const EntrySection = styled.div`
    background: var(--bg-primary);
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    border: 1px solid var(--border-color);
`

export const EntryTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
    color: var(--text-primary);
    text-align: center;
`

export const EntryButtons = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`

export const EntryButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 28px 20px;
    background: #007AFF;
    color: white;
    font-size: 16px;
    font-weight: 600;
    border-radius: 20px;
    transition: transform 0.2s, opacity 0.2s;
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
    border: none;
    cursor: pointer;

    &:hover {
        transform: translateY(-2px);
        opacity: 0.95;
    }

    &:active {
        transform: translateY(0);
    }
`

export const ManualButton = styled(EntryButton)`
    background: #FF9500;
    box-shadow: 0 4px 12px rgba(255, 149, 0, 0.3);

    &:hover {
        box-shadow: 0 6px 16px rgba(255, 149, 0, 0.4);
    }
`

export const ButtonLabel = styled.span`
    font-size: 15px;
`

export const RecentEntriesSection = styled.div`
    margin-top: 32px;
    background: var(--bg-primary);
    border-radius: 16px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    border: 1px solid var(--border-color);
`

export const EntriesList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`

export const EntryItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: var(--bg-surface);
    border-radius: 12px;
    border: 1px solid var(--border-color);
`

export const EntryInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

export const EntryName = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
`

export const EntryTime = styled.span`
    font-size: 13px;
    color: var(--text-secondary);
`

export const EntryDetail = styled.div`
    display: flex;
    gap: 12px;
    font-size: 12px;
    color: var(--text-secondary);
    margin-top: 4px;
`

export const DurationBadge = styled.span`
    background: #007AFF;
    color: white;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
`

export const EntryType = styled.span<{ $type: string }>`
    font-size: 13px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 35px;
    background: ${props => props.$type === 'entry' ? '#34C759' : '#FF3B30'};
    color: white;
`

export const EmptyMessage = styled.p`
    text-align: center;
    color: var(--text-secondary);
    font-size: 14px;
    padding: 20px;
`

export const FilterTabs = styled.div`
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    background: var(--bg-surface);
    padding: 4px;
    border-radius: 35px;
    border: 1px solid var(--border-color);
`

export const FilterTab = styled.button<{ $active: boolean }>`
    flex: 1;
    padding: 10px 12px;
    font-size: 13px;
    font-weight: 600;
    border-radius: 35px;
    background: ${(p) => p.$active ? 'var(--bg-primary)' : 'transparent'};
    color: ${(p) => p.$active ? '#007AFF' : 'var(--text-secondary)'};
    border: 1px solid var(--border-color);
    cursor: pointer;
    box-shadow: ${(p) => p.$active ? '0 1px 4px rgba(0,0,0,0.1)' : 'none'};
`