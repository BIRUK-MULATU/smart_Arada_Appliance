import { BrowserRouter, Route, Routes } from 'react-router-dom'
import StorefrontPage from './pages/StorefrontPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AdminApp from './admin/AdminApp'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StorefrontPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/admin/*" element={<AdminApp />} />
      </Routes>
    </BrowserRouter>
  )
}
