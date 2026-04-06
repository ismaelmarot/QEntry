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


export const CategoryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
`

export const CategoryItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    background: ${theme.colors.surface};
    border-radius: 35px;
`

export const CategoryName = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: ${theme.colors.text};
`

export const CategoryColor = styled.span<{ $color: string }>`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${(p) => p.$color};
    margin-right: 10px;
`

export const CategoryInfo = styled.div`
    display: flex;
    align-items: center;
`

export const AddButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.sm};
    width: 100%;
    padding: 14px;
    border: 1px dashed ${theme.colors.border};
    border-radius: 35px;
    background: transparent;
    color: ${theme.colors.primary};
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${theme.colors.surface};
        border-color: ${theme.colors.primary};
    }
`

export const Input = styled.input`
    padding: 12px 16px;
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.radius.md};
    font-size: 16px;
    width: 100%;

    &:focus {
        border-color: ${theme.colors.primary};
        outline: none;
    }
`

export const PopupButtons = styled.div`
    display: flex;
    gap: ${theme.spacing.md};
    margin-top: ${theme.spacing.lg};
`

export const PopupButton = styled.button<{ $danger?: boolean }>`
    flex: 1;
    padding: 14px;
    font-size: 17px;
    font-weight: 600;
    border-radius: ${theme.radius.md};
    border: none;
    background: ${(p) => (p.$danger ? theme.colors.error : theme.colors.surface)};
    color: ${(p) => (p.$danger ? 'white' : theme.colors.text)};
    cursor: pointer;
    transition: all 0.2s;

    &:active {
        transform: scale(0.98);
    }
`