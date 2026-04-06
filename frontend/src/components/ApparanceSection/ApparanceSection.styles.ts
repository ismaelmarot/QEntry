import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { flex, size } from '@/mixins'
import { COLORS } from '@/constants'

export const Section = styled.section`
  margin-bottom: 16px;
  border-radius: ${theme.radius.lg};
  background: ${theme.colors.background};
  padding: ${theme.spacing.md};
  box-shadow: 0 1px 3px ${COLORS.shadow};
`

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: ${COLORS.textSecondary};
  margin-bottom: ${theme.spacing.md};
`

export const SettingRow = styled.div`
  ${flex('row', 'center', 'space-between')};
  padding: 12px 0;
  border-bottom: 1px solid ${COLORS.surface};

  &:last-child {
    border-bottom: none;
  }
`

export const SettingLabel = styled.span`
  font-size: 16px;
  color: ${COLORS.text};
`

export const Toggle = styled.button<{ $active: boolean }>`
  ${size(58, 31)};
  border-radius: 16px;
  position: relative;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.$active ? theme.colors.success : theme.colors.border)};
  transition: all 0.25s ease;

  .icon {
    top: 50%;
    position: absolute;
    z-index: 2;
    transform: translateY(-50%);
    transition: opacity 0.2s ease;
  }

  .left {
    left: 6px;
    font-size: 1.2rem;
    color: ${COLORS.white};
  }

  .right {
    right: 6px;
    font-size: 1.2rem;
    color: ${COLORS.black};
    opacity: ${(p) => (p.$active ? 1 : 0.5)};
  }

  &::after {
    ${size(27,27)}
    content: '';
    position: absolute;
    border-radius: 50%;
    background: ${COLORS.white};
    top: 2px;
    left: ${(p) => (p.$active ? '29px' : '2px')};
    transition: all 0.25s ease;
    z-index: 1;
  }
`