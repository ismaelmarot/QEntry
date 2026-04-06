import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { COLORS } from '@/constants'
import { flex, size } from '@/mixins'

export const Section = styled.section`
    background: ${theme.colors.background};
    border-radius: ${theme.radius.lg};
    padding: ${theme.spacing.md};
    margin-bottom: 16px;
    box-shadow: 0 1px 3px ${COLORS.shadow};
`

export const SectionTitle = styled.h2`
    font-size: 13px;
    font-weight: 600;
    color: ${COLORS.textSecondary};
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
    background: ${COLORS.surface};
    border-radius: 35px;
`

export const CategoryName = styled.span`
    font-size: 16px;
    font-weight: 500;
    color: ${COLORS.text};
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

export const AddButton = styled.button`
    ${flex('row','center','center')}
    gap: ${theme.spacing.sm};
    width: 100%;
    padding: 14px;
    border: 1px dashed ${COLORS.textSecondary};
    border-radius: 35px;
    background: transparent;
    color: ${COLORS.primary};
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${COLORS.surface};
        border-color: ${COLORS.primary};
    }
`

export const Input = styled.input`
    padding: 12px 16px;
    border: 1px solid ${COLORS.border};
    border-radius: ${theme.radius.md};
    font-size: 16px;
    width: 100%;

    &:focus {
        border-color: ${COLORS.primary};
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
    color: ${(p) => (p.$danger ? 'white' : COLORS.text)};
    background: ${(p) => (p.$danger ? COLORS.error : COLORS.surface)};
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