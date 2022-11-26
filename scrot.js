const childProcess = require('child_process');

module.exports = async function (name) {
const scrot = childProcess.spawn( "scrot", [name+'.png']);

const exitCode = await new Promise( (resolve, reject) => {
scrot.on('close', resolve);})
console.log(`child process exited with code ${exitCode}`);
};