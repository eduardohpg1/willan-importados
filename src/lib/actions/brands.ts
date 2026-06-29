'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { MOCK_BRANDS } from '@/lib/mock-data'

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

export async function getBrands() {
  if (!isSupabaseConfigured()) return MOCK_BRANDS

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('brands')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export async function createBrand(formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string

  const { error } = await supabase.from('brands').insert({
    name,
    slug: toSlug(name),
  })

  if (error) return { error: error.message }

  revalidatePath('/admin/marcas')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateBrand(id: string, formData: FormData) {
  const supabase = await createClient()
  const name = formData.get('name') as string

  const { error } = await supabase
    .from('brands')
    .update({ name, slug: toSlug(name) })
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/marcas')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteBrand(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('brands').delete().eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/admin/marcas')
  revalidatePath('/', 'layout')
  return { success: true }
}
