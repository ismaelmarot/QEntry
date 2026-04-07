export interface Person {
    id: number;
    first_name: string;
    last_name: string;
    dni: string;
    type: string;
    role_code: string;
    visit_reason: string;
    work_schedule: string;
    photo_url?: string;
}