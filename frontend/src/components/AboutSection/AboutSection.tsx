import { useTheme } from '@/theme/ThemeContext'
import logoSrc from '@/assets/QEntry-logo.png'
import {
  Section,
  SectionTitle,
  SettingLabel,
  SettingDescription,
  SettingRow,
  AppInfoRow,
  VersionInfo,
  Logo
} from './AboutSection.styles'

export function AboutSection() {
  const { isDarkMode } = useTheme()

  return (
    <Section>
      <SettingRow>
        <Logo>
          <img src={logoSrc} alt='QEntry Logo' />
        </Logo>
        <div>
          <SettingLabel>QEntry</SettingLabel>
          <SettingDescription>Sistema de gestión de entradas y salidas con QR</SettingDescription>
        </div>
      </SettingRow>
      
      <AppInfoRow>
        <div>
          <SettingLabel>Versión</SettingLabel>
          <VersionInfo>1.0.0</VersionInfo>
        </div>
        <div>
          <SettingLabel>Actualizado</SettingLabel>
          <VersionInfo>Abril 2026</VersionInfo>
        </div>
      </AppInfoRow>
      
      <SettingRow style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
        <SettingLabel>Desarrollado por</SettingLabel>
        <SettingDescription>
          Ismael Marot - iM Projects
        </SettingDescription>
      </SettingRow>
    </Section>
  )
}