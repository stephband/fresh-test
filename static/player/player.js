
import delegate from '../dom/modules/delegate.js';
import events   from '../dom/modules/events.js';

const audio = document.getElementById('audio');

events('click', document)
.each(delegate({
    '[name="cue"]': function(button, e) {
        const filepath = button.value;
        audio.src = '/files/' + filepath;
        audio.play();
    }
}));

events('input', document)
.each(delegate({
    '[name="rate"]': function(input, e) {
        console.log(parseFloat(input.value));
        audio.playbackRate = parseFloat(input.value);
    }
}));
