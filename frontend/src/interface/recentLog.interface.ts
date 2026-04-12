export interface RecentLog {
    id: number;
    personId: number;
    date: string;
    check_in: string | null;
    check_out: string | null;
    type: 'entry' | 'exit';
    timestamp: string;
    person?: {
        name: string;
        lastname: string;
    }
}