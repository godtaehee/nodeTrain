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

next는 route라는 문자열을 넣으면 주소에 맞는 다음 라우터의 미들웨어로 바로 이동하고, 매개변수가 없다면 그냥 다음 미들웨어로 이동하며 그 외의 인수를 넣는다면 바로 에러처리 미들웨어로 이동한다. 이때의 인수는 error 미들웨어의 파라미터로 가게된다.



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

## 라우트 매개변수 패턴

/user/:id 이렇게 들어오는 걸

라우트 매개변수 패턴이라고 하며 req.params로 들어온다.

이렇게 라우트 매개변수 패턴을 사용하는 라우터는 항상 일반 라우터보다 뒤에 위치해야한다. 밑에 그래야만 하는 이유를 나타내는 예제가 있다.

```javascript
router.get('/user/:id', function (req, res) {
  console.log('얘만 실행됨')
});

router.get('/user/some-api', function (req, res) {
  console.log('예는 실행 절대 안됨')
})
```

다 /user/:id로 들어가버린다.

## 쿼리스트링

`/users/123?limit=5&skip=10`라는 요청이 들어온다면 req.params는 id에 123이 들어오고 req.query에는 limit: 5, skip: 10이 들어온다 다 문자열로 들어온다.

```javascript
const req.params = {
  id: '123'
}

const req.query = {
  limit: '5',
  skip: '10'
}
```

변수명 저렇게 쓰면 안됩니다 예를들기 위해 한것일 뿐

```javascript
router.route('/abc')
.get((req, res) => {
  res.send('GET /abc');
})
.post((req, res) => {
  res.send('POST /abc')
})
```

API주소는 같은데 메서드가 다른 라우터는 이렇게 채이닝으로 묶을수도 있다.

## req, res

## req

- req.app: req객체를 통해 app 객체에 접근할수 있다. req.app.get('port')와 같은식으로 사용가능

- req.body: body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체

- req.cookies: cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체이다.

- req.ip: 요청의 ip 주소가 담겨 있다.

- req.params: 라우트 매개변수에 대한 정보가 담긴 객체

- req.query: 쿼리스트링에 대한 정보가 담긴 객체입니다.

- req.signedCookies: 서명된 쿠키들은 req.cookies 대신 여기에 담겨있다.

- req.get(헤더 이름): 헤더의 값을 가져오고 싶을때사용하는 메서드

### res

- res.app: req.app처럼 res객체를 통해 app객체에 접근할 수 있습니다.

- res.cookie(키, 값, 옵션): 쿠키를 설정하는 메서드이다.

- res.clearCookie(키, 값, 옵션): 쿠키를 제거하는 메서드이다.

- res.end(): 데이터 없이 응답을 보낸다.

- res.json(JSON): JSON 형식의 응답을 보낸다.

- res.redirect(주소): 리다이렉트할 주소와 함께 응답을 보낸다.

- res.render(뷰, 데이터): 다음 절에서 다룰 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드입니다.

- res.send(데이터): 데이터와 함께 응답을 보냅니다. 데이터는 문자열일 수도 있고 HTML일 수도 있으며, 버퍼일 수도 있고 객체나 배열일 수도 있습니다.

- req.sendFile(경로): 경로에 위치한 파일을 응답합니다.

- res.set(헤더, 값): 응답의 헤더를 설정합니다.

- res.status(코드): 응답 시의 HTTP 상태 코드를 지정합니다. 코드 지정후 채이닝으로 다른 메서드 실행가능 예를 들어 send같은것


req, res 모두 메서드 체이닝을 지원하는 경우가 많다.


## Sequelize

```javascript
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

module.exports = db;

```

여기에서 `Sequelize`는 시퀄라이즈 패키지이자 생성자이다. config/config.json에서 데이터베이스 설정을 불러온 후 new Sequelize를 통해 MySQL 연결 객체를 생성한다. 연결 객체를 나중에 재사용하기위해 db.sequelize에 넣어 두었습니다.

