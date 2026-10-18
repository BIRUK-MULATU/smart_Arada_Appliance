import type { ReactNode } from 'react'
import TopBar from './TopBar'
import Header from './Header'
import Footer from './Footer'
import FloatingTelegramButton from './FloatingTelegramButton'
import { ShopSettingsProvider } from '../context/ShopSettingsContext'

export default function StorefrontLayout({ children }: { children: ReactNode }) {
  return (
    <ShopSettingsProvider>
      <div className="min-h-screen bg-white">
        <TopBar />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingTelegramButton />
      </div>
    </ShopSettingsProvider>
  )
}
