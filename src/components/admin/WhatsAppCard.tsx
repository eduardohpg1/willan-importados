'use client'

import { useState } from 'react'
import { MessageCircle, Pencil, Check, X } from 'lucide-react'
import { updateSettings } from '@/lib/actions/settings'

interface WhatsAppCardProps {
  whatsappNumber: string
}

function formatPhone(num: string) {
  const d = num.replace(/\D/g, '')
  if (d.length === 13) return `+${d.slice(0,2)} (${d.slice(2,4)}) ${d.slice(4,9)}-${d.slice(9)}`
  if (d.length === 12) return `+${d.slice(0,2)} (${d.slice(2,4)}) ${d.slice(4,8)}-${d.slice(8)}`
  return num
}

export default function WhatsAppCard({ whatsappNumber }: WhatsAppCardProps) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(whatsappNumber)
  const [saved, setSaved] = useState(whatsappNumber)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSave() {
    setLoading(true)
    setError('')
    const fd = new FormData()
    fd.append('whatsapp_number', value.replace(/\D/g, ''))
    const result = await updateSettings(fd)
    setLoading(false)
    if (result?.error) {
      setError(result.error)
    } else {
      setSaved(value.replace(/\D/g, ''))
      setEditing(false)
    }
  }

  function handleCancel() {
    setValue(saved)
    setEditing(false)
    setError('')
  }

  return (
    <div
      className="p-6 rounded-2xl admin-card transition-all duration-200"
      style={{
        backgroundColor: 'var(--charcoal)',
        border: '1px solid rgba(201,168,76,0.1)',
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}
        >
          <MessageCircle size={20} style={{ color: 'var(--gold)' }} />
        </div>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="p-1.5 rounded-lg transition-all hover:bg-white/5"
            style={{ color: 'rgba(245,240,232,0.4)' }}
            title="Editar número"
          >
            <Pencil size={14} />
          </button>
        )}
      </div>

      {editing ? (
        <div className="space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="5511999999999"
            className="w-full px-3 py-2 rounded-lg text-sm outline-none"
            style={{
              backgroundColor: 'var(--smoke)',
              border: '1px solid rgba(201,168,76,0.4)',
              color: 'var(--ivory)',
            }}
            autoFocus
          />
          <p className="text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>
            Somente números com código do país. Ex: 5511999999999
          </p>
          {error && (
            <p className="text-xs text-red-400">{error}</p>
          )}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all disabled:opacity-50"
              style={{ backgroundColor: 'rgba(201,168,76,0.15)', color: 'var(--gold)', border: '1px solid rgba(201,168,76,0.3)' }}
            >
              <Check size={12} />
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all"
              style={{ color: 'rgba(245,240,232,0.45)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <X size={12} />
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-2xl font-bold mb-1" style={{ color: 'var(--ivory)' }}>
            {formatPhone(saved)}
          </p>
          <p className="text-xs uppercase tracking-wider" style={{ color: 'rgba(245,240,232,0.45)' }}>
            número configurado
          </p>
        </>
      )}
    </div>
  )
}
