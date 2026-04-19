import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { flex, size } from '@/mixins'

export const Section = styled.section`
  margin-bottom: 16px;
  border-radius: ${theme.radius.lg};
  background: var(--bg-primary);
  padding: ${theme.spacing.md};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
`

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text-secondary);
  margin-bottom: ${theme.spacing.md};
`

export const SettingRow = styled.div`
  ${flex('row', 'center', 'space-between')};
  padding: 12px 0;
  border-bottom: 1px solid var(--border-color);

  &:last-child {
    border-bottom: none;
  }
`

export const SettingLabel = styled.span`
  font-size: 16px;
  margin-right: .2rem;
  color: var(--text-primary);
`

export const SettingDescription = styled.span`
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 2px;
`

export const Toggle = styled.button<{ $active: boolean }>`
  ${size(51, 31)};
  border-radius: 16px;
  position: relative;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.$active ? '#34C759' : 'var(--border-color)')};
  transition: background 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${(p) => (p.$active ? '22px' : '2px')};
    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: scale(0.95);
  }
`

export const ToggleLabel = styled.span<{ $active: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => (p.$active ? '#34C759' : 'var(--text-secondary)')};
  transition: color 0.3s ease;
`

export const OptionsRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`

export const OptionButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 14px;
  border-radius: 34px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(p) => (p.$active ? '#007AFF' : 'var(--bg-surface)')};
  color: ${(p) => (p.$active ? 'white' : 'var(--text-primary)')};

  &:hover {
    background: ${(p) => (p.$active ? '#0062CC' : 'var(--border-color)')};
  }

  &:active {
    transform: scale(0.98);
  }
`
