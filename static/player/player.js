
import slugify  from '../fn/modules/slugify.js';
import delegate from '../dom/modules/delegate.js';
import events   from '../dom/modules/events.js';

const tracks = window.tracks;
const track  = document.getElementById('loaded-track');
const album  = document.getElementById('loaded-album');
const artist = document.getElementById('loaded-artist');
const audio  = document.getElementById('audio');

const state = {};

function play(file) {
    audio.src = '/files/' + file.path + file.name;
    audio.play();

    track.innerHTML  = file.title;

    album.innerHTML  = file.album;
    album.href       = '#' + slugify(file.artist + '–' + file.album);

    artist.innerHTML = file.artist;
    artist.href      = '#' + slugify(file.artist);

    state.file = file;
}

events('click', document)
.each(delegate({
    '[name="cue"]': function(button, e) {
        const filepath = button.value;
        const file = tracks.find((file) => filepath === (file.path + file.name));

        play(file);
    },

    '.album-text[href]': function(button, e) {
        const url  = new URL(button.href);
        const hash = url.hash.replace(/^#/, '');
        const elem = document.getElementById(hash);

        elem.scrollIntoView();
    }
}));

events('input', document)
.each(delegate({
    '[name="rate"]': function(input, e) {
        audio.playbackRate = parseFloat(input.value);
    }
}));

events('ended', audio)
.each((e) => {
    const i    = tracks.indexOf(state.file);
    const file = tracks[i + 1];

    play(file);
});
