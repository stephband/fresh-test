
import { html } from '../modules/respond.js';

export const handler = {
    GET: async (request) => {
        const thing = 'Dooby';
        return html`
            <h1>HTML string for the win - ${ thing }</h1>
        `;
    }
};
