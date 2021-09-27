const fs = require('fs');

// 버퍼의 크기를 highWaterMark를 통해 설정
// 기본값은 64KB
// 지금은 16B
const readStream = fs.createReadStream('./readme.txt', { highWaterMark: 16 });

const data = [];

readStream.on('data', (chunk) => {
  data.push(chunk);
  console.log('data: ', chunk, chunk.length);
});

readStream.on('end', () => {
  console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
  console.log('error: ', err);
});
