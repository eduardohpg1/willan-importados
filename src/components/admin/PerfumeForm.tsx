'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPerfume, updatePerfume } from '@/lib/actions/perfumes'
import ImageUploader from './ImageUploader'
import type { Perfume, Brand } from '@/types'
import { Loader2 } from 'lucide-react'

interface PerfumeFormProps {
  perfume?: Perfume & { brand?: Brand | null }
  brands: Brand[]
}

export default function PerfumeForm({ perfume, brands }: PerfumeFormProps) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(perfume?.images || [])
  const [featured, setFeatured] = useState(perfume?.featured || false)
  const [outOfStock, setOutOfStock] = useState(perfume?.out_of_stock || false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isEditing = !!perfume

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')

    formData.delete('images')
    images.forEach((url) => formData.append('images', url))
    formData.set('featured', featured ? 'true' : 'false')
    formData.set('out_of_stock', outOfStock ? 'true' : 'false')

    const result = isEditing
      ? await updatePerfume(perfume!.id, formData)
      : await createPerfume(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  const inputStyle = {
    backgroundColor: 'var(--smoke)',
    border: '1px solid rgba(201,168,76,0.15)',
    color: 'var(--ivory)',
  }

  const labelStyle = {
    color: 'rgba(245,240,232,0.5)',
  }

  return (
    <form action={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Nome */}
      <div>
        <label className="block text-xs tracking-wider uppercase mb-2" style={labelStyle}>
          Nome do Perfume *
        </label>
        <input
          name="name"
          type="text"
          required
          defaultValue={perfume?.name}
          placeholder="Ex: Sauvage"
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={inputStyle}
          onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.5)' }}
          onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.15)' }}
        />
      </div>

      {/* Marca */}
      <div>
        <label className="block text-xs tracking-wider uppercase mb-2" style={labelStyle}>
          Marca
        </label>
        <select
          name="brand_id"
          defaultValue={perfume?.brand_id || ''}
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
          style={inputStyle}
        >
          <option value="">Sem marca</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      {/* Preço e Parcelamento */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs tracking-wider uppercase mb-2" style={labelStyle}>
            Preço (R$)
          </label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            defaultValue={perfume?.price ?? ''}
            placeholder="Ex: 270.00"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.5)' }}
            onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.15)' }}
          />
        </div>
        <div>
          <label className="block text-xs tracking-wider uppercase mb-2" style={labelStyle}>
            Parcelas no cartão
          </label>
          <input
            name="installments"
            type="number"
            min="1"
            max="24"
            defaultValue={perfume?.installments ?? ''}
            placeholder="Ex: 3"
            className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
            style={inputStyle}
            onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.5)' }}
            onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.15)' }}
          />
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-xs tracking-wider uppercase mb-2" style={labelStyle}>
          Descrição
        </label>
        <textarea
          name="description"
          rows={4}
          defaultValue={perfume?.description}
          placeholder="Descreva as notas e características do perfume..."
          className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none"
          style={inputStyle}
          onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.5)' }}
          onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.15)' }}
        />
      </div>

      {/* Destaque */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={featured}
          onClick={() => setFeatured(!featured)}
          className="relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0"
          style={{
            backgroundColor: featured ? 'var(--gold)' : 'var(--smoke)',
            border: `1px solid ${featured ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`,
          }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200 w-[18px] h-[18px]"
            style={{ transform: featured ? 'translateX(20px)' : 'translateX(0)' }}
          />
        </button>
        <span className="text-sm" style={{ color: 'rgba(245,240,232,0.7)' }}>
          Exibir em destaques na página inicial
        </span>
      </div>

      {/* Esgotado */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          role="switch"
          aria-checked={outOfStock}
          onClick={() => setOutOfStock(!outOfStock)}
          className="relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0"
          style={{
            backgroundColor: outOfStock ? '#ef4444' : 'var(--smoke)',
            border: `1px solid ${outOfStock ? '#ef4444' : 'rgba(201,168,76,0.2)'}`,
          }}
        >
          <span
            className="absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white transition-transform duration-200 w-[18px] h-[18px]"
            style={{ transform: outOfStock ? 'translateX(20px)' : 'translateX(0)' }}
          />
        </button>
        <span className="text-sm" style={{ color: 'rgba(245,240,232,0.7)' }}>
          Marcar como esgotado
        </span>
      </div>

      {/* Imagens */}
      <div>
        <label className="block text-xs tracking-wider uppercase mb-3" style={labelStyle}>
          Imagens
        </label>
        <ImageUploader images={images} onChange={setImages} />
      </div>

      {/* Erro */}
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

      {/* Botões */}
      <div className="flex gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="btn-gold px-8 py-3 rounded-xl text-sm tracking-wider disabled:opacity-60"
        >
          <span className="flex items-center gap-2">
            {loading && <Loader2 size={15} className="animate-spin" />}
            {isEditing ? 'Salvar Alterações' : 'Cadastrar Perfume'}
          </span>
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/perfumes')}
          className="px-8 py-3 rounded-xl text-sm transition-all duration-200"
          style={{
            border: '1px solid rgba(201,168,76,0.2)',
            color: 'rgba(245,240,232,0.6)',
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
