import { useState } from 'react';
import { api } from '@/services';

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