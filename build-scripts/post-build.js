const shelljs = require('shelljs');

moveBuild();

function moveBuild() {

    shelljs.mkdir('-p', './dist/background');
    shelljs.mkdir('-p', './dist/content');
    shelljs.mkdir('-p', './dist/inject');

    const files = [
        /*{
            name:'devtools-panel',
            dest:'dist/panel'
        },*/ 
        /*{
            name:'background',
            dest:'dist/background'
        }*/
            /*{
                name:'getCurrentSW',
                dest:'dist/inject'
            }*/
    ];
    files.forEach(file => {
        console.log(file);
        shelljs.mv('-f', [
            `./dist/${file.name}.js`,
            `./dist/${file.name}.js.map`,
            `./dist/${file.name}.mjs`,
            `./dist/${file.name}.mjs.map`,
        ], `./${file.dest}/`);
    });

    shelljs.cp('-f', './scripts/background/background.js','./dist/background');
    shelljs.cp('-f', './scripts/content/content.js','./dist/content');
    //shelljs.cp('-f', './scripts/inject/inject.js','./dist/inject');
    //shelljs.cp('-f', './scripts/devtools.js','./dist');
}
