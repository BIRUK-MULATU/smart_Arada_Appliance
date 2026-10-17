import { createHmac, timingSafeEqual } from 'node:crypto';
const SESSION_COOKIE = 'admin_session';
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
function getSecret() {
    const secret = process.env.SESSION_SECRET;
    if (!secret)
        throw new Error('SESSION_SECRET is not set in server/.env');
    return secret;
}
function sign(value) {
    return createHmac('sha256', getSecret()).update(value).digest('base64url');
}
export function createSessionToken() {
    const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_TTL_MS })).toString('base64url');
    return `${payload}.${sign(payload)}`;
}
export function verifySessionToken(token) {
    if (!token)
        return false;
    const [payload, signature] = token.split('.');
    if (!payload || !signature)
        return false;
    const expected = sign(payload);
    const a = Buffer.from(signature);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b))
        return false;
    try {
        const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        return typeof exp === 'number' && Date.now() < exp;
    }
    catch {
        return false;
    }
}
export function checkPassword(candidate) {
    const expected = process.env.ADMIN_PASSWORD;
    if (!expected)
        throw new Error('ADMIN_PASSWORD is not set in server/.env');
    const a = Buffer.from(candidate);
    const b = Buffer.from(expected);
    return a.length === b.length && timingSafeEqual(a, b);
}
export { SESSION_COOKIE };
//# sourceMappingURL=auth.js.map