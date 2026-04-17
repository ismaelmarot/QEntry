import { useState, useRef, useEffect } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { api } from '@/services'

export function useScanner(initialMode: 'scan' | 'manual' | 'preview') {
    const [mode, setMode] = useState(initialMode)
    const [result, setResult] = useState<{ success: boolean; message: string; person?: any; status?: string } | null>(null)
    const [pendingScan, setPendingScan] = useState<{ personId: string; person?: any; status?: string } | null>(null)
    const [showPopup, setShowPopup] = useState(false)

    const [manualId, setManualId] = useState('')
    const [previewId, setPreviewId] = useState('')
    const [showPreview, setShowPreview] = useState(false)

    const scannerRef = useRef<Html5Qrcode | null>(null)
    const [scannerReady, setScannerReady] = useState(false)
    const lastScanTimeRef = useRef(0)

    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState<any[]>([])
    const [selectedPerson, setSelectedPerson] = useState<any>(null)
    const [searching, setSearching] = useState(false)
    const [initialRender, setInitialRender] = useState(true)

    const [showNewPerson, setShowNewPerson] = useState(false)
    const [newPersonData, setNewPersonData] = useState({
        first_name: '',
        last_name: '',
        dni: ''
    })
    const [savingPerson, setSavingPerson] = useState(false)

    useEffect(() => {
        setInitialRender(false)
    }, [])

    useEffect(() => {
        if (initialRender) return

        if (mode === 'scan') {
            startScanner()
        } else {
            stopScanner()
        }
    }, [mode, initialRender])

    useEffect(() => {
        return () => {
            stopScanner()
        }
    }, [])

    const startScanner = async () => {
        if (scannerRef.current) {
        try {
            await scannerRef.current.stop()
        } catch {}
        }

        try {
            const scanner = new Html5Qrcode('qr-reader')
            scannerRef.current = scanner

        await scanner.start(
            { facingMode: 'environment' },
            { fps: 10, qrbox: { width: 250, height: 250 } },
            onScanSuccess,
            () => {}
        )

        setScannerReady(true)
        } catch (e) {
            console.error('Scanner error:', e)
        }
    }

    const stopScanner = async () => {
        if (scannerRef.current) {
        try {
            await scannerRef.current.stop()
        } catch {}
            scannerRef.current = null
            setScannerReady(false)
        }
    }

const onScanSuccess = async (decodedText: string) => {
        const now = Date.now();
        if (now - lastScanTimeRef.current < 3000) return;
        lastScanTimeRef.current = now;
        
        await processScan(decodedText);
    }

    const processScan = async (personId: string, type?: 'entry' | 'exit') => {
        try {
            const data = await api.scan.process(personId, type);
            if (!type && (data.status === 'inside' || data.status === 'outside' || data.status === 'completed')) {
                const displayStatus = data.status === 'completed' ? 'outside' : data.status;
                setPendingScan({ personId, person: data.person, status: displayStatus });
                setShowPopup(true);
                setResult(null);
                return;
            }
            setResult({ success: true, message: data.message, person: data.person })
        } catch (err: any) {
            setResult({ success: false, message: err.message })
        }
    }

    const handleManualSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!manualId.trim()) return

        await processScan(manualId.trim())
        setManualId('')
    }

    const handlePreviewSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!previewId.trim()) return

        try {
            await api.person.get(previewId.trim())
            setShowPreview(true)
        } catch (err: any) {
            alert(err.message)
        }
    }

    const handleSearch = async (query: string) => {
        setSearchQuery(query)

        if (query.length < 2) {
        setSearchResults([])
        return
        }

        setSearching(true)

        try {
        const persons = await api.person.getAll()

        const filtered = persons.filter((p: any) =>
            p.dni?.includes(query) ||
            p.first_name?.toLowerCase().includes(query.toLowerCase()) ||
            p.last_name?.toLowerCase().includes(query.toLowerCase())
        )

        setSearchResults(filtered)
        } catch (err) {
            console.error(err)
        } finally {
            setSearching(false)
        }
    }

    const handleSelectPerson = (person: any) => {
        setSelectedPerson(person)
        setSearchQuery('')
        setSearchResults([])
    }

    const handleRegisterAccess = async (type: 'entry' | 'exit') => {
        if (!selectedPerson) return

        await processScan(selectedPerson.id, type)
        setSelectedPerson(null)
    }

    const handleCreatePerson = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!newPersonData.first_name.trim() || !newPersonData.last_name.trim()) return

        setSavingPerson(true)

        try {
            const person = await api.person.create({
                first_name: newPersonData.first_name.trim(),
                last_name: newPersonData.last_name.trim(),
                dni: newPersonData.dni.trim() || undefined
        })

        setShowNewPerson(false)
        setNewPersonData({ first_name: '', last_name: '', dni: '' })
        setSelectedPerson(person)
        } catch (err: any) {
            setResult({ success: false, message: err.message })
        } finally {
            setSavingPerson(false)
        }
    }

    const reset = () => {
        setResult(null)
        setSelectedPerson(null)
        setSearchQuery('')
        setSearchResults([])

        if (mode === 'scan') startScanner()
    }

    return {
        mode,
        setMode,
        result,
        setResult,
        pendingScan,
        setPendingScan,
        showPopup,
        setShowPopup,
        manualId,
        setManualId,
        previewId,
        setPreviewId,
        showPreview,
        setShowPreview,
        scannerReady,
        searchQuery,
        setSearchQuery,
        searchResults,
        setSearchResults,
        selectedPerson,
        setSelectedPerson,
        searching,
        showNewPerson,
        newPersonData,
        savingPerson,

        setNewPersonData,
        setShowNewPerson,

        handleManualSubmit,
        handlePreviewSubmit,
        handleSearch,
        handleSelectPerson,
        handleRegisterAccess,
        handleCreatePerson,
        reset,
        startScanner,
        stopScanner
    }
}