import { Navigate, Route, Routes } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import LoginPage from './pages/LoginPage'
import ProductsPage from './pages/ProductsPage'
import CategoriesPage from './pages/CategoriesPage'
import ReviewsPage from './pages/ReviewsPage'
import FaqPage from './pages/FaqPage'
import BrandsPage from './pages/BrandsPage'
import DealPage from './pages/DealPage'
import SettingsPage from './pages/SettingsPage'

export default function AdminApp() {
  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route element={<AdminLayout />}>
        <Route index element={<Navigate to="products" replace />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="reviews" element={<ReviewsPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route path="brands" element={<BrandsPage />} />
        <Route path="deal" element={<DealPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
