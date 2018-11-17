const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const datePlugin = require('metalsmith-date-in-filename');

Metalsmith(__dirname)
    .metadata({
        sitename: 'Ivan Sosnin',
    })
    .source('./src')
    .destination('./public')
    .use(
        collections({
            posts: {
                pattern: 'posts/**/*.md',
                sortBy: 'date',
                reverse: true,
            },
        })
    )
    .use(datePlugin({ override: true }))
    .use(markdown())
    .use(
        layouts({
            directory: './templates',
            default: 'post.hbs',
        })
    )
    .build((err) => {
        if (err) {
            throw err;
        }

        console.log('Build successfull!');
    });
