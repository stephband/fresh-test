
import { extname }                  from "std/path/mod.ts";
import { typeByExtension }          from "std/media_types/mod.ts";
import { readableStreamFromReader } from "std/streams/readable_stream_from_reader.ts";

/*
Serves files from the file system based on the rest of the URL.

TODO: To be secure, we should check incoming requests against the list of
allowed files generated when we set up the `/audio` route in `audio.js`.
*/

const rootpath = '/Users/stephband/Music/';

export const handler = async function(request, context) {
    const filepath = decodeURI(request.url).replace(/^.+\/files\//, rootpath);
    const file     = await Deno.open(filepath);
    const fileinfo = await Deno.stat(filepath);
    const fileext  = extname(filepath).toLowerCase();
    const stream   = readableStreamFromReader(file);

    const headers = new Headers();
    headers.set("Content-Type", typeByExtension(fileext) || "application/octet-stream");
    headers.set("Content-Length", fileinfo.size.toString());
    headers.set("Cache-Control", "no-cache");

    return new Response(stream, { headers });
};
