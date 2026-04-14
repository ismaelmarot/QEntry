export interface StatsChartsProps {
    stats: {
        presentismo: number;
        ausentes: number;
        periodLogs: any[];
    }
    logsData: {
        logs: any[];
        categories: { id: string; name: string; color: string }[]
    }
}