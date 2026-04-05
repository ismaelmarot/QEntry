import { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { Html5Qrcode } from 'html5-qrcode';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { IoCameraOutline, IoDocumentTextOutline } from 'react-icons/io5';
import { api } from '../services/api';
import { QRCodeSVG } from 'qrcode.react';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
  text-align: center;
  color: #1C1C1E;

  @media (min-width: 768px) {
    font-size: 34px;
  }
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  background: #E5E5EA;
  padding: 4px;
  border-radius: 12px;
`;

const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 12px 16px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
  background: ${(p) => (p.$active ? 'white' : 'transparent')};
  color: ${(p) => (p.$active ? '#007AFF' : '#8E8E93')};
  box-shadow: ${(p) => (p.$active ? '0 2px 8px rgba(0,0,0,0.08)' : 'none')};
  transition: all 0.2s;
`;

const TabIcon = styled.span`
  display: flex;
  align-items: center;
`;

const ScannerBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 20px;
  overflow: hidden;
  background: #1C1C1E;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
`;

const StatusCard = styled.div<{ $success: boolean }>`
  margin-top: 20px;
  padding: 24px 20px;
  border-radius: 16px;
  text-align: center;
  background: ${(p) => (p.$success ? '#E8FCE8' : '#FFE5E5')};
  animation: slideUp 0.3s ease;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const StatusIconWrapper = styled.div<{ $success: boolean }>`
  display: flex;
  justify-content: center;
  margin-bottom: 12px;
  color: ${(p) => (p.$success ? '#34C759' : '#FF3B30')};
`;

const StatusText = styled.div<{ $success: boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(p) => (p.$success ? '#34C759' : '#FF3B30')};
`;

const PersonInfo = styled.div`
  margin-top: 12px;
  font-size: 16px;
  color: #1C1C1E;
  font-weight: 500;
`;

const Button = styled.button`
  width: 100%;
  padding: 16px;
  background: #007AFF;
  color: white;
  font-size: 17px;
  font-weight: 600;
  border-radius: 12px;
  margin-top: 16px;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

const ManualCard = styled.div`
  background: white;
  padding: 24px 20px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid #E5E5EA;
  border-radius: 12px;
  font-size: 16px;
  background: #F2F2F7;
  margin-bottom: 16px;
  transition: all 0.2s;

  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: #34C759;
  color: white;
  font-size: 17px;
  font-weight: 600;
  border-radius: 12px;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

const QRPreview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px;
  background: white;
  border-radius: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
`;

const QRCodeWrapper = styled.div`
  padding: 20px;
  background: white;
  border-radius: 16px;
  border: 1px solid #E5E5EA;
  margin-bottom: 20px;
`;

const PersonName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1C1C1E;
`;

const HelperText = styled.p`
  font-size: 13px;
  color: #8E8E93;
  text-align: center;
  margin-top: 12px;
`;

export function Scanner() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'manual' ? 'manual' : searchParams.get('mode') === 'preview' ? 'preview' : 'scan';
  const [mode, setMode] = useState<'scan' | 'manual' | 'preview'>(initialMode);
  const [result, setResult] = useState<{ success: boolean; message: string; person?: any } | null>(null);
  const [manualId, setManualId] = useState('');
  const [previewId, setPreviewId] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (mode === 'scan') {
      startScanner();
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, [mode]);

  const startScanner = async () => {
    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        () => {}
      );
    } catch (e) {
      console.error('Scanner error:', e);
    }
  };

  const onScanSuccess = async (decodedText: string) => {
    await processScan(decodedText);
  };

  const processScan = async (personId: string) => {
    try {
      const data = await api.scan.process(personId);
      setResult({ success: true, message: data.message, person: data.person });
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    }
  };

  const handleManualSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualId.trim()) return;
    await processScan(manualId.trim());
    setManualId('');
  };

  const handlePreviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewId.trim()) return;
    try {
      await api.person.get(previewId.trim());
      setShowPreview(true);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const reset = () => {
    setResult(null);
    if (mode === 'scan') {
      startScanner();
    }
  };

  return (
    <Container>
      <Title>Escanear QR</Title>
      
      <Tabs>
        <Tab $active={mode === 'scan'} onClick={() => { setMode('scan'); setResult(null); }}>
          <TabIcon><IoCameraOutline size={18} /></TabIcon>
          Cámara
        </Tab>
        <Tab $active={mode === 'manual'} onClick={() => { setMode('manual'); setResult(null); }}>Manual</Tab>
        <Tab $active={mode === 'preview'} onClick={() => { setMode('preview'); setResult(null); setShowPreview(false); }}>
          <TabIcon><IoDocumentTextOutline size={18} /></TabIcon>
          Credencial
        </Tab>
      </Tabs>

      {mode === 'scan' && (
        <>
          <ScannerBox>
            <div id="qr-reader" style={{ width: '100%', height: '100%' }} />
          </ScannerBox>
          {result && (
            <StatusCard $success={result.success}>
              <StatusIconWrapper $success={result.success}>
                {result.success ? <HiCheckCircle size={56} /> : <HiXCircle size={56} />}
              </StatusIconWrapper>
              <StatusText $success={result.success}>{result.message}</StatusText>
              {result.person && <PersonInfo>{result.person.first_name} {result.person.last_name}</PersonInfo>}
              <Button onClick={reset}>Escanear otro</Button>
            </StatusCard>
          )}
        </>
      )}

      {mode === 'manual' && (
        <ManualCard>
          <form onSubmit={handleManualSubmit}>
            <Input
              placeholder="Ingrese ID de persona"
              value={manualId}
              onChange={(e) => setManualId(e.target.value)}
            />
            <SubmitButton type="submit">Registrar acceso</SubmitButton>
          </form>
          <HelperText>El ID se encuentra en la credencial de la persona</HelperText>
          {result && (
            <StatusCard $success={result.success} style={{ marginTop: 20 }}>
              <StatusIconWrapper $success={result.success}>
                {result.success ? <HiCheckCircle size={56} /> : <HiXCircle size={56} />}
              </StatusIconWrapper>
              <StatusText $success={result.success}>{result.message}</StatusText>
            </StatusCard>
          )}
        </ManualCard>
      )}

      {mode === 'preview' && (
        <ManualCard>
          <form onSubmit={handlePreviewSubmit}>
            <Input
              placeholder="Ingrese ID de persona"
              value={previewId}
              onChange={(e) => setPreviewId(e.target.value)}
            />
            <SubmitButton type="submit">Ver credencial</SubmitButton>
          </form>
          {showPreview && previewId && (
            <QRPreview>
              <QRCodeWrapper>
                <QRCodeSVG value={previewId} size={200} />
              </QRCodeWrapper>
              <PersonName>ID: {previewId}</PersonName>
            </QRPreview>
          )}
        </ManualCard>
      )}
    </Container>
  );
}