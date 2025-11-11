# Zeno's WP DevKit

A modern, lightning-fast build pipeline for WordPress themes and static templates. Built on esbuild and PostCSS for blazing performance and minimal configuration.

## ✨ Features

- ⚡ **esbuild** - Ultra-fast JavaScript bundling and transpilation
- 🎨 **Tailwind CSS 4.x** - Modern utility-first CSS with native CSS variables
- 📦 **ES Modules** - Modern JavaScript with tree-shaking
- 🔄 **PostCSS** - Advanced CSS processing with autoprefixer
- 🔥 **Hot Reload** - Instant updates during development
- 🪶 **Zero Configuration** - Works out of the box

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Development URL** (optional)
   
   Edit `esbuild.js` at line 245 and set your local development domain:
   ```javascript
   const PROXY_URL = 'https://your-site.test';
   ```

3. **Start Development**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

### Available Commands

| Command | Alias | Description |
|---------|-------|-------------|
| `npm run dev` | `watch` | Watch for changes and rebuild assets with hot reload |
| `npm run build` | `prod` | Build optimized assets for production |

## 📁 Project Structure

### Required Folder Structure

Keep this structure for the build system to work:

```
your-theme/
├── assets/               # Compiled files (auto-generated)
│   ├── css/              # Compiled stylesheets
│   └── js/               # Compiled scripts
└── dev/                  # Source files
    ├── css/              # Source stylesheets (Tailwind)
    └── js/               # Source scripts (ES6 modules)
```

Everything else is up to you - structure your theme/template however you like!

## 🎯 Technology Stack

### Core Technologies

- **[esbuild](https://esbuild.github.io/)** - Lightning-fast JavaScript bundler
- **[Tailwind CSS](https://tailwindcss.com/)** ^4.x - Utility-first CSS framework
- **[PostCSS](https://postcss.org/)** - CSS transformation with plugins

### Included Libraries

Check `package.json` for the complete list. Notable inclusions:

- **[Alpine.js](https://alpinejs.dev/)** - Lightweight JavaScript framework
- **[GSAP](https://greensock.com/gsap/)** - Professional-grade animation
- **[Swiper](https://swiperjs.com/)** - Modern touch slider
- **[Vidstack](https://www.vidstack.io/)** - Advanced video player
- **Custom Utilities** - Autohide, HoverIntent, SmoothScroll, Sticky

### Custom JavaScript Modules

Import only what you need:

```javascript
import { Autohide, HoverIntent, SmoothScroll, Sticky } from './custom/custom.js';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  Autohide('.header', 80);
  SmoothScroll();
  Sticky('.sidebar');
  
  new HoverIntent(document.querySelectorAll('.dropdown'), {
    onEnter: (el) => el.classList.add('open'),
    onExit: (el) => el.classList.remove('open')
  });
});
```

## 🛠️ Build System

### Asset Processing

- **CSS**: Tailwind CSS 4.x compilation with PostCSS and autoprefixer
- **JavaScript**: ES6+ transpilation and bundling with esbuild
- **Static Assets**: Fonts and images are not processed - reference them relative to `/assets/`

### Build Features

- **Hot Module Replacement** - Instant updates during development
- **Error Handling** - Robust error catching and reporting
- **Debouncing** - Prevents unnecessary rebuilds
- **Version Tagging** - Automatic versioning in output files
- **Cache Busting** - Version hashes for better cache management

### Important Notes

- ⚠️ **Avoid images in CSS** - Use `<img>` tags or background images via HTML for better performance
- 📁 **Static fonts** - Place fonts in `/assets/webfonts/` and reference them directly in CSS
- 🎯 **ES Modules** - All JavaScript uses modern module syntax with tree-shaking

## 🎨 Styling Guidelines

This theme uses Tailwind CSS 4.x with the new `@import`, `@theme`, and `@utility` syntax:

```css
/* dev/css/main.css */
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-sans: 'Inter', system-ui, sans-serif;
}

@utility custom-shadow {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

Includes a Biome config to handle Tailwind 4.0 syntax.

## 🔧 Use Cases

This build pipeline works great for:

- **WordPress Themes** - Pair with Timber, ACF, or vanilla PHP
- **Static Templates** - Any CMS or static site generator
- **Design Systems** - Component libraries and pattern libraries
- **Landing Pages** - Fast, modern static pages
- **Prototypes** - Quick mockups with production-ready tooling

## 📦 Optional: WordPress + Timber

If you're using this with WordPress and Timber:

```bash
composer install
```

This will install Timber 2.0+ and the Symfony HTTP Foundation request object.

## 📝 Changelog

### v5.0 - Modern Architecture (Current)

**Breaking Changes**
- Removed Bootstrap completely (so long, and thanks for all the fish! 🐬)
- Removed situational dependencies: smooth-scroll, tippy, vanillasharing

**New Features**
- ✨ Custom scripts refactored as ES6 modules with comprehensive documentation
- ⚡ Enhanced esbuild configuration with error handling and debouncing
- 🧹 Biome integration with Tailwind v4 compatibility
- 📊 Build outputs version and date on separate lines

**Improvements**
- Streamlined installation experience
- Removed unused devDependencies
- Various under-the-hood optimizations

### v4.5 - Alpine Era

- New command structure
- Auto-generate wp-config.php shortcut
- Replaced Plyr with Vidstack
- Replaced gLightbox/modals with Fancybox
- Introduced Alpine.js

### v4.0.2 - Minor Fixes

- Updated npm and Composer dependencies
- Aligned breakpoints across frameworks
- Deprecated Bootstrap 5

### v4.0 - Tailwind 4 Era

- Full Tailwind 4 support with native CSS
- Ditched SASS for PostCSS
- Use `@theme` variables instead of config files
- Bootstrap made optional (forms, modals, offcanvas only)
- Added Timber 2.0+ support via Composer

### v3.5 - Better Tailwind Integration

- Mix and match Tailwind and Bootstrap
- Auto-version style.css on build
- Fixed Tailwind recursion issues
- Streamlined SCSS structure

### v3.0 - Leaving BS behind

- Integrated Tailwind CSS (optional)
- Moved scripts to root level
- Improved HoverIntent implementation

### v2.0 - esbuild Era

- Switched from Webpack to esbuild
- 10x faster builds
- Lighter dependencies

### v1.5 - PostCSS Processing

- Added SCSS parsing with PostCSS
- Expanded utility library

### v1.0 - Initial Release

- JavaScript bundling with Webpack
- Basic custom scripts
- Core dependencies

## 🤝 Contributing

This is a personal development kit, but suggestions and improvements are welcome! Feel free to fork and adapt to your needs.

## 📄 License

This project is provided as-is for frontend development. Individual dependencies maintain their own licenses.

## 🙏 Credits

Built with ❤️ by [@zenotds](https://github.com/zenotds)

Special thanks to:
- [esbuild](https://esbuild.github.io/) team
- [Tailwind CSS](https://tailwindcss.com/) team
- All the amazing open-source contributors

---

**Happy building!** 🎉