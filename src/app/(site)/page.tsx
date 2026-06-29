import { getPerfumes } from '@/lib/actions/perfumes'
import { getSettings } from '@/lib/actions/settings'
import CatalogClient from '@/components/CatalogClient'
import HeroBanner from '@/components/HeroBanner'

export const revalidate = 0

export default async function HomePage() {
  const [perfumes, settings] = await Promise.all([
    getPerfumes(),
    getSettings(),
  ])

  const whatsappNumber = settings?.whatsapp_number || '5511999999999'

  return (
    <>
      {/* Banner */}
      <div className="pt-20">
        <HeroBanner />
      </div>

      {/* Catálogo */}
      <div className="pt-6">
        <CatalogClient
          perfumes={perfumes}
          whatsappNumber={whatsappNumber}
        />
      </div>
    </>
  )
}
