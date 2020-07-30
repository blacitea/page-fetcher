const request = require("request");
const input = process.argv.slice(2);
const fs = require('fs');

const fetcher = function (userRequest) {
  let retrieve = userRequest[0];
  let store = userRequest[1];
  request(retrieve, (error, response, body) => {
    write(body);
  });
  const write = (data) => {
    fs.writeFile(store, data, () => {
      console.log("Downloaded and saved ${data} to ${store}");
    });
  };
};

fetcher(input);
