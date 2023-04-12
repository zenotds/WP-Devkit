import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";

let app = await esbuild.context({
    logLevel: 'debug',
    entryPoints:
    {
        'js/scripts.min': './dev/js/scripts.js',
        'css/styles.min': './dev/sass/styles.scss',
        'css/print.min': './dev/sass/print.scss'
    },
    outdir: '../assets',
    bundle: true,
    sourcemap: true,
    external: ['*.woff', '*.woff2', '*.ttf', '*.eot?#iefix'],
    minify: true,
    plugins: [
        sassPlugin(),
    ],
    legalComments: 'none',
})

await app.watch()
console.log('⚡ Styles & Scripts Compiled! ⚡ ')
console.log('👁️  Watching... 👁️')
