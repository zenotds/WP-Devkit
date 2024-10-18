import esbuild from 'esbuild';
import chokidar from 'chokidar';
import chalk from 'chalk';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';
import fs from 'fs';
import path from 'path';
import browserSync from 'browser-sync';
import * as sass from 'sass';

// Definisce lo status di produzione (true se in ambiente di produzione)
const isProduction = process.env.NODE_ENV === 'production';

// Crea un'istanza di BrowserSync per il live-reload durante lo sviluppo
const bs = browserSync.create();

// Funzione per aggiornare la versione nel file CSS (usato solo in produzione)
function updateVersion() {
    const styleFilePath = './style.css';
    const currentDate = new Date();
    const dateStr = currentDate.toLocaleString('it-IT');

    let content = fs.readFileSync(styleFilePath, { encoding: 'utf8' });
    let newVersion = '';

    content = content.replace(/(Version: \d+\.\d+)([a-z]+)(\d+) \((\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}:\d{2})\)/i, (match, versionPrefix, versionSuffix, buildNumber) => {
        const newBuildNumber = parseInt(buildNumber, 10) + 1;
        newVersion = `${versionPrefix}${versionSuffix}${newBuildNumber} (${dateStr})`;
        return newVersion;
    });

    fs.writeFileSync(styleFilePath, content, { encoding: 'utf8' });
    console.log(`📦 ${newVersion}`);
}

// Funzione che ritorna i punti di ingresso per i file JS
function entryPoints() {
    const entryPoints = {};
    const jsDir = './dev/js';

    // Aggiunge i file JS come punti di ingresso per esbuild
    fs.readdirSync(jsDir).forEach(file => {
        if (file.endsWith('.js')) {
            const name = path.basename(file, '.js');
            entryPoints[`js/${name}.min`] = path.join(jsDir, file);
        }
    });

    return entryPoints;
}

// Funzione per formattare la dimensione dei file
function formatFileSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

// Funzione per compilare SCSS, Tailwind e generare la mappa di origine (source map)
async function buildStyles() {
    const scssFile = './dev/sass/styles.scss'; // File SCSS principale
    const outputFile = './assets/css/styles.min.css'; // File CSS di output
    const outputMapFile = './assets/css/styles.min.css.map'; // File mappa di origine di output

    try {
        // Compila SCSS in modo asincrono con il compilatore Sass, aggiungendo includePaths per cercare i moduli in node_modules
        const result = await sass.compileAsync(scssFile, {
            style: isProduction ? "compressed" : "expanded", // Comprime l'output in produzione
            sourceMap: true, // Abilita la mappa di origine
            silenceDeprecations: ['global-builtin', 'color-functions', 'mixed-decls', 'import'],
        });

        // Passa il CSS compilato tramite PostCSS per Tailwind e Autoprefixer
        const postCssResult = await postcss([
            tailwindcss,
            autoprefixer,
        ]).process(result.css, {
            from: scssFile,
            to: outputFile,
            map: {
                inline: false, // Scrive la mappa di origine in un file separato
                annotation: true, // Aggiunge un riferimento alla mappa nel file CSS
            },
        });

        // Scrivi i file CSS e la mappa di origine finali
        fs.writeFileSync(outputFile, postCssResult.css);
        if (postCssResult.map) {
            fs.writeFileSync(outputMapFile, postCssResult.map.toString());
        }

        // Ottieni la dimensione del file CSS generato e della mappa
        const cssStats = fs.statSync(outputFile);
        const mapStats = fs.existsSync(outputMapFile) ? fs.statSync(outputMapFile) : null;
        const cssFileSize = formatFileSize(cssStats.size);
        const mapFileSize = mapStats ? formatFileSize(mapStats.size) : '0 KB';

        console.log(`\n🟪 Styles compiled with SCSS, Tailwind and Autoprefixer!`);
        console.log(`   ${outputFile}        ${chalk.cyan(cssFileSize)}`);
        console.log(`   ${outputMapFile}    ${chalk.cyan(mapFileSize)}`);
    } catch (error) {
        console.error('\n🚨 SCSS + Tailwind build failed:', error);
    }

}

// Opzioni di configurazione per esbuild
const buildOptions = {
    logLevel: 'silent', // Silenzia i log di esbuild
    entryPoints: entryPoints(), // Punti di ingresso JS
    outdir: './assets', // Directory di output
    bundle: true, // Esegue il bundling
    sourcemap: true, // Abilita le source map
    external: ['*.woff', '*.woff2', '*.ttf', '*.eot?#iefix', '*.png', '*.svg', '*.jpg', '*.webp'], // Non elaborare i file
    minify: isProduction, // Minifica solo in produzione
    legalComments: 'none', // Rimuove i commenti legali
    format: 'esm', // change this from 'iife' to 'esm'
    target: ['esnext'], // ensure modern JS features are supported
};

// Funzione per compilare i file JS con esbuild e mostrare la dimensione dei file
async function build() {

    const startTime = Date.now(); // Inizia cronometro

    try {
        if (isProduction) {
            updateVersion(); // Aggiorna la versione solo in produzione
        }
        await buildStyles(); // Compila Tailwind + SCSS usando PostCSS
        await esbuild.build(buildOptions); // Compila i file JS con esbuild

        // Calcola la dimensione dei file JS e delle source map
        const jsStats = fs.statSync('./assets/js/scripts.min.js');
        const jsMapStats = fs.statSync('./assets/js/scripts.min.js.map');
        const jsFileSize = formatFileSize(jsStats.size);
        const jsMapFileSize = formatFileSize(jsMapStats.size);
        console.log(`\n🟨 Scripts compiled!`);
        console.log(`   ./assets/js/scripts.min.js         ${chalk.cyan(jsFileSize)}`);
        console.log(`   ./assets/js/scripts.min.js.map     ${chalk.cyan(jsMapFileSize)}`);
        console.log(isProduction ? `\n✅ Done!` : '');
    } catch (error) {
        console.error(`🚨 Build failed:`, error);
    }

    const endTime = Date.now(); // Stop cronometro
    const totalBuildTime = ((endTime - startTime) / 1000).toFixed(2); // Calcola tempo di esecuzione

    console.log(`⏱️  Total build time: ${chalk.green(`${totalBuildTime}s`)}`); // Log
}

// Esecuzione dello script per sviluppo o produzione
if (!isProduction) {
    // Compila per sviluppo
    console.log(`🚀 Starting build...`);

    build().then(() => {
        
        console.log(`🔭 Watching for changes...\n`);

        bs.init({
            proxy: 'https://new.site.io', // Proxy per BrowserSync
            open: true,
            browser: ["firefox developer edition"] // Browser da aprire
        });

        // Osserva i cambiamenti nei file e rigenera il build
        chokidar.watch(['./templates/', './dev/sass/', './dev/js/'], { 
            ignoreInitial: true 
        })
        .on('all', async (event, path) => {
            console.log(`\n🚧 ${path} ${event}, rebuilding and reloading...`);
            await build();
            bs.reload(); // Ricarica il browser dopo il build
        });
    }).catch((error) => {
        console.error('🚨 Initial build failed:', error);
    });
} else {
    // Compila per produzione
    console.log(`🚀 Starting build...`);
    build();
}
