import { SESSION_COOKIE, verifySessionToken } from '../lib/auth.js';
export function requireAdmin(req, res, next) {
    const token = req.cookies?.[SESSION_COOKIE];
    if (!verifySessionToken(token)) {
        res.status(401).json({ error: 'Not authenticated' });
        return;
    }
    next();
}
//# sourceMappingURL=requireAdmin.js.map