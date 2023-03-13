
import { getCookies } from 'std/http/cookie.ts';
import { token } from './token.js';

export function authentication(request, context) {
    const cookies = getCookies(request.headers);
    request.isAuthenticated = cookies.authentication === token;
    return context.next();
}
