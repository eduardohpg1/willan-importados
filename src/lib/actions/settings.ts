'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function isSupabaseConfigured() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  return url.startsWith('http')
}

export async function getSettings() {
  if (!isSupabaseConfigured()) return { whatsapp_number: '5511999999999', id: '', updated_at: '' }

  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .single()

  if (error) return { whatsapp_number: '5511999999999', id: '', updated_at: '' }
  return data
}

export async function updateSettings(formData: FormData) {
  const supabase = await createClient()
  const whatsapp_number = formData.get('whatsapp_number') as string

  const { data: existing } = await supabase
    .from('site_settings')
    .select('id')
    .single()

  if (existing) {
    const { error } = await supabase
      .from('site_settings')
      .update({ whatsapp_number })
      .eq('id', existing.id)

    if (error) return { error: error.message }
  } else {
    const { error } = await supabase
      .from('site_settings')
      .insert({ whatsapp_number })

    if (error) return { error: error.message }
  }

  revalidatePath('/', 'layout')
  revalidatePath('/admin', 'layout')
  return { success: true }
}
