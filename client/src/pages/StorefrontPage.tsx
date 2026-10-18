import StorefrontLayout from '../components/StorefrontLayout'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import CategoryGrid from '../components/CategoryGrid'
import FeaturedProducts from '../components/FeaturedProducts'
import SocialVideos from '../components/SocialVideos'
import DealOfWeek from '../components/DealOfWeek'
import WhyChooseUs from '../components/WhyChooseUs'
import OurFleet from '../components/OurFleet'
import HowToOrder from '../components/HowToOrder'
import Brands from '../components/Brands'
import Reviews from '../components/Reviews'
import Faq from '../components/Faq'
import Contact from '../components/Contact'
import TelegramCta from '../components/TelegramCta'

export default function StorefrontPage() {
  return (
    <StorefrontLayout>
      <Hero />
      <TrustStrip />
      <CategoryGrid />
      <FeaturedProducts />
      <SocialVideos />
      <DealOfWeek />
      <WhyChooseUs />
      <OurFleet />
      <HowToOrder />
      <Brands />
      <Reviews />
      <Faq />
      <Contact />
      <TelegramCta />
    </StorefrontLayout>
  )
}
