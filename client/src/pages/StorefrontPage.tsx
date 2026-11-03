import StorefrontLayout from '../components/StorefrontLayout'
import Hero from '../components/Hero'
import TrustStrip from '../components/TrustStrip'
import CategoryGrid from '../components/CategoryGrid'
import FeaturedProducts from '../components/FeaturedProducts'
import SocialVideos from '../components/SocialVideos'
import DealOfWeek from '../components/DealOfWeek'
import AboutUs from '../components/AboutUs'
import WhyChooseUs from '../components/WhyChooseUs'
import OurFleet from '../components/OurFleet'
import HowToOrder from '../components/HowToOrder'
import GiftFromAbroad from '../components/GiftFromAbroad'
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
      <AboutUs />
      <WhyChooseUs />
      <OurFleet />
      <HowToOrder />
      <GiftFromAbroad />
      <Brands />
      <Reviews />
      <Faq />
      <Contact />
      <TelegramCta />
    </StorefrontLayout>
  )
}
