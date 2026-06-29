export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--obsidian)' }}>
      {children}
    </div>
  )
}
