export default function SobrePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-24">
      <div
        className="w-full max-w-3xl rounded-2xl overflow-hidden"
        style={{
          backgroundColor: 'var(--charcoal)',
          border: '1px solid rgba(201,168,76,0.15)',
          boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
        }}
      >
        {/* Linha dourada topo */}
        <div
          className="h-1 w-full"
          style={{ background: 'linear-gradient(90deg, transparent, var(--gold), transparent)' }}
        />

        <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
          {/* Foto */}
          <div className="flex-shrink-0">
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: '180px',
                height: '180px',
                border: '3px solid var(--gold)',
                boxShadow: '0 0 30px rgba(201,168,76,0.25)',
              }}
            >
              <img
                src="/willan.jpeg"
                alt="Willan Emanuel"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>

          {/* Texto */}
          <div className="flex flex-col gap-4 text-center md:text-left">
            {/* Ornamento */}
            <span
              className="text-center md:text-left"
              style={{ color: 'var(--gold)', fontSize: '11px', letterSpacing: '0.4em' }}
            >
              ✦ SOBRE MIM ✦
            </span>

            <h1
              style={{
                fontFamily: '"Playfair Display", serif',
                color: 'var(--ivory)',
                fontSize: 'clamp(22px, 4vw, 32px)',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Willan Emanuel
            </h1>

            <div
              className="h-px w-16 mx-auto md:mx-0"
              style={{ background: 'var(--gold)', opacity: 0.5 }}
            />

            <p
              style={{
                color: 'rgba(245,240,232,0.75)',
                fontSize: '15px',
                lineHeight: '1.8',
              }}
            >
              Olá! Sou Willan Emanuel, tenho 17 anos e sou de Maceió, Alagoas. Trabalho com
              perfumes árabes importados, oferecendo fragrâncias de qualidade, excelente fixação
              e ótimo custo-benefício. Meu objetivo é ajudar você a encontrar o perfume ideal,
              com um atendimento de confiança e dedicação.
            </p>
          </div>
        </div>

        {/* Linha dourada base */}
        <div
          className="h-px w-full"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)' }}
        />
      </div>
    </main>
  )
}
