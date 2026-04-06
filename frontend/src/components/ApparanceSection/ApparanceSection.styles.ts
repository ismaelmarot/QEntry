import styled from 'styled-components'
import { theme } from '@/styles/theme'

export const Section = styled.section`
  background: ${theme.colors.background};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.md};
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`

export const SectionTitle = styled.h2`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${theme.spacing.md};
`

export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid ${theme.colors.surface};

  &:last-child {
    border-bottom: none;
  }
`

export const SettingLabel = styled.span`
  font-size: 16px;
  color: ${theme.colors.text};
`

export const Toggle = styled.button<{ $active: boolean }>`
  width: 58px;
  height: 31px;
  border-radius: 16px;
  background: ${(p) => (p.$active ? theme.colors.success : theme.colors.border)};
  position: relative;
  border: none;
  cursor: pointer;
  transition: all 0.25s ease;

  .icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 2;
    transition: opacity 0.2s ease;
  }

  .left {
    left: 6px;
    font-size: 1.2rem;
    color: #ffffff;
  }

  .right {
    right: 6px;
    font-size: 1.2rem;
    color: #000000;
    opacity: ${(p) => (p.$active ? 1 : 0.5)};
  }

  &::after {
    content: '';
    position: absolute;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${(p) => (p.$active ? '29px' : '2px')};
    transition: all 0.25s ease;
    z-index: 1;
  }
`