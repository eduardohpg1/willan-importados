export function buildWhatsAppUrl(phone: string, perfumeName: string) {
  const message = encodeURIComponent(
    `Olá! Tenho interesse no perfume ${perfumeName}. Gostaria de mais informações.`
  )
  const cleanPhone = phone.replace(/\D/g, '')
  return `https://wa.me/${cleanPhone}?text=${message}`
}

export function formatPhone(phone: string) {
  const clean = phone.replace(/\D/g, '')
  if (clean.length === 13) {
    return `+${clean.slice(0, 2)} (${clean.slice(2, 4)}) ${clean.slice(4, 9)}-${clean.slice(9)}`
  }
  if (clean.length === 11) {
    return `(${clean.slice(0, 2)}) ${clean.slice(2, 7)}-${clean.slice(7)}`
  }
  return phone
}
