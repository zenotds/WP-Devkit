# Zeno's WP DevKit
JS + CSS Build Pipeline for Wordpress themes

This is a frontend setup used in static template development such as Wordpress themes or other CMS related templating situations. I use it with Timber 2.0 but you can use the tools you prefer.

The point of this environment is watching and building scripts and styles with a modern approach with ES Modules and PostCSS.


## Basic Structure

Structure the theme as you see fit but keep the structure for these 2 folders:

- assets -> compiled files
  - js -> compiled scripts
  - css -> compiled styles

- dev -> source files
  - js -> source scripts
  - css -> source styles


## Instructions

1. Run `npm install` to install all dependencies
2. Change line 162 inside `esbuild.js` to your dev domain


## Commands

`npm run watch` to watch for changes and build assets
`npm run build` to build assets
`npm run bs5` to build Bootstrap from dev/css/bs5/bs5.source (SASS)


## Composer (if using WP + Timber)

1. Run `composer install` to install Timber and other dependencies


## Build notes

- Fonts (woff, woff2, ttf, eot) and other static assets are ignored and not processed during runtime, keep these files and reference them relative to the /assets/ folder


## Notes

- Avoid images in css, there are better ways :P
- The starter comes with some useful JS packages such as gLightbox, Swiper, Plyr, etc.
- Feel free to edit whatever you want as you see fit.
- Other timber files required for the theme such as functions and templates are not included, so you can use this just as a static asset compilation Boilerplate

## Changelog

v1.0 - First release, Only JS, Webpack bundler. Basic dependencies. Some custom scripts

v1.5 - JS and SCSS parsing with Webpack and PostCSS. More useful dependencies.

v2.0 - New bundler: esbuild, faster and lighter!

v3.0 - Tailored for WP. 
- integrated with Tailwind (not mandatory)
- moved all scripts at root level
- better hoverintent
- TODO, tailwind structure is a bit iffy

v3.5 - Better Tailwind integration
- can use either TW or BS or a mix of both
- write version to style.css on build
- fixed tailwind recursion, now it's all integrated in the base styles.scss
- all comments in the script made in italian (sorry about that)
- streamlined scss folder structure
- TODO, will have to deal with SASS @import deprecation at some point, that sucks..

v4.0 - Refactored for Tailwind 4
- Tailwind 4 fully supported
- Ditched SASS for postCSS and native CSS
- Tailwind config not required, use @theme variables instead
- BS is no longer mandatory and is only used for forms, modals and offcanvas. Must be compiled separately with SASS
- Styles compile with PostCSS with the new @tailwind/postcss and autoprefixer plugin
- Added composer directives for Timber 2.0+ and request object

v4.0.2 - Minor fixes
- Updated NPM dependencies
- Updated Composer dependencies
- Aligned bs5 breakpoints to Tailwind ones
- Added bs5 command, usage of bs5 is deprecated