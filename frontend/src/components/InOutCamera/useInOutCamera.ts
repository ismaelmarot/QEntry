import { useState, useRef, useEffect, useCallback } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { api } from '@/services';

export function useInOutCamera() {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanningRef = useRef(false);
  const isStartingRef = useRef(false);
  const lastScanTimeRef = useRef(0);
  
  const [result, setResult] = useState<{ success: boolean; message: string; person?: any } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const stopScanner = useCallback(async () => {
    if (scannerRef.current && isScanningRef.current) {
      try {
        await scannerRef.current.stop();
      } catch (e) {
        console.log('Scanner stop error (may be normal):', e);
      }
      scannerRef.current = null;
      isScanningRef.current = false;
      setIsScanning(false);
    }
  }, []);

  const startScannerInternal = useCallback(async () => {
    if (isScanningRef.current || isStartingRef.current) return;
    isStartingRef.current = true;
    setError(null);
    
    try {
      const scanner = new Html5Qrcode('qr-reader-inout', {
        formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
        verbose: false
      });
      scannerRef.current = scanner;
      
      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 300, height: 300 } },
        async (decodedText) => {
          const now = Date.now();
          if (now - lastScanTimeRef.current < 2000) return;
          lastScanTimeRef.current = now;
          
          console.log('QR scaneado:', decodedText);
          try {
            const data = await api.scan.process(decodedText);
            console.log('Respuesta del scan:', data);
            setResult({ success: true, message: data.message, person: data.person });
          } catch (err: any) {
            console.error('Error en scan:', err);
            setResult({ success: false, message: err.message });
          }
        },
        (errorMessage) => {
          if (errorMessage.includes('No MultiFormat') || errorMessage.includes('NotFoundException')) {
            return;
          }
          console.log('Scanner error:', errorMessage);
        }
      );
      
      isScanningRef.current = true;
      setIsScanning(true);
    } catch (e: any) {
      console.error('Scanner error:', e);
      setError(e.message || 'Error al iniciar el escáner');
    } finally {
      isStartingRef.current = false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;
    
    const startScanner = async () => {
      if (isScanningRef.current || isStartingRef.current) return;
      
      isStartingRef.current = true;
      setError(null);
      
      try {
        const scanner = new Html5Qrcode('qr-reader-inout', {
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE],
          verbose: false
        });
        scannerRef.current = scanner;
        
        await scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 300, height: 300 } },
          async (decodedText) => {
            if (!mounted) return;
            
            const now = Date.now();
            if (now - lastScanTimeRef.current < 2000) return;
            lastScanTimeRef.current = now;
            
            console.log('QR scaneado:', decodedText);
            try {
              const data = await api.scan.process(decodedText);
              console.log('Respuesta del scan:', data);
              setResult({ success: true, message: data.message, person: data.person });
            } catch (err: any) {
              console.error('Error en scan:', err);
              setResult({ success: false, message: err.message });
            }
          },
          (errorMessage) => {
            if (errorMessage.includes('No MultiFormat') || errorMessage.includes('NotFoundException')) {
              return;
            }
            console.log('Scanner error:', errorMessage);
          }
        );
        
        if (mounted) {
          isScanningRef.current = true;
          setIsScanning(true);
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
  }, [stopScanner]);

  const handleReset = useCallback(async () => {
    setResult(null);
    isScanningRef.current = false;
    isStartingRef.current = false;
    lastScanTimeRef.current = 0;
    await stopScanner();
    setTimeout(() => startScannerInternal(), 100);
  }, [stopScanner, startScannerInternal]);

  return {
    result,
    error,
    isScanning,
    handleReset,
    stopScanner,
  };
}