// Buffer.from을 통해 버퍼로 바꾼다.
const buffer = Buffer.from('저르 버퍼로 바꿔보세요');
// 버퍼로 바꾼결과
console.log('from() ', buffer);

// 버퍼 길이
console.log('length: ', buffer.length);

// 버퍼를 다시 문자열로
console.log('toString(): ', buffer.toString());

const array = [
  Buffer.from('띠엄 '),
  Buffer.from('띄엄 '),
  Buffer.from('띄어쓰기'),
];

// 배열에 담긴 버퍼를 연결
const buffer2 = Buffer.concat(array);

// 연결한걸 다시 스트링으로
console.log('concat(): ', buffer2.toString());

// 버퍼 5개 할당
const buffer3 = Buffer.alloc(5);
console.log('alloc(): ', buffer3);
