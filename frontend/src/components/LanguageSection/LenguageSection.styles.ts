import styled from 'styled-components'
import { theme } from '@/styles/theme'

export const Section = styled.section`
    background: ${theme.colors.background};
    border-radius: ${theme.radius.lg};
    padding: ${theme.spacing.md};
    margin-bottom: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`

export const SectionTitle = styled.h2`
    font-size: 13px;
    font-weight: 600;
    color: ${theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: ${theme.spacing.md};
`

export const SettingRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;
    border-bottom: 1px solid ${theme.colors.surface};

    &:last-child {
        border-bottom: none;
    }
`

export const SettingLabel = styled.span`
    font-size: 16px;
    color: ${theme.colors.text};
`

export const Select = styled.select`
    padding: 10px 16px;
    border: 1px solid ${theme.colors.border};
    border-radius: 35px;
    font-size: 16px;
    background: ${theme.colors.background};
    color: ${theme.colors.text};
    cursor: pointer;

    &:focus {
        border-color: ${theme.colors.primary};
        outline: none;
    }
`