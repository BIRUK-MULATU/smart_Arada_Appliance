import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import StorefrontPage from './pages/StorefrontPage'
import AllProductsPage from './pages/AllProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import NotFoundPage from './pages/NotFoundPage'
import AdminApp from './admin/AdminApp'
import { ShopSettingsProvider } from './context/ShopSettingsContext'
import { LanguageProvider } from './context/LanguageContext'

// Wraps every storefront route (not /admin) so these providers sit ABOVE
// the page components. A page component can't read a context value from a
// Provider it renders as its own descendant in the same return — so these
// must wrap from outside, not live inside StorefrontLayout.
function StorefrontProviders() {
  return (
    <ShopSettingsProvider>
      <LanguageProvider>
        <Outlet />
      </LanguageProvider>
    </ShopSettingsProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<StorefrontProviders />}>
          <Route path="/" element={<StorefrontPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  )
}
