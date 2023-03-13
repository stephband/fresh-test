
import compile from '../static/literal/deno/compile-template.js';

const cwd  = Deno.cwd();

export function template(src) {
    const head    = compile(cwd + '/templates/document/head.html');
    const body    = compile(cwd + src);
    const foot    = compile(cwd + '/templates/document/foot.html');
    const promise = Promise.all([head, body, foot]);

    return (request, context) => promise.then(([head, body, foot]) =>
        body(request, context.state, context.params)
        .then((html) => Promise.all([
            head(request, context.state, context.params),
            html,
            foot(request, context.state, context.params)
        ]))
        .then((parts) =>
            new Response(parts.join(''), {
                headers: {
                    "Content-Type": "text/html"
                }
            })
        )
    );
}





export function html(strings, ...values) {
    const html = String.raw({ raw: strings }, ...values);

    return new Response(html, {
        headers: {
            "Content-Type": "text/html"
        }
    });
}

export function json(object) {
    const json = JSON.stringify(object);

    return new Response(json, {
        headers: {
            "Content-Type": "application/json"
        }
    });
}
