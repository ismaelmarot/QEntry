import { useState } from 'react';
import styled from 'styled-components';
import { HiCheckCircle, HiXCircle, HiOutlineSearch, HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { api } from '@/services';

const ManualContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SearchWrapper = styled.div`
  position: relative;
`;

const SearchIcon = styled(HiOutlineSearch)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #8E8E93;
  font-size: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 44px;
  border: 1px solid #E5E5EA;
  border-radius: 14px;
  font-size: 16px;
  background: #F2F2F7;
  transition: all 0.2s;

  &::placeholder {
    color: #8E8E93;
  }

  &:focus {
    border-color: #007AFF;
    background: white;
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
  }
`;

const SearchResults = styled.div`
  max-height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SearchResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px;
  background: white;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid #E5E5EA;

  &:hover {
    background: #F2F2F7;
    border-color: #007AFF;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const PersonAvatar = styled.div<{ $src?: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${(p) => p.$src ? `url(${p.$src}) center/cover` : '#E5E5EA'};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  font-size: 16px;
  font-weight: 600;
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
  margin-bottom: 2px;
`;

const PersonMetaResult = styled.div`
  font-size: 13px;
  color: #8E8E93;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 32px 20px;
  color: #8E8E93;
  font-size: 15px;
  background: #F2F2F7;
  border-radius: 14px;
`;

const SelectedCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #E5E5EA;
`;

const SelectedHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;

const SelectedName = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: #1C1C1E;
  margin-bottom: 4px;
`;

const ClearButton = styled.button`
  font-size: 14px;
  color: #007AFF;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-top: 4px;

  &:active {
    opacity: 0.7;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
`;

const ActionButton = styled.button<{ $entry?: boolean }>`
  flex: 1;
  padding: 16px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  background: ${(p) => p.$entry ? '#34C759' : '#FF9500'};
  color: white;

  &:active {
    transform: scale(0.98);
  }

  &:hover {
    opacity: 0.95;
  }
`;

const StatusCard = styled.div<{ $success: boolean }>`
  padding: 24px;
  border-radius: 16px;
  text-align: center;
  background: ${(p) => p.$success ? '#E8FCE8' : '#FFE5E5'};
  border: 1px solid ${(p) => p.$success ? '#34C759' : '#FF3B30'};
`;

const StatusIconWrapper = styled.div<{ $success: boolean }>`
  color: ${(p) => p.$success ? '#34C759' : '#FF3B30'};
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
`;

const StatusText = styled.div<{ $success: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(p) => p.$success ? '#34C759' : '#FF3B30'};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: #8E8E93;
  text-align: center;
`;

const EmptyIcon = styled(HiOutlineSearch)`
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
`;

const EmptyText = styled.div`
  font-size: 15px;
`;

export function InOutContent() {
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
            {result.success ? <HiCheckCircle size={48} /> : <HiXCircle size={48} />}
          </StatusIconWrapper>
          <StatusText $success={result.success}>{result.message}</StatusText>
        </StatusCard>
      )}

      {!selectedPerson ? (
        <>
          <SearchWrapper>
            <SearchIcon />
            <SearchInput
              placeholder="Buscar por DNI, nombre o apellido"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              autoFocus
            />
          </SearchWrapper>

          {searchQuery.length > 0 && (
            <SearchResults>
              {searching ? (
                <NoResults>Buscando...</NoResults>
              ) : searchResults.length > 0 ? (
                searchResults.map((person) => (
                  <SearchResultItem 
                    key={person.id} 
                    onClick={() => { 
                      setSelectedPerson(person); 
                      setSearchQuery(''); 
                      setSearchResults([]); 
                    }}
                  >
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
                <NoResults>
                  <EmptyIcon />
                  <EmptyText>No se encontraron resultados</EmptyText>
                </NoResults>
              ) : null}
            </SearchResults>
          )}
        </>
      ) : (
        <SelectedCard>
          <SelectedHeader>
            <PersonAvatar $src={selectedPerson.photo_url} style={{ width: 56, height: 56 }}>
              {!selectedPerson.photo_url && <span style={{ fontSize: 22 }}>{selectedPerson.first_name?.charAt(0)}</span>}
            </PersonAvatar>
            <div>
              <SelectedName>{selectedPerson.last_name} {selectedPerson.first_name}</SelectedName>
              <PersonMetaResult>{selectedPerson.dni ? `DNI: ${selectedPerson.dni}` : 'Sin DNI'}</PersonMetaResult>
            </div>
          </SelectedHeader>
          
          <ActionButtons>
            <ActionButton $entry onClick={() => handleRegister('entry')}>
              <HiOutlineSwitchHorizontal size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Registrar Entrada
            </ActionButton>
            <ActionButton onClick={() => handleRegister('exit')}>
              <HiOutlineSwitchHorizontal size={18} style={{ marginRight: 8, verticalAlign: 'middle' }} />
              Registrar Salida
            </ActionButton>
          </ActionButtons>

          <ClearButton onClick={() => setSelectedPerson(null)}>
            Cambiar persona
          </ClearButton>
        </SelectedCard>
      )}
    </ManualContainer>
  );
}