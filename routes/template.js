
import { template } from '../modules/respond.js';

const data = {
    string: 'Hello world',
    number: 0,
    regexp: /^hello/,
    array:  [0, 1, 2],
    object: { key: 'value' },
    function: function(a, b) { return a + b; },
    arrow:  (a, b) => a + b,
    null:   null,
    undefined: undefined,
    NaN:    NaN,
    infinity: Infinity,
    symbol: Symbol('name'),
    promise: Promise.resolve('promise')
};

export const handler = {
    GET: template('/templates/test-template.html')
}
