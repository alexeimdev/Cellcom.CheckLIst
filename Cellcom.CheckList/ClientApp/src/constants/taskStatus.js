import keyMirror from 'keymirror';

export default Object.assign({}, keyMirror({
    PENDING: null,
    RUNNING: null,
    DONE: null,
    UNDONE: null,
    CANCELED: null,
    ON_HOLD: null,
}));