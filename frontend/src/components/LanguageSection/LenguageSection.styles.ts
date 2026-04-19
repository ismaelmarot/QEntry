import styled from 'styled-components'
import { theme } from '@/styles/theme'

export const Section = styled.section`
    background: var(--bg-primary);
    border-radius: ${theme.radius.lg};
    padding: ${theme.spacing.md};
    margin-bottom: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    border: 1px solid var(--border-color);
`

export const SectionTitle = styled.h2`
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${theme.spacing.md};
`

export const SettingRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid var(--border-color);

    &:last-child {
        border-bottom: none;
    }
`

export const SettingLabel = styled.span`
    font-size: 16px;
    color: var(--text-primary);
`

export const Select = styled.select`
    padding: 10px 16px;
    border: 1px solid var(--border-color);
    border-radius: 35px;
    font-size: 16px;
    background: var(--bg-primary);
    color: var(--text-primary);
    cursor: pointer;

    &:focus {
        border-color: #007AFF;
        outline: none;
    }
`