import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
`

export const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  &:hover { background: var(--bg-surface); transform: scale(1.02); }
  &:active { transform: scale(0.98); }
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
`

export const ProfileCard = styled.div`
  background: var(--bg-primary);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--border-color);
`

export const ProfileHeader = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, ${p => p.$color} 0%, ${p => p.$color}99 100%);
  padding: 32px 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
`

export const AvatarLarge = styled.div<{ $src?: string }>`
  width: 100px;
  height: 100px;
  border-radius: 24px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : 'rgba(255,255,255,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 36px;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
`

export const HeaderInfo = styled.div`
  flex: 1;
`

export const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 4px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: var(--text-primary);
`

export const ProfileDni = styled.p`
  font-size: 14px;
  opacity: 0.9;
  margin: 0;
  color: var(--text-primary);
`

export const QRBadge = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
  background: var(--bg-primary);
  border-radius: 12px;
  padding: 8px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover { transform: scale(1.05); }
  &:active { transform: scale(0.95); }
`

export const QRModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 200;
  padding: 20px;
  cursor: pointer;
`

export const QRModalContent = styled.div`
  background: var(--bg-primary);
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  cursor: default;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
`

export const QRModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
  text-align: center;
`

export const QRModalSubtitle = styled.p`
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0;
`

export const QRModalClose = styled.button`
  margin-top: 16px;
  padding: 12px 32px;
  background: var(--primary);
  color: var(--textOnPrimary);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`

export const EditModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
  backdrop-filter: blur(4px);
`

export const EditModalContent = styled.div`
  background: var(--bg-primary);
  border-radius: 24px;
  width: 100%;
  max-width: 420px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-color);
`

export const EditHeader = styled.div<{ $color: string }>`
  background: linear-gradient(135deg, ${p => p.$color} 0%, ${p => p.$color}99 100%);
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
`

export const EditAvatarSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

export const EditAvatar = styled.div<{ $src?: string }>`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  border: 3px solid rgba(255, 255, 255, 0.4);
  overflow: hidden;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : 'rgba(255,255,255,0.2)'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
`

export const EditAvatarButtons = styled.div`
  display: flex;
  gap: 6px;
`

export const EditAvatarButton = styled.button<{ $danger?: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: none;
  background: ${(p) => p.$danger ? 'rgba(255,59,48,0.3)' : 'var(--bg-surface)'};
  color: ${(p) => p.$danger ? 'var(--error)' : 'var(--text-primary)'};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  transition: all 0.2s;
  &:hover { transform: scale(1.1); }
`

export const EditInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const EditName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: var(--textOnPrimary);
  margin: 0;
`

export const EditDni = styled.p`
  font-size: 13px;
  color: rgba(255,255,255,0.8);
  margin: 0;
`

export const EditQRBadge = styled.div`
  position: absolute;
  right: 16px;
  top: 16px;
  background: white;
  border-radius: 10px;
  padding: 6px;
  cursor: pointer;
  transition: transform 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  &:hover { transform: scale(1.05); }
`

export const EditCloseButton = styled.button`
  position: absolute;
  left: 16px;
  top: 16px;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: rgba(255,255,255,0.25);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  &:hover { background: rgba(255,255,255,0.35); }
`

export const EditForm = styled.form`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const FormLabel = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  padding-left: 4px;
`

export const FormInput = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  font-size: 15px;
  background: var(--bg-surface);
  color: var(--text-primary);
  transition: all 0.2s;
  &:focus {
    border-color: var(--primary);
    background: var(--bg-primary);
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  }
`

export const FormSelect = styled.select`
  width: 100%;
  padding: 16px;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  font-size: 15px;
  background: var(--bg-surface);
  color: var(--text-primary);
  cursor: pointer;
  transition: all 0.2s;
  &:focus {
    border-color: var(--primary);
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 122, 255, 0.15);
  }
`

export const ToggleSection = styled.div`
  margin-top: 4px;
`

export const ToggleButton = styled.button<{ $active?: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$active ? 'var(--primary)' : 'var(--bg-surface)'};
  color: ${(p) => p.$active ? 'var(--textOnPrimary)' : 'var(--text-primary)'};
  transition: all 0.2s;
  &:hover { opacity: 0.9; }
`

export const EditScheduleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  padding: 12px;
  background: var(--bg-surface);
  border-radius: 14px;
