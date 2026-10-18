import { Link } from 'react-router-dom'
import StorefrontLayout from '../components/StorefrontLayout'
import Container from '../components/ui/Container'
import Button from '../components/ui/Button'
import { useLanguage } from '../context/LanguageContext'

export default function NotFoundPage() {
  const { t } = useLanguage()

  return (
    <StorefrontLayout>
      <Container className="flex flex-col items-center gap-4 py-24 text-center">
        <span className="text-6xl font-extrabold text-accent">404</span>
        <h1 className="text-2xl font-bold text-navy">{t('notFound.title')}</h1>
        <p className="max-w-sm text-text-muted">{t('notFound.desc')}</p>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Button href="/">{t('notFound.backHome')}</Button>
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-white px-5 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy"
          >
            {t('notFound.browseProducts')}
          </Link>
        </div>
      </Container>
    </StorefrontLayout>
  )
}
