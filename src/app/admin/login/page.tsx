'use client'

import { useState } from 'react'
import { login } from '@/lib/actions/auth'
import { Eye, EyeOff, Lock } from 'lucide-react'

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError('')
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--obsidian)' }}
    >
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <span
            className="text-3xl font-bold tracking-widest uppercase block"
            style={{ fontFamily: '"Playfair Display", serif', color: 'var(--gold)' }}
          >
            Willan
          </span>
          <span
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: 'rgba(245,240,232,0.5)' }}
          >
            Importados
          </span>
          <div className="line-gold w-16 mx-auto mt-4" />
          <p
            className="text-sm mt-4"
            style={{ color: 'rgba(245,240,232,0.5)' }}
          >
            Área Administrativa
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{
            backgroundColor: 'var(--charcoal)',
            border: '1px solid rgba(201,168,76,0.15)',
          }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Lock size={16} style={{ color: 'var(--gold)' }} />
            <h1
              className="text-xl font-semibold"
              style={{ fontFamily: '"Playfair Display", serif', color: 'var(--ivory)' }}
            >
              Entrar
            </h1>
          </div>

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-xs tracking-wider uppercase mb-2"
                style={{ color: 'rgba(245,240,232,0.5)' }}
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{
                  backgroundColor: 'var(--smoke)',
                  border: '1px solid rgba(201,168,76,0.15)',
                  color: 'var(--ivory)',
                }}
                onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.5)' }}
                onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.15)' }}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs tracking-wider uppercase mb-2"
                style={{ color: 'rgba(245,240,232,0.5)' }}
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPass ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: 'var(--smoke)',
                    border: '1px solid rgba(201,168,76,0.15)',
                    color: 'var(--ivory)',
                  }}
                  onFocus={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.5)' }}
                  onBlur={(e) => { e.currentTarget.style.border = '1px solid rgba(201,168,76,0.15)' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
                  style={{ color: 'rgba(245,240,232,0.35)' }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div
                className="px-4 py-3 rounded-lg text-sm"
                style={{
                  backgroundColor: 'rgba(239,68,68,0.1)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#f87171',
                }}
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 rounded-xl text-sm tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Entrando...' : 'Entrar'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
