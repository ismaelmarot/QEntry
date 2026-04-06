import {
  Section,
  SectionTitle,
  SettingRow,
  SettingLabel,
  Select
} from './LenguageSection.styles'

export function LanguageSection({ language, setLanguage }: any) {
  return (
    <Section>
      <SectionTitle>Idioma</SectionTitle>

      <SettingRow>
        <SettingLabel>Idioma de la app</SettingLabel>

        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="es">Español</option>
          <option value="en">English</option>
        </Select>
      </SettingRow>
    </Section>
  )
}