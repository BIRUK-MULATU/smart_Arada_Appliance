declare const SESSION_COOKIE = "admin_session";
export declare function createSessionToken(): string;
export declare function verifySessionToken(token: string | undefined): boolean;
export declare function checkPassword(candidate: string): boolean;
export { SESSION_COOKIE };
//# sourceMappingURL=auth.d.ts.map