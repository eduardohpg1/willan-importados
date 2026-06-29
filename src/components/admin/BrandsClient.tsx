'use client'

import { useState } from 'react'
import { Plus, Pencil, Trash2, Check, X, Loader2, Tags } from 'lucide-react'
import { createBrand, updateBrand, deleteBrand } from '@/lib/actions/brands'
import { useRouter } from 'next/navigation'
import type { Brand } from '@/types'

interface BrandsClientProps {
  initialBrands: Brand[]
}

export default function BrandsClient({ initialBrands }: BrandsClientProps) {
  const router = useRouter()
  const [brands, setBrands] = useState(initialBrands)
  const [newName, setNewName] = useState('')
  const [adding, setAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleCreate() {
    if (!newName.trim()) return
    setLoading(true)
    setError('')
    const form = new FormData()
    form.set('name', newName.trim())
    const result = await createBrand(form)
    if (result?.error) {
      setError(result.error)
    } else {
      setNewName('')
      setAdding(false)
      router.refresh()
    }
    setLoading(false)
  }

  async function handleUpdate(id: string) {
    if (!editName.trim()) return
    setLoading(true)
    setError('')
    const form = new FormData()
    form.set('name', editName.trim())
    const result = await updateBrand(id, form)
    if (result?.error) {
      setError(result.error)
    } else {
      setEditingId(null)
      router.refresh()
    }
    setLoading(false)
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Excluir a marca "${name}"?`)) return
    setLoading(true)
    const result = await deleteBrand(id)
    if (result?.error) {
      alert(result.error)
    } else {
      setBrands((prev) => prev.filter((b) => b.id !== id))
    }
    setLoading(false)
  }

  const inputClass = "px-3 py-2 rounded-lg text-sm outline-none transition-all"
  const inputStyle = {
    backgroundColor: 'var(--smoke)',
    border: '1px solid rgba(201,168,76,0.2)',
    color: 'var(--ivory)',
  }

  return (
    <div className="max-w-lg space-y-4">
      {/* Botão adicionar */}
      {!adding ? (
        <button
          onClick={() => setAdding(true)}
          className="btn-gold flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm"
        >
          <Plus size={16} />
          <span>Nova Marca</span>
        </button>
      ) : (
        <div
          className="flex items-center gap-2 p-4 rounded-xl"
          style={{
            backgroundColor: 'var(--charcoal)',
            border: '1px solid rgba(201,168,76,0.2)',
          }}
        >
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nome da marca"
            className={inputClass}
            style={{ ...inputStyle, flex: 1 }}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreate()
              if (e.key === 'Escape') { setAdding(false); setNewName('') }
            }}
          />
          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-9 h-9 rounded-lg flex items-center justify-center btn-gold"
          >
            {loading ? <Loader2 size={15} className="animate-spin" /> : <Check size={15} />}
          </button>
          <button
            onClick={() => { setAdding(false); setNewName('') }}
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(245,240,232,0.5)' }}
          >
            <X size={15} />
          </button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* Lista de marcas */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ border: '1px solid rgba(201,168,76,0.1)' }}
      >
        {brands.length === 0 ? (
          <div
            className="p-10 text-center"
            style={{ backgroundColor: 'var(--charcoal)' }}
          >
            <Tags size={32} className="mx-auto mb-3 opacity-20" style={{ color: 'var(--gold)' }} />
            <p style={{ color: 'rgba(245,240,232,0.45)' }}>Nenhuma marca cadastrada</p>
          </div>
        ) : (
          brands.map((brand, idx) => (
            <div
              key={brand.id}
              className="flex items-center gap-3 p-4 transition-all duration-200"
              style={{
                backgroundColor: 'var(--charcoal)',
                borderTop: idx > 0 ? '1px solid rgba(201,168,76,0.06)' : 'none',
              }}
            >
              {editingId === brand.id ? (
                <>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className={`${inputClass} flex-1`}
                    style={inputStyle}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleUpdate(brand.id)
                      if (e.key === 'Escape') setEditingId(null)
                    }}
                  />
                  <button
                    onClick={() => handleUpdate(brand.id)}
                    disabled={loading}
                    className="w-8 h-8 rounded-lg flex items-center justify-center btn-gold"
                  >
                    {loading ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'rgba(245,240,232,0.5)' }}
                  >
                    <X size={13} />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-sm" style={{ color: 'var(--ivory)' }}>
                    {brand.name}
                  </span>
                  <button
                    onClick={() => { setEditingId(brand.id); setEditName(brand.name) }}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      border: '1px solid rgba(201,168,76,0.2)',
                      color: 'var(--gold)',
                    }}
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => handleDelete(brand.id, brand.name)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                    style={{
                      border: '1px solid rgba(239,68,68,0.25)',
                      color: '#f87171',
                    }}
                  >
                    <Trash2 size={13} />
                  </button>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
