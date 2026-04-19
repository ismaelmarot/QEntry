import { useSettings } from './useSettings'
import {
  AppearanceSection,
  CategorySection,
  DeleteCategoryModal,
  LanguageSection
} from '@/components'
import { Container, Header, Title } from './Settings.styles'

export function Settings() {
  const settings = useSettings()

  return (
    <Container>
      <Header>
        <Title>Configuración</Title>
      </Header>

      <CategorySection {...settings} />
      <AppearanceSection />
      <LanguageSection {...settings} />
      <DeleteCategoryModal {...settings} />
    </Container>
  )
}