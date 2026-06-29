'use client'

import { useState } from 'react'
import { updateSettings } from '@/lib/actions/settings'
import { MessageCircle, Save, Loader2, CheckCircle } from 'lucide-react'

interface Props {
  currentNumber: string
}

export default function SettingsForm({ currentNumber }: Props) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    setSuccess(false)
    const result = await updateSettings(formData)
    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <MessageCircle size={16} style={{ color: 'var(--gold)' }} />
          <label
            htmlFor="whatsapp"
            className="text-xs tracking-wider uppercase"
            style={{ color: 'rgba(245,240,232,0.5)' }}
          >
            Número do WhatsApp
          </label>
        </div>
        <input
          id="whatsapp"
          name="whatsapp_number"
          type="text"
          defaultValue={currentNumber}
          placeholder="5511999999999"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={{
            backgroundColor: 'var(--smoke)',
            border: '1px solid rgba(201,168,76,0.15)',
            color: 'var(--ivory)',
          }}
          onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.5)' }}
          onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.15)' }}
        />
        <p className="text-xs mt-2" style={{ color: 'rgba(245,240,232,0.35)' }}>
          Formato: código do país + DDD + número. Ex: 5511999999999
        </p>
      </div>

      {error && (
        <div
          className="px-4 py-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            color: '#f87171',
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="px-4 py-3 rounded-lg text-sm flex items-center gap-2"
          style={{
            backgroundColor: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            color: '#4ade80',
          }}
        >
          <CheckCircle size={15} />
          Configurações salvas com sucesso!
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-gold flex items-center gap-2 px-6 py-3 rounded-xl text-sm disabled:opacity-60"
      >
        {loading ? (
          <Loader2 size={15} className="animate-spin" />
        ) : (
          <Save size={15} />
        )}
        <span>Salvar Configurações</span>
      </button>
    </form>
  )
}
