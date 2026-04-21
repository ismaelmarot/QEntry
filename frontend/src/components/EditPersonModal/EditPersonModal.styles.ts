import styled from 'styled-components'
import { flex, size } from '@/mixins'

export const Modal = styled.div`
  ${flex('column', 'center', 'center')};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: 20px;
`

export const ModalContent = styled.div`
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow-y: auto;
  color: var(--text-primary);
`

export const ModalHeader = styled.div`
  ${flex('row','center','space-between')}
  margin-bottom: 20px;
`

export const ModalTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: var(--text-primary);
`

export const CloseButton = styled.button`
  ${flex('column','center','center')}
  ${size(32,32)}
  font-size: 18px;
  border-radius: 50%;
  background: var(--bg-surface);
  color: var(--text-primary);
`

export const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 34px;
  font-size: 16px;
  background: var(--bg-surface);
  color: var(--text-primary);
  width: 100%;
  margin-bottom: 12px;
  &:focus {
    border-color: var(--primary);
    background: var(--bg-primary);
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
  }
  &::placeholder {
    color: var(--text-secondary);
  }
`

export const Select = styled.select`
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 34px;
  font-size: 16px;
  background: var(--bg-surface);
  color: var(--text-primary);
  width: 100%;
  margin-bottom: 12px;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' }>`
  flex: 1;
  padding: 16px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 34px;
  background: ${(p) => (p.$variant === 'secondary' ? 'var(--bg-surface)' : 'var(--primary)')};
  color: ${(p) => (p.$variant === 'secondary' ? 'var(--text-primary)' : 'white')};
  border: none;
  &:active {
    transform: scale(0.98);
  }
`

export const ExpandableSection = styled.div`
  margin-top: 12px;
  padding: 16px;
  background: var(--bg-surface);
  border-radius: 12px;
`

export const ExpandableHeader = styled.button`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  padding: 0;
`

export const DayChip = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${(p) => (p.$active ? 'var(--primary)' : 'var(--border-color)')};
  background: ${(p) => (p.$active ? 'var(--primary)' : 'var(--bg-surface)')};
  color: ${(p) => (p.$active ? 'white' : 'var(--text-primary)')};
  cursor: pointer;
`

export const DayHoursContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 12px;
`

export const SmallInput = styled.input`
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 14px;
  background: var(--bg-primary);
  color: var(--text-primary);
  width: 100%;
  &:focus { border-color: var(--primary); outline: none; }
`

export const DayHoursRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

export const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`

export const PhotoPreview = styled.div<{ $src?: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover no-repeat` : 'var(--bg-surface)'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border-color);
  overflow: hidden;
`

export const PhotoButtons = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`

export const PhotoButtonRow = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
`

export const PhotoButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$primary ? 'var(--primary)' : 'var(--bg-surface)'};
  color: ${(p) => p.$primary ? 'white' : 'var(--text-primary)'};
  
  &:hover {
    opacity: 0.9;
  }
`

export const HiddenInput = styled.input``