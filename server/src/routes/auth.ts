import { Router } from 'express'
import { SESSION_COOKIE, checkPassword, createSessionToken, verifySessionToken } from '../lib/auth.js'

const router = Router()

const cookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 7 * 24 * 60 * 60 * 1000,
}

router.post('/login', (req, res) => {
  const { password } = req.body as { password?: string }

  if (typeof password !== 'string' || !checkPassword(password)) {
    res.status(401).json({ error: 'Incorrect password' })
    return
  }

  res.cookie(SESSION_COOKIE, createSessionToken(), cookieOptions)
  res.json({ ok: true })
})

router.post('/logout', (_req, res) => {
  res.clearCookie(SESSION_COOKIE)
  res.json({ ok: true })
})

router.get('/me', (req, res) => {
  const token = req.cookies?.[SESSION_COOKIE] as string | undefined
  res.json({ authenticated: verifySessionToken(token) })
})

export default router
