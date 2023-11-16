---
title: HTML 기초
date: '2021-10-05 23:00:00'
tags:
categories: html
---

## HTML이란?

- Hypertext Markup Language
- 웹페이지가 어떻게 구조화되어 있는지 브라우저가 알 수 있도록 하는 마크업 언어

HTML를 통해 웹페이지의 구조를 나타낼 수 있습니다.  
HTML은 프로그래밍 언어가 아닌 마크업 언어라는 것을 알고 있어야 합니다.

HTML은 이런 식으로 태그를 열고 닫아 작성할 수 있습니다.

```html
<p>My cat is <strong>very</strong> grumpy.</p>
```

태그가 아래처럼 제대로 닫히지 않을 경우 제대로 동작하지 않습니다.

```html
<p>My cat is <strong>very grumpy.</p></strong>
```

## 블럭 레벨 요소와 인라인 요소

HTML은 블럭 레벨 요소(Block level element)와 인라인 요소(Inline element)라는 두가지 요소(Element)를 가집니다.

이 요소들은 CSS의 Block boxes와 Inline boxes 와는 다른 단어입니다.

### 블럭 레벨 요소 Block level element

웹페이지 상에 블록(Block)을 만드는 요소입니다. 앞뒤 요소 사이에 새로운 Line을 만듭니다.  
일반적으로 페이지의 구조적 요소를 나타낼 때 사용됩니다.  
주로 사용하는 블럭 레벨 요소에는 `<div>`, `<footer>`, `<form>`, `<h1>`, `<header>`, `<li>`, `<nav>`, `<p>` 등이 있습니다.

[여기](https://developer.mozilla.org/ko/docs/Glossary/Block-level_content)에서 더 많은 블럭 레벨 요소를 확인할 수 있습니다.

### 인라인 요소 Inline element

항상 블록 레벨 요소 내에 포함된 요소입니다. 새로운 Line을 만들지 않아 문단이 끊기지 않습니다.  
문서의 한 단락같은 큰 범위에 적용될 수 없고 문장, 단어 같은 작은 부분에서만 적용됩니다.  
인라인 요소를 작성하면 그것을 작성한 단락 내에 나타나게 됩니다.  
주로 사용하는 인라인 요소에는 `<a>`, `<br>`, `<button>`, `<img>`, `<input>`, `<label>`, `<script>`, `<span>`, `<strong>` 등이 있습니다.

[여기](https://developer.mozilla.org/ko/docs/Glossary/Inline-level_content)에서 더 많은 인라인 요소를 확인할 수 있습니다.

## 빈 요소 Empty element

빈 요소는 단일 태그를 사용하는 요소입니다.

```html
<img src="img address" />
```

## 속성 Attributes

속성은 요소에 실제로 나타내고 싶지 않지만 추가적인 내용을 담고 싶을 때 사용합니다.  
아래는 `<p>`에 `class="editor-note"`를 속성으로 부여했습니다.

```html
<p class="editor-note">My cat is so cute</p>
```

### 속성 작성법

속성을 사용할 때 다음과 같은 규칙을 지켜야 합니다.

- 요소 이름과 속성 사이에 공백 유지하기
- 속성 이름 다음에 등호(=) 붙이기
- 속성값은 따옴표로 감싸기
- '작은 따옴표', "큰 따옴표" 둘 다 사용가능하나 하나만 사용할 것

`<요소이름 속성이름="속성값" 속성이름="속성값" ... >`

### Boolean 속성

속성 중에는 Boolean 속성이 존재합니다.  
일반적으로 그 속성의 이름과 동일한 하나의 값만을 가질 수 있습니다.  
예를 들어, 아래의 `disabled`는 Boolean 속성입니다.

```html
<input type="text" disabled="disabled" />
```

이런 Boolean 속성은 다음과 같이 사용할 수 있습니다.

```html
<input type="text" disabled />

<input type="text" />
```

## HTML의 문서 구조

기본적인 HTML의 구조는 다음과 같습니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>heony's velog</title>
  </head>
  <body>
    <p>HTML basics</p>
  </body>
</html>
```

- `<!DOCTYPE html>`  
  문서 형식을 나타냅니다.
- `<html>...</html>`  
  HTML 문서의 최상단 요소를 나타내며, 루트 요소라고도 부릅니다.  
  `<html>` 요소는 하나의 `<head>` 요소와 그 뒤를 따르는 하나의 `<body>` 요소를 가집니다.
- `<head>...</head>`  
  페이지 이용자에게는 보이지 않지만 검색 결과에 노출 될 키워드, 홈페이지 설명, CSS 스타일, character setdeclaration 등 HTML 페이지의 모든 내용을 담고 있습니다.
- `<meta charset="utf-8">`  
  HTML 문서의 문자 인코딩 설정을 UTF-8로 지정한 것입니다.  
  UTF-8에는 전세계에서 사용되는 언어에 대한 대부분의 문자가 포함되었기 때문에 페이지에 포함 된 모든 텍스트 내용을 처리 할 수 있습니다.
- `<title>...</title>`  
  페이지가 로드되는 브라우저 탭에 표시되는 제목으로 사용됩니다.
- `<body>...</body>`  
  페이지에 표시되는 모든 콘텐츠가 포함됩니다.

## HTML의 공백

HTML 요소 안에서 많은 공백을 사용하거나 줄 바꿈을 사용해도 HTML 파서는 코드를 렌더링 할 때 하나의 공백으로 줄입니다.  
이걸 이용해서 코드를 더 가독성 있게 정리할 수 있습니다.

## HTML에 특수문자 포함시키기

아래와 같은 문자참조 코드를 사용하면 HTML 구문에 포함되는 특수문자를 사용할 수 있습니다.

| 특수문자 | 문자참조 코드 |
| -------- | ------------- |
| <        | `&lt;`        |
| >        | `&gt;`        |
| "        | `&quot;`      |
| '        | `&apos;`      |
| &        | `&amp;`       |

## HTML 주석

`<!-- --->`를 사용해서 HTML에 주석을 달 수 있습니다.  
아래와 같이 사용합니다.

```html
<!-- 여기는 주석입니다. -->
```

---

참고

- [HTML 시작하기](https://developer.mozilla.org/ko/docs/Learn/HTML/Introduction_to_HTML/Getting_started)

```toc

```
