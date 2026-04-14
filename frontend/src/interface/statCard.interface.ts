import { ReactNode } from 'react'

export interface StatCardProps {
    color: string;
    label: string;
    value: string | number;
    subtext?: string;
    icon: ReactNode;
}