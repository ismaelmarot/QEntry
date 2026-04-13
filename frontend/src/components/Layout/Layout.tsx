import { Outlet } from 'react-router-dom'
import { Icons } from '@/constants'
import { useLayout } from './useLayout'
import {
  Container,
  Content,
  Header,
  Logo,
  LogoutButton,
  MenuButton,
  Nav,
  NavIcon,
  NavItem,
  Overlay,
  Sidebar,
  SidebarLogo
} from './Layout.styles'

export function Layout() {
  const {
    menuOpen,
    setMenuOpen,
    handleLogout,
    handleNav,
    location,
  } = useLayout()

  return (
    <Container>
      <Header>
        <Logo>QEntry</Logo>
        <MenuButton onClick={() => setMenuOpen(true)}>
          <Icons.menu size={22} />
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
            <NavIcon><Icons.home size={22} /></NavIcon>
            Dashboard
          </NavItem>

          <NavItem
            $active={location.pathname === '/inout'}
            onClick={() => handleNav('/inout')}
          >
            <NavIcon><Icons.switch size={22} /></NavIcon>
            In / Out
          </NavItem>

          <NavItem
            $active={location.pathname === '/persons'}
            onClick={() => handleNav('/persons')}
          >
            <NavIcon><Icons.users size={22} /></NavIcon>
            Personas
          </NavItem>

          <NavItem
            $active={location.pathname === '/history'}
            onClick={() => handleNav('/history')}
          >
            <NavIcon><Icons.manual size={22} /></NavIcon>
            Historial
          </NavItem>

          <NavItem
            $active={location.pathname === '/settings'}
            onClick={() => handleNav('/settings')}
          >
            <NavIcon><Icons.settings size={22} /></NavIcon>
            Configuración
          </NavItem>
        </Nav>

        <LogoutButton onClick={handleLogout}>
          <Icons.logout size={22} />
          Cerrar sesión
        </LogoutButton>
      </Sidebar>

      <Content>
        <Outlet />
      </Content>
    </Container>
  )
}