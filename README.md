# zeno-starter
Static JS + SCSS Environment

This is a simple frontend starter setup used in static template development such as Wordpress themes or other CMS related templating situations.
The point of this environment is watching and building scripts and styles leveraging a more modern approach with ES Modules and SASS.


## Structure
- assets -> compiled files
  - js -> compiled scripts
  - scss -> compiled styles

- dev -> source files
  - js -> source scripts
  - scss -> source styles



## Instructions

1. Run `npm install` to install all dependencies
2. Run `npm run watch` to watch for changes and build assets
3. Run `npm run build` to build assets

## Notes

- Fonts (woff, woff2, ttf, eot) are ignored and not processed.
- css url() paths are not parsed so keep dependant files relative to the /assets/ folder

## Changelog

v1.0 - First release, Only JS, Webpack bundler. Basic dependencies.
v1.5 - JS and SCSS parsing with Webpack and PostCSS. More useful dependencies.
v2.0 - New bundler: esbuild, faster and lighter
