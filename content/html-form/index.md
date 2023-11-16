---
title: HTML Form
date: '2021-10-06 23:00:00'
tags:
categories: html
---

HTML을 통해 사용자로부터 데이터를 받기 위해 `<form>` 요소를 사용합니다.
Form은 무엇인지, 어떻게 사용하는지 알아봤습니다.

## Form이란?

- 사용자와 웹사이트 또는 어플리케이션이 서로 상호 작용하는 기술

웹사이트 안 폼을 통해 사용자는 데이터를 전송할 수 있습니다.  
폼을 사용하기 위해서는 `<form>` 요소를 사용해야 합니다.

`<form>` 요소는 정보를 제출하기 위한 대화형 컨트롤을 포함하는 문서 구획을 의미합니다.

## Form 사용하기

아래와 같이 `<form>` 요소를 사용할 수 있습니다.  
`<label>`, `<textarea>`, `<input>`, `<button>` 등 을 사용해서 Form을 구성할 수 있습니다.

```html
<form action="/join" method="post">
  <div>
    <label for="name">Name:</label>
    <input type="text" name="name" />
  </div>
  <div>
    <label for="mail">Email:</label>
    <input type="email" name="mail" />
  </div>
  <div>
    <input type="submit" value="JOIN" />
  </div>
</form>
```

위 form 에서는 `<input>`을 사용해서 데이터를 받고 Form을 제출했습니다.

데이터를 받는 `<input>` 요소에는 name 속성을 꼭 부여해줘야 합니다.  
그렇지 않으면 Form을 제출해도 데이터를 사용할 수 없습니다.

Form을 제출하기 위해서는 `<input>` 말고도 `<button>`을 사용할 수 있습니다.

```html
<button>JOIN</button>
```

`<button>`은 type 속성의 기본값이 "submit" 이므로 `<input>`과 달리 type을 따로 명시하지 않아도 됩니다.

---

참고

- [나의 첫 HTML 폼](https://developer.mozilla.org/ko/docs/Learn/Forms/Your_first_form)
- [`<form>`](https://developer.mozilla.org/ko/docs/Web/HTML/Element/form)

```toc

```
