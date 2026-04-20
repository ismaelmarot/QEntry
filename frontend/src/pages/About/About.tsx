import { useNavigate } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import { Container, Header, Title } from './About.styles'
import { AboutSection } from '@/components/AboutSection'

export function About() {
  const navigate = useNavigate()

  return (
    <Container>
      <Header>
        <HiOutlineArrowLeft 
          size={20} 
          onClick={() => navigate(-1)}
          style={{ 
            cursor: 'pointer', 
            color: 'var(--primary)', 
            background: 'var(--bg-surface)', 
            width: '40px', 
            height: '40px', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        />
        <Title>Acerca del Proyecto</Title>
      </Header>

      <AboutSection />
    </Container>
  )
}