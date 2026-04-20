import styled from 'styled-components'
import { theme } from '@/styles/theme'

export const Section = styled.div`
  background: var(--bg-primary);
  border-radius: 16px;
  padding: 24px 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  margin-bottom: 24px;
  
  [data-theme="dark"] & {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
`

export const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
`

export const SettingLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 4px;
`

export const SettingDescription = styled.div`
  font-size: 14px;
  color: var(--text-primary);
  line-height: 1.5;
`

export const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  
  &:last-child {
    border-bottom: none;
  }
`

export const Logo = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const AppInfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin: 20px 0;
  padding: 16px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
`

export const VersionInfo = styled.div`
  font-size: 15px;
  font-weight: 500;
  color: var(--text-primary);
  text-align: right;
`