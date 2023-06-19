---
title: cookie-parser 사용하기
date: '2021-06-22 23:00:00'
tags:
categories: javascript
---

## cookie-parser란?

`Cookie` 헤더를 파싱하고, 쿠키 이름에 의해 키가 지정된 객체로 `req.cookies`를 채운다.  
`secret` 문자열을 전달하여 선택적으로 서명된(signed) 쿠키 지원을 활성화할 수 있다.  
`secret` 문자열은 다른 미들웨어에서 사용할 수 있도록 `req.secret`을 할당한다.

## 설치하기

```bash
npm install cookie-parser
```

## API 사용하기

```js
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());
```

### cookieParser(secret, options)

secret, options 매개변수를 사용하여 새로운 쿠키파서 미들웨어 함수를 만든다.

**secret**

- 쿠키 서명에 사용되는 문자열(string) 혹은 배열(array)
- 선택 사항이며, 만약 지정되지 않은 경우 서명된 쿠키를 파싱하지 않음
- string이 주어진 경우, `secret`으로 사용됨
- array가 주어진 경우, 순서대로 각 `secret`을 사용하여 쿠키 서명을 해제하려고 시도함

**options**

- 두번째 옵션으로 `cookie.parse`에게 전달되는 객체
- `decode`: 쿠키의 값을 디코딩하는 함수

미들웨어는 request에서 `Cookie` 헤더를 파싱하고 쿠키 데이터를 `req.cookies` 속성으로 노출한다.  
만약 `secret` 값이 주어진 경우, `req.signedCookies` 속성으로 표시한다.  
이러한 속성들은 쿠키 이름과 쿠키 값으로 이루어진 name value pair이다.

`secert` 값이 주어졌을 때, 이 모듈은 서명된 쿠키의 값의 서명을 해제(unsign)하고 유효성을 검사한다.  
또한 name value pair들을 `req.cookies`에서 `req.signedCookies`로 이동한다.  
서명된 쿠키는 `s:`로 시작하는 값이 있는 쿠키이다.  
서명 유효성 검사에 실패한 서명된 쿠키는 변조된(tampered) 값 대신에 false 값을 가진다.

또한, 이 모듈은 특수 `JSON cookies`를 지원한다.  
값이 `j:`로 시작하는 쿠키가 이에 해당한다.  
이러한 값들이 발견되면, `JSON.parse`의 결과로 값이 노출된다.  
파싱이 실패하면, 원래 값이 유지된다.

### cookieParser.JSONCookie(str)

쿠키 값을 JSON 쿠기로 파싱한다.  
JSON 쿠키인 경우 파싱된 JSON 값을, 그렇지 않으면 전달된 값을 반환한다.

### cookieParser.JSONCookies(cookies)

객체가 주어지면 키를 iterate하고 각 값에 대해 `JSONCookie`를 호출하여 원래 값을 파싱된 값으로 바꾼다.  
전달된 동일한 객체를 반환한다.

### cookieParser.signedCookie(str, secret)

쿠키 값을 서명된 쿠키로 파싱한다.  
서명된 쿠키이고 서명이 유효하다면, 파싱된 서명되지 않은 값(unsigned value)를 반환한다.  
값이 서명되지 않은 경우, 원래 값이 반환된다.  
값이 서명되었지만 서명이 유효하지 않은 경우, false가 반환된다.

`secret` 인수는 array 혹은 string일 수 있다.  
string이 제공된 경우, `secret`으로 사용된다.  
array로 제공된 경우, 순서대로 각 `secret`을 사용하여 쿠키를 서명해제(unsign)하려고 시도한다.

### cookieParser.signedCookies(cookies, secret)

객체가 주어지면 키를 iterate하고 값이 서명된 쿠키인지 확인한다.  
서명된 쿠키이고 서명이 유효하다면, 키는 개체에서 삭제되고 반한되는 새로운 객체에 추가된다.

`secret` 인수는 array 혹은 string일 수 있다.  
string이 제공된 경우, `secret`으로 사용된다.  
array로 제공된 경우, 순서대로 각 `secret`을 사용하여 쿠키를 서명해제(unsign)하려고 시도한다.

## 사용 예시

```js
var express = require('express');
var cookieParser = require('cookie-parser');

var app = express();
app.use(cookieParser());

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies);

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies);
});

app.listen(8080);

// curl command that sends an HTTP request with two cookies
// curl http://127.0.0.1:8080 --cookie "Cho=Kim;Greet=Hello"
```

---

참고: [npm cookie-parser](https://www.npmjs.com/package/cookie-parser), [expressjs cookie-parser](http://expressjs.com/en/resources/middleware/cookie-parser.html)

```toc

```
