import styled from 'styled-components'
import { theme } from '@/styles/theme'

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
`

export const Header = styled.div`
  margin-bottom: ${theme.spacing.lg};
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: ${theme.colors.text};

  @media (min-width: 768px) {
    font-size: 34px;
  }
`

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
`;

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

export const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
`

export const CategoryItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: ${theme.colors.surface};
  border-radius: 35px;
`

export const CategoryName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: ${theme.colors.text};
`

export const CategoryColor = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(p) => p.$color};
  margin-right: 10px;
`

export const CategoryInfo = styled.div`
  display: flex;
  align-items: center;
`

export const DeleteButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${theme.colors.surface};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.error};
  transition: all 0.2s;

  &:hover {
    background: #FFE5E5;
  }
`

export const AddButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  width: 100%;
  padding: 14px;
  border: 1px dashed ${theme.colors.border};
  border-radius: 35px;
  background: transparent;
  color: ${theme.colors.primary};
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors.surface};
    border-color: ${theme.colors.primary};
  }
`

export const Toggle = styled.button<{ $active: boolean }>`
  width: 51px;
  height: 31px;
  border-radius: 16px;
  background: ${(p) => (p.$active ? theme.colors.success : theme.colors.border)};
  position: relative;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &::after {
    content: '';
    position: absolute;
    width: 27px;
    height: 27px;
    border-radius: 50%;
    background: white;
    top: 2px;
    left: ${(p) => (p.$active ? '22px' : '2px')};
    transition: all 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`

export const Select = styled.select`
  padding: 10px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: 35px;
  font-size: 16px;
  background: ${theme.colors.background};
  color: ${theme.colors.text};
  cursor: pointer;

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }
`

export const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.md};
  font-size: 16px;
  width: 100%;

  &:focus {
    border-color: ${theme.colors.primary};
    outline: none;
  }
`

export const Popup = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
`

export const PopupContent = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.radius.lg};
  padding: ${theme.spacing.lg};
  width: 100%;
  max-width: 340px;
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`

export const PopupTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`

export const PopupText = styled.p`
  font-size: 14px;
  color: ${theme.colors.textSecondary};
`

export const PopupButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`

export const PopupButton = styled.button<{ $danger?: boolean }>`
  flex: 1;
  padding: 14px;
  font-size: 17px;
  font-weight: 600;
  border-radius: ${theme.radius.md};
  border: none;
  background: ${(p) => (p.$danger ? theme.colors.error : theme.colors.surface)};
  color: ${(p) => (p.$danger ? 'white' : theme.colors.text)};
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
`