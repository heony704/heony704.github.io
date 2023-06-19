---
title: tsconfig.json 구성 파일에서 입력을 찾을 수 없습니다.
date: '2021-09-18 23:00:00'
tags:
categories: typescript
---

`tsconfig.json` 파일에서 발생한 `구성 파일에서 입력을 찾을 수 없습니다.` 오류를 해결하기 위해 노력한 과정입니다.  
사용한 코드 편집기는 vscode입니다.

## 문제 발생 전

자바스크립트 프로젝트에서 es6을 사용하려면 babel을 설치해야 한다는 걸 알고 고민하다가 타입스크립트 프로젝트로 변환하기로 결심했습니다.  
예전부터 타입스크립트를 적용하는 걸 염두에 두고 있었기 때문입니다.  
기존 자바스크립트 프로젝트에 타입스크립트를 설치하고 개발환경을 설정했습니다.

```bash
npm install typescript
tsc --init
```

## 문제 발생

`tsc --init`을 통해 만들어진 `tsconfig.json`에 한줄의 에러가 계속 없어지지 않았습니다.

> 구성 파일에서 입력을 찾을 수 없습니다. 어쩌구 저쩌구 ...

이 에러는 아무짓도 하지 않았는데 발생했습니다.  
설정이 덜 된줄 알고 include와 exclude를 추가하거나 별 짓을 다 해봐도 그 한줄은 없어지지 않았습니다.

## 문제 해결 과정

그러던 중 [타입 스크립트 핸드북](https://typescript-kr.github.io/pages/tsconfig.json.html)에서 다음을 찾았습니다.

- "compilerOptions" 속성은 생략될 수 있으며 생략하면 컴파일러의 기본 값이 사용됩니다.
- "files"과 "include" 모두 지정되어 있지 않다면 컴파일러는 기본적으로 "exclude" 속성을 사용하여 제외된 것은 제외하고 모든 TypeScript (.ts,.d.ts 그리고 .tsx) 파일을 포함하는 디렉토리와 하위 디렉토리에 포함시킵니다.
- tsconfig.json 파일은 완전히 비어둘 수 있으며, 기본 컴파일러 옵션을 사용하여 기본적으로 (위에서 설명한대로) 포함된 모든 파일을 컴파일합니다.

???  
`tsconfig.json`은 잘못이 없었습니다.. 😭  
더이상 `tsconfig.json`을 괴롭히지 않고 명령어 `tsc`로 컴파일했습니다.

그랬더니 다음과 같은 에러가 발생했습니다.

> Build: No inputs were found in config file

input과 관련된 에러가 뜨길래 구글에 검색해봤습니다.  
가장 많은 추천을 받은 [스택 오버플로우 답변](https://stackoverflow.com/questions/41211566/tsconfig-json-buildno-inputs-were-found-in-config-file)입니다.

- Add an empty typescript file to the typescript scripts folder (the location of your tsconfig file) to satisfy the typescript compiler.
- You can also try to restart your code editor. That works well too.

위 두 답변이 도움이 되었습니다.

## 해결 방법

1. vscode를 껐다 켜본다.
2. src 폴더에 ts 파일을 하나라도 추가시킨다.

## 결론

공식 문서, 핸드북 보는 것을 생활화 하자.  
새로운 모듈 설치 후 문제가 발생하면 혹시 모르니 vscode 껐다 켜보자.  
컴파일도 해보자.

바보같지만 나중에 이런 일을 또 겪을까봐 기록한 글입니다.

```toc

```