`

export const EditScheduleItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const EditDayButton = styled.button<{ $enabled?: boolean }>`
  padding: 12px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$enabled ? 'var(--primary)' : 'var(--bg-primary)'};
  color: ${(p) => p.$enabled ? 'var(--textOnPrimary)' : 'var(--text-primary)'};
  transition: all 0.2s;
  &:hover { transform: scale(1.05); }
`

export const EditTimeInputs = styled.div`
  display: flex;
  gap: 4px;
`

export const EditTimeInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 11px;
  background: var(--bg-primary);
  color: var(--text-primary);
  text-align: center;
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`

export const CancelButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  background: var(--bg-surface);
  color: var(--text-primary);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  &:hover { background: var(--bg-surface); }
`

export const SaveButton = styled.button`
  flex: 1;
  padding: 16px;
  border-radius: 14px;
  font-size: 15px;
  font-weight: 600;
  background: var(--primary);
  color: var(--textOnPrimary);
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(0, 122, 255, 0.3);
  transition: all 0.2s;
  &:hover { background: var(--primary-dark); transform: translateY(-1px); }
`

export const InfoSection = styled.div`
  padding: 20px 24px;
`

export const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid var(--bg-surface);
  &:last-child { border-bottom: none; }
`

export const InfoLabel = styled.span`
  font-size: 15px;
  color: var(--text-secondary);
`

export const InfoValue = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--text-primary);
`

export const CategoryBadge = styled.span<{ $color: string }>`
  display: inline-block;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  background: ${p => p.$color}15;
  color: ${p => p.$color};
`

export const RoleCodeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--bg-surface);
  padding: 16px 20px;
  border-radius: 35px;
  margin-top: 8px;
`

export const RoleCodeLabel = styled.span`
  font-size: 14px;
  color: var(--text-secondary);
`

export const RoleCodeValue = styled.span`
  font-size: 18px;
  font-weight: 700;
  color: var(--text-primary);
  font-family: 'SF Mono', monospace;
  letter-spacing: 1px;
`

export const ActionsSection = styled.div`
  display: flex;
  gap: 12px;
  padding: 0 24px 24px;
`

export const ActionButton = styled.button<{ $primary?: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border-radius: 35px;
  border: 1px solid 'var(--border-color)';
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  ${(p) => p.$primary ? `
    background: var(--primary);
    color: var(--textOnPrimary);
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
    &:hover { background: var(--primary-dark); transform: translateY(-1px); }
  ` : `
    background: var(--bg-surface);
    color: var(--text-primary);
    &:hover { background: var(--bg-surface); }
  `}
  &:active { transform: scale(0.98); }
`

export const DangerButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  background: rgba(255,59,48,0.1);
  color: var(--error);
  border: none;
  cursor: pointer;
  width: 100%;
  margin-top: 12px;
  transition: all 0.2s;
  &:hover { background: rgba(255,59,48,0.2); }
`

export const CardSection = styled.div`
  padding: 20px 24px;
  border-top: 1px solid var(--bg-surface);
`

export const SectionTitle = styled.div`
  font-size: 13px;
  font-weight: 600;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 16px;
`

export const ScheduleGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const ScheduleChip = styled.span`
  padding: 10px 14px;
  background: var(--bg-surface);
  border-radius: 12px;
  font-size: 13px;
  color: var(--text-primary);
  font-weight: 500;
`

export const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
`

export const DeleteModalContent = styled.div`
  background: white;
  border-radius: 20px;
  padding: 24px;
  width: 100%;
  max-width: 320px;
  text-align: center;
`

export const DeleteModalTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 12px 0;
`

export const DeleteModalText = styled.p`
  font-size: 15px;
  color: var(--text-secondary);
  margin: 0 0 24px 0;
`

export const DeleteModalButton = styled.button<{ $danger?: boolean }>`
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  border: 1px solid var(--border-color);
  cursor: pointer;
  background: ${(p) => p.$danger ? 'var(--error)' : 'var(--bg-surface)'};
  color: ${(p) => p.$danger ? 'var(--textOnPrimary)' : 'var(--text-primary)'};
  &:hover { opacity: 0.9; }
`

export const CameraModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

export const CameraVideo = styled.video`
  width: 100%;
  max-width: 400px;
  border-radius: 20px;
`

export const CameraButtons = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 20px;
`

export const CaptureButton = styled.button`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: white;
  border: 4px solid var(--primary);
  cursor: pointer;
  transition: transform 0.2s;
  &:hover { transform: scale(1.05); }
  &:active { transform: scale(0.95); }
`

export const CloseCameraButton = styled.button`
  padding: 14px 28px;
  background: var(--error);
  color: var(--textOnPrimary);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
`