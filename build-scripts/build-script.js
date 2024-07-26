const shelljs = require('shelljs');

copyProject();

function copyProject() {
    shelljs.rm('-rf', ['./dist/scripts/']);
    shelljs.mkdir('-p', './dist');
    //shelljs.cp('-rf', './scripts', './dist/scripts');
    shelljs.cp('-rf', './public/*', './dist');
}
