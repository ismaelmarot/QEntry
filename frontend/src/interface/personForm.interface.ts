export interface PersonForm {
    firstName: string
    lastName: string
    dni: string
    type: string
    roleCode: string
    host: string
    visitReason: string
    photo_url?: string | undefined
    workSchedule: {
      monday: { enabled: boolean; entry: string; exit: string }
      tuesday: { enabled: boolean; entry: string; exit: string }
      wednesday: { enabled: boolean; entry: string; exit: string }
      thursday: { enabled: boolean; entry: string; exit: string }
      friday: { enabled: boolean; entry: string; exit: string }
      saturday: { enabled: boolean; entry: string; exit: string }
      sunday: { enabled: boolean; entry: string; exit: string }
    }
  }