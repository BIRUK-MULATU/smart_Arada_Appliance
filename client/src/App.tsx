import { useEffect, useState } from 'react'

type Product = { id: number; name: string; category: string }

export default function App() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then(setProducts)
  }, [])

  return (
    <main className="min-h-screen bg-slate-50 p-10">
      <h1 className="text-4xl font-extrabold text-slate-900">Tailwind is working 🎉</h1>
      <ul className="mt-6 space-y-2">
        {products.map((p) => (
          <li key={p.id} className="rounded-lg bg-white p-4 shadow">
            {p.name} <span className="text-sm text-slate-500">({p.category})</span>
          </li>
        ))}
      </ul>
    </main>
  )
}