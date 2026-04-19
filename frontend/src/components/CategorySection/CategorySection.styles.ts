import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { flex, size } from '@/mixins'

export const Section = styled.section`
    background: var(--bg-primary);
    border-radius: ${theme.radius.lg};
    padding: ${theme.spacing.md};
    margin-bottom: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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


export const CategoryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing.sm};
`

export const CategoryItem = styled.div`
    ${flex('row','center','space-between')}
    padding: 12px 16px;
    background: var(--bg-surface);
    border-radius: 35px;
    border: 1px solid var(--border-color);
`

export const CategoryName = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
`

export const CategoryColor = styled.span<{ $color: string }>`
    ${size(12,12)}
    margin-right: 10px;
    border-radius: 50%;
    background: ${(p) => p.$color};
`

export const CategoryInfo = styled.div`
    display: flex;
    align-items: center;
`

export const DeleteButton = styled.button`
    background: var(--bg-surface);
    border: none;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-secondary);
    transition: all 0.2s;

    &:hover {
        background: var(--border-color);
        color: #FF3B30;
    }
`

export const AddButton = styled.button`
    ${flex('row','center','center')}
    gap: ${theme.spacing.sm};
    width: 100%;
    padding: 14px;
    border: 1px dashed var(--text-secondary);
    border-radius: 35px;
    background: transparent;
    color: #007AFF;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: var(--bg-surface);
        border-color: #007AFF;
    }
`

export const Input = styled.input`
    padding: 12px 16px;
    border: 1px solid var(--border-color);
    border-radius: ${theme.radius.md};
    font-size: 16px;
    width: 100%;
    background: var(--bg-primary);
    color: var(--text-primary);

    &:focus {
        border-color: #007AFF;
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
    border-radius: 34px;
    border: none;
    color: ${(p) => (p.$danger ? 'white' : 'var(--text-primary)')};
    background: ${(p) => (p.$danger ? '#FF3B30' : 'var(--bg-surface)')};
    cursor: pointer;
    transition: all 0.2s;

    &:active {
        transform: scale(0.98);
    }
`

export const ColorPicker = styled.input.attrs({ type: 'color' })`
    ${size(25,25)}
    margin-left: 5px !important;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;

    appearance: none;
    -webkit-appearance: none;

    &::-webkit-color-swatch {
        border: none;
        border-radius: 50%;
    }

    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }
`