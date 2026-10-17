import type { NextFunction, Request, Response } from 'express'
import { SESSION_COOKIE, verifySessionToken } from '../lib/auth.js'

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[SESSION_COOKIE] as string | undefined

  if (!verifySessionToken(token)) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }

  next()
}
