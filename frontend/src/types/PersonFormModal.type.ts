export type UsePersonFormModalProps = {   
    onClose: () => void
    onSuccess: () => void
}

export type PersonFormModalProps = {
  open: boolean
  onClose: () => void
  onSuccess: () => void
  categories: any[]
}