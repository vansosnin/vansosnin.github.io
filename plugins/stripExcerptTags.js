const _ = require('lodash');
const striptags = require('striptags');

module.exports = () => {
    return (files, metalsmith, done) => {
        _.forEach(files, (fileMeta) => {
            if (fileMeta.excerpt) {
                fileMeta.excerpt = striptags(fileMeta.excerpt);
            }
        });

        done();
    };
};
