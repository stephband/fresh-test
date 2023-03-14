

import by           from '../static/fn/modules/by.js';
import get          from '../static/fn/modules/get.js';
import { template } from '../modules/respond.js';
import selectFiles  from '../modules/select-files.js';

const musicdir    = '/Users/stephband/Music/';
const renderFiles = template('/templates/player/files.html');

export const handler = {
    GET: async function(request, context) {
        const files = await selectFiles(/\.(wav|m4a|m4p|aif|aiff|flac|aac)$/, musicdir);

        files.forEach((file) => {
            file.path   = file.path.slice(musicdir.length);
            file.title  = file.name.replace(/\.[^\.]+$/, '');
            file.ext    = file.name.replace(/^.+\./, '');
            file.artist = file.path.replace(/\/.+\/$/, '');
            file.album  = file.path.slice(file.artist.length + 1).replace(/\/$/, '');
        });

        files
        .sort(by(get('name')))
        .sort(by(get('album')))
        .sort(by(get('artist')));

        //console.log(files);
        context.state = files;
        return renderFiles(request, context);
    }
}
