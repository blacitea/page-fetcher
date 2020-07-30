const fs = require('fs');
const readline = require('readline');
const { stdout } = require("process");

let writeFile = function (pathLink, data) {
  fs.open(pathLink, 'ax', (err, fd) => {
    //console.log(err);
    if (err && err.code === 'EACCES') {
      console.log("Invalid path for write file, please verify.");
      process.exit();
    }
    if (err && err.code === 'EEXIST') {
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question('File already exist, overwrite? (yes / no)       ', (answer) => {
        if (answer.toLowerCase() === 'yes') {
          write(pathLink, data);
          rl.close();
        } else {
          console.log("Quit without saving.");
          rl.close();
        }
      });
    } else {
      write(pathLink, data);
    }
  });
};

const write = (pathLink, data) => {
  fs.writeFile(pathLink, data,  () => {
    fs.stat(pathLink/*why not retrieve because fs interact with local files only*/, (err, stats) => {
      // console.log(err);
      // console.log(stats);
      console.log(`Downloaded and saved ${stats.size} bytes to ${pathLink}`);
    });
  });
};

module.exports = {
  writeFile,
};