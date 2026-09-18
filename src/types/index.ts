export interface Brand {
  id: string
  name: string
  slug: string
  created_at: string
}

export interface Perfume {
  id: string
  name: string
  slug: string
  brand_id: string
  brand?: Brand
  volume: string
  description: string
  images: string[]
  featured: boolean
  out_of_stock: boolean
  price: number | null
  installments: number | null
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id: string
  whatsapp_number: string
  updated_at: string
}

export interface AdminUser {
  id: string
  email: string
}
