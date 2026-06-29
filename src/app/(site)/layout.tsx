import { getSettings } from '@/lib/actions/settings'
import SiteShell from '@/components/SiteShell'
import Footer from '@/components/Footer'

export const revalidate = 0

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSettings()
  const whatsappNumber = settings?.whatsapp_number || '5511999999999'

  return (
    <>
      <SiteShell whatsappNumber={whatsappNumber}>
        {children}
      </SiteShell>
      <Footer />
    </>
  )
}
