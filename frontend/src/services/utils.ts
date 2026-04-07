export function formatDni(dni: string | number | null | undefined): string {
  if (!dni && dni !== 0) return '';
  
  const str = String(dni);

  if (/^\d+$/.test(str)) {
    return str.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return str;
}