# Laravel Mix JS Partials

![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)
[![Latest Version on NPM](https://img.shields.io/npm/v/laravel-mix-js-partial.svg?style=flat-square)](https://npmjs.com/package/laravel-mix-js-partial)

This package adds a `jsPartial` option to Laravel Mix, which copies JS code into a partial file.
## Usage

First, install the extension.

```
npm install laravel-mix-js-partial --save-dev
```

Then, require it within your `webpack.mix.js` file:

```js
let mix = require('laravel-mix');

require('laravel-mix-js-partial');

mix.jsPartial('js/gallery.js', 'partials/gallery-js.php');
```
\
Note: If you are using `setPublicPath` option in your mix file then declare `setPublicPath` option before `jsPartial` option.

```js
mix.setPublicPath('dist').jsPartial('js/gallery.js', 'partials/gallery-js.php');
```

### Examples:

```js
// 1. A single src and output path.
mix.jsPartial('src/gallery.js', 'partials/gallery-js.php');

// 2. For additional src files that should be bundled together:
mix.jsPartial([
    'src/gallery.js',
    'src/nac.js'
], 'partials/gallery-js.php');

// 3. For multiple partials:
mix.jsPartial('src/gallery.js', 'partials/gallery-js.php')
   .jsPartial('src/nav.js', 'partials/nav-js.php');
```