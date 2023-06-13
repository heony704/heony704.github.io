---
title: URL의 구조
date: '2022-05-23 23:00:00'
tags:
categories: web
---

## URL이란?

Uniform Resource Locator, 웹에서 정해진 유일한 리소스의 주소

URL은 웹에 게시된 어떤 자원(리소스)를 찾기 위해서 브라우저에 의해 사용되는 메카니즘이다.

각각의 URL은 유일한 리소스를 가리킨다.

## URL의 구조

![url-structure.png](url-structure.png)

### Protocol

- 브라우저가 어떤 프로토콜을 사용하는지
- 프로토콜: 컴퓨터 네트워크에서 원할하게 데이터를 전송하기 위해 정한 규약

### Domain Name

- 말그대로 도메인 이름
- IP 주소가 사용되기도 함

### Port

- 포트 번호
- 표준 HTTP 포트를 사용한다면 포트 번호가 생략됨  
  (HTTP의 경우 80 생략, HTTPS의 경우 443 생략)

### Path

- 웹서버에서 리소스에 대한 경로

### Parameters

- 웹서버에서 제공하는 추가 파라미터
- `&`으로 구분

### Anchor

- 리소스 내에 정해진 위치를 보여주는 Anchor(닻)
- `#` 뒤에 오는 부분은 가치가 없다고 판단해 절대 서버에 요청을 보내지 않음

## URL과 URI 차이

URI(Uniform Resource Identifier)는 인터넷의 리소스를 나타내는 유일한 주소다.

URL과 비슷하게 느껴졌다면 맞다.  
URL은 URI 의 하위개념이다.

가장 흔한 URI가 URL이기 때문에 둘은 혼용되어 쓰이기도 한다.  
참고로 하위 개념으로 URL 말고 URN(Uniform Resource Name)도 있다.

---

참고: [MDN URL](https://xn--developer-9700b.mozilla.org/ko/docs/Learn/Common_questions/Web_mechanics/What_is_a_URL)

```toc

```
