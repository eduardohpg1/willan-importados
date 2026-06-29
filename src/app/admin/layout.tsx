import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--obsidian)' }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto p-4 pt-[68px] pb-[76px] md:p-8 md:pt-8 md:pb-8">
          {children}
        </main>
      </div>
    </div>
  )
}
