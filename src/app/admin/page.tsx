import { Package, Tags, TrendingUp } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { getSettings } from '@/lib/actions/settings'
import Link from 'next/link'
import WhatsAppCard from '@/components/admin/WhatsAppCard'

async function getStats() {
  const supabase = await createClient()
  const [{ count: perfumesCount }, { count: brandsCount }] = await Promise.all([
    supabase.from('perfumes').select('*', { count: 'exact', head: true }),
    supabase.from('brands').select('*', { count: 'exact', head: true }),
  ])
  return { perfumesCount: perfumesCount || 0, brandsCount: brandsCount || 0 }
}

export default async function AdminDashboard() {
  const [stats, settings] = await Promise.all([getStats(), getSettings()])

  const statCards = [
    { title: 'Perfumes', value: stats.perfumesCount, icon: Package, href: '/admin/perfumes', desc: 'produtos no catálogo' },
    { title: 'Marcas', value: stats.brandsCount, icon: Tags, href: '/admin/marcas', desc: 'marcas cadastradas' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1
          className="text-3xl font-bold mb-2"
          style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
        >
          Painel
        </h1>
        <p style={{ color: 'rgba(245,240,232,0.5)' }}>
          Bem-vindo à área administrativa do Willan Importados
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {statCards.map(({ title, value, icon: Icon, href, desc }) => (
          <Link
            key={title}
            href={href}
            className="block p-6 rounded-2xl transition-all duration-200 group admin-card"
            style={{
              backgroundColor: 'var(--charcoal)',
              border: '1px solid rgba(201,168,76,0.1)',
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}
              >
                <Icon size={20} style={{ color: 'var(--gold)' }} />
              </div>
              <TrendingUp
                size={16}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: 'var(--gold)' }}
              />
            </div>
            <p className="text-2xl font-bold mb-1" style={{ color: 'var(--ivory)' }}>
              {value}
            </p>
            <p className="text-xs uppercase tracking-wider" style={{ color: 'rgba(245,240,232,0.45)' }}>
              {desc}
            </p>
          </Link>
        ))}

        {/* Card WhatsApp editável */}
        <WhatsAppCard whatsappNumber={settings?.whatsapp_number || '5511999999999'} />
      </div>

      {/* Ações rápidas */}
      <div
        className="rounded-2xl p-6"
        style={{
          backgroundColor: 'var(--charcoal)',
          border: '1px solid rgba(201,168,76,0.1)',
        }}
      >
        <h2
          className="text-xs tracking-[0.3em] uppercase mb-5"
          style={{ color: 'var(--gold)' }}
        >
          Ações Rápidas
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/perfumes/novo"
            className="btn-gold px-5 py-2.5 rounded-lg text-sm"
          >
            <span>+ Novo Perfume</span>
          </Link>
          <Link
            href="/admin/marcas"
            className="px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'var(--gold)',
            }}
          >
            Gerenciar Marcas
          </Link>
          <Link
            href="/admin/configuracoes"
            className="px-5 py-2.5 rounded-lg text-sm transition-all duration-200"
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
              color: 'var(--gold)',
            }}
          >
            Configurações
          </Link>
        </div>
      </div>
    </div>
  )
}
