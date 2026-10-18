import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import translations from '../i18n/translations'
import type { Lang, TranslationKey } from '../i18n/translations'

const STORAGE_KEY = 'smart-arada-lang'

type LanguageContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (key: TranslationKey, vars?: Record<string, string>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function readInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en'
  return window.localStorage.getItem(STORAGE_KEY) === 'am' ? 'am' : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(readInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  function t(key: TranslationKey, vars?: Record<string, string>) {
    let text = translations[key]?.[lang] ?? key
    if (vars) {
      for (const [name, value] of Object.entries(vars)) {
        text = text.replace(`{{${name}}}`, value)
      }
    }
    return text
  }

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
