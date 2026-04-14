import { ReactNode } from 'react'

export interface SummaryCardProps {
    color: string;
    value: string | number;
    label: string;
    icon: ReactNode;
}