import { spawn } from 'child_process';
import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';
import chokidar from 'chokidar';
import fs from 'fs';
import path from 'path';
import browserSync from 'browser-sync';

// Definisce lo status di produzione
const isProduction = process.env.NODE_ENV === 'production';

// Create istanza di BrowserSync
const bs = browserSync.create();

// Punto di ingresso di TailwindCSS
const tailwind = './dev/sass/tailwind/tailwind.scss';

// Funzione per aggiornare il numero di versione in fase di build
function updateVersion() {
    const styleFilePath = './style.css';
    const currentDate = new Date();
    const dateStr = currentDate.toLocaleString('it-IT');

    let content = fs.readFileSync(styleFilePath, { encoding: 'utf8' });
    content = content.replace(/(Version: \d+\.\d+)([a-z]+)(\d+) \((\d{2}\/\d{2}\/\d{4}), (\d{2}:\d{2}:\d{2})\)/i, (match, versionPrefix, versionSuffix, buildNumber) => {
        const newBuildNumber = parseInt(buildNumber, 10) + 1;
        const newVersion = `${versionPrefix}${versionSuffix}${newBuildNumber} (${dateStr})`;
        return newVersion;
    });

    fs.writeFileSync(styleFilePath, content, { encoding: 'utf8' });
    console.log('✅ Version updated in style.css');
}

// Funzione di build di TailwindCSS
function tailwindBuild() {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(tailwind)) {
            console.log('\n🚨 TailwindCSS input file not found, skipping...');
            resolve();
            return;
        }

        const tailwindCommand = 'npx';
        const args = ['tailwindcss', '-i', tailwind, '-o', './dev/sass/base/_tailwind.scss'];

        const tailwindProcess = spawn(tailwindCommand, args, { stdio: 'inherit' });

        tailwindProcess.on('close', (code) => {
            if (code === 0) {
                console.log(`\n🌊 TailwindCSS updated...`);
                resolve();
            } else {
                reject(`Tailwind process failed with code ${code}`);
            }
        });
    });
}

// Funzione per generare i punti di ingresso
function entryPoints() {
    const entryPoints = {};
    const sassDir = './dev/sass';
    const jsDir = './dev/js';

    // Genera punti di ingresso per i file SCSS
    fs.readdirSync(sassDir).forEach(file => {
        if (file.endsWith('.scss')) {
            const name = path.basename(file, '.scss');
            entryPoints[`css/${name}.min`] = path.join(sassDir, file);
        }
    });

    // Genera punti di ingresso per i file JS
    fs.readdirSync(jsDir).forEach(file => {
        if (file.endsWith('.js')) {
            const name = path.basename(file, '.js');
            entryPoints[`js/${name}.min`] = path.join(jsDir, file);
        }
    });

    return entryPoints;
}

// Opzioni di build
const buildOptions = {
    logLevel: 'debug',
    entryPoints: entryPoints(),
    outdir: './assets',
    bundle: true,
    sourcemap: true,
    external: ['*.woff', '*.woff2', '*.ttf', '*.eot?#iefix', '*.png', '*.svg', '*.jpg', '*.webp'],
    minify: isProduction,
    plugins: [
        sassPlugin(),
    ],
    legalComments: 'none',
};
tailwindBuild

// Funzione di build di esBuild
async function build() {
    try {
        if (isProduction) {
            updateVersion(); // Aggiorna versione solo in produzione
        }
        await tailwindBuild(); // Assicurati che Tailwind finisca
        await esbuild.build(buildOptions);
        console.log(isProduction ? '\n✅ Styles & Scripts Compiled!' : '\n👁️  Watching...');
        if (!isProduction) {
            bs.reload(); // Ricarica il browser
        }
    } catch (error) {
        console.error('🚨 Build failed:', error);
    }
}

// Esecuzione script
if (!isProduction) {
    // Compila per sviluppo
    console.log('🛠️ Starting initial build...');

    // Esegui un primo output prima di iniziare l'osservazione
    build().then(() => {
        console.log('\n✅ Initial build complete. Now watching for changes...');

        bs.init({
            proxy: 'https://site.io',
            open: true,
            browser: ["firefox developer edition"]
        });

        // Osserva cambiamenti
        chokidar.watch(['./**/*.twig', './dev/**/*.{scss,js}'], { ignoreInitial: true }).on('all', async (event, path) => {
            // Escludi ricompilazioni per cambiamenti a _tailwind.scss
            if (path.includes('dev/sass/base/_tailwind.scss')) {
                return;
            }

            console.log(`\n🛠️ ${path} ${event}, rebuilding and reloading...`);
            await build(); // Utilizza la versione aggiornata di build
            bs.reload();
        });
    }).catch((error) => {
        console.error('🚨 Initial build failed:', error);
    });
} else {
    // Compila per produzione
    build();
}