import styled from 'styled-components'
import { flex, size } from '@/mixins'

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`

export const Header = styled.div`
  ${flex('row', 'center', 'space-between')};
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 24px;
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  @media (min-width: 768px) { font-size: 34px; }
`

export const AddButton = styled.button`
  ${flex('row', 'center', 'center')};
  gap: 6px;
  padding: 12px 20px;
  background: var(--success);
  color: var(--textOnPrimary);
  font-size: 15px;
  font-weight: 600;
  border-radius: 34px;
  &:hover { background: var(--success); transform: translateY(-1px); }
  &:active { transform: scale(0.98); }
`

export const FilterRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
  overflow-x: auto;
  padding-bottom: 8px;
  &::-webkit-scrollbar { display: none; }
`

export const FilterChip = styled.button<{ $active: boolean }>`
  padding: 10px 18px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  background: ${(p) => (p.$active ? '#007AFF' : 'var(--bg-surface)')};
  color: ${(p) => (p.$active ? 'white' : 'var(--text-primary)')};
  border: 1px solid ${(p) => (p.$active ? '#007AFF' : 'var(--border-color)')};
`

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 12px 0;
  margin-bottom: 8px;
`

export const LetterSection = styled.div`
  margin-bottom: 16px;
`

export const LetterHeader = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  padding: 8px 0;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 8px;
`

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  gap: 12px;
`

export const PersonInfo = styled.div`
  flex: 1;
`

export const PersonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
`

export const PersonName = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
  flex: 1;
`

export const PersonMeta = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
`

export const Type = styled.span<{ $type: string }>`
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  background: ${(p) => p.$type};
  color: white;
  flex-shrink: 0;
`

export const RowActions = styled.div`
  display: flex;
  gap: 8px;
`

export const ActionButton = styled.button<{ $danger?: boolean }>`
  ${flex('column','center','center')};
  ${size(36,36)}
  border-radius: 50%;
  background: var(--bg-surface);
  color: ${(p) => (p.$danger ? 'var(--error)' : 'var(--primary)')};
  flex-shrink: 0;
  &:hover { background: ${(p) => (p.$danger ? 'var(--error)' : 'var(--primary)')}; opacity: 0.8; }
`

export const Modal = styled.div`
  ${flex('column', 'center', 'center')};
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
  padding: 20px;
`

export const ModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const Input = styled.input`
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 34px;
  font-size: 16px;
  background: var(--bg-surface);
  &:focus { border-color: #007AFF; background: white; outline: none; box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1); }
  &::placeholder { color: var(--text-secondary); }
`

export const Select = styled.select`
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 34px;
  font-size: 16px;
  background: var(--bg-surface);
  &:focus { border-color: #007AFF; outline: none; }
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
  &:focus { border-color: #007AFF; background: white; outline: none; }
  &::placeholder { color: var(--text-secondary); }
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
  &:active { transform: scale(0.98); }
`

export const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: var(--text-secondary);
`

export const EmptyIcon = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  color: #C7C7CC;
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
  &:focus { border-color: #007AFF; outline: none; }
`

export const DayHoursRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
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
  background: white;
  border-radius: 14px;
  padding: 24px;
  width: 100%;
  max-width: 340px;
  text-align: center;
  animation: slideUp 0.3s ease;
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
`

export const PopupTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
`

export const PopupText = styled.div`
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 24px;
`

export const PopupButtons = styled.div`
  display: flex;
  gap: 12px;
`

export const PopupButton = styled.button<{ $danger?: boolean }>`
  flex: 1;
  padding: 14px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  background: ${(p) => (p.$danger ? 'var(--error)' : 'var(--bg-surface)')};
  color: ${(p) => (p.$danger ? 'var(--textOnPrimary)' : 'var(--text-primary)')};
  cursor: pointer;
  &:active { transform: scale(0.98); }
`

export const ViewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`

export const ViewRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const ViewLabel = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
`

export const ViewValue = styled.span`
  font-size: 16px;
  color: var(--text-primary);
`