---
title: 소수(Prime Number) 구하기
date: '2021-09-13 23:00:00'
tags:
categories: algorithm javascript
---

특정 수가 소수인지 판별해내는 함수를 JavaScript로 구현하고자 합니다.

먼저 소수가 무엇인지 알아봅시다.

## 소수(Prime Number)란?

- 1보다 큰 자연수 중 1과 자기 자신만을 약수로 가지는 수

위를 통해 소수의 기준을 다음과 같이 정의할 수 있습니다.

- 1보다 큰 자연수
- 1과 자기 자신만이 약수

## 간단하게 소수판별함수 구현하기

소수 `N`은 `1`과 자기자신만을 약수로 가지므로, `2 ~ N-1`까지의 수로 나눴을 때 나머지가 `0`이 아닙니다.  
이를 이용해 간단한 소수 판별 함수를 만들 수 있습니다.

숫자 `N`을 `2`부터 `n-1`까지 나눴을 때 나머지가 `0`인지 체크합니다.

```js
function isPrimeNumber(input) {
  if (input <= 1) {
    return false;
  }

  for (let i = 2; i < input; i++) {
    if (input % i == 0) {
      return false;
    }
  }

  return true;
}
```

이 함수의 시간 복잡도는 `O(N)`입니다.

## 더 효율적인 소수판별함수 구현하기

소수 판별 함수를 더 빠르게 돌릴 수 있는 방법입니다.  
`√N`보다 더 큰 수는 합성수이거나 소수일 수 밖에 없습니다. 직접 해보면 이해됩니다.

> 참고로 합성수는 1보다 큰 자연수 중 소수가 아닌 수를 의미합니다.

따라서 숫자 `N`을 `2`부터 `√N`까지 나눴을 때 나머지가 `0`인지 체크합니다.

```js
function isPrimeNumber(input) {
  if (input <= 1) {
    return false;
  }

  const sqrt = Math.sqrt(input);

  for (let i = 2; i <= sqrt; i++) {
    if (input % i == 0) {
      return false;
    }
  }

  return true;
}
```

이 함수의 시간 복잡도는 `O(√N)`으로, 간단하게 만들었을 때보다 더 좋아졌습니다.

## 에라토스테네스의 체

소수 판별을 찾아보다 보면 에라토스테네스의 체도 같이 언급되곤 합니다.

[에라토스테네스의 체](https://ko.wikipedia.org/wiki/%EC%97%90%EB%9D%BC%ED%86%A0%EC%8A%A4%ED%85%8C%EB%84%A4%EC%8A%A4%EC%9D%98_%EC%B2%B4)는 소수를 찾는 방법 중 하나로, 특정 범위 내에서 특정 수의 배수는 전부 소수에서 제외시켜 빠르게 소수들을 찾아내는 방법입니다.  
따라서 특정 범위 내에서 소수를 찾을 때 가장 빠른 방법이지만, 특정 수가 소수인지 판별하기엔 적합하지 않습니다.

```toc

```
