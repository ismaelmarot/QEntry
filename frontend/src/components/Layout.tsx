import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineHome, HiOutlineUserGroup, HiOutlineQrcode, HiOutlineClipboardList, HiOutlineMenu, HiOutlineLogout, HiOutlineSwitchHorizontal, HiOutlineCog } from 'react-icons/hi';

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E5EA;
  position: sticky;
  top: 0;
  z-index: 100;

  @media (min-width: 768px) {
    display: none;
  }
`;

const Logo = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #007AFF;
`;

const MenuButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: #F2F2F7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1C1C1E;
`;

const Overlay = styled.div<{ $open: boolean }>`
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
`;

const Sidebar = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 260px;
  height: 100vh;
  background: #FFFFFF;
  padding: 24px 16px;
  transform: translateX(${(p) => (p.$open ? '0' : '-100%')});
  transition: transform 0.3s ease;
  z-index: 200;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    position: sticky;
    width: 260px;
    height: 100vh;
    transform: none;
    border-right: 1px solid #E5E5EA;
  }
`;

const SidebarLogo = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #007AFF;
  padding: 0 12px 32px;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const NavGroup = styled.div`
  margin-bottom: 8px;
`;

const NavGroupTitle = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: #8E8E93;
  text-transform: uppercase;
  padding: 12px 16px 8px;
  letter-spacing: 0.5px;
`;

const NavItem = styled.button<{ $active: boolean; $subItem?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: ${(p) => (p.$subItem ? '12px 16px 12px 48px' : '14px 16px')};
  border-radius: 34px;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  background: ${(p) => (p.$active ? '#007AFF' : 'transparent')};
  color: ${(p) => (p.$active ? 'white' : '#1C1C1E')};
  transition: all 0.2s;

  &:hover {
    background: ${(p) => (p.$active ? '#007AFF' : '#F2F2F7')};
    border-radius: 34px;
  }
`;

const NavIcon = styled.span`
  display: flex;
  align-items: center;
  font-size: 20px;
`;

const LogoutButton = styled.button`
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
`;

const Content = styled.main`
  flex: 1;
  padding: 24px 16px;
  background: #F2F2F7;
  min-height: calc(100vh - 69px);

  @media (min-width: 768px) {
    padding: 32px;
    min-height: 100vh;
  }
`;

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleNav = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <Container>
      <Header>
        <Logo>QEntry</Logo>
        <MenuButton onClick={() => setMenuOpen(true)}>
          <HiOutlineMenu size={22} />
        </MenuButton>
      </Header>

      <Overlay $open={menuOpen} onClick={() => setMenuOpen(false)} />
      
      <Sidebar $open={menuOpen}>
        <SidebarLogo>QEntry</SidebarLogo>
        <Nav>
          <NavItem
            $active={location.pathname === '/'}
            onClick={() => handleNav('/')}
          >
            <NavIcon><HiOutlineHome size={22} /></NavIcon>
            Dashboard
          </NavItem>

          <NavItem
            $active={location.pathname === '/inout'}
            onClick={() => handleNav('/inout')}
          >
            <NavIcon><HiOutlineSwitchHorizontal size={22} /></NavIcon>
            In / Out
          </NavItem>

          <NavItem
            $active={location.pathname === '/persons'}
            onClick={() => handleNav('/persons')}
          >
            <NavIcon><HiOutlineUserGroup size={22} /></NavIcon>
            Personas
          </NavItem>

          <NavItem
            $active={location.pathname === '/history'}
            onClick={() => handleNav('/history')}
          >
            <NavIcon><HiOutlineClipboardList size={22} /></NavIcon>
            Historial
          </NavItem>

          <NavItem
            $active={location.pathname === '/settings'}
            onClick={() => handleNav('/settings')}
          >
            <NavIcon><HiOutlineCog size={22} /></NavIcon>
            Configuración
          </NavItem>
        </Nav>

        <LogoutButton onClick={handleLogout}>
          <HiOutlineLogout size={22} />
          Cerrar sesión
        </LogoutButton>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}