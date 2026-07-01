export default function HeroBanner() {
  return (
    <div className="w-full" style={{ maxHeight: '520px', overflow: 'hidden' }}>
      <img
        src="/nova.jpeg"
        alt="Willan Importados — Poder, Estilo e Sofisticação"
        className="w-full block"
        style={{ height: '520px', objectFit: 'cover', objectPosition: 'center top' }}
      />
    </div>
  )
}
