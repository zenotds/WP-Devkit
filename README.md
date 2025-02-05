# Zeno's WP DevKit
JS + SCSS Build Pipeline for Wordpress themes with Timber 2.0

This is a simple frontend starter setup used in static template development such as Wordpress themes or other CMS related templating situations.
The point of this environment is watching and building scripts and styles leveraging a more modern approach with ES Modules and SASS.


## Basic Structure

Structure the theme as you see fit. Just keep the structure for these 2 folders:

- assets -> compiled files
  - js -> compiled scripts
  - css -> compiled styles

- dev -> source files
  - js -> source scripts
  - css -> source styles


## Instructions

1. Run `npm install` to install all dependencies
2. Run `npm run watch` to watch for changes and build assets
3. Run `npm run build` to build assets
4. run `composer install` to install composer dependencies


## Build notes

- Fonts (woff, woff2, ttf, eot) and other static assets are ignored and not processed so keep dependant files relative to the /assets/ folder


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
- Ditched SASS for native CSS
- Tailwind config not required, use @theme variables instead
- BS is no longer mandatory and is only used for forms, modals and offcanvas. Must be compiled separately with SASS
- Styles compile with PostCSS with the new @tailwind/postcss and autoprefixer plugin
- Added composer directives for Timber 2.0+ and request object