import type { ReactNode } from 'react'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'
import FloatingTelegramButton from './FloatingTelegramButton'

// ShopSettingsProvider and LanguageProvider wrap the storefront routes from
// App.tsx (above every page component), not here — see the comment on
// StorefrontProviders in App.tsx for why.
export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingTelegramButton />
    </div>
  )
}
