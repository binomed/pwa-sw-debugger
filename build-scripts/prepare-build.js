const shelljs = require('shelljs');

prepareDist();

function prepareDist() {
    shelljs.rm('-rf', ['./dist/']);
    shelljs.mkdir('-p', './dist');
    //shelljs.cp('-rf', './scripts', './dist/scripts');
    shelljs.cp('-rf', './public/*', './dist/');
}
