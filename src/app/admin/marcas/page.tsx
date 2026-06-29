import { getBrands } from '@/lib/actions/brands'
import BrandsClient from '@/components/admin/BrandsClient'

export default async function AdminBrandsPage() {
  const brands = await getBrands()

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-1"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
        >
          Marcas
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.45)' }}>
          {brands.length} {brands.length === 1 ? 'marca cadastrada' : 'marcas cadastradas'}
        </p>
      </div>

      <BrandsClient initialBrands={brands} />
    </div>
  )
}
