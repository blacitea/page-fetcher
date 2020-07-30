const request = require("request");
const input = process.argv.slice(2);
const { stdout } = require("process");
const { writeFile } = require("./write");




const fetcher = function (userRequest) {
  let retrieve = userRequest[0];
  let store = userRequest[1];
  request(retrieve, (error, response, body) => {
    if (response.statusCode !== 200) {
      (response.statusCode === 404) ? stdout.write("URL not found! \n") : stdout.write("URL invalid! Status Code:", response.statusCode, "\n");
      process.exit();
    }
    writeFile(store, body);
  });
};

fetcher(input);
