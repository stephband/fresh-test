
import compileTemplate from '../lib/literal/deno/compile-template.js';

const cwd = Deno.cwd();

export function template(src) {
    const path    = cwd + src;
    const promise = compileTemplate(path);

    return (request, context) => promise.then((render) =>
        render(request, context.state, context.params)
        .then((html) => new Response(html, {
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
