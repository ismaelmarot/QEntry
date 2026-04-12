import styled from 'styled-components'
import { flex, size } from '@/mixins'

export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
`

export const Header = styled.div`
  ${flex('row', 'center', 'space-between')};
  margin-bottom: 32px;
`

export const BackButton = styled.button`
  ${flex('column', 'center', 'center')};
  ${size(40, 40)};
  border-radius: 50%;
  background: #F2F2F7;
  color: #1C1C1E;
  transition: all 0.2s;
  
  &:hover {
    background: #E5E5EA;
  }
  
  &:active {
    transform: scale(0.95);
  }
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1C1C1E;
`

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const Select = styled.select`
  padding: 16px 20px;
  border: 1px solid #E5E5EA;
  border-radius: 34px;
  font-size: 17px;
  background: #F2F2F7;
  color: #1C1C1E;
  width: 100%;
  cursor: pointer;
  
  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
  }
`

export const Input = styled.input`
  padding: 16px 20px;
  border: 1px solid #E5E5EA;
  border-radius: 34px;
  font-size: 17px;
  background: #F2F2F7;
  color: #1C1C1E;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
  }
  
  &::placeholder {
    color: #8E8E93;
  }
`

export const TextArea = styled.textarea`
  padding: 16px 20px;
  border: 1px solid #E5E5EA;
  border-radius: 16px;
  font-size: 17px;
  background: #F2F2F7;
  color: #1C1C1E;
  min-height: 100px;
  resize: vertical;
  width: 100%;
  box-sizing: border-box;
  font-family: inherit;
  
  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
  }
  
  &::placeholder {
    color: #8E8E93;
  }
`

export const SectionLabel = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: #8E8E93;
  margin-top: 4px;
  margin-bottom: 2px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 28px;
`

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'danger'; disabled?: boolean; as?: string }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 18px 24px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 34px;
  background: ${(p) => p.$variant === 'danger' ? '#FF3B30' : p.$variant === 'secondary' ? '#F2F2F7' : '#007AFF'};
  color: ${(p) => p.$variant === 'secondary' ? '#1C1C1E' : 'white'};
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  transition: all 0.2s;
  border: none;
  
  &:active {
    transform: scale(0.98);
  }
`

export const ExpandableSection = styled.div`
  margin-top: 8px;
  padding: 20px;
  background: #F2F2F7;
  border-radius: 16px;
`

export const ExpandableHeader = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0;
  border: none;
  font-size: 17px;
  font-weight: 600;
  background: none;
  color: #1C1C1E;
  cursor: pointer;
`

export const DayChip = styled.button<{ $active: boolean }>`
  padding: 10px 18px;
  border-radius: 22px;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid ${(p) => (p.$active ? '#007AFF' : '#E5E5EA')};
  background: ${(p) => (p.$active ? '#007AFF' : 'white')};
  color: ${(p) => (p.$active ? 'white' : '#1C1C1E')};
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
`

export const DayHoursContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: 16px;
`

export const SmallInput = styled.input`
  padding: 14px 16px;
  border: 1px solid #E5E5EA;
  border-radius: 14px;
  font-size: 16px;
  background: white;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    border-color: #007AFF;
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.1);
  }
`

export const DayHoursRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
`

export const PhotoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 8px;
`

export const PhotoPreview = styled.div<{ $src?: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover no-repeat` : '#F2F2F7'};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #E5E5EA;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`

export const PhotoActions = styled.div`
  display: flex;
  gap: 12px;
`

export const PhotoActionButton = styled.button<{ as?: string }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  border-radius: 24px;
  background: #F2F2F7;
  color: #007AFF;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #E5E5EA;
  }
  
  &:active {
    transform: scale(0.98);
  }
`

export const HiddenInput = styled.input`
  display: none;
`

export const RemovePhotoButton = styled.button`
  padding: 10px 20px;
  border-radius: 20px;
  background: #FFF0F0;
  color: #FF3B30;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background: #FFE5E5;
  }
  
  &:active {
    transform: scale(0.98);
  }
`

export const CameraContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 24px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
  margin-bottom: 8px;
`

export const CameraPreview = styled.div`
  width: 200px;
  height: 266px;
  border-radius: 16px;
  overflow: hidden;
  background: #000;
  position: relative;
`

export const CameraVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const CameraOverlay = styled.div`
  position: absolute;
  inset: 0;
  border: 3px solid #007AFF;
  border-radius: 16px;
  pointer-events: none;
`

export const CloseCameraButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  z-index: 10;
`

export const CameraButton = styled.button`
  padding: 16px 40px;
  border-radius: 34px;
  background: #007AFF;
  color: white;
  font-size: 17px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  &:active {
    transform: scale(0.98);
  }
`

export const CameraInstructions = styled.p`
  font-size: 14px;
  color: #8E8E93;
  text-align: center;
`

export const Popup = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`

export const PopupContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 340px;
  text-align: center;
`

export const PopupTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1C1C1E;
  margin-bottom: 12px;
`

export const PopupText = styled.p`
  font-size: 15px;
  color: #8E8E93;
  line-height: 1.4;
  margin-bottom: 24px;
`

export const PopupButtons = styled.div`
  display: flex;
  gap: 12px;
`

export const PopupButton = styled.button<{ $danger?: boolean; disabled?: boolean }>`
  flex: 1;
  padding: 14px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 34px;
  background: ${(p) => (p.$danger ? '#FF3B30' : '#F2F2F7')};
  color: ${(p) => (p.$danger ? 'white' : '#1C1C1E')};
  opacity: ${(p) => (p.disabled ? 0.5 : 1)};
  cursor: ${(p) => (p.disabled ? 'not-allowed' : 'pointer')};
  border: none;
  
  &:active {
    transform: scale(0.98);
  }
`