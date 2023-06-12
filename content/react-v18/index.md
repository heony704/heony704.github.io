---
title: 리액트 v18.0
date: '2023-04-06 23:00:00'
tags:
categories: react
---

React 18에서 가장 중요한 변화는 Concurrency, **동시성**입니다.  
동시성이 적용되기 전 동기식 렌더링의 경우, 업데이트가 렌더링을 시작하면 사용자는 화면에서 결과를 볼 수 있을 때까지 아무것도 중단할 수 없습니다.  
동시성이 적용된 후 렌더링은 중단될 수 있습니다.  
(React 18로 업그레이드해도 createRoot 함수 등 동시성을 부여하는 기능을 사용하지 않으면 업그레이드 이전과 동일하게 동기적으로 렌더링합니다.)  
동시 렌더링에서 리액트는 업데이트 렌더링을 시작하고, 중간에 일시중지한 다음 나중에 계속할 수 있습니다. 심지어 진행 중인 렌더링을 완전히 포기할 수 있습니다. 렌더링이 중단되더라도 UI가 일관되게 보일 것을 보장합니다.  
이 기능을 통해 React는 메인 스레드를 차단하지 않고 백그라운드에서 새로운 화면을 준비할 수 있으며, 이것은 UI가 큰 렌더링 작업의 중간에 있더라도 사용자 입력에 즉시 응답하여 유동적인 사용자 경험을 만들 수 있다는 것을 의미합니다.

## Automatic Batching

여러 상태 업데이트를 단일 재랜더링으로 그룹화하여 일괄 처리합니다.  
업데이트 이전에는 React 이벤트 핸들러 내에서만 업데이트를 일괄 처리하고, Promise, setTimeout, 네이티브 이벤트 핸들러 또는 기타 이벤트 내부의 업데이트는 일괄적으로 처리되지 않았습니다.  
React 18은 이런 업데이트도 자동으로 일괄 처리됩니다.

Before

```jsx
// 오직 React 이벤트만 일괄 처리
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // setCount와 setFlag가 일괄 처리되지 않고 각각 업데이트
}, 1000);
```

After

```jsx
// Promise, setTimeout의 내부, 네이티브 이벤트 핸들러, 기타 이벤트가 일괄 처리됨
setTimeout(() => {
  setCount((c) => c + 1);
  setFlag((f) => !f);
  // setCount와 setFlag가 일괄 처리되어 한번만 업데이트
}, 1000);
```

만약 자동 일괄 처리가 안되게 하고 싶다면 flushSync를 사용할 수 있습니다.

```jsx
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCount((c) => c + 1);
  });
  // React has updated the DOM by now
  flushSync(() => {
    setFlag((f) => !f);
  });
  // React has updated the DOM by now
}
```

## Transitions

긴급 업데이트와 긴급하지 않은 업데이트를 구분하기 위해 도입된 개념입니다.  
긴급한 업데이트와 긴급하지 않은 업데이트를 구분하여 처리하는 이유는 다음과 같습니다.  
예를 들어, 간단한 추천검색어를 보여주는 검색창이 있을 때 검색창에 글자를 타이핑하는 것 검색창을 클릭하는 것과 같은 업데이트는 즉각적인 응답이 필요합니다. 하지만 추천검색어를 나타내는 업데이트의 경우 사용자가 즉각적인 응답을 기대하지 않기 때문에 덜 긴급하게 동작해도 괜찮습니다.  
따라서 긴급 업데이트와 긴급하지 않은 업데이트를 구분해 처리한다면 사용자 경험을 좀 더 매끄럽게 만들 수 있습니다.  
보통 입력, 클릭, 누르기 등 직접적인 상호작용은 긴급 업데이트로, 화면이 다른 화면으로 **전환**되는 것은 긴급하지 않은 업데이트로 처리합니다.  
(이 기능의 이름이 Transition인 이유도 React 측에서 UI **전환**과 관련된 업데이트가 긴급하지 않은 업데이트라고 생각하기 때문인 것 같습니다.)  
이전에는 debouncing, throttling과 같은 방법을 사용해서 업데이트를 일부러 늦추곤 했지만 React 18의 Transition을 사용하면 좀 더 간단하게 사용할 수 있습니다.

Transition 기능을 사용하려면 startTransition API를 사용해 React에게 어떤 것이 긴급 업데이트이고 어떤 것이 전환 업데이트인지 알려야 합니다.

```jsx
import { startTransition } from 'react';

// 긴급 업데이트
setInputValue(input);

// 전환 업데이트 (긴급하지 않은 업데이트)
startTransition(() => {
  setSearchQuery(input);
});
```

startTransition으로 감싸진 업데이트는 긴급하지 않은 것으로 처리되고 감싸지지 않은 업데이트는 긴급 업데이트로 처리됩니다.  
긴급 업데이트가 시작되어 전환 업데이트가 중단되면, React는 완료되지 않은 오래된 렌더링 작업을 버리고 최신 업데이트만 렌더링합니다.

- useTransition: isPending 값과 startTransition 함수를 반환하는 **hook**
- startTransition: Transition을 시작하는 **함수**

startTransition만 단독으로 사용할 수도 있지만 useTransition이라는 react hook을 사용할 수도 있습니다.  
useTransition은 isPending 값과 startTransition 함수를 반환한다. isPending은 보류중인 전환이 있는지를 나타내는 boolean 값입니다.

```jsx
import { useTransition } from 'react';

function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('about');

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
  // ...
}
```

## Suspense

Suspense를 사용해 UI 로딩상태를 선언적으로 지정할 수 있습니다.

```jsx
<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>
```

