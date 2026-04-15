import styled from 'styled-components';
import { HiCheckCircle, HiXCircle, HiArrowDown, HiArrowUp } from 'react-icons/hi';
import { useInOutCamera } from './useInOutCamera';

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

  /* Override library's default styles */
  & > div:first-child {
    display: none !important;
  }

  /* Hide the bottom bar completely */
  & > div:last-child {
    display: none !important;
  }

  /* Target any potential dashboard elements */
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

const StatusCard = styled.div<{ $success: boolean }>`
  padding: 20px;
  border-radius: 16px;
  text-align: center;
  background: ${(p) => p.$success ? '#E8FCE8' : '#FFE5E5'};
`;

const StatusIconWrapper = styled.div<{ $success: boolean }>`
  color: ${(p) => p.$success ? '#34C759' : '#FF3B30'};
  margin-bottom: 12px;
`;

const StatusText = styled.div<{ $success: boolean }>`
  font-size: 18px;
  font-weight: 700;
  color: ${(p) => p.$success ? '#34C759' : '#FF3B30'};
  margin-bottom: 8px;
`;

const ActionBadge = styled.div<{ $type: 'entry' | 'exit' }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: ${(p) => p.$type === 'entry' ? '#34C759' : '#FF9500'};
  color: white;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const PersonMetaResult = styled.div`
  font-size: 14px;
  color: #8E8E93;
  margin-top: 8px;
`;

const ResetButton = styled.button`
  margin-top: 16px;
  padding: 12px 24px;
  font-size: 15px;
  font-weight: 600;
  color: #007AFF;
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const LoadingText = styled.div`
  text-align: center;
  padding: 20px;
  color: #8E8E93;
  font-size: 14px;
`;

export function InOutCamera() {
  const { result, error, isScanning, handleReset } = useInOutCamera();

  const getActionType = (message: string): 'entry' | 'exit' => {
    if (message.toLowerCase().includes('ingreso') || message.toLowerCase().includes('entrada')) {
      return 'entry';
    }
    return 'exit';
  };

  return (
    <EmbeddedContainer>
      <ScannerBox>
        <div id="qr-reader-inout" style={{ width: '100%', height: '100%' }} />
      </ScannerBox>
      
      {!isScanning && !result && !error && (
        <LoadingText>Iniciando cámara...</LoadingText>
      )}
      
      {error && (
        <StatusCard $success={false}>
          <StatusIconWrapper $success={false}>
            <HiXCircle size={40} />
          </StatusIconWrapper>
          <StatusText $success={false}>{error}</StatusText>
        </StatusCard>
      )}
      
      {result && (
        <StatusCard $success={result.success}>
          <StatusIconWrapper $success={result.success}>
            {result.success ? <HiCheckCircle size={48} /> : <HiXCircle size={48} />}
          </StatusIconWrapper>
          
          {result.success && (
            <ActionBadge $type={getActionType(result.message)}>
              {getActionType(result.message) === 'entry' ? (
                <>
                  <HiArrowDown size={16} />
                  INGRESO
                </>
              ) : (
                <>
                  <HiArrowUp size={16} />
                  EGRESO
                </>
              )}
            </ActionBadge>
          )}
          
          <StatusText $success={result.success}>{result.message}</StatusText>
          
          {result.person && (
            <PersonMetaResult>
              {result.person.first_name} {result.person.last_name}
            </PersonMetaResult>
          )}
          
          <ResetButton onClick={handleReset}>Escanear otro</ResetButton>
        </StatusCard>
      )}
    </EmbeddedContainer>
  );
}