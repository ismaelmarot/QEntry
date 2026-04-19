import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import { useTheme } from '@/theme/ThemeContext'
import {
    Section,
    SectionTitle,
    SettingLabel,
    SettingDescription,
    SettingRow,
    Toggle,
    OptionsRow,
    OptionButton
} from './ApparanceSection.styles'

export function AppearanceSection() {
    const { isDarkMode, setIsDarkMode, systemMode, setSystemMode } = useTheme()
    
    const handleToggle = () => {
        if (systemMode) {
            setSystemMode(false)
        }
        setIsDarkMode(!isDarkMode)
    }
    
    return (
        <Section>
            <SectionTitle>Apariencia</SectionTitle>

            <SettingRow>
                <div>
                    <SettingLabel>Modo oscuro</SettingLabel>
                    <SettingDescription>
                        {systemMode 
                            ? '(Seguir sistema)' 
                            : isDarkMode 
                                ? '(La interfaz usa colores oscuros)' 
                                : '(La interfaz usa colores claros)'}
                    </SettingDescription>
                </div>
                <Toggle 
                    $active={isDarkMode || systemMode} 
                    onClick={handleToggle}
                >
                    {isDarkMode || systemMode ? (
                        <HiOutlineMoon style={{ 
                            position: 'absolute', 
                            left: '6px', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            color: 'white',
                            fontSize: '16px'
                        }} />
                    ) : (
                        <HiOutlineSun style={{ 
                            position: 'absolute', 
                            right: '6px', 
                            top: '50%', 
                            transform: 'translateY(-50%)', 
                            color: '#8E8E93',
                            fontSize: '16px'
                        }} />
                    )}
                </Toggle>
            </SettingRow>

            <SettingRow style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 4 }}>
                <SettingLabel>Seguir ajustes del sistema</SettingLabel>
                <SettingDescription style={{ marginBottom: 8 }}>
                    Usar automáticamente el modo oscuro según la configuración de tu dispositivo
                </SettingDescription>
                <OptionsRow>
                    <OptionButton 
                        $active={systemMode} 
                        onClick={() => setSystemMode(true)}
                    >
                        Activado
                    </OptionButton>
                    <OptionButton 
                        $active={!systemMode} 
                        onClick={() => setSystemMode(false)}
                    >
                        Desactivado
                    </OptionButton>
                </OptionsRow>
            </SettingRow>
        </Section>
    )
}