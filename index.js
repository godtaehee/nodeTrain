// 에러를 해결하려 들지말고 그냥 process.exit로 프로세스를 끝내버리자.
process.on('uncaughtException', (err) => {
  console.error('예기치 못한 에러', err);
});

setInterval(() => {
  throw new Error('서버를 고장내주마!');
}, 1000);

setTimeout(() => {
  console.log('실행됩니다.');
}, 2000);
