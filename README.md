
# Webpack and Bootstrap3
Webpack2 config sample to help use bootstrap3 in your project more efficiently.

## install

```
# bootstrap-loader
npm install --save-dev bootstrap-loader

```


```
# Bootstrap 3
npm install --save-dev bootstrap-sass

```


```
# Node SASS & other loaders needed to handle styles
npm install --save-dev css-loader node-sass
resolve-url-loader sass-loader style-loader url-loader

```

## setup

create a file: .bootstraprc
Add a file: webpack.bootstrap.config.js


```javascript
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;
//
//
//
entry: {
  app: './src/app.js',
  bootstrap: bootstrapConfig
},

```

## Purify css

**purifycss-webpack**
This plugin uses PurifyCSS to remove unused selectors from your CSS.
```
npm i -D purifycss-webpack

```

```javascript
const glob = require('glob');
...
new PurifyCSSPlugin({
  // Give paths to parse for rules. These should be absolute!
  paths: glob.sync(path.join(__dirname, 'src/*.html')),
  purifyOptions: { info: true, minify: true }
}),

```

## Minify CSS
**OptimizeCssAssetsPlugin**

```
npm i -D pptimizecss-assets-plugin
```
```
new OptimizeCssAssetsPlugin({
  cssProcessorOptions: {
    safe: true,
  },
})
```
