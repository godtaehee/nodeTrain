# nodeTrain

## 동기와 비동기, 블로킹과 논 블로킹

동기와 비동기, 블로킹과 논 블로킹이라는 네 개의 용어가 노드에서 혼용되고 있으며, 의미도 서로 다릅니다.

- 동기와 비동기: 백그라운드 작업 완료 확인 여부
- 블로킹과 논 블로킹: 함수가 바로 return되는지 여부

노드에서는 동기-블로킹 방식과 비동기-논 블로킹 방식이 대부분입니다.

동기-논 블로킹이나 비동기-블로킹은 없다고 봐도 됩니다.

동기-블로킹 방식에서는 백그라운드 작업 완료 여부를 계속 확인하며, 호출한 함수가 바로 return되지 않고 백그라운드 작업이 끝나야 return됩니다. 비동기-논 블로킹 방식에서는 호출한 함수가 바로 return되어 다음 작업으로 넘어가며, 백그라운드 작업완료 여부는 신경 쓰지 않고 나중에 백그라운드가 알림을 줄 때 비로소 처리합니다.

## 버퍼와 스트림

버퍼링은 영상을 재생할 수 있을 때까지 데이터를 모으는 동작이고, 스트리밍은 방송인의 컴퓨터에서 시청자의 컴퓨터로 영상 데이터를 조금씩 전송하는 동작입니다.

노드는 파일을 읽을 때 메모리에 파일 크기만큼 공간을 마련해두며 파일 데이터를 메모리에 저장한 뒤 사용자가 조작할 수 있도록 합니다. 이때 메모리에 저장된 데이터가 바로 버퍼입니다.

## 유명한 포트번호

- 21: FTP
- 80: HTTP
- 443: HTTPS
- 3306: MYSQL

리눅스에서는 1024번 이하의 포트에 연결할 때 관리자 권한이 필요하므로 sudo를 붙여야한다.

## npm -g 기본경로 

### 윈도우
- C:\Users\사용자이름\AppData\Roaming\npm 

### Mac
- /usr/local/lib/node_modules

## 패키지 버전 이해하기

버전 번호를 어떻게 정하고 올려야 하는지를 명시하는 규칙이 등장했는데 이것을 `SemVer`라고 한다.

### major 버전

버전의 첫 번째 자리이다.

0이면 초기 개발중이라는 뜻이고 1부터는 정식 버전을 의미한다.

major 버전은 하휘 호환이 안 될정도로 패키지의 내용이 수정됬을때 올립니다.

예를 들어, 1.5.0에서 2.0.0으로 버전을 올렸다는 것은 1.5.0 버전 패키지를 사용하고 있던 사람들이 2.0.0으로 업데이트 했을 때 에러가 발생할 확률이 크다는 뜻입니다.

### minor 버전

2번째 자리이다.

minor 버전은 하위 호환이 되는 기능 업데이트를 할 때 올립니다. 버전을 1.5.0에서 1.6.0으로 올렸다면, 1.5.0사용자가 1.6.0으로 업데이트 했을 때 아무 문제가 없어야 합니다.

### patch 버전

3번째 자리이다.

새로운 기능이 추가되었다기 보다는 기존 기능에 문제가 있어 수정한 것을 내놓았을 때 patch 버전을 올립니다. 1.5.0에서 1.5.1처럼 올리는건데 당연히 업데이트 후 아무 문제가 없어야 한다.

### ^, ~, >, <, etc..

- ^기호는 minor버전까지만 설치하거나 업데이트 한다.

npm i express@^1.1.1이라면 1.1.1 이상부터 2.0.0 미만 버전까지 설치된다. 2.0.0은 설치가 안됨

1.x.x와 같이 표현할수도 있따.

- ~기호는 patch 버전까지만 설치하거나 업데이트한다. npm i express@~1.1.1이라면 1.1.1 이상부터 1.2.0미만 버전까지 설치된다.

1.1.x와 같은ㅍ ㅛ현도 가능하다. minor 버전까지는 하위호환이 보장되기 때문에 ^이 더 많이 사용된다.

나머지는 부등호 기호와 같다.

## body-parser

```javascript
app.use(express.urlencoded({ extended: false }))
```

false이면 노드의 `querystring` 모듈을 사용하여 쿼리스트링을 해석하고, true면 qs모듈을 사용하여 쿼리스트링을 해석한다. qs는 npm 패기키지이다.

## cookie-parser

cookie-parser는 요청에 동봉된 쿠키를 해석해 REQ.cookies 객체로 만들어준다.

`app.use(cookieParser(비밀키));`

첫번째 인수로 비밀키를 넣어줄수 있고, 서명된 쿠키가 있는 경우, 제공한 비밀 키를 통해 해당 쿠키가 내 서버가 만든 쿠키임을 검증할 수 있습니다. 쿠키는 클라이언트에서 위조하시 쉬우므로 비밀 키를 통해 만들어낸 서명을 쿠키 값 뒤에 붙입니다.