force: false는 이게 만약 true로 되어있으면 서버 실행 시마다 테이블을 재생성한다. 테이블을 잘못 만든 경우에 true로 사용하면되고 배포시 무조건 false로 배포해야한다.

Sequelize.Model 확장한 클래스로 모델을 생성한다.

시퀄라이즈는 기본적으로 모델이름은 단수형으로 테이블 이름은 복수형으로 사용한다.

모델은 크게 `static init`메서드와 `static associate`메서드로 나뉜다.

### static init
테이블에 대한 설정을 한다.

첫번째 인수는 테이블 컬럼에 대한 설정이며, 두 번째 인수가 테이블 자체에 대한 설정이다.

VARCHAR -> STRING

INT -> INTEGER

TINYINT -> BOOLEAN

DATETIME -> DATE

### static associate

다른 모델과의 관계를 적는다.

```javascript
// Comment
  static associate(db) {
    db.Comment.belongsTo(db.User, { foreignKey: 'commenter', targetKey: 'id' });
  }
```

targetKey는 User의 id이다.

foreignKey를 따로 지정하지 않는다면 이름이 모델명 기본 키인 컬럼이 모델에 생성된다.

예를들어 commenter를 foreignKey로 직접 넣어주지 않았다면 user(모델명) + 기본 키(id)가 합쳐진 UserId가 foreignKey로 생성된다.

```javascript
// User
static associate(db) {
    db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
  }
```

sourceKey는 자기 자신의 id이다.

현재 User와 Comment는 1:N관계이다.

### 1:1

```javascript
db.User.hasOne(db.Info, { foreignKey: 'UserId', sourceKey:'id'})
```

```javascript
db.Info.belongsTo(db.User, { foreignKey: 'UserId', targetKey: 'id'});
```

1:1관계에서는 hasMany 메서드 대신 hasOne 메서드를 사용한다.

1:1 관계라도 belongsTo와 hasOne이 반대가 되면 안된다. belongsTo를 사용하는 Info 모델에 UserId 컬럼이 추가되기 때문이다.

### N:M

N:M을 표현하기 위해 belongsToMany메서드를 사용한다. Post테이블과 Hashtag모델이 있고 두개의 중간테이블이 있다고하면 다음과 같이 표현할수 있다.

```javascript
db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});

db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});
```

중간테이블은 다음과 같이 접근가능하다.

```javascript
db.sequelize.models.PostHashtag
```

```javascript
SELECT name, age FROM nodejs.users WHERE married = 1 AND age > 30;
```

이것은 아래와 같다.

```javascript
const {Op} = require('sequelize');
const { User } = require('../models');
User.findAll({
  attributes: ['name', 'age'],
  where: {
    married: true,
    age: { [Op.gt]: 30},
  }
})
```

### Op 연산자 종류
Op.gt(초과), Op.gte(이상), Op.lt(미만), Op.lte(이하), Op.ne(같지 않음), Op.or(또는), Op.in(배열 요소 중 하나), Op.notIn(배열 요소와 모두 다름)

```javascript
SELECT id, name FROM users WHERE married = 0 OR age > 30;

User.findAll({
  attributes: ['id', 'name'],
  where: {
    [Op.or]: [{married: false}, {age: {[Op.gt]: 30}}],
  }
})
```

### 정렬

```javascript
SELECT id, name FROM users ORDER BY age DESC;
User.findAll({
  attributes: ['id', 'name'],
  order: [['age', 'desc']],
})
```

### 로우 개수 설정 (LIMIT)

```javascript
SELECT id, name FROM users ORDER BY age DESC LIMIT 1;

User.findAll({
  attributes: ['id', 'name'],
  order: [['age', 'DESC']],
  limit: 1,
})
```

### OFFSET

```javascript
SELECT id, name FROM users ORDER BY age DESC LIMIT 1 OFFSET 1;

User.findAll({
  attributes: ['id', 'name'],
  order: ['age', 'DESC'],
  limit: 1,
  offset: 1,
});
```

