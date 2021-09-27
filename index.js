const fs = require('fs');

console.log('시작');
fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('1번');
  console.log(data.toString());
});

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('2번');
  console.log(data.toString());
});

fs.readFile('./readme.txt', (err, data) => {
  if (err) {
    throw err;
  }
  console.log('3번');
  console.log(data.toString());
});

console.log('끝');
