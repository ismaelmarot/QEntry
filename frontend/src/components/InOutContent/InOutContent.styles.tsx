import { useState } from 'react';
import styled from 'styled-components';
import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { api } from '@/services';

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

export function useInOutContent() {
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

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    selectedPerson,
    setSelectedPerson,
    searching,
    result,
    handleSearch,
    handleRegister,
  };
}

export const InOutContentComponents = {
  ManualContainer,
  SearchInput,
  SearchResults,
  SearchResultItem,
  PersonAvatar,
  PersonDetails,
  PersonNameResult,
  PersonMetaResult,
  NoResults,
  SelectedCard,
  SelectedHeader,
  SelectedName,
  ChangeButton,
  ActionButtons,
  ActionButton,
  StatusCard,
  StatusIconWrapper,
  StatusText,
};