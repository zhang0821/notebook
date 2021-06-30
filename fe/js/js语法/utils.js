function log(...arg) {
        try {
            if (arg.length > 0 && typeof arg[0] === 'string') {
                arg[0] = '%c' + arg[0];
                arg.splice(1, 0, 'background:#eee;color: blue');
            }
            console.log.apply(this, arg);
        } catch (e) {
            console.log('util.log error');
        }
};

module.exports = {
    log
}
