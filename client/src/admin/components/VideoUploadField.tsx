import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { upload } from '@vercel/blob/client'

export default function VideoUploadField({
  value,
  onChange,
  placeholder,
}: {
  value: string
  onChange: (url: string) => void
  placeholder?: string
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
            accept="video/*"
            className="hidden"
            disabled={uploading}
            onChange={handleFile}
          />
        </label>
      </div>
      {value && /\.(mp4|webm|mov|m4v)(\?|$)/i.test(value) && (
        <video src={value} controls className="h-28 w-48 rounded-lg border border-border object-cover" />
      )}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  )
}
