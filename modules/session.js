import { getCookies, setCookie } from 'std/http/cookie.ts';
import { generate } from "std/uuid/v5.ts";

const sessions = {};

export async function session(request, context) {
    const cookies = getCookies(request.headers);

    // Get session data from memory - this wants to be backed by a database!
    request.session = cookies.session && sessions[cookies.session] ?
        sessions[cookies.session] :
        {} ;

    const response = await context.next();

    if (!cookies.session) {
        const url = new URL(request.url);
        const key = crypto.randomUUID();
        sessions[key] = request.session;

        setCookie(response.headers, {
            name: "session",
            value: key,
            maxAge: 120,
            sameSite: "Lax",
            domain: url.hostname,
            path: "/",
            //secure: true
        });
    }

    return response;
}
