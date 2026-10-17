import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// Test route — just to check that the backend is alive
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Appliance shop API is running' })
})

// Sample products — later these will come from a database
app.get('/api/products', (_req, res) => {
  res.json([
    { id: 1, name: 'Double-door refrigerator', category: 'Refrigerators', price: 0, onSale: true },
    { id: 2, name: 'Front-load washing machine', category: 'Washing machines', price: 0, onSale: false },
  ])
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))