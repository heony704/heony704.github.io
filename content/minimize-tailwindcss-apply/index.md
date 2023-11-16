---
title: Tailwind CSS @apply 지시문 최소화하기
date: '2023-10-28 23:00:00'
tags:
categories: react
---

[[번역] Tailwind CSS에서 혼란을 방지하기 위한 5가지 모범 사례](https://velog.io/@lky5697/5-best-practices-for-preventing-chaos-in-tailwind-css)를 읽으면서 Tailwind CSS를 사용할 때 `@apply` 지시문을 남용하는 게 좋지 않다는 것을 알게 되었다.  
Tailwind CSS를 사용하던 프로젝트의 `@apply` 지시문을 줄이면서 느낀 것을 적어보려 한다.

## Bad Practice

Tailwind CSS로 클래스 이름을 작성하다 보면 너무 길어져 지저분해 보일 때가 있다.  
이때 `@layer`와 `@apply`를 사용하면 CSS 파일에 클래스를 새로 만들어 길고 지저분하게 늘어진 클래스 이름을 간결하게 만들 수 있다.

이렇게 너무 길어 뭐가 뭔지 모르겠는 클래스 이름을,

```tsx
<button
  type="submit"
  className="w-full px-5 py-2.5 rounded-lg font-medium text-sm text-center focus:outline-none focus:ring-2 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50 text-white focus:ring-primary-300 dark:disabled:text-gray-400 dark:focus:ring-primary-800"
>
  {text}
</button>
```

`@layer`와 `@apply`를 사용해 버튼의 모양과 버튼의 색에 대한 클래스로 나눠 정의 해주면,

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .button-rounded-lg {
    @apply w-full px-5 py-2.5 rounded-lg;
    @apply font-medium text-sm text-center;
  }
  .button-primary {
    @apply focus:outline-none focus:ring-2;
    @apply bg-primary-600 hover:bg-primary-700 disabled:bg-primary-600/50;
    @apply text-white focus:ring-primary-300;
    @apply dark:disabled:text-gray-400 dark:focus:ring-primary-800;
  }
}
```

이렇게 알아보기도 쉽고 간결하게 만들 수 있다.

```tsx
<button type="submit" disabled={disabled} className="button-rounded-lg button-primary">
  {text}
</button>
```

와! 가독성도 좋고 만들어 둔 클래스를 재사용할 수 있으니 너무 좋다!  
이렇게 하면 Tailwind CSS의 스타일을 알아보기 힘든 단점도 보완돼!  
라고 생각했지만, 이 방법은 좋은 방법이 아니었다.

## 추상화를 위해 @apply 지시문을 남용하지 말기

`@apply`를 코드를 깔끔하게 만들기 위해 사용하면 안된다.

Tailwind CSS의 가장 큰 장점은 CSS 파일을 만들 필요 없이 HTML 안에서 클래스 이름을 통해 쉽게 스타일을 적용하는 것이다.  
그런데 따로 CSS 파일을 만들어 클래스를 만들고 관리하는 것은 이런 Tailwind CSS의 장점을 퇴색시킨다.  
스타일을 적용할 수 있는 방법이 두 가지가 되어 혼란을 야기하기 때문에 Tailwind CSS 없이 CSS 파일로만 스타일을 적용하는 것보다 유지보수가 더 힘들어진다.

Tailwind CSS를 사용하면서 CSS 파일에 별도의 클래스를 만들기 시작하면, 스타일 변경이 있을 때 컴포넌트 파일과 CSS 파일을 돌아다니며 확인해야 한다.  
CSS 파일이 방대해질수록 어떤 스타일이 관여되었는지 확인하기 어려워진다.  
한눈에 스타일이 파악되지 않고 특히 `@layer`의 base, components, utilities는 각각 우선순위가 다르기 때문에 혼란을 가중한다.

따라서 버튼처럼 매우 작고 다양한 곳에서 사용되는 스타일이 아니라면 `@apply`를 통해 별도의 클래스를 만드는 것은 추천되지 않는다.  
또 리액트처럼 컴포넌트 중심의 프로젝트는 글로벌한 CSS 클래스를 만드는 것보다 컴포넌트에 스타일을 적용하고 컴포넌트를 재사용하는 것이 훨씬 좋은 선택이다.

해당 내용은 [Tailwind CSS 공식 문서](https://tailwindcss.com/docs/reusing-styles#avoiding-premature-abstraction)에서도 확인할 수 있다.

## @apply 지시문 최소화하기

Tailwind CSS를 사용한 프로젝트를 보니 `@apply`가 참 많아 다음과 같이 최소화했다.

### 1. index.css에 정의된 components와 utilities를 전부 제거

`index.css`에 `@apply`로 정의한 클래스 대부분이 코드 가독성을 높이기 위해 한두 번 사용되는 스타일이었다.
이런 한두 번 사용되는 클래스들은 과감하게 제거하고 다시 원래 컴포넌트 스타일에 입력해줬다.

### 2. 자주 사용된 icon-button 클래스는 IconButton 컴포넌트로 대체

`icon-button` 클래스는 네 번 사용될 정도로 재사용성이 높아 `IconButton` 컴포넌트를 만들어 대체했다.

더 자세한 내용은 [해당 Pull Request](https://github.com/heony704/ordinary-todolist/pull/7)에서 확인할 수 있다.

이렇게 수정하다 보니 이 전엔 나름 가독성 높이겠다고 했던 행동이 헛수고가 되었다.  
사용하는 프레임워크의 개념에 대해 정확히 파악하고 잊지 않는 것이 중요한 것 같다.

---

참고

- [[번역] Tailwind CSS에서 혼란을 방지하기 위한 5가지 모범 사례](https://velog.io/@lky5697/5-best-practices-for-preventing-chaos-in-tailwind-css)
- [5 best practices for preventing chaos in Tailwind CSS](https://evilmartians.com/chronicles/5-best-practices-for-preventing-chaos-in-tailwind-css)
- [Tailwind CSS - Avoiding premature abstraction](https://tailwindcss.com/docs/reusing-styles#avoiding-premature-abstraction)

```toc

```
