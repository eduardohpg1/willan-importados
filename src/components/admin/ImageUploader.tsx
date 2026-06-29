'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X, Loader2, ImagePlus } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
}

export default function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    setError('')

    const supabase = createClient()
    const uploaded: string[] = []

    for (const file of Array.from(files)) {
      if (!file.type.startsWith('image/')) continue
      if (file.size > 5 * 1024 * 1024) {
        setError('Arquivo muito grande. Máximo 5MB.')
        continue
      }

      const ext = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

      const { data, error: uploadError } = await supabase.storage
        .from('perfume-images')
        .upload(fileName, file, { upsert: false })

      if (uploadError) {
        setError(`Erro ao enviar imagem: ${uploadError.message}`)
        continue
      }

      const { data: urlData } = supabase.storage
        .from('perfume-images')
        .getPublicUrl(data.path)

      uploaded.push(urlData.publicUrl)
    }

    onChange([...images, ...uploaded])
    setUploading(false)
  }

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-4">
      {/* Área de upload */}
      <div
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200"
        style={{ borderColor: 'rgba(201,168,76,0.3)' }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          e.currentTarget.style.borderColor = 'var(--gold)'
          e.currentTarget.style.backgroundColor = 'rgba(201,168,76,0.04)'
        }}
        onDragLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
          e.currentTarget.style.backgroundColor = 'transparent'
        }}
        onDrop={(e) => {
          e.preventDefault()
          e.currentTarget.style.borderColor = 'rgba(201,168,76,0.3)'
          e.currentTarget.style.backgroundColor = 'transparent'
          handleUpload(e.dataTransfer.files)
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />

        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={24} className="animate-spin" style={{ color: 'var(--gold)' }} />
            <p className="text-sm" style={{ color: 'rgba(245,240,232,0.5)' }}>
              Enviando imagens...
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <ImagePlus size={28} style={{ color: 'var(--gold)', opacity: 0.7 }} />
            <p className="text-sm" style={{ color: 'rgba(245,240,232,0.7)' }}>
              Clique ou arraste imagens aqui
            </p>
            <p className="text-xs" style={{ color: 'rgba(245,240,232,0.35)' }}>
              PNG, JPG, WEBP — máx. 5MB por arquivo
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      {/* Preview das imagens */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((url, idx) => (
            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
              <Image
                src={url}
                alt={`Imagem ${idx + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: 'rgba(0,0,0,0.8)', color: '#f87171' }}
              >
                <X size={12} />
              </button>
              {idx === 0 && (
                <span
                  className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 text-xs rounded"
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    color: 'var(--gold)',
                    fontSize: '10px',
                  }}
                >
                  Principal
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Hidden inputs para enviar as URLs ao formulário */}
      {images.map((url, idx) => (
        <input key={idx} type="hidden" name="images" value={url} />
      ))}
    </div>
  )
}