서명된 쿠키는 `req.cookies`대신 `req.signedCookies` 객체에 들어가 있는다.

cookie-parser가 쿠키를 생성할때 쓰이는 것은 아니다. 쿠키를 생성/제거 하기 위해서는 res.cookie, res.clearCookie 메서드를 사용해야 한다. res.cookie(키, 값, 옵션) 형식으로 사용한다.

```javascript
res.cookie('name', 'taehee', {
  expires: new Date(Date.now() + 10000),
  httpOnly: true,
  secure: true
});

res.clearCookie('name', 'taehee', { httpOnly: true, secure: true });
```

쿠키를 지우려면,키와 값 외에 옵션도 정확히 일치해야 쿠키가 지워진다. 단, expires나 maxAge옵션은 일치할 필요가 없다.

## express-session

세션 관리용 미들웨어이며 req.session객체 안에 사용자별로 세션이 유지된다.


```javascript
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}))
```

resave: 요청이 올때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정하는 것이다

saveUninitialized: 세션에 저장할 내역이 없더라도 처음부터 세션을 생성할지 설정하는 것이다.

세션 쿠키의 이름은 name 옵션으로 설정하며 기본 값은 `connect.sid`이다.

```javascript
req.session.name = 'taehee' // 세션 등록
req.sessionID // 세션 아이디 확인
req.session.destroy(); // 세션 모두 제거
```

express-session에서 서명한 쿠키 앞에는 s:이 붙는다. 실제로 encodeURIComponent 함수가 실행되어 `s%3A`가 된다.

`s%3A`의 뒷 부분이 실제 암호화된 쿠키 내용입니다. 앞에 s%3A가 붙은 경우, 이 쿠키가 express-session 미들웨어에 의해 암호화된 것이라고 생각하면 된다.

## next()

next는 route라는 문자열을 넣으면 다음 라우터의 미들웨어로 바로 이동하고, 그 외의 인수를 넣는다면 바로 에러처리 미들웨어로 이동한다. 이때의 인수는 error 미들웨어의 파라미터로 가게된다.

## req객체와 app.set의 차이

app.set으로 익스프레스의 데이터를 저장하면 app.get혹은 req.app.get으로 어디서든지 가져올수 있지만 전역적으로 사용되는 이 값은 사용자 개개인의 값을 넣기에는 부적절하며, 앱 전체의 설정을 공유할때 사용하면된다.

반면 req객체는 요청을 보낸 사용자 개개인에게 귀속되므로 req객체를 통해 개인의 데이터를 전달하는 것이 좋습니다.

## Multer

```javascript
const multer = require('multer');

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
```

done의 첫번째 매게변수에는 에러가 있다면 에러를 넣고, 두번째는 실제 경로 혹은 파일 이름을 넣어주면 된다.

파일명 + 현재시간.확장자 형식으로 이름을 정해 넣어주고있다.

폴더가 없다면 폴더를 만들어 주어야한다.

```javascript
const fs=  require('fs');
try {
  fs.readdirSync('uploads');
}catch (err) {
  console.error('uploads does not exist, So I will create directory');
  fs.mkdirSync('uploads');
}
```

```javascript
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file, req.body);
  res.send('ok');
})
```

파일을 하나만 업로드 하는 경우 single 미들웨어를 사용한다.

업로드 성공 시 결과는 req.file 객체 안에 들어 있습니다. req.body에는 파일이 아닌 데이터인 title이 들어 있습니다.

req.file 객체는 다음과 같이 생겼습니다

```javascript
{
    fieldname: 'img',
    originalname: 'nodejs.png',
    encoding: '7bit',
    mimetype: 'image/png',
    destination: 'uploads/',
    filename: 'nodejs132131231313213123.png',
    size: 53357
}
```

여러가지를 다운받으려면 single대신 array로 교체합니다.

```javascript
app.post('/upload', upload.array('image'), (req, res) => {
  console.log(req.files, req.body);
  res.send('ok');
})
```

업로드 결과도 req.file 대신 req.files 배열에 들어 있습니다.

```html
<form id="form" action="/upload" method="post" enctype="multipart/form-data">
  <input type="file" name="image1" />
  <input type="file" name="image2" />
  <input type="text" name="title" />
  <button type="submit">업로드</button>
</form>
```

```javascript
app.post('/upload', upload.fields([{name: 'image1'}, {name: 'image2'}]),
  (req, res) => {
    console.log(req.files, req.body);
    res.send('ok');
  })
```

fields 미들웨어의 인수로 input 태그의 name을 각각 적습니다.

업로드 결과도 req.files.image1, req.files.image2에 각각 들어 있습니다.

