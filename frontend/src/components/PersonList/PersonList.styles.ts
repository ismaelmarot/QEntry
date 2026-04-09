import styled from 'styled-components'
import { flex, size } from '@/mixins'

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #8E8E93;
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
  color: #8E8E93;
  padding: 8px 0;
  border-bottom: 1px solid #E5E5EA;
  margin-bottom: 8px;
`

export const ListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  background: white;
  border-radius: 12px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  gap: 12px;
`

export const PersonAvatar = styled.div<{ $src?: string }>`
  ${size(48, 48)}
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover no-repeat` : '#F2F2F7'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid #E5E5EA;
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
  color: #1C1C1E;
  flex: 1;
`

export const PersonMeta = styled.div`
  font-size: 14px;
  color: #8E8E93;
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
  background: #F2F2F7;
  color: ${(p) => (p.$danger ? '#FF3B30' : '#007AFF')};
  flex-shrink: 0;
  &:hover { background: ${(p) => (p.$danger ? '#FFE5E5' : '#E5F0FF')}; }
`

export const EditButton = styled.button`
  ${flex('column','center','center')};
  ${size(36,36)}
  border-radius: 50%;
  background: #F2F2F7;
  color: #8E8E93;
  flex-shrink: 0;
  &:hover { background: #E5E5EA; color: #007AFF; }
`