const fs = require('fs');
const net = require('net');
const request = require('request');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// The URL and local file path receive from command line
const args = process.argv.slice(2);
const url = args[0];
const file = args[1];


request (url, (error, response, body) => {
// check if the requesting url exists
  if (error) {
    console.log("Please, check URL. Requesting URL does not exist.")
  } else {
// check if the requested file already exist. Ask user about rewriting the file. Callback function.
    if (fs.existsSync(file)) {
      rl.question ('File - ' + file + ' - already exists! To overwrite file? (y/n)', (answer) => {
        if (answer === 'N' || answer === 'n') {
          process.exit;
        } else if (answer === 'Y' || answer === 'y') {
          download(file, body);
        }
      });
    } else {
      download(file, body);
    }
  }
});

// function downloads the requested file
const download = function(file, body) {
  fs.writeFile(file, body, (error) => {
    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Downloaded and saved " + body.length + " bytes to " + file);
    }
  });
};
