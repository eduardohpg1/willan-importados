import { Package, Tags, Plus, ChevronRight } from 'lucide-react'
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

  return (
    <div className="space-y-4">

      {/* Título */}
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}>
          Painel
        </h1>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(245,240,232,0.4)' }}>
          Willan Importados
        </p>
      </div>

      {/* Stats em linha */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/admin/perfumes"
          className="flex items-center gap-3 p-4 rounded-2xl active:opacity-70 transition-opacity"
          style={{ backgroundColor: 'var(--charcoal)', border: '1px solid rgba(201,168,76,0.1)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
            <Package size={18} style={{ color: 'var(--gold)' }} />
          </div>
          <div>
            <p className="text-xl font-bold leading-none" style={{ color: 'var(--ivory)' }}>{stats.perfumesCount}</p>
            <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(245,240,232,0.4)' }}>Perfumes</p>
          </div>
        </Link>

        <Link href="/admin/marcas"
          className="flex items-center gap-3 p-4 rounded-2xl active:opacity-70 transition-opacity"
          style={{ backgroundColor: 'var(--charcoal)', border: '1px solid rgba(201,168,76,0.1)' }}>
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: 'rgba(201,168,76,0.1)' }}>
            <Tags size={18} style={{ color: 'var(--gold)' }} />
          </div>
          <div>
            <p className="text-xl font-bold leading-none" style={{ color: 'var(--ivory)' }}>{stats.brandsCount}</p>
            <p className="text-[10px] uppercase tracking-wider mt-0.5" style={{ color: 'rgba(245,240,232,0.4)' }}>Marcas</p>
          </div>
        </Link>
      </div>

      {/* WhatsApp */}
      <WhatsAppCard whatsappNumber={settings?.whatsapp_number || '5511999999999'} />

      {/* Ações rápidas */}
      <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(201,168,76,0.1)' }}>
        <p className="px-4 py-3 text-[10px] uppercase tracking-widest" style={{ color: 'var(--gold)', backgroundColor: 'var(--charcoal)' }}>
          Ações rápidas
        </p>
        {[
          { href: '/admin/perfumes/novo', label: 'Novo Perfume', desc: 'Adicionar ao catálogo' },
          { href: '/admin/perfumes', label: 'Gerenciar Perfumes', desc: 'Editar ou excluir' },
          { href: '/admin/marcas', label: 'Gerenciar Marcas', desc: 'Criar ou remover marcas' },
          { href: '/admin/configuracoes', label: 'Configurações', desc: 'WhatsApp e preferências' },
        ].map(({ href, label, desc }, i, arr) => (
          <Link key={href} href={href}
            className="flex items-center justify-between px-4 py-3.5 active:opacity-70 transition-opacity"
            style={{
              backgroundColor: 'var(--charcoal)',
              borderTop: i > 0 ? '1px solid rgba(201,168,76,0.06)' : 'none',
            }}>
            <div>
              <p className="text-sm font-medium" style={{ color: 'var(--ivory)' }}>{label}</p>
              <p className="text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>{desc}</p>
            </div>
            <ChevronRight size={16} style={{ color: 'rgba(201,168,76,0.4)' }} />
          </Link>
        ))}
      </div>

      {/* Botão destaque */}
      <Link href="/admin/perfumes/novo"
        className="btn-gold flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-semibold">
        <Plus size={16} />
        Novo Perfume
      </Link>
    </div>
  )
}
