import Link from 'next/link'
import Image from 'next/image'
import { Plus, Pencil, Package } from 'lucide-react'
import { getPerfumes } from '@/lib/actions/perfumes'
import DeletePerfumeButton from '@/components/admin/DeletePerfumeButton'

export default async function AdminPerfumesPage() {
  const perfumes = await getPerfumes()

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}>
            Perfumes
          </h1>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.4)' }}>
            {perfumes.length} {perfumes.length === 1 ? 'cadastrado' : 'cadastrados'}
          </p>
        </div>
        <Link href="/admin/perfumes/novo"
          className="btn-gold flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm">
          <Plus size={15} />
          <span>Novo</span>
        </Link>
      </div>

      {perfumes.length === 0 ? (
        <div className="rounded-2xl p-12 text-center"
          style={{ backgroundColor: 'var(--charcoal)', border: '1px solid rgba(201,168,76,0.1)' }}>
          <Package size={36} className="mx-auto mb-3 opacity-20" style={{ color: 'var(--gold)' }} />
          <p className="text-sm mb-4" style={{ color: 'rgba(245,240,232,0.4)' }}>Nenhum perfume ainda</p>
          <Link href="/admin/perfumes/novo"
            className="inline-flex items-center gap-2 btn-gold px-5 py-2.5 rounded-xl text-sm">
            <Plus size={14} />Cadastrar
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {perfumes.map((perfume) => (
            <div key={perfume.id}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ backgroundColor: 'var(--charcoal)', border: '1px solid rgba(201,168,76,0.08)' }}>

              {/* Thumbnail */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                style={{ backgroundColor: 'var(--smoke)' }}>
                {perfume.images?.[0] ? (
                  <Image src={perfume.images[0]} alt={perfume.name} fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Package size={18} style={{ color: 'var(--gold)' }} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: 'var(--ivory)' }}>
                  {perfume.name}
                </p>
                <p className="text-xs truncate" style={{ color: 'rgba(245,240,232,0.4)' }}>
                  {perfume.brand?.name || 'Sem marca'}
                  {perfume.price ? ` · R$ ${perfume.price.toFixed(2).replace('.', ',')}` : ''}
                </p>
              </div>

              {/* Ações */}
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <Link href={`/admin/perfumes/${perfume.id}/editar`}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all"
                  style={{ border: '1px solid rgba(201,168,76,0.2)', color: 'var(--gold)' }}>
                  <Pencil size={14} />
                </Link>
                <DeletePerfumeButton id={perfume.id} name={perfume.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
