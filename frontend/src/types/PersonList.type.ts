export type PersonListProps = {
    title: string
    groups: [string, any[]][]
    getTypeColor: (type: string) => string
    getTypeLabel: (type: string) => string
}