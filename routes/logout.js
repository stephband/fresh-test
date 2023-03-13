
import { deleteCookie } from 'std/http/cookie.ts';
import { template }  from '../modules/respond.js';

const renderAuthenticated = template('/templates/authentication/authenticated.html');

export const handler = {
    GET: async function(request, context) {
        const url     = new URL(request.url);
        const headers = new Headers();

        deleteCookie(headers, "authentication", {
            domain: url.hostname,
            path: "/"
        });

        headers.set('location', '/');

        return new Response(null, {
            status: 302,
            headers
        });
    }
}
