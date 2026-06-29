import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import PerfumeForm from '@/components/admin/PerfumeForm'
import { getBrands } from '@/lib/actions/brands'

export default async function NewPerfumePage() {
  const brands = await getBrands()

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
          Novo Perfume
        </h1>
      </div>

      <div
        className="rounded-2xl p-8"
        style={{
          backgroundColor: 'var(--charcoal)',
          border: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <PerfumeForm brands={brands} />
      </div>
    </div>
  )
}
