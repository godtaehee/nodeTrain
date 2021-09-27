const fs = require('fs').promises;

fs.writeFile('./hello.js', '코드가 작성됩니다.')
  .then(() => {
    return fs.readFile('./hello.js');
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => {
    console.log(err);
  });
