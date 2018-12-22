const _ = require('lodash');

module.exports = () => {
    return (files, metalsmith, done) => {
        _.forEach(files, (fileMeta) => {
            if (fileMeta.date instanceof Date) {
                const { date } = fileMeta;
                let month = (date.getMonth() + 1).toString();
                month = month.length === 1 ? `0${month}` : month;
                fileMeta.date = `${date.getDate()}.${month}.${date.getFullYear()}`;
            }
        });

        done();
    };
};
