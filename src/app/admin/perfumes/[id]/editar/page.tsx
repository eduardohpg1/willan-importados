import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import PerfumeForm from '@/components/admin/PerfumeForm'
import { getBrands } from '@/lib/actions/brands'
import { createClient } from '@/lib/supabase/server'

interface Props {
  params: Promise<{ id: string }>
}

export default async function EditPerfumePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: perfume }, brands] = await Promise.all([
    supabase
      .from('perfumes')
      .select('*, brand:brands(*)')
      .eq('id', id)
      .single(),
    getBrands(),
  ])

  if (!perfume) notFound()

  return (
    <div>
      <Link
        href="/admin/perfumes"
        className="inline-flex items-center gap-2 text-sm mb-6 transition-colors hover:text-[var(--gold)]"
        style={{ color: 'rgba(245,240,232,0.45)' }}
      >
        <ChevronLeft size={16} />
        Voltar para Perfumes
      </Link>

      <div className="mb-8">
        <h1
          className="text-3xl font-bold"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
        >
          Editar Perfume
        </h1>
        <p className="mt-1" style={{ color: 'rgba(245,240,232,0.45)' }}>
          {perfume.name}
        </p>
      </div>

      <div
        className="rounded-2xl p-8"
        style={{
          backgroundColor: 'var(--charcoal)',
          border: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <PerfumeForm perfume={perfume} brands={brands} />
      </div>
    </div>
  )
}
