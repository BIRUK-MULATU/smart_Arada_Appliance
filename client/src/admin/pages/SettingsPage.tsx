import { useEffect, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { adminApi } from '../lib/adminApi'
import type { ShopSettingsData } from '../../types/content'

function Field({
  label,
  value,
  onChange,
  placeholder,
  multiline,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  multiline?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium text-navy">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="rounded-lg border border-border px-3 py-2 text-sm focus:border-navy focus:outline-none"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </label>
  )
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-white p-6">
      <h2 className="font-semibold text-navy">{title}</h2>
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
    </div>
  )
}

export default function SettingsPage() {
  const [form, setForm] = useState<ShopSettingsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    adminApi
      .get<ShopSettingsData>('/settings')
      .then(setForm)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [])

  if (loading || !form) return <p className="text-text-muted">Loading…</p>

  function set<K extends keyof ShopSettingsData>(key: K, value: ShopSettingsData[K]) {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev))
  }

  function setHours<K extends keyof ShopSettingsData['hours']>(key: K, value: string) {
    setForm((prev) => (prev ? { ...prev, hours: { ...prev.hours, [key]: value } } : prev))
  }

  function setStats<K extends keyof ShopSettingsData['stats']>(key: K, value: string) {
    setForm((prev) => (prev ? { ...prev, stats: { ...prev.stats, [key]: value } } : prev))
  }

  function setSocial(platform: keyof ShopSettingsData['social'], key: string, value: string) {
    setForm((prev) =>
      prev
        ? {
            ...prev,
            social: {
              ...prev.social,
              [platform]: { ...prev.social[platform], [key]: value },
            },
          }
        : prev,
    )
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form) return
    setSaving(true)
    setMessage(null)
    setError(null)
    try {
      const saved = await adminApi.put<ShopSettingsData>('/settings', form)
      setForm(saved)
      setMessage('Saved.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-xl font-bold text-navy">Shop settings</h1>

      <form onSubmit={handleSubmit} className="flex max-w-3xl flex-col gap-6">
        <Section title="Basics">
          <Field label="Shop name" value={form.name} onChange={(v) => set('name', v)} />
          <Field label="Tagline" value={form.tagline} onChange={(v) => set('tagline', v)} />
        </Section>

        <Section title="Contact">
          <Field label="Phone (display)" value={form.phone} onChange={(v) => set('phone', v)} />
          <Field
            label="Phone link (tel:+251...)"
            value={form.phoneHref}
            onChange={(v) => set('phoneHref', v)}
          />
          <Field label="Address" value={form.address} onChange={(v) => set('address', v)} />
          <Field label="City" value={form.city} onChange={(v) => set('city', v)} />
        </Section>

        <Section title="Opening hours">
          <Field
            label="Weekdays"
            value={form.hours.weekdays}
            onChange={(v) => setHours('weekdays', v)}
          />
          <Field label="Sunday" value={form.hours.sunday} onChange={(v) => setHours('sunday', v)} />
          <Field
            label="Short (top bar)"
            value={form.hours.short}
            onChange={(v) => setHours('short', v)}
          />
        </Section>

        <Section title="Telegram & WhatsApp">
          <Field
            label="Telegram handle (@name)"
            value={form.telegramHandle}
            onChange={(v) => set('telegramHandle', v)}
          />
          <Field
            label="Telegram DM URL"
            value={form.telegramUrl}
            onChange={(v) => set('telegramUrl', v)}
          />
          <Field
            label="Telegram channel URL"
            value={form.telegramChannelUrl}
            onChange={(v) => set('telegramChannelUrl', v)}
          />
          <Field
            label="WhatsApp number (display)"
            value={form.whatsappNumber}
            onChange={(v) => set('whatsappNumber', v)}
          />
          <Field
            label="WhatsApp URL (https://wa.me/...)"
            value={form.whatsappUrl}
            onChange={(v) => set('whatsappUrl', v)}
          />
        </Section>

        <Section title="Delivery">
          <Field
            label="Free delivery threshold (ETB)"
            value={form.freeDeliveryThreshold}
            onChange={(v) => set('freeDeliveryThreshold', v)}
          />
          <Field
            label="Google Maps embed URL"
            value={form.mapEmbedUrl}
            onChange={(v) => set('mapEmbedUrl', v)}
          />
        </Section>

        <Section title="Images">
          <Field label="Logo URL" value={form.logoUrl} onChange={(v) => set('logoUrl', v)} />
          <Field
            label="Hero background video URL"
            value={form.heroVideoUrl}
            onChange={(v) => set('heroVideoUrl', v)}
          />
          <Field
            label="Fleet section background photo URL"
            value={form.fleetWatermarkUrl}
            onChange={(v) => set('fleetWatermarkUrl', v)}
          />
        </Section>

        <Section title="Contact section">
          <Field
            label="Eyebrow"
            value={form.contactEyebrow}
            onChange={(v) => set('contactEyebrow', v)}
          />
          <Field label="Title" value={form.contactTitle} onChange={(v) => set('contactTitle', v)} />
          <Field
            label="First photo URL"
            value={form.contactImageUrl}
            onChange={(v) => set('contactImageUrl', v)}
          />
          <Field
            label="Second photo URL"
            value={form.contactSecondImageUrl}
            onChange={(v) => set('contactSecondImageUrl', v)}
          />
          <Field
            label="Second photo caption"
            value={form.contactSecondImageCaption}
            onChange={(v) => set('contactSecondImageCaption', v)}
          />
        </Section>

        <Section title="About us">
          <Field label="Eyebrow" value={form.aboutEyebrow} onChange={(v) => set('aboutEyebrow', v)} />
          <Field label="Title" value={form.aboutTitle} onChange={(v) => set('aboutTitle', v)} />
          <Field
            label="Description"
            value={form.aboutDesc}
            onChange={(v) => set('aboutDesc', v)}
            multiline
          />
          <Field
            label="Photo URL"
            value={form.aboutImageUrl}
            onChange={(v) => set('aboutImageUrl', v)}
          />
          <Field
            label="Photo caption"
            value={form.aboutImageCaption}
            onChange={(v) => set('aboutImageCaption', v)}
          />
        </Section>

        <Section title="Hero stats">
          <Field
            label="Products in stock"
            value={form.stats.productsInStock}
            onChange={(v) => setStats('productsInStock', v)}
          />
          <Field
            label="Happy customers"
            value={form.stats.happyCustomers}
            onChange={(v) => setStats('happyCustomers', v)}
          />
          <Field
            label="Years in business"
            value={form.stats.yearsInBusiness}
            onChange={(v) => setStats('yearsInBusiness', v)}
          />
        </Section>

        <Section title="Social links">
          <Field
            label="TikTok URL"
            value={form.social.tiktok.url}
            onChange={(v) => setSocial('tiktok', 'url', v)}
          />
          <Field
            label="TikTok handle"
            value={form.social.tiktok.handle}
            onChange={(v) => setSocial('tiktok', 'handle', v)}
          />
          <Field
            label="Facebook URL"
            value={form.social.facebook.url}
            onChange={(v) => setSocial('facebook', 'url', v)}
          />
          <Field
            label="Instagram URL"
            value={form.social.instagram.url}
            onChange={(v) => setSocial('instagram', 'url', v)}
          />
          <Field
            label="YouTube URL"
            value={form.social.youtube.url}
            onChange={(v) => setSocial('youtube', 'url', v)}
          />
          <Field
            label="Viber chat link"
            value={form.social.viber.url}
            onChange={(v) => setSocial('viber', 'url', v)}
            placeholder="viber://chat?number=%2B251..."
          />
        </Section>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-emerald-700">{message}</p>}

        <button
          type="submit"
          disabled={saving}
          className="w-fit rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50"
        >
          {saving ? 'Saving…' : 'Save all settings'}
        </button>
      </form>
    </div>
  )
}