### UPDATE

```javascript
UPDATE nodejs.users SET comment = '바꿀 내용' where id = 2;

User.update({
  comment: '바꿀 내용',
}, {
  where: {id:2},
})
```

### DELETE

```javascript
DELETE FROM nodejs.users WHERE id = 2;

User.destroy({
  where: {id: 2},
})
```

### JOIN

```javascript
const user = await User.findOne({
  include: [{
    model: Comment,
  }]
})
console.log(user.Comments) // 사용자 댓글
```

include가 배열인 이유는 다양한 관계를 다른모델과 맺을수 있기 때문이다.

관계를 설정했다면 getComments(조회) setComment(수정), addComment(하나 생성), addComments(여러 개 생성),removeComments(삭제) 메서드를 지원한다. 동사 뒤에 모델의 이름이 붙는 형식입니다.

동사 뒤에 모델의 이름을 바꾸고싶다면

```javascript
// 관계 설정시 as로 등록
db.User.hasMany(db.Comment, {
  foreignKey: 'commenter',
  sourceKey: 'id',
  as: 'Answer'
});

// 쿼리 시

const user = await User.findOne({});
const comments = await user.getAnswer();
console.log(comments);
```

as 설정시 include 시 추가되는 댓글 객체도 user.Answers로 바뀐다.

include나 관계 쿼리 메서드에서도 where나 attributes 같은 옵션을 사용할 수 있습니다.

```javascript
const user = await User.findOne({
  include: [{
    model: Comment,
    where: {
      id: 1
    },
    attributes: ['id'],
  }]
});

const comments = await user.getComments({
  where: {
    id: 1,
  },
  attributes: ['id'],
});
```

댓글을 가져올 때는 id가 1인 댓글만 가져오고 컬럼에도 id컬럼만 가져오도록 하고 있다.

조회는 저렇게 하지만 수정, 생성, 삭제 때는 조금 다른 점이 있다.

### 생성

```javascript
// 한개추가
const user = await User.findOne({});
const comment = await Comment.create();
await user.addComment(comment);
await user.addComment(comment.id);
```

```javascript
const user = await User.findOne({});
const comment1 = await Comment.create();
const comment2 = await Comment.create();
await user.addComment([comment1, comment2]);
```

관계 쿼리 메서드의 인수로 추가할 댓글 모델을 넣거나 댓글의 아이디를 넣으면 된다. 수정이나 삭제도 마찬가지입니다.

## 직접 쿼리하기

직접 SQL 쿼리를 할수도 있다.

```javascript
const [result, metadata] = await sequelize.query('SELECT * FROM comments');
console.log(result);
```

passport.initialize 미들웨어는 요청(req 객체)에 passport 설정을 심고, passport.session 메들웨어는 req.session 객체에 passport정보를 저장합니다. req.session객체는 express-session에서 생성하는 것이므로 passport 미들웨어는 express-session 미들웨어보다 뒤에 연결해야합니다.

## serializeUser, deserializeUser

```javascript
const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
};

```

### serializeUser

로그인 시 실행되며, req.session(세션) 객체에 어떤 데이터를 저장할지 정하는 메서드입니다. 매개변수로 user를 받고 나서, done 함수에 두 번째 인수로 user.id를 넘기고 있습니다. 여기에 사용자 정보가 들어있습니다. -> 나중에설명

done 함수의 첫번째 인수는 에러발생시 사용하는 것이고, 두번째 인수에는 저장하고 싶은 데이터를 넣습니다. 로그인 시 사용자 데이터를 세션에 저장하는데 세션에 사용자 정보를 모두 저장하면 세션의 용량이 커지고 데이터 일관성에 문제가 발생하므로 사용자의 아이디만 저장하라고 명령한 것이다.

