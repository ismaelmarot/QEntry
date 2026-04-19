import styled from 'styled-components'
import { theme } from '@/styles/theme'

export const Popup = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    padding: 20px;
`

export const PopupContent = styled.div`
    background: var(--bg-primary);
    border-radius: ${theme.radius.lg};
    padding: ${theme.spacing.lg};
    width: 100%;
    max-width: 340px;
    animation: slideUp 0.3s ease;
    border: 1px solid var(--border-color);

    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`

export const PopupTitle = styled.div`
    font-size: 17px;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: ${theme.spacing.md};
`

export const PopupText = styled.p`
    font-size: 14px;
    color: var(--text-secondary);
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
    background: ${(p) => (p.$danger ? '#FF3B30' : 'var(--bg-surface)')};
    color: ${(p) => (p.$danger ? 'white' : 'var(--text-primary)')};
    cursor: pointer;
    transition: all 0.2s;

    &:active {
        transform: scale(0.98);
    }
`