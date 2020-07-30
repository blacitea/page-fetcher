const request = require("request");
const input = process.argv.slice(2);
const fs = require('fs')


const fetcher = function (userRequest) {
  let retrieve = userRequest[0];
  let store = userRequest[1];
  request(retrieve, (error, response, body) => {
    console.log("This is body \n", body);
  });
  fs.writeFile(store, data, () => {
    
  });

};

fetcher(input);