serialize가 로그인 시에만 실행된다면 deserializeUser는 매 요청ㅅ ㅣ 실행된다. passport.session 미들웨어가 이 메서드를 호출합니다.

### 전체적인 과정

#### 로그인 전

1. 라우터를 통해 로그인 요청이 들어옴

1. 라우터에서 passport.authenticate 메서드 호출

1. 로그인 전략 수행

1. 로그인 성공 시 사용자 정보 객체와 함께 req.login호출

1. req.login 메서드가 passport.serializeUser호출

1. req.session에 사용자 아이디만 저장

1. 로그인 완료

### 로그인 후

1. 요청이 들어옴

1. 라우터에 요청이 도달하기 전에 passport.session 미들웨어가 passport.deserializeUser 메서드 호출

1. req.session에 저장된 아이디로 데이터베이스에서 사용자 조회

1. 조회된 사용자 정보를 req.user에 저장

1. 라우터에서 req.user 객체 사용 가능

## localStrategy 와 kakaoStrategy 파일

이것들은 로컬 로그인과 카카오 로그인 전략에 대한 파일이다. Passport는 로그인 시의 동작을 전략(strategy)이라는 용어로 표현하고 있습니다. 다소 거창하긴 하지만, 로그인 과정을 어떻게 처리할지 설명하는 파일이라고만 생각하면 된다.

## 로컬 로그인

로컬 로그인에는 passport-local모듈이 필요하다.

```javascript
router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});
```

`passport.authenticate('local')` 이부분이 passport가 local전략을 실행한다는것이다.


```javascript
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const exUser = await User.findOne({
            where: { email },
          });
          if (exUser) {
            const result = await bcrypt.compare(password, exUser.password);
            if (result) {
              done(null, exUser);
            } else {
              done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
            }
          } else {
            done(null, false, { message: '가입되지 않으느 회원입니다.' });
          }
        } catch (e) {
          console.error(e);
          done(e);
        }
      }
    )
  );
};

```

LocalStrategy 생성자의 첫 번째 인수로 주어진 객체는 전략에 관한 설정을 하는 곳입니다. usernameField와 passwordField에는 일치하는 로그인 라우터의 req.body 속성명을 적으면 됩니다. req.body.email에 이메일 주소가, req.body.password에 비밀번호가 담겨 들어오므로 EMail과 password를 각각 넣었습니다.

실제 전략을 수행하는 async함수입니다. LocalStrategy 생성자의 두 번째 인수로 들어갑니다. 첫번째 인수에서 넣어준 이메일과 패스워드는 각각 async함수의 첫번째 두번째 매개변수가 됩니다. 세번째의 done 함수는 passport.authenticate의 콜백 함수이다.



## 카카오 로그인

OAUTH2를 공부해보자

### deserializeUser 캐싱하기

라우터가 실행되기 전에 deserializeUser가 먼저 실행됩니다. 따라서 모든 요청이 들어올 때마다 매번 사용자 정보를 조회하게 됩니다. 서비스의 규모가 커질수록 더 많은 요청이 들어오게 되고, 그로인해 데이터베이스에도 더 큰 부담이 주어집니다. 따라서 사용자 정보가 빈번하게 바뀌는 것이 아니라면 캐싱을 해두는 것이 좋습니다. 다만, 캐싱이 유지되는 동안 팔로워와 팔로잉 정보가 갱신되지 않는 단점이 있으므로 캐싱 시간은 서비스 정책에 따라 조절해야한다. 실제 서비스에서는 메모리에 캐싱하기 보다는 레디스 같은 데이터베이스에 사용자 정보를 캐싱합니다.

### JSON Web Token

`헤더.페이로드.시그니처`

#### 헤더

토큰 종류와 해시 알고리즘 정보가 들어있다.

#### 페이로드

토큰의 내용물이 인코딩된 부분입니다.

#### 시그니처

일련의 문자열이며, 시그니처를 통해 토큰이 변조되었는지 여부를 확인할 수 있습니다.

