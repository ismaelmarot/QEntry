import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineQrcode, HiOutlineSwitchHorizontal, HiOutlinePlusCircle, HiOutlineArrowLeft, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { Html5Qrcode } from 'html5-qrcode';
import { api } from '../services/api';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 24px;
  color: #1C1C1E;

  @media (min-width: 768px) {
    font-size: 34px;
  }
`;

const Section = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #1C1C1E;
  text-align: center;
`;

const OptionsGrid = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
`;

const OptionCard = styled.button<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 24px;
  background: ${(p) => p.$active ? '#007AFF' : '#F2F2F7'};
  border-radius: 16px;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  min-width: 100px;

  ${(p) => p.$active && `
    box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const OptionIcon = styled.span<{ $color: string; $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${(p) => p.$active ? 'white' : p.$color};
  color: ${(p) => p.$active ? '#007AFF' : 'white'};
`;

const OptionLabel = styled.span<{ $active?: boolean }>`
  font-size: 14px;
  font-weight: 600;
  color: ${(p) => p.$active ? 'white' : '#1C1C1E'};
`;

const ContentArea = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  min-height: 400px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #007AFF;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

const PlaceholderText = styled.p`
  text-align: center;
  color: #8E8E93;
  font-size: 16px;
  padding: 60px 20px;
`;

type ViewType = 'none' | 'scanner' | 'manual' | 'addPerson';

export function InOut() {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<ViewType>('none');

  const handleOptionClick = (view: ViewType) => {
    if (view === 'manual') {
      navigate('/manual');
    } else if (view === 'addPerson') {
      navigate('/persons/new');
    } else {
      setCurrentView(view);
    }
  };

  return (
    <Container>
      <Title>IN/OUT</Title>
      
      <Section>
        <SectionTitle>Seleccione una opción</SectionTitle>
        <OptionsGrid>
          <OptionCard $active={currentView === 'scanner'} onClick={() => handleOptionClick('scanner')}>
            <OptionIcon $color="#007AFF" $active={currentView === 'scanner'}>
              <HiOutlineQrcode size={24} />
            </OptionIcon>
            <OptionLabel $active={currentView === 'scanner'}>Escáner QR</OptionLabel>
          </OptionCard>

          <OptionCard $active={currentView === 'manual'} onClick={() => handleOptionClick('manual')}>
            <OptionIcon $color="#FF9500" $active={currentView === 'manual'}>
              <HiOutlineSwitchHorizontal size={24} />
            </OptionIcon>
            <OptionLabel $active={currentView === 'manual'}>Carga Manual</OptionLabel>
          </OptionCard>

          <OptionCard $active={currentView === 'addPerson'} onClick={() => handleOptionClick('addPerson')}>
            <OptionIcon $color="#34C759" $active={currentView === 'addPerson'}>
              <HiOutlinePlusCircle size={24} />
            </OptionIcon>
            <OptionLabel $active={currentView === 'addPerson'}>Agregar Persona</OptionLabel>
          </OptionCard>
        </OptionsGrid>
      </Section>

      <ContentArea>
        {currentView === 'none' && (
          <PlaceholderText>Seleccione una opción arriba</PlaceholderText>
        )}
{currentView === 'scanner' && (
          <EmbeddedScanner onBack={() => setCurrentView('none')} />
        )}
        {currentView === 'manual' && (
          <ManualLoadView onBack={() => setCurrentView('none')} />
        )}
        {currentView === 'addPerson' && (
          <AddPersonView onBack={() => setCurrentView('none')} />
        )}
      </ContentArea>
    </Container>
  );
}

function ManualLoadView({ onBack }: { onBack: () => void }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

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
        p.dni?.toLowerCase().includes(query.toLowerCase()) || 
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

  const handleRegister = async (type: 'entry' | 'exit') => {
    if (!selectedPerson) return;
    try {
      const data = await api.scan.process(selectedPerson.id, type);
      setResult({ success: true, message: data.message });
      setSelectedPerson(null);
      setSearchQuery('');
      setSearchResults([]);
      setTimeout(() => setResult(null), 3000);
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    }
  };

  return (
    <ManualContainer>
      {result && (
        <StatusCard $success={result.success}>
          <StatusIconWrapper $success={result.success}>
            {result.success ? <HiCheckCircle size={40} /> : <HiXCircle size={40} />}
          </StatusIconWrapper>
          <StatusText $success={result.success}>{result.message}</StatusText>
        </StatusCard>
      )}

      {!selectedPerson ? (
        <>
          <SearchInput
            placeholder="Buscar por DNI, nombre o apellido"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <SearchResults>
            {searching ? (
              <NoResults>Buscando...</NoResults>
            ) : searchResults.length > 0 ? (
              searchResults.map((person) => (
                <SearchResultItem key={person.id} onClick={() => { setSelectedPerson(person); setSearchQuery(''); setSearchResults([]); }}>
                  <PersonAvatar $src={person.photo_url}>
                    {!person.photo_url && <span>{person.first_name?.charAt(0)}</span>}
                  </PersonAvatar>
                  <PersonDetails>
                    <PersonNameResult>{person.last_name} {person.first_name}</PersonNameResult>
                    <PersonMetaResult>{person.dni ? `DNI: ${person.dni}` : 'Sin DNI'}</PersonMetaResult>
                  </PersonDetails>
                </SearchResultItem>
              ))
            ) : searchQuery.length >= 2 ? (
              <NoResults>No se encontraron resultados</NoResults>
            ) : null}
          </SearchResults>
        </>
      ) : (
        <SelectedCard>
          <SelectedHeader>
            <PersonAvatar $src={selectedPerson.photo_url} style={{ width: 50, height: 50 }}>
              {!selectedPerson.photo_url && <span style={{ fontSize: 20 }}>{selectedPerson.first_name?.charAt(0)}</span>}
            </PersonAvatar>
            <div>
              <SelectedName>{selectedPerson.last_name} {selectedPerson.first_name}</SelectedName>
              <PersonMetaResult>{selectedPerson.dni ? `DNI: ${selectedPerson.dni}` : 'Sin DNI'}</PersonMetaResult>
            </div>
          </SelectedHeader>
          <ChangeButton onClick={() => setSelectedPerson(null)}>Cambiar persona</ChangeButton>
          <ActionButtons>
            <ActionButton $entry onClick={() => handleRegister('entry')}>Entrada</ActionButton>
            <ActionButton onClick={() => handleRegister('exit')}>Salida</ActionButton>
          </ActionButtons>
        </SelectedCard>
      )}
    </ManualContainer>
  );
}

const ManualContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #E5E5EA;
  border-radius: 12px;
  font-size: 16px;
  background: #F2F2F7;
  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
  }
`;

const SearchResults = styled.div`
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
  &:hover { background: #E5E5EA; }
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
  font-size: 14px;
  color: #8E8E93;
  img { width: 100%; height: 100%; object-fit: cover; }
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

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: #8E8E93;
`;

const SelectedCard = styled.div`
  background: #F2F2F7;
  padding: 20px;
  border-radius: 16px;
`;

const SelectedHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const SelectedName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1C1C1E;
`;

const ChangeButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  color: #007AFF;
  background: transparent;
  border: none;
  cursor: pointer;
  margin-bottom: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
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
  &:active { transform: scale(0.98); }
`;

const StatusCard = styled.div<{ $success: boolean }>`
  padding: 16px;
  border-radius: 12px;
  text-align: center;
  background: ${(p) => p.$success ? '#E8FCE8' : '#FFE5E5'};
`;

const StatusIconWrapper = styled.div<{ $success: boolean }>`
  color: ${(p) => p.$success ? '#34C759' : '#FF3B30'};
  margin-bottom: 8px;
`;

const StatusText = styled.div<{ $success: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => p.$success ? '#34C759' : '#FF3B30'};
`;

function AddPersonView({ onBack }: { onBack: () => void }) {
  const navigate = useNavigate();
  return (
    <PlaceholderText>
      <button onClick={() => navigate('/persons/new')} style={{ 
        padding: '16px 32px', 
        background: '#007AFF', 
        color: 'white', 
        border: 'none', 
        borderRadius: '12px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer'
      }}>
        Nueva Persona
      </button>
    </PlaceholderText>
  );
}

function EmbeddedScanner({ onBack }: { onBack: () => void }) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef(false);
  const isStartingRef = useRef(false);
  const [result, setResult] = useState<{ success: boolean; message: string; person?: any } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const stopScanner = async () => {
    if (scannerRef.current && isScanningRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
        console.log('Scanner stop error (may be normal):', e);
      }
      scannerRef.current = null;
      isScanningRef.current = false;
    }
  };

  const startScannerInternal = async () => {
    if (isScanningRef.current || isStartingRef.current) return;
    isStartingRef.current = true;
    try {
      const scanner = new Html5Qrcode('qr-reader-inout');
      scannerRef.current = scanner;
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 200, height: 200 } },
        async (decodedText) => {
          try {
            const data = await api.scan.process(decodedText);
            setResult({ success: true, message: data.message, person: data.person });
          } catch (err: any) {
            setResult({ success: false, message: err.message });
          }
        },
        () => {}
      );
      isScanningRef.current = true;
    } catch (e) {
      console.error('Scanner error:', e);
    } finally {
      isStartingRef.current = false;
    }
  };

  useEffect(() => {
    let mounted = true;
    
    const startScanner = async () => {
      if (isScanningRef.current || isStartingRef.current) return;
      
      isStartingRef.current = true;
      setError(null);
      
      try {
        const scanner = new Html5Qrcode('qr-reader-inout');
        scannerRef.current = scanner;
        
        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 200, height: 200 } },
          async (decodedText) => {
            if (!mounted) return;
            try {
              const data = await api.scan.process(decodedText);
              setResult({ success: true, message: data.message, person: data.person });
            } catch (err: any) {
              setResult({ success: false, message: err.message });
            }
          },
          () => {}
        );
        
        if (mounted) {
          isScanningRef.current = true;
        }
      } catch (e: any) {
        if (mounted) {
          console.error('Scanner error:', e);
          setError(e.message || 'Error al iniciar el escáner');
        }
      } finally {
        if (mounted) {
          isStartingRef.current = false;
        }
      }
    };

    startScanner();

    return () => {
      mounted = false;
      stopScanner();
    };
  }, []);

  const handleReset = async () => {
    setResult(null);
    isScanningRef.current = false;
    isStartingRef.current = false;
    await stopScanner();
    setTimeout(() => startScannerInternal(), 100);
  };

  return (
    <EmbeddedContainer>
      <ScannerBox>
        <div id="qr-reader-inout" style={{ width: '100%', height: '100%' }} />
      </ScannerBox>
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
            {result.success ? <HiCheckCircle size={40} /> : <HiXCircle size={40} />}
          </StatusIconWrapper>
          <StatusText $success={result.success}>{result.message}</StatusText>
          {result.person && <PersonMetaResult>{result.person.first_name} {result.person.last_name}</PersonMetaResult>}
          <ResetButton onClick={handleReset}>Escanear otro</ResetButton>
        </StatusCard>
      )}
    </EmbeddedContainer>
  );
}

const EmbeddedContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ScannerBox = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 16px;
  overflow: hidden;
  background: #1C1C1E;
`;

const ResetButton = styled.button`
  margin-top: 12px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 600;
  color: #007AFF;
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