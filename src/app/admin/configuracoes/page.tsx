import { getSettings } from '@/lib/actions/settings'
import SettingsForm from '@/components/admin/SettingsForm'

export default async function AdminSettingsPage() {
  const settings = await getSettings()

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-1"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
        >
          Configurações
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.45)' }}>
          Configure as informações de contato do site
        </p>
      </div>

      <div
        className="max-w-lg rounded-2xl p-8"
        style={{
          backgroundColor: 'var(--charcoal)',
          border: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <SettingsForm currentNumber={settings?.whatsapp_number || ''} />
      </div>
    </div>
  )
}
