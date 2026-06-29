import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--obsidian)' }}>
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
