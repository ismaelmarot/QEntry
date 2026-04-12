import { useEffect, useState } from 'react'
import { api } from '@/services/api'
import { RecentLog } from '@/interface'
import { FilterType } from '@/types'

export function useDashboard() {
    const [stats, setStats] = useState({ inside: 0, todayEntries: 0, completed: 0 })
    const [recentLogs, setRecentLogs] = useState<RecentLog[]>([])
    const [filter, setFilter] = useState<FilterType>('inside')

    const loadStats = async () => {
        try {
            const data = await api.logs.getStats()
            setStats(data)
        } catch (e) {
            console.error(e)
        }
    }

    const loadRecentLogs = async () => {
        try {
            let data: RecentLog[] = []
            const today = new Date().toISOString().split('T')[0]

            if (filter === 'inside') {
                data = await api.logs.getInside(10)
        } else if (filter === 'entries') {
            data = await api.logs.getAll({ date: today, type: 'entry' })
            data = data.slice(0, 10)
        } else if (filter === 'exits') {
            data = await api.logs.getAll({ date: today, type: 'exit' })
            data = data.slice(0, 10)
        }

        setRecentLogs(data)
        } catch (e) {
        console.error(e)
        }
    }

    useEffect(() => {
        loadStats()
    }, [])

    useEffect(() => {
        loadRecentLogs()
    }, [filter])

    // helpers
    const formatTime = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleTimeString('es-AR', {
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const formatDate = (timestamp: string) => {
        const date = new Date(timestamp)
        return date.toLocaleDateString('es-AR', {
            day: '2-digit',
            month: '2-digit'
        })
    }

    const calculateDuration = (entryTime: string, exitTime?: string) => {
        if (!exitTime) return null

        const entry = new Date(entryTime)
        const exit = new Date(exitTime)

        const diffMs = exit.getTime() - entry.getTime()
        const diffMins = Math.floor(diffMs / 60000)

        const hours = Math.floor(diffMins / 60)
        const mins = diffMins % 60

        if (hours > 0) return `${hours}h ${mins}m`
        return `${mins}m`
    }

    return {
        stats,
        recentLogs,
        filter,
        setFilter,
        formatTime,
        formatDate,
        calculateDuration
    }
}