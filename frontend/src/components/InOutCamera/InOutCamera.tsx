import { useState } from 'react';
import styled from 'styled-components';
import { useInOutCamera } from './useInOutCamera';
import { Icons } from '@/constants';

const EmbeddedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const ScannerBox = styled.div`
  width: 400px;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  background: #1C1C1E;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 500px) {
    width: 100%;
    max-width: 360px;
    height: 360px;
  }

  #qr-reader-inout {
    border: none !important;
    background: transparent !important;
    padding: 0 !important;
    min-height: auto !important;
  }

  #qr-reader-inout video {
    border-radius: 16px;
    object-fit: cover !important;
    width: 100% !important;
    height: 100% !important;
  }

  #qr-reader-inout__scan_region {
    background: transparent !important;
    border: none !important;
    padding: 0 !important;
    
    img {
      display: none !important;
    }
  }

  #qr-reader-inout__dashboard {
    display: none !important;
  }

  #qr-reader-inout__dashboard_section {
    display: none !important;
  }

  #qr-reader-inout__dashboard_section_csr, 
  #qr-reader-inout__dashboard_section_swap,
  #qr-reader-inout__dashboard_section_ps {
    display: none !important;
  }
  
  .css-1m6zdlx {
    display: none !important;
  }

  div[id*="qr-reader-inout"] {
    display: none !important;
  }

  & > div:first-child {
    display: none !important;
  }

  & > div:last-child {
    display: none !important;
  }

  & > * {
    display: none !important;
  }

  #qr-reader-inout video {
    display: block !important;
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
  }
`;

const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const PopupCard = styled.div`
  background: white;
  border-radius: 24px;
  padding: 24px;
  width: 100%;
  max-width: 360px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  position: relative;
`;

const PersonInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
`;

const Avatar = styled.div<{ $src?: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : '#E5E5EA'};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #8E8E93;
  font-weight: 600;
`;

const PersonName = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #1C1C1E;
  margin: 0;
  text-align: center;
`;

const PersonMeta = styled.p`
  font-size: 14px;
  color: #8E8E93;
  margin: 0;
`;

const StatusBadge = styled.div<{ $type: 'in' | 'out' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: ${(p) => p.$type === 'in' ? '#34C759' : '#FF9500'};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button<{ $variant: 'in' | 'out' }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  background: ${(p) => p.$variant === 'in' ? '#34C759' : '#FF9500'};
  color: white;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px ${(p) => p.$variant === 'in' ? 'rgba(52, 199, 89, 0.3)' : 'rgba(255, 149, 0, 0.3)'};
  }

  &:active {
    transform: scale(0.98);
  }
`;

const CancelButton = styled.button`
  width: 100%;
  padding: 14px;
  font-size: 15px;
  font-weight: 600;
  color: #8E8E93;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-top: 12px;
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #8E8E93;
  font-size: 14px;
`;

const CloseIcon = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: #F2F2F7;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #8E8E93;
  
  &:active {
    background: #E5E5EA;
  }
`;

const ConfirmTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #1C1C1E;
  text-align: center;
  margin-bottom: 8px;
`;

const ConfirmSubtitle = styled.div`
  font-size: 15px;
  color: #8E8E93;
  text-align: center;
  margin-bottom: 24px;
`;

const ConfirmButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ConfirmButton = styled.button<{ $variant?: 'in' | 'out' }>`
  flex: 1;
  padding: 16px;
  font-size: 17px;
  font-weight: 600;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  
  ${(p) => p.$variant === 'in' ? `
    background: #34C759;
    color: white;
    
    &:active {
      background: #2DBF4E;
      transform: scale(0.98);
    }
  ` : p.$variant === 'out' ? `
    background: #FF9500;
    color: white;
    
    &:active {
      background: #E68600;
      transform: scale(0.98);
    }
  ` : `
    background: #F2F2F7;
    color: #007AFF;
    
    &:active {
      background: #E5E5EA;
      transform: scale(0.98);
    }
  `}
`;

export function InOutCamera() {
  const [confirmAction, setConfirmAction] = useState<'entry' | 'exit' | null>(null)
  const { 
    result, 
    error, 
    isScanning, 
    showPopup, 
    pendingPerson, 
    currentStatus, 
    handleConfirm, 
    handleClosePopup,
    handleReset 
  } = useInOutCamera();

  return (
    <EmbeddedContainer>
      <ScannerBox>
        <div id="qr-reader-inout" style={{ width: '100%', height: '100%' }} />
      </ScannerBox>
      
      {!isScanning && !result && !error && (
        <LoadingText>Apuntá al código QR</LoadingText>
      )}
      
      {error && (
        <PopupCard>
          <PersonInfo>
            <PersonName>{error}</PersonName>
          </PersonInfo>
        </PopupCard>
      )}
      
      {result && (
        <PopupCard>
          <PersonInfo>
            <PersonName>{result.message}</PersonName>
            {result.person && (
              <PersonMeta>{result.person.first_name} {result.person.last_name}</PersonMeta>
            )}
          </PersonInfo>
        </PopupCard>
      )}
      
      {showPopup && pendingPerson && (
        <PopupOverlay>
          <PopupCard>
            <CloseIcon onClick={handleClosePopup}>
              <Icons.x size={18} />
            </CloseIcon>
            
            <PersonInfo>
              <Avatar $src={pendingPerson.photo_url}>
                {!pendingPerson.photo_url && pendingPerson.first_name?.charAt(0)}
              </Avatar>
              <PersonName>
                {pendingPerson.last_name} {pendingPerson.first_name}
              </PersonName>
              {pendingPerson.dni && (
                <PersonMeta>DNI: {pendingPerson.dni}</PersonMeta>
              )}
            </PersonInfo>

            <StatusBadge $type={currentStatus === 'inside' ? 'out' : 'in'}>
              {currentStatus === 'inside' ? 'Dentro del edificio' : 'Fuera del edificio'}
            </StatusBadge>

            {currentStatus === 'outside' ? (
              <>
                <ConfirmTitle>Registrar Entrada</ConfirmTitle>
                <ConfirmSubtitle>¿Deseas registrar el ingreso de esta persona?</ConfirmSubtitle>
                <ConfirmButtons>
                  <ConfirmButton $variant="in" onClick={() => handleConfirm('entry')}>
                    Confirmar Check IN
                  </ConfirmButton>
                </ConfirmButtons>
              </>
            ) : (
              <>
                <ConfirmTitle>Registrar Salida</ConfirmTitle>
                <ConfirmSubtitle>¿Deseas registrar la salida de esta persona?</ConfirmSubtitle>
                <ConfirmButtons>
                  <ConfirmButton $variant="out" onClick={() => handleConfirm('exit')}>
                    Confirmar Check OUT
                  </ConfirmButton>
                </ConfirmButtons>
              </>
            )}

            <CancelButton onClick={handleClosePopup}>
              Cancelar
            </CancelButton>
          </PopupCard>
        </PopupOverlay>
      )}
    </EmbeddedContainer>
  );
}