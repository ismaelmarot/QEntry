import { useSettings } from './useSettings'
import {
  AppearanceSection,
  CategorySection,
  DeleteCategoryModal,
  LanguageSection
} from '@/components'
import { Container, Header, Title } from './Settings.styles'
import { useNavigate } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'
import logoSrc from '@/assets/QEntry-logo.png'

export function Settings() {
  const settings = useSettings()
  const navigate = useNavigate()

  return (
    <Container>
      <Header>
        <Title>Configuración</Title>
      </Header>

      <CategorySection {...settings} />
      <AppearanceSection />
      <div onClick={() => navigate('/about')} style={{ 
        background: 'var(--bg-primary)', 
        borderRadius: '16px', 
        padding: '24px 20px', 
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)', 
        marginBottom: '24px',
        cursor: 'pointer'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <img src={logoSrc} alt="QEntry Logo" style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '8px', 
            objectFit: 'cover'
          }} />
          <div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Acerca del Proyecto
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Sistema de gestión de entradas y salidas con QR
            </div>
          </div>
<div style={{ marginLeft: 'auto' }}>
            <HiOutlineArrowRight size={18} color="var(--text-primary)" />
          </div>
        </div>
      </div>
      <LanguageSection {...settings} />
      <DeleteCategoryModal {...settings} />
    </Container>
  )
}