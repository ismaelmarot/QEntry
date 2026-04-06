import { Icons } from '@/icons'
import {
    Section,
    SectionTitle,
    SettingLabel,
    SettingRow,
    Toggle
} from './ApparanceSection.styles'

export function AppearanceSection({ darkMode, setDarkMode }: any) {
    return (
        <Section>
            <SectionTitle>Apariencia</SectionTitle>

            <SettingRow>
                <SettingLabel>Modo oscuro</SettingLabel>

                <Toggle $active={darkMode} onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? (
                        <Icons.moon className='icon left' />
                    ) : (
                        <Icons.sun className='icon right' />
                    )}
                </Toggle>
            </SettingRow>
        </Section>
    )
}