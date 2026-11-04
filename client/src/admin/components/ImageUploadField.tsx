import { useState } from 'react'
import type { ChangeEvent, ReactNode } from 'react'
import { upload } from '@vercel/blob/client'

export default function ImageUploadField({
  value,
  onChange,
  placeholder,
  showPreview = true,
  extra,
}: {
  value: string
  onChange: (url: string) => void
  placeholder?: string
  showPreview?: boolean
  extra?: ReactNode
}) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return
    setUploading(true)
    setError(null)
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/admin/upload',
      })
      onChange(blob.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <label className="flex cursor-pointer items-center justify-center rounded-lg border border-border px-3 text-sm font-semibold text-navy hover:border-navy">
          {uploading ? 'Uploading…' : 'Upload'}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
        {extra}
      </div>
      {showPreview && value && (
        <img src={value} alt="Preview" className="h-20 w-20 rounded-lg border border-border object-cover" />
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
