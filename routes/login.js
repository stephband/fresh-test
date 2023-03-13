
import { setCookie } from 'std/http/cookie.ts';
import { template }  from '../modules/respond.js';
import { token }     from '../modules/token.js';

const renderLogin         = template('/templates/authentication/login.html');
const renderAuthenticated = template('/templates/authentication/authenticated.html');

export const handler = {
    GET: renderLogin,

    POST: async function(request, context) {
        const url  = new URL(request.url);
        const form = await request.formData();

        // Check username/password against a database!
        if (form.get('username') === 'admin' && form.get('password') === 'admin') {
            const headers = new Headers();

            setCookie(headers, {
                name: "authentication",
                value: token,
                maxAge: 120,
                sameSite: "Lax",
                domain: url.hostname,
                path: "/",
                //secure: true
            });

            headers.set('location', '/authenticated');

            return new Response(null, {
                status: 302, // Redirect
                headers
            });
        }

        // Login failed
        const response = await renderLogin(request, context);
        //response.set('status', 403);
        return response;
    }
}
