---
title: CSS 스타일시트
date: '2021-05-27 23:00:00'
tags:
categories: css
---

CSS는 Cascading Style Sheets의 약자로 HTML같은 마크업 언어가 실제로 표시되는 방법을 기술하는 언어를 의미합니다.  
CSS는 인라인 스타일시트, 내부 스타일시트, 외부 스타일시트에 따라 다르게 표시할 수 있습니다.

아래의 코드를 사용해서 스타일시트마다 어떻게 다른지 알아보겠습니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
  </head>
  <body>
    <div>test</div>
  </body>
</html>
```

## 인라인 스타일시트

요소의 style 속성을 사용하는 방법입니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
  </head>
  <body>
    <div style="color: red;">test</div>
  </body>
</html>
```

## 내부 스타일시트

head 태그 안에 style 태그를 사용하는 방법입니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
    <style>
      div {
        color: red;
      }
    </style>
  </head>
  <body>
    <div>test</div>
  </body>
</html>
```

## 외부 스타일시트

head 태그 안에 link 태그를 사용하는 방법입니다.

`rel`은 현재문서와 연결문서와의 관계를 표시합니다.  
`href`는 적용할 css 파일의 위치를 가르킵니다.

일반적으로 외부 스타일시트를 사용합니다.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Test</title>
    <link rel="stylesheet" href="css/style.css" />
  </head>
  <body>
    <div>test</div>
  </body>
</html>
```

내부 스타일시트와 인라인 스타일시트는 재사용성이 떨어지고, 개발 규모가 커졌을 때 관리가 힘들 수 있습니다.  
따라서 외부 스타일시트를 사용하는 것이 적절해 보입니다.

```toc

```
