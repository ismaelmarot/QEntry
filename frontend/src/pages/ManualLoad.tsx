import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineArrowLeft, HiCheckCircle, HiXCircle, HiOutlineUser } from 'react-icons/hi';
import { api } from '../services/api';

const Container = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: var(--bg-surface);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #007AFF;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  &:hover { 
    background: var(--border-color); 
    transform: scale(1.02); 
  }
  &:active { 
    transform: scale(0.98); 
  }
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  margin: 0;
  color: var(--text-primary);
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border-color);
  border-radius: 35px;
  font-size: 16px;
  background: var(--bg-surface);
  color: var(--text-primary);
  &:focus {
    border-color: #007AFF;
    background: var(--bg-primary);
    outline: none;
  }
`;

const SearchResults = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-top: 12px;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--bg-surface);
  border-radius: 12px;
  margin-bottom: 8px;
  cursor: pointer;
  border: 1px solid var(--border-color);
  &:hover { background: var(--border-color); }
`;

const PersonAvatar = styled.div<{ $src?: string }>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : 'var(--border-color)'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  font-size: 14px;
  color: var(--text-secondary);
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const PersonDetails = styled.div`
  flex: 1;
  min-width: 0;
`;

const PersonNameResult = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: var(--text-primary);
`;

const PersonMetaResult = styled.div`
  font-size: 13px;
  color: var(--text-secondary);
`;

const NoResults = styled.div`
  text-align: center;
  padding: 20px;
  color: var(--text-secondary);
`;

const SelectedCard = styled.div`
  background: var(--bg-surface);
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
  color: var(--text-primary);
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
  margin-top: 16px;
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

export function ManualLoad() {
  const navigate = useNavigate();
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
    } catch (err: any) {
      console.error('Search error:', err);
      setSearchResults([]);
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
    <Container>
      <Header>
        <Title>Carga Manual</Title>
        <BackButton onClick={() => navigate('/')}>
          <HiOutlineArrowLeft size={20} />
        </BackButton>

      </Header>

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
            autoFocus
          />
          <SearchResults>
            {searching ? (
              <NoResults>Buscando...</NoResults>
            ) : searchResults.length > 0 ? (
              searchResults.map((person) => (
                <SearchResultItem key={person.id} onClick={() => { setSelectedPerson(person); setSearchQuery(''); setSearchResults([]); }}>
                  <PersonAvatar $src={person.photo_url}>
                    {!person.photo_url && <HiOutlineUser size={20} />}
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
              {!selectedPerson.photo_url && <HiOutlineUser size={24} />}
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
    </Container>
  );
}