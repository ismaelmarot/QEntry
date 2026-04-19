import { useEffect, useState } from 'react'
import { api } from '@/services'

export function useHistoryData(tab: string) {
    const [logs, setLogs] = useState<any[]>([])
    const [persons, setPersons] = useState<any[]>([])

    const loadLogs = async () => {
        try {
        const data = await api.logs.getAll()
        setLogs(data)
        } catch (e) {
            console.error(e)
        }
    }

    const loadPersons = async () => {
        try {
            const data = await api.person.getAll()
        setPersons(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        loadLogs()
        loadPersons()
    }, [tab])

    useEffect(() => {
        const interval = setInterval(() => {
            loadLogs()
        }, 5000)
            return () => clearInterval(interval)
    }, [])

    return { logs, persons }
}