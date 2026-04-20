import { useSettings } from './useSettings'
import {
  AppearanceSection,
  CategorySection,
  DeleteCategoryModal,
  LanguageSection
} from '@/components'
import { Container, Header, Title } from './Settings.styles'
import { useNavigate } from 'react-router-dom'

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
          <div style={{ 
            width: '60px', 
            height: '60px', 
            borderRadius: '12px', 
            overflow: 'hidden', 
            background: 'var(--bg-surface)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <img src="/QEntry-logo.png" alt="QEntry Logo" />
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '4px' }}>
              Acerca del Proyecto
            </div>
            <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Sistema de gestión de entradas y salidas con QR
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <span>→</span>
          </div>
        </div>
      </div>
      <LanguageSection {...settings} />
      <DeleteCategoryModal {...settings} />
    </Container>
  )
}