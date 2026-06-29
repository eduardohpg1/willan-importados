'use client'

import { useState } from 'react'
import { Trash2, Loader2 } from 'lucide-react'
import { deletePerfume } from '@/lib/actions/perfumes'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  name: string
}

export default function DeletePerfumeButton({ id, name }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleDelete() {
    if (!confirm(`Excluir "${name}"? Esta ação não pode ser desfeita.`)) return
    setLoading(true)
    const result = await deletePerfume(id)
    if (result?.error) {
      alert(result.error)
    }
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 disabled:opacity-50"
      style={{
        border: '1px solid rgba(239,68,68,0.3)',
        color: '#f87171',
      }}
    >
      {loading ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
      Excluir
    </button>
  )
}
