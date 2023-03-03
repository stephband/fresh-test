
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
