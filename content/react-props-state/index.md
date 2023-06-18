---
title: React의 props와 state
date: '2021-12-18 23:00:00'
tags:
categories: react
---

React의 props와 state, 그리고 둘의 차이점에 대해 알아보자.

## props

> props (properties)  
> 컴포넌트 속성을 설정할 때 사용하는 요소

props 값은 부모 컴포넌트에서 설정한다.  
컴포넌트 자신은 해당 props를 읽기 전용으로만 사용한다.

### props 사용하기

- `props.속성이름`: 해당 속성이름으로 설정한 값
- `props.children`: 컴포넌트 태그 사이의 내용
- `컴포넌트이름.defaultProps = {...};`: props 기본값 설정
- `컴포넌트이름.propTypes= {...};`: props 타입 설정  
  `.isRequired` 붙이면 필수로 지정해줘야 하는 값

컴포넌트 App에서 MyCom 컴포넌트의 props를 다음과 같이 설정했을 때,

```jsx
// App.js
import MyCom from './MyCom.js';

const App = () => {
  return <MyCom name="이승헌" age={25} />; // name 이라는 속성의 속성값을 "lee"로 설정
};
```

MyCom 컴포넌트가 **함수 컴포넌트**라면 다음과 같이 작성한다.

```jsx
// MyCom.js
import PropTypes from 'prop-types';

const MyCom = ({ name, age }) => {
  // 매개변수로 받아온 props에서 name, age 추출
  return (
    <div>
      {name} {age}
    </div>
  ); // name = props.name
};

MyCom.defaultProps = {
  // props 기본값 설정
  name: '김철수',
};

MyCom.propTypes = {
  // props 타입 설정
  name: PropTypes.string,
  age: PropTypes.number.isRequired, // 필수설정
};

export default MyCom;
```

MyCom 컴포넌트가 **클래스 컴포넌트**라면 다음과 같이 작성한다.

```jsx
// MyCom.js
import PropTypes from 'prop-types';

class MyCom extends Component {
  render() {
    // render 함수에서 this.props로 조회
    const { name, age } = this.props; // this.props에서 name, age 추출
    return (
      <div>
        {name} {age}
      </div>
    );
  }
}

MyCom.defaultProps = {
  // props 기본값 설정
  name: '김철수',
};

MyCom.propTypes = {
  // props 타입 설정
  name: PropTypes.string,
  age: PropTypes.number.isRequired, // 필수설정
};

export default MyCom;
```

props 기본값과 props 타입을 설정하는 코드는 함수 컴포넌트, 클래스 컴포넌트에 관계없이 동일하다.  
함수 컴포넌트는 props를 매개변수로 받아오고, 클래스 컴포넌트는 `render` 함수에서 `this.props`를 통해 조회할 수 있다.

## state

> state  
> 컴포넌트가 자체적으로 지닌, 컴포넌트 내부에서 바뀔 수 있는 값

props와 달리 컴포넌트 내부에서 값을 업데이트할 수 있다.  
state는 오직 상호작용을 위한 것, 시간이 지남에 따라 데이터가 바뀌는 것에 사용하는 것이 좋다.

### state 사용하기

**클래스 컴포넌트에서 state 사용하기**

- `setState(stateChange[, callback])`: 첫번째 인자로 객체를 전달해서 state 변경
- `setState(updater[, callback])`: 첫번째 인자로 함수 전달  
  updater는 `(state, props) => stateChange`와 같은 형태를 가지는 함수

`setState()`는 비동기적으로 수행되며, 컴포넌트를 항상 즉각적으로 갱신하지 않는다.  
`setState()`를 호출하자마자 `this.state`에 접근하는 것은 문제가 될 수 있으므로, 그 대신에 `componentDidUpdate` 또는 `setState(updater, callback)`의 콜백을 사용해야 한다.

```jsx
// MyCom.js
class MyCom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // state 초기값 설정
      number1: 0,
      number2: 0,
    };
  }
  render() {
    // render 함수에서 this.state로 조회
    const { number1, number2 } = this.state; // this.state에서 number1, number2 추출
    return (
      <div>
        <h1>
          {number1} {number2}
        </h1>
        {/_ setState()로 객체 전달 _/}
        <button
          onClick={() => {
            this.setState({ number1: number1 + 1 });
          }}
        >
          +1
        </button>
        {/_ setState()로 함수 전달 _/}
        <button
          onClick={() => {
            this.setState((state) => ({ number2: state.number2 + 1 }));
          }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default MyCom;
```

**함수 컴포넌트에서 state 사용하기**

리액트 16.8 이전 버전은 클래스 컴포넌트만 state 기능을 통해 상태를 가질 수 있었다.  
하지만 리액트 16.8 이후 버전은 hook 기능이 추가되어 함수 컴포넌트에서도 useState를 통해 상태를 가질 수 있게 되었다.

- `const [상태변수이름, 상태변경함수이름] = useState(초기값);`
- `useState()`가 상태변수와 상태변경함수가 담긴 배열을 반환

```jsx
// MyCom.js
import { useState } from 'react';

const MyCom = () => {
  const [number, setNumber] = useState(0);

  return (
    <div>
      <h1>{number}</h1>
      <button onClick={() => setNumber(number + 1)}>+1</button>
      <button onClick={() => setNumber(number - 1)}>-1</button>
    </div>
  );
};

export default MyCom;
```

## 차이점

- props는 부모 컴포넌트가 설정
- state는 비공개로 컴포넌트에 의해 완전히 제어

```toc

```
