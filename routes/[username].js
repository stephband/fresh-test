
import { html } from '../modules/respond.js';

export const handler = {
    'GET': async (request, ctx) => {
        const { params, renderNotFound, state } = ctx;

        // Fetch user data from github
        const resp = await fetch(`https://api.github.com/users/${ params.username }`);
        if (resp.status === 404) {
            return ctx.render(null);
        }

        // Turn it into an object
        const user = await resp.json();
        if (!user) {
            return html`<h1>User not found</h1>`;
        }

        // Respond with HTML
        return html`
            <div>
                <img src="${ user.avatar_url}" width="64" height="64" />
                <h1>${ user.name }</h1>
                <p>${ user.login }</p>
            </div>

            <div>
                ${ Object.keys(ctx).join(', ') }
            </div>
        `;
    },
};
