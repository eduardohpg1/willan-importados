'use client'

import { useState } from 'react'
import { PackageX, PackageCheck, Loader2 } from 'lucide-react'
import { toggleOutOfStock } from '@/lib/actions/perfumes'
import { useRouter } from 'next/navigation'

interface Props {
  id: string
  outOfStock: boolean
}

export default function ToggleStockButton({ id, outOfStock }: Props) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleToggle() {
    setLoading(true)
    const result = await toggleOutOfStock(id, !outOfStock)
    if (result?.error) {
      alert(result.error)
    }
    setLoading(false)
    router.refresh()
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      title={outOfStock ? 'Marcar como disponível' : 'Marcar como esgotado'}
      className="w-9 h-9 flex items-center justify-center rounded-lg transition-all disabled:opacity-50"
      style={{
        border: outOfStock ? '1px solid rgba(34,197,94,0.3)' : '1px solid rgba(239,68,68,0.3)',
        color: outOfStock ? '#4ade80' : '#f87171',
      }}
    >
      {loading ? (
        <Loader2 size={14} className="animate-spin" />
      ) : outOfStock ? (
        <PackageCheck size={14} />
      ) : (
        <PackageX size={14} />
      )}
    </button>
  )
}
