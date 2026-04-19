import styled from 'styled-components'
import { flex, size } from '@/mixins'

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`

export const Header = styled.header`
    ${flex('row', 'center', 'space-between')};
    padding: 16px 20px;
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border-color);
    position: sticky;
    top: 0;
    z-index: 100;

    @media (min-width: 768px) {
        display: none;
    }
`

export const Logo = styled.h1`
    font-size: 20px;
    font-weight: 700;
    color: #007AFF;
`

export const MenuButton = styled.button`
    ${flex('row', 'center', 'center')};
    ${size('36px', '36px')};
    border-radius: 8px;
    color: var(--text-primary);
    background: var(--bg-surface);
`

export const Overlay = styled.div<{ $open: boolean }>`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: ${(p) => (p.$open ? 1 : 0)};
    visibility: ${(p) => (p.$open ? 'visible' : 'hidden')};
    transition: opacity 0.3s;
    z-index: 150;

    @media (min-width: 768px) {
        display: none;
    }
`

export const Sidebar = styled.aside<{ $open: boolean }>`
    ${size('260px', '100vh')};
    position: fixed;
    top: 0;
    left: 0;
    background: var(--bg-primary);
    padding: 24px 16px;
    transform: translateX(${(p) => (p.$open ? '0' : '-100%')});
    transition: transform 0.3s ease;
    z-index: 200;
    display: flex;
    flex-direction: column;

    @media (min-width: 768px) {
        ${size('260px', '100vh')};
        position: sticky;
        transform: none;
        border-right: 1px solid var(--border-color);
    }
`

export const SidebarLogo = styled.h1`
    font-size: 28px;
    font-weight: 700;
    color: #007AFF;
    padding: 0 12px 32px;
`

export const Nav = styled.nav`
    display: flex;
    flex-direction: column;
    gap: 4px;
    flex: 1;
`

export const NavGroup = styled.div`
    margin-bottom: 8px;
`

export const NavGroupTitle = styled.div`
    font-size: 12px;
    font-weight: 600;
    color: #8E8E93;
    text-transform: uppercase;
    padding: 12px 16px 8px;
    letter-spacing: 0.5px;
`

export const NavItem = styled.button<{ $active: boolean; $subItem?: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: ${(p) => (p.$subItem ? '12px 16px 12px 48px' : '14px 16px')};
    border-radius: 34px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    background: ${(p) => (p.$active ? '#007AFF' : 'transparent')};
    color: ${(p) => (p.$active ? 'white' : 'var(--text-primary)')};
    transition: all 0.2s;

    &:hover {
        background: ${(p) => (p.$active ? '#007AFF' : 'var(--bg-surface)')};
        border-radius: 34px;
    }
`

export const NavIcon = styled.span`
    display: flex;
    align-items: center;
    font-size: 20px;
`

export const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    color: #FF3B30;
    font-size: 16px;
    font-weight: 500;
    background: transparent;
    text-align: left;
    border-radius: 12px;
    margin-top: 8px;

    &:hover {
        background: #FFF0F0;
    }
`

export const Content = styled.main`
    flex: 1;
    padding: 24px 16px;
    background: var(--bg-surface);
    min-height: calc(100vh - 69px);

    @media (min-width: 768px) {
        padding: 32px;
        min-height: 100vh;
    }
`