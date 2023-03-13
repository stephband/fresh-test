
export default async function select(selector, path) {
    const files  = [];

    for await (const entry of Deno.readDir(path)) {
        // Ignore hidden files and directories
        if (entry.name[0] === '.') {
            continue;
        }

        const pathname = path + entry.name;

        // Is entry a file with an extension of the form .js ?
        if (entry.isFile && (selector.test(pathname))) {
            entry.path = path;
            files.push(entry);
        }

        // Is entry a directory, one that is not excluded by config ?
        else if (entry.isDirectory) {
            // Ignore directories without permission
            try {
                files.push.apply(files, await select(selector, pathname + '/'));
            }
            catch (e) {

            }
        }
    }

    return files;
}
