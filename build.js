const Metalsmith = require('metalsmith');
const markdown = require('metalsmith-markdown');
const layouts = require('metalsmith-layouts');
const collections = require('metalsmith-collections');
const discoverPartials = require('metalsmith-discover-partials');
const datePlugin = require('metalsmith-date-in-filename');
const permalinks = require('metalsmith-permalinks');
const feed = require('metalsmith-feed');
const excerpts = require('metalsmith-excerpts');
const formatDate = require('./plugins/formatDate');
const stripExcerptTags = require('./plugins/stripExcerptTags');

Metalsmith(__dirname)
    .metadata({
        sitename: 'Ivan Sosnin',
        role: 'Frontend developer',
        // for RSS feed
        site: {
            title: 'Ivan Sosnin blog',
            url: 'https://vansosnin.github.io/',
            author: 'Ivan Sosnin',
        },
    })
    .source('./src')
    .destination('./public')
    .use(datePlugin({ override: true }))
    .use(
        collections({
            posts: {
                pattern: 'posts/**/*.md',
                sortBy: (a, b) => b.date.getTime() - a.date.getTime(),
                reverse: true,
            },
        })
    )
    .use(feed({ collection: 'posts', limit: false, destination: 'rss.xml' }))
    .use(formatDate())
    .use(markdown())
    .use(excerpts())
    .use(stripExcerptTags())
    .use(
        permalinks({
            pattern: ':slug',
        })
    )
    .use(
        discoverPartials({
            directory: './templates/partials',
            pattern: /\.hbs$/,
        })
    )
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
