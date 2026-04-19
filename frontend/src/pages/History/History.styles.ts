import { flex } from '@/mixins'
import styled from 'styled-components'

export const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
`

export const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 24px;

    @media (min-width: 600px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }
`

export const Title = styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #1C1C1E;
    margin: 0;
    text-align: left;

    @media (min-width: 768px) {
        font-size: 34px;
    }
`

export const FilterRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    flex-wrap: wrap;

    @media (min-width: 600px) {
        width: auto;
    }
`

export const BackButton = styled.button`
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #F2F2F7;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #007AFF;
    transition: all 0.2s;
    border: none;
    cursor: pointer;

    &:hover { 
        background: #E5E5EA; 
        transform: scale(1.02); 
    }
    &:active { 
        transform: scale(0.98); 
    }
`

export const DateFilterWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    width: 100%;
`

export const DateFilterButton = styled.button`
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    background: #FF3B30;
    border: none;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    color: white;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;

    &:hover {
        background: #D63333;
    }

    &:active {
        transform: scale(0.96);
    }
`

export const DateLabel = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: #1C1C1E;
`

export const DateSeparator = styled.span`
    font-size: 12px;
    font-weight: 600;
    color: #8E8E93;
`

export const DateButton = styled.button`
    padding: 6px 8px;
    background: #F2F2F7;
    border: none;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 500;
    color: #1C1C1E;
    cursor: pointer;
    transition: all 0.2s;
    min-width: 75px;
    text-align: center;

    &:hover {
        background: #E5E5EA;
    }

    &:active {
        transform: scale(0.96);
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
    ${flex('row', 'center','space-between')}
    font-size: 16px;
    font-weight: 600;
    color: #1C1C1E;
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