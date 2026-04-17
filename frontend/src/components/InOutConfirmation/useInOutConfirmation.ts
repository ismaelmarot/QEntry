import { useState } from 'react';
import { api } from '@/services';

interface Person {
  id: string;
  first_name: string;
  last_name: string;
  dni?: string;
  type: string;
  photo_url?: string;
}

export function useInOutConfirmation() {
  const [showPopup, setShowPopup] = useState(false);
  const [pendingPerson, setPendingPerson] = useState<Person | null>(null);
  const [currentStatus, setCurrentStatus] = useState<'inside' | 'outside' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string; person?: Person } | null>(null);

  const handleScan = async (qrValue: string) => {
    setIsProcessing(true);
    try {
      const data = await api.scan.process(qrValue);
      
      setPendingPerson(data.person);
      setCurrentStatus(data.type === 'check-out' ? 'inside' : 'outside');
      setResult({ success: true, message: data.message, person: data.person });
      setShowPopup(true);
    } catch (err: any) {
      setResult({ success: false, message: err.message });
      setShowPopup(true);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConfirm = async (type: 'entry' | 'exit') => {
    if (!pendingPerson) return;
    
    setIsProcessing(true);
    try {
      const data = await api.scan.process(pendingPerson.id, type);
      setResult({ success: true, message: data.message, person: data.person });
    } catch (err: any) {
      setResult({ success: false, message: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setShowPopup(false);
    setPendingPerson(null);
    setCurrentStatus(null);
    setResult(null);
  };

  const handleReset = () => {
    setResult(null);
    setShowPopup(false);
    setPendingPerson(null);
    setCurrentStatus(null);
  };

  return {
    showPopup,
    pendingPerson,
    currentStatus,
    isProcessing,
    result,
    handleScan,
    handleConfirm,
    handleClose,
    handleReset,
    setShowPopup,
  };
}