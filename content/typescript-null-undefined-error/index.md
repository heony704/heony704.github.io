---
title: typescript 개체가 null, undefined인 것 같습니다?
date: '2021-09-18 23:00:00'
tags:
categories: typescript
---

typescript가 개체가 undefined, null 인 것 같다며 에러를 발생시키는 이유, 그리고 실행하도록 설득하는 방법에 대해 알아봤습니다.

## 문제 상황

`tsconfig.json`에서 다음과 같이 설정된 경우 null 과 undefined 문제를 엄격하게 관리합니다.

```json
{
  "compilerOptions": {
    "stric": true
  }
}
```

따라서 다음과 같은 에러가 자주 발생합니다.

> 개체가 'undefined'인 것 같습니다.ts(2532)  
> 개체가 'null'인 것 같습니다.ts(2531)

변수 중 Date 와 null 이 둘다 들어가는 경우 다음과 같은 에러도 발생합니다.

> 'null' 형식은 'Date' 형식에 할당할 수 없습니다.ts(2322)

## 문제 해결

위 에러는 세가지 방법으로 해결할 수 있습니다.

### 1. 타입을 any로 정하기

```jsx
export default class User {
  private startTime: any;
  // 후략
}
```

any를 사용하면 TypeScript를 사용하는 의미가 없어보여 찜찜합니다.

### 2. 유니온 타입 사용하기

```jsx
export default class User {
  private startTime: Date | null;
  // 후략
}
```

어떤 타입인지 한눈에 들어오지 않습니다.

### 3. "strictNullChecks": false

위 두 방법을 사용해도 개체가 undefined 혹은 null일 경우를 엄격하게 관리하여 코드 짜기가 힘들었습니다.  
아예 엄격하게 검사하지 않도록 `tsconfig.json`을 다음과 같이 수정했습니다.

```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": false
  }
}
```

## 결론

TypeScript를 적용할 때 엄격하게 undefined, null을 체크할 필요가 없는 경우 `tsconfig.json`에 `"strictNullChecks": false`를 추가하는 것이 좋습니다.  
하지만 혹시 모를 에러를 대비해야 한다면 undefined, null 에러를 검사하도록 엄격하게 관리해야 합니다.

```toc

```
