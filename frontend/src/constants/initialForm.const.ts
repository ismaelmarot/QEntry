export const initialForm = {
    firstName: '',
    lastName: '',
    dni: '',
    type: 'visitor',
    roleCode: '',
    host: '',
    visitReason: '',
    photo_url: undefined as string | undefined,
    workSchedule: {
        monday: { enabled: false, entry: '', exit: '' },
        tuesday: { enabled: false, entry: '', exit: '' },
        wednesday: { enabled: false, entry: '', exit: '' },
        thursday: { enabled: false, entry: '', exit: '' },
        friday: { enabled: false, entry: '', exit: '' },
        saturday: { enabled: false, entry: '', exit: '' },
        sunday: { enabled: false, entry: '', exit: '' },
    },
}