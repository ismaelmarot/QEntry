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
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  padding: 24px;
  border-radius: 20px;
  background: white;
  overflow-y: auto;
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
`

export const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 34px;
  font-size: 16px;
  background: var(--bg-surface);
  &:focus {
    border-color: #007AFF;
    background: white;
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
  &:focus {
    border-color: #007AFF;
    outline: none;
  }
`

export const SectionLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-top: 8px;
  margin-bottom: 4px;
`

export const TextArea = styled.textarea`
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 16px;
  background: var(--bg-surface);
  min-height: 80px;
  resize: vertical;
  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
  }
  &::placeholder {
    color: var(--text-secondary);
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
  background: ${(p) => (p.$variant === 'secondary' ? 'var(--bg-surface)' : '#007AFF')};
  color: ${(p) => (p.$variant === 'secondary' ? 'var(--text-primary)' : 'white')};
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0;
  border: none;
  font-size: 15px;
  font-weight: 600;
  background: none;
  color: var(--text-primary);
  cursor: pointer;
`

export const DayChip = styled.button<{ $active: boolean }>`
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  border: 1px solid ${(p) => (p.$active ? '#007AFF' : 'var(--border-color)')};
  background: ${(p) => (p.$active ? '#007AFF' : 'white')};
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
  background: white;
  &:focus {
    border-color: #007AFF;
    outline: none;
  }
`

export const DayHoursRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`

export const DniContainer = styled.div`
  margin-top: 1rem;
  font-size: 14px;
  color: var(--text-secondary);
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const PhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`

export const PhotoPreview = styled.div<{ $src?: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : 'var(--bg-surface)'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border-color);
  overflow: hidden;
`

export const PhotoInput = styled.input`
  display: none;
`

export const PhotoLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 20px;
  background: var(--bg-surface);
  color: #007AFF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #E5E0EA;
  }
`

export const RemovePhotoButton = styled.button`
  padding: 6px 12px;
  border-radius: 16px;
  background: #FFF0F0;
  color: #FF3B30;
  font-size: 13px;
  font-weight: 500;
  border: none;
  cursor: pointer;

  &:hover {
    background: #FFE5E5;
  }
`