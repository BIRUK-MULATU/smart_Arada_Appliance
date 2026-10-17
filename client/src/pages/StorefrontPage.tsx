import TopBar from '../components/TopBar'
import Header from '../components/Header'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import CategoryGrid from '../components/CategoryGrid'
import FeaturedProducts from '../components/FeaturedProducts'
import SocialVideos from '../components/SocialVideos'
import DealOfWeek from '../components/DealOfWeek'
import WhyChooseUs from '../components/WhyChooseUs'
import HowToOrder from '../components/HowToOrder'
import Brands from '../components/Brands'
import Reviews from '../components/Reviews'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import TelegramCta from '../components/TelegramCta'
import Footer from '../components/Footer'
import FloatingTelegramButton from '../components/FloatingTelegramButton'
import { ShopSettingsProvider } from '../context/ShopSettingsContext'

export default function StorefrontPage() {
  return (
    <ShopSettingsProvider>
      <div className="min-h-screen bg-white">
        <TopBar />
        <Header />
        <main>
          <Hero />
          <TrustStrip />
          <CategoryGrid />
          <FeaturedProducts />
          <SocialVideos />
          <DealOfWeek />
          <WhyChooseUs />
          <HowToOrder />
          <Brands />
          <Reviews />
          <Faq />
          <Contact />
          <TelegramCta />
        </main>
        <Footer />
        <FloatingTelegramButton />
      </div>
    </ShopSettingsProvider>
  )
}
