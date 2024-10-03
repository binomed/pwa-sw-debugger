const shelljs = require('shelljs');
const {prepareDist} = require('./prepare-build');

changeManifest();

function changeManifest() {

    shelljs.rm('./dist/manifest.json');
    shelljs.mv('./dist/manifest_v3.json', './dist/manifest.json');
    
}
