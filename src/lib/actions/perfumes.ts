'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { MOCK_PERFUMES } from '@/lib/mock-data'

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  return url.startsWith('http')
}

function toSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export async function getPerfumes(brandSlug?: string, search?: string) {
  if (!isSupabaseConfigured()) return MOCK_PERFUMES as any[]

  const supabase = await createClient()
  let query = supabase
    .from('perfumes')
    .select('*, brand:brands(*)')
    .order('created_at', { ascending: false })

  if (brandSlug) {
    const { data: brand } = await supabase
      .from('brands')
      .select('id')
      .eq('slug', brandSlug)
      .single()
    if (brand) query = query.eq('brand_id', brand.id)
  }

  if (search) {
    query = query.ilike('name', `%${search}%`)
  }

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function getFeaturedPerfumes() {
  if (!isSupabaseConfigured()) return MOCK_PERFUMES.filter(p => p.featured) as any[]

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('perfumes')
    .select('*, brand:brands(*)')
    .eq('featured', true)
    .order('created_at', { ascending: false })
    .limit(6)

  if (error) throw error
  return data
}

export async function getPerfumeBySlug(slug: string) {
  if (!isSupabaseConfigured()) {
    return MOCK_PERFUMES.find(p => p.slug === slug) ?? null as any
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('perfumes')
    .select('*, brand:brands(*)')
    .eq('slug', slug)
    .single()

  if (error) return null
  return data
}

export async function getRelatedPerfumes(brandId: string, excludeId: string) {
  if (!isSupabaseConfigured()) {
    return MOCK_PERFUMES.filter(p => p.brand_id === brandId && p.id !== excludeId).slice(0, 4) as any[]
  }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('perfumes')
    .select('*, brand:brands(*)')
    .eq('brand_id', brandId)
    .neq('id', excludeId)
    .limit(4)

  if (error) return []
  return data
}

export async function createPerfume(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const brand_id = formData.get('brand_id') as string
  const description = formData.get('description') as string
  const featured = formData.get('featured') === 'true'
  const images = formData.getAll('images') as string[]
  const priceRaw = formData.get('price') as string
  const installmentsRaw = formData.get('installments') as string

  const { error } = await supabase.from('perfumes').insert({
    name,
    slug: toSlug(name),
    brand_id: brand_id || null,
    description,
    featured,
    images,
    price: priceRaw ? parseFloat(priceRaw) : null,
    installments: installmentsRaw ? parseInt(installmentsRaw) : null,
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/perfumes')
  revalidatePath('/')
  redirect('/admin/perfumes')
}

export async function updatePerfume(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const brand_id = formData.get('brand_id') as string
  const description = formData.get('description') as string
  const featured = formData.get('featured') === 'true'
  const images = formData.getAll('images') as string[]
  const priceRaw = formData.get('price') as string
  const installmentsRaw = formData.get('installments') as string

  const { error } = await supabase
    .from('perfumes')
    .update({
      name,
      slug: toSlug(name),
      brand_id: brand_id || null,
      description,
      featured,
      images,
      price: priceRaw ? parseFloat(priceRaw) : null,
      installments: installmentsRaw ? parseInt(installmentsRaw) : null,
    })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/perfumes')
  revalidatePath('/')
  redirect('/admin/perfumes')
}

export async function deletePerfume(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('perfumes').delete().eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/perfumes')
  revalidatePath('/')
  return { success: true }
}
