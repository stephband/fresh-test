
import { html } from '../modules/respond.js';

export const handler = {
    GET: (request, ctx) => html`
        <head>
            <title>Fresh App</title>
        </head>
        <body>
            <div>
                <img src="/logo.svg" width="128" height="128" alt="the fresh logo: a sliced lemon dripping with juice"/>
                <p>
                    Welcome to fresh. Try updating this message in the ./routes/index.tsx
                    file, and refresh.
                </p>
            </div>
        </body>
    `
}
