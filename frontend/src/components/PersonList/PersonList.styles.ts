import styled from 'styled-components'
import { flex, size } from '@/mixins'

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
  padding: 12px 16px;
  background: var(--bg-primary);
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  gap: 12px;
  border: 1px solid var(--border-color);
`

export const PersonAvatar = styled.div<{ $src?: string }>`
  ${size(48, 48)}
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover no-repeat` : 'var(--bg-surface)'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid var(--border-color);
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const PersonInfo = styled.div`
  flex: 1;
  min-width: 0;
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

export const ActionButton = styled.button<{ $danger?: boolean }>`
  ${flex('column','center','center')};
  ${size(36,36)}
  border-radius: 50%;
  background: var(--bg-surface);
  color: ${(p) => (p.$danger ? '#FF3B30' : '#007AFF')};
  flex-shrink: 0;
  &:hover { background: ${(p) => (p.$danger ? '#FFE5E5' : '#E5F0FF')}; }
`

export const EditButton = styled.button`
  ${flex('column','center','center')};
  ${size(36,36)}
  border-radius: 50%;
  background: var(--bg-surface);
  color: var(--text-secondary);
  flex-shrink: 0;
  &:hover { background: var(--border-color); color: #007AFF; }
`