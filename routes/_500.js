export default function({ error }) {
    return `500 internal error: ${ error.message }`;
}
