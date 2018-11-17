const _ = require('lodash');

module.exports = () => {
    return (files, metalsmith, done) => {
        _.forEach(files, (fileMeta) => {
            if (fileMeta.date instanceof Date) {
                const { date } = fileMeta;
                fileMeta.date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
            }
        });

        done();
    };
};
