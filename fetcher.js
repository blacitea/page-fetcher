const request = require("request");
const input = process.argv.slice(2);
const fs = require('fs');
const readline = require('readline');
const { stdout } = require("process");




const fetcher = function (userRequest) {
  let retrieve = userRequest[0];
  let store = userRequest[1];
  request(retrieve, (error, response, body) => {
    console.log(response.statusCode);
    fs.open(store, 'ax', (err, fd) => {
      console.log(err);
      if (err && err.code === 'EACCES') {
        stdout.write("Invalid path for write file, please verify. \n");
        process.exit();
      }
      if (err && err.code === 'EEXIST') {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
        rl.question('File already exist, overwrite? (yes / no)       ', (answer) => {
          if (answer.toLowerCase() === 'yes') {
            write(body);
            rl.close();
          } else {
            console.log("Quit without saving.");
            rl.close();
          }
        });
      } else {
        write(body);
      }
    });
  });
  const write = (data) => {
    fs.writeFile(store, data,  () => {
      fs.stat(store/*why not retrieve*/, (err, stats) => {
        // console.log(err);
        // console.log(stats);
        console.log(`Downloaded and saved ${stats.size} bytes to ${store}`);
      });
    });
  };
};

fetcher(input);