Suspense 기능은 이전에도 존재했습니다만, React 18에서 서버에 대한 지원이 추가되고 동시 렌더링 기능을 사용한 기능이 확장되었습니다.  
또 Transition API와 결합되어 사용될 때 가장 잘 작동합니다. 잘못된 로딩 상태를 방지하기 위해 충분한 데이터가 로드될 때까지 렌더링을 지연시킬 것입니다.

## React DOM Client

React DOM Client 관련 API가 수정되었으며 이제 `react-dom`이 아닌 `react-dom/client`에서 내보내집니다.  
**해당 API를 사용하지 않으면 React 18의 새로운 기능들이 작동하지 않습니다.**

- `ReactDOM.render` → `createRoot`
- `ReactDOM.hydrate` → `hydrateRoot`

* creatRoot: render하거나 unmount할 root를 만드는 새로운 메소드
* hydrateRoot: 서버 렌더링 어플리케이션을 hydrate하는 새로운 메소드

이전의 루트 관리

```jsx
import { render } from 'react-dom';

const container = document.getElementById('app');
render(<App tab="home" />, container);

unmountComponentAtNode(container);
```

React 18에서의 루트 관리

```jsx
import { createRoot } from 'react-dom/client';

const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App tab="home" />);

root.unmount();
```

## Strict Mode

앞으로 React는 컴포넌트가 unmount 사이에서 상태를 보존하는 기능을 제공할 예정입니다.  
이를 위해 React는 전과 동일한 컴포넌트 상태를 사용해서 트리를 unmount하고 remount해야 합니다.  
그에 대비해서 React는 Strict Mode에 새로운 개발 전용 검사를 도입했습니다.

React 18의 Strict Mode에서는 컴포넌트가 처음에 mount될때마다 자동으로 모든 컴포넌트들을 unmount했다가 다시 mount해서 두번째 mount에서 이전 상태를 복원합니다.

이전에는, React는 컴포넌트를 mount하고 effect를 만들었습니다.

```jsx
* React mounts the component.
  * Layout effects are created.
  * Effects are created.
```

React 18의 Strict Mode에서는, React는 개발 모드에서 컴포넌트를 unmount하고 다시 mount하는 것을 시뮬레이션합니다.

```jsx
* React mounts the component.
  * Layout effects are created.
  * Effects are created.
* React simulates unmounting the component.
  * Layout effects are destroyed.
  * Effects are destroyed.
* React simulates mounting the component with the previous state.
  * Layout effects are created.
  * Effects are created.
```

## New Hooks

### useId

hydration 불일치를 피하면서 클라이언트와 서버 모두에서 고유한 ID를 생성하는 hook입니다.  
list의 key를 생성하기 위한 기능이 아닙니다. list의 key는 데이터로부터 만들어져야 합니다.

### useTransition

useTransition과 startTransition을 사용하면 일부 상태 업데이트를 긴급하지 않은 것으로 표시할 수 있습니다. 표시하지 않은 다른 상태 업데이트들은 기본적으로 긴급한 것으로 간주됩니다.

### useDeferredValue

UI의 일부 업데이트를 연기할 수 있는 hook입니다. 트리의 긴급하지 않은 부분을 다시 렌더링하는 것을 연기할 수 있습니다.  
debouncing과 달리 고정된 시간 지연이 없습니다.

### useSyncExternalStore

외부 저장소가 저장소에 대한 업데이트를 동기화하도록 강요하여 동시 읽기를 지원할 수 있는 hook입니다.  
어플리케이션 코드가 아닌 라이브러리에서 사용하기 위한 hook입니다.

### useInsertionEffect

CSS-in-JS 라이브러리가 렌더링에 스타일을 삽입하는 성능 문제를 해결할 수 있는 hook입니다.  
어플리케이션 코드가 아닌 라이브러리에서 사용하기 위한 hook입니다.

## TypeScript 정의 업데이트

TypeScript를 사용한다면, `@types/react`와 `@types/react-dom` 디펜던시를 최신 버전으로 업데이트해야 합니다.  
이제 컴포넌트의 prop들을 정의할 때 `children` prop을 명시적으로 나열해야 합니다.

```jsx
interface MyButtonProps {
  color: string;
  children?: React.ReactNode;
}
```

## 인터넷 익스플로러 지원 중단

React 18에 도입된 새로운 기능이 IE에서 적절하게 폴리필할 수 없는 마이크로태스크와 같은 최신 브라우저 기능을 사용하여 구축되었기 때문에 더 이상 인터넷 익스플로러에 대한 지원이 중단됩니다.  
인터넷 익스플로러를 지원해야 한다면 React 17을 사용하는 것이 좋습니다.  
(인터넷 익스플로러는 2022년 6월 15일부터 지원이 중단되었습니다.)

## 그 외 주목할 만한 변화들

- **컴포넌트의 `undefined` 렌더링**: 컴포넌트에서 `undefined`를 반환해도 더 이상 경고하지 않습니다. 그렇기 때문에 관련 오류를 방지하기 위해서 linter를 설정할 것을 권고합니다.
- **mount되지 않은 컴포넌트의 setState 호출에 대한 경고 사라짐**
- **콘솔 로그 억제 제거**: Strict Mode를 사용할 때, React는 예상치 못한 부작용을 찾을 수 있도록 각 구성 요소를 두 번 렌더링합니다. React 17에서, 로그를 쉽게 읽을 수 있도록 두 렌더링 중 하나에 대한 콘솔 로그를 억제했습니다. React 18에서는 이러한 콘솔 로그 억제가 사라집니다. 대신 React DevTools가 설치되어 있다면, 두번째 로그의 렌더링은 회색으로 표시되며, 이를 완전히 억제할 수 있는 옵션이 제공됩니다.

```toc

```
