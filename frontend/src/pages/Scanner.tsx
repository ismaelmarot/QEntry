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

const SearchResults = styled.div`
  margin-top: 16px;
  max-height: 300px;
  overflow-y: auto;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #F2F2F7;
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #E5E5EA;
  }
`;

const PersonAvatar = styled.div<{ $src?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : '#E5E5EA'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const PersonDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const PersonNameResult = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #1C1C1E;
`;

const PersonMetaResult = styled.div`
  font-size: 13px;
  color: #8E8E93;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 16px;
`;

const ActionButton = styled.button<{ $entry?: boolean }>`
  flex: 1;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 12px;
  background: ${(p) => p.$entry ? '#34C759' : '#FF9500'};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s;

  &:active {
    transform: scale(0.98);
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: #8E8E93;
`;

const SelectedPersonCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  margin-bottom: 20px;
`;

const SelectedPersonHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const SelectedPersonName = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #1C1C1E;
`;

const ClearButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #FF3B30;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const AddNewPersonButton = styled.button`
  width: 100%;
  padding: 14px;
  background: #F2F2F7;
  border: 1px dashed #007AFF;
  border-radius: 12px;
  color: #007AFF;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 8px;
  &:hover { background: #E5E5EA; }
`;

const NewPersonForm = styled.form`
  background: #F2F2F7;
  padding: 20px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1C1C1E;
  text-align: center;
  margin-bottom: 8px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 12px;
`;

const FormInput = styled.input`
  flex: 1;
  padding: 12px 14px;
  border: 1px solid #E5E5EA;
  border-radius: 10px;
  font-size: 15px;
  background: white;
  &:focus {
    border-color: #007AFF;
    outline: none;
  }
`;

const FormButtons = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const FormCancelButton = styled.button`
  flex: 1;
  padding: 12px;
  background: #F2F2F7;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: #8E8E93;
  cursor: pointer;
`;

const FormSaveButton = styled.button<{ disabled?: boolean }>`
  flex: 1;
  padding: 12px;
  background: #007AFF;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  opacity: ${(p) => p.disabled ? 0.6 : 1};
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
  const [scannerReady, setScannerReady] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [searching, setSearching] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [showNewPerson, setShowNewPerson] = useState(false);
  const [newPersonData, setNewPersonData] = useState({ first_name: '', last_name: '', dni: '' });
  const [savingPerson, setSavingPerson] = useState(false);

  useEffect(() => {
    setInitialRender(false);
  }, []);

  useEffect(() => {
    if (initialRender) return;
    
    if (mode === 'scan') {
      startScanner();
    } else {
      if (scannerRef.current) {
        scannerRef.current.stop().then(() => {
          scannerRef.current = null;
          setScannerReady(false);
        }).catch(() => {
          scannerRef.current = null;
          setScannerReady(false);
        });
      }
    }
  }, [mode, initialRender]);

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
        scannerRef.current = null;
      }
    };
  }, []);

  const startScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {}
    }
    
    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        onScanSuccess,
        () => {}
      );
      setScannerReady(true);
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
    setSelectedPerson(null);
    setSearchQuery('');
    setSearchResults([]);
    if (mode === 'scan') {
      startScanner();
    }
  };

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }
    setSearching(true);
    try {
      const persons = await api.person.getAll();
      const filtered = persons.filter((p: any) => 
        p.dni?.includes(query) || 
        p.first_name?.toLowerCase().includes(query.toLowerCase()) ||
        p.last_name?.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectPerson = (person: any) => {
    setSelectedPerson(person);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleRegisterAccess = async (type: 'entry' | 'exit') => {
    if (!selectedPerson) return;
    try {
      const data = await api.scan.process(selectedPerson.id, type);
      setResult({ success: true, message: data.message, person: selectedPerson });
      setSelectedPerson(null);
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    }
  };

  const handleCreatePerson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersonData.first_name.trim() || !newPersonData.last_name.trim()) return;
    
    setSavingPerson(true);
    try {
      const person = await api.person.create({
        first_name: newPersonData.first_name.trim(),
        last_name: newPersonData.last_name.trim(),
        dni: newPersonData.dni.trim() || undefined,
      });
      setShowNewPerson(false);
      setNewPersonData({ first_name: '', last_name: '', dni: '' });
      setSelectedPerson(person);
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    } finally {
      setSavingPerson(false);
    }
  };

  return (
    <Container>
      <Title>Escanear QR</Title>
      
      <Tabs>
        <Tab $active={mode === 'scan'} onClick={() => { 
          setMode('scan'); 
          setResult(null);
          startScanner();
        }}>
          <TabIcon><IoCameraOutline size={18} /></TabIcon>
          Cámara
        </Tab>
        <Tab $active={mode === 'manual'} onClick={() => { 
          if (scannerRef.current && scannerReady) {
            scannerRef.current.stop().catch(() => {}).finally(() => {
              setScannerReady(false);
              setMode('manual');
              setResult(null);
            });
          } else {
            setMode('manual');
            setResult(null);
          }
        }}>Manual</Tab>
        <Tab $active={mode === 'preview'} onClick={() => { 
          if (scannerRef.current && scannerReady) {
            scannerRef.current.stop().catch(() => {}).finally(() => {
              setScannerReady(false);
              setMode('preview');
              setResult(null);
              setShowPreview(false);
            });
          } else {
            setMode('preview');
            setResult(null);
            setShowPreview(false);
          }
        }}>
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
          {!selectedPerson ? (
            <>
              <Input
                placeholder="Buscar por DNI, nombre o apellido"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                autoFocus
              />
              {searchQuery.length > 0 && (
                <SearchResults>
                  {searching ? (
                    <NoResults>Buscando...</NoResults>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((person) => (
                      <SearchResultItem key={person.id} onClick={() => handleSelectPerson(person)}>
                        <PersonAvatar $src={person.photo_url}>
                          {!person.photo_url && <span style={{ fontSize: 12, color: '#8E8E93' }}>{person.first_name?.charAt(0)}</span>}
                        </PersonAvatar>
                        <PersonDetails>
                          <PersonNameResult>{person.last_name} {person.first_name}</PersonNameResult>
                          <PersonMetaResult>{person.dni ? `DNI: ${person.dni}` : 'Sin DNI'}</PersonMetaResult>
                        </PersonDetails>
                      </SearchResultItem>
                    ))
                  ) : (
                    <NoResults>No se encontraron resultados</NoResults>
                  )}
                </SearchResults>
              )}

              {searchQuery.length >= 2 && !showNewPerson && !selectedPerson && (
                <AddNewPersonButton type="button" onClick={() => setShowNewPerson(true)}>
                  + Crear nueva persona
                </AddNewPersonButton>
              )}

              {showNewPerson && (
                <NewPersonForm onSubmit={handleCreatePerson}>
                  <FormTitle>Nueva Persona</FormTitle>
                  <FormRow>
                    <FormInput
                      placeholder="Nombre"
                      value={newPersonData.first_name}
                      onChange={(e) => setNewPersonData({...newPersonData, first_name: e.target.value})}
                      required
                    />
                    <FormInput
                      placeholder="Apellido"
                      value={newPersonData.last_name}
                      onChange={(e) => setNewPersonData({...newPersonData, last_name: e.target.value})}
                      required
                    />
                  </FormRow>
                  <FormInput
                    placeholder="DNI (opcional)"
                    value={newPersonData.dni}
                    onChange={(e) => setNewPersonData({...newPersonData, dni: e.target.value})}
                  />
                  <FormButtons>
                    <FormCancelButton type="button" onClick={() => { setShowNewPerson(false); setNewPersonData({ first_name: '', last_name: '', dni: '' }); }}>
                      Cancelar
                    </FormCancelButton>
                    <FormSaveButton type="submit" disabled={savingPerson}>
                      {savingPerson ? 'Guardando...' : 'Guardar'}
                    </FormSaveButton>
                  </FormButtons>
                </NewPersonForm>
              )}
            </>
          ) : (
            <>
              <SelectedPersonCard>
                <SelectedPersonHeader>
                  <PersonAvatar $src={selectedPerson.photo_url} style={{ width: 60, height: 60 }}>
                    {!selectedPerson.photo_url && <span style={{ fontSize: 24, color: '#8E8E93' }}>{selectedPerson.first_name?.charAt(0)}</span>}
                  </PersonAvatar>
                  <div>
                    <SelectedPersonName>{selectedPerson.last_name} {selectedPerson.first_name}</SelectedPersonName>
                    <PersonMetaResult>{selectedPerson.dni ? `DNI: ${selectedPerson.dni}` : 'Sin DNI'}</PersonMetaResult>
                  </div>
                </SelectedPersonHeader>
                <ClearButton onClick={() => setSelectedPerson(null)}>Cambiar persona</ClearButton>
              </SelectedPersonCard>
              
              <ActionButtons>
                <ActionButton $entry onClick={() => handleRegisterAccess('entry')}>
                  Registrar Entrada
                </ActionButton>
                <ActionButton onClick={() => handleRegisterAccess('exit')}>
                  Registrar Salida
                </ActionButton>
              </ActionButtons>
            </>
          )}

          {result && (
            <StatusCard $success={result.success} style={{ marginTop: 20 }}>
              <StatusIconWrapper $success={result.success}>
                {result.success ? <HiCheckCircle size={56} /> : <HiXCircle size={56} />}
              </StatusIconWrapper>
              <StatusText $success={result.success}>{result.message}</StatusText>
              {result.person && <PersonInfo>{result.person.first_name} {result.person.last_name}</PersonInfo>}
              <Button onClick={reset}>Registrar otro</Button>
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