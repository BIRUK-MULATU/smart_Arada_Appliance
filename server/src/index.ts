import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import publicRoutes from './routes/public.js'
import authRoutes from './routes/auth.js'
import adminRoutes from './routes/admin.js'
import { requireAdmin } from './middleware/requireAdmin.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(cookieParser())

// Test route — just to check that the backend is alive
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Appliance shop API is running' })
})

app.use('/api', publicRoutes)
app.use('/api/admin', authRoutes)
app.use('/api/admin', requireAdmin, adminRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
