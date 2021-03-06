# [An introduction](https://javascript.info/getting-started)

## 1.1) [An Introduction to JavaScript](https://javascript.info/intro)

### 자바스크립트란?

자바스크립트는 "웹페이지에 생동감을 불어넣기 위해" 만들어진 프로그래밍 언어이다.
자바스크립트로 작성한 프로그램을 스크립트(script) 라고 부르고, 스크립트는 웹페이지의 HTML 안에 작성할 수 있으며 웹페이지를 불러올 때 스크립트가 자동으로 실행된다.

### 자바스크립트의 실행 환경

- 브라우저
- 서버 (Node.js)
- 이 외에 **자바스크립트 엔진**이 들어 있는 모든 디바이스

브라우저엔 자바스크립트 가상 머신이라고 불리는 엔진이 내장되어 있다. 대표적으로 Chrome의 경우 V8 엔진이 내장되어 있다.

### 자바스크립트 엔진의 동작 원리

간단한 기본 원리는 다음과 같다.

1) 엔진이 스크립트를 읽는다 (파싱)
2) 읽어들인 스크립트를 기계어로 전환한다 (컴파일)
3) 기계어로 전환된 코드가 실행된다

### 자바스크립트가 브라우저에서 할 수 있는 일과 할 수 없는 일

자바스크립트의 능력은 실행 환경에 큰 영향을 받는다. 서버 환경 (Node.js)에서는 임의의 파일을 읽거나 쓰고, 네트워크 요청을 수행하는 함수를 지원하지만 브라우저에서는 보안을 위해 자바스크립트의 기능에 제약을 걸어두었기에 몇 가지 제약사항이 있을 수 있다.

#### JS가 **브라우저**에서 할 수 있는 일 ✅

웹 페이지 조작, 클라이언트-서버 상호작용에 관한 모든 일

- 페이지에 새로운 HTML 추가, 기존 HTML 혹은 CSS 수정
- 마우스 클릭, 키보드 키 눌림 등의 사용자 행동에 반응
- 네트워크를 통해 원격 서버에 요청 보내거나, 파일 다운로드하거나, 업로드하기 (AJAX, COMET 등의 기술 사용)
- 쿠키 가져오거나 설정하기
- 사용자에게 질문 건네거나 메세지 보여주기
- 클라이언트 측에 데이터 저장하기 (local storage)

#### JS가 **브라우저**에서 할 수 없는 일 🚫

브라우저는 보안을 위해 (악성 웹페이지가 개인 정보에 접근하거나 사용자의 데이터를 손상하는 것을 막기 위해) JS의 기능에 다음과 같은 제약사항들을 걸어놓았다.

- 디스크에 저장된 임의의 파일을 읽거나 쓰고, 복사하거나 실행할 때 제약을 받을 수 있다. 운영체제가 지원하는 기능을 브라우저가 직접 쓰지 못하게 막혀있기 때문이다. 

  다만, 모던 브라우저를 사용하면 파일을 다룰 순 있는데, 이 마저도 사용자가 브라우저 창에 파일을 끌어다두거나, `input` 태그를 통해 파일을 선택할 때와 같이 특정 상황에서만 파일 접근을 허용한다.

  카메라/마이크와 같은 디바이스와 상호 작용하기 위해서는 사용자의 명시적인 허가가 있어야 한다.

- 브라우저 내 탭/창은 서로의 정보를 알 수 없다. 자바스크립트를 사용해 한 창에서 다른 창을 열 때는 예외가 적용되나, 이 경우에도 도메인, 프로토콜, 포트가 다르다면 페이지에 접근할 수 없다.

  이런 제약사항을 `동일 출처 정책 (Same Origin Policy)` 이라고 하며, 이 정책을 피하기 위해서는 두 페이지가 모두 데이터 교환에 동의하고 동의와 관련된 특수한 JS 코드를 포함해야 한다.

  이는 사용자의 보안을 위함이며, A 페이지가 B 페이지에서 받아온 정보에 접근해 중요한 개인정보를 훔치는 것을 막기 위해서이다.

- 자바스크립트를 이용하면 페이지를 생성한 서버와 정보를 쉽게 주고받을 수 있지만, 타 사이트나 도메인에서 데이터를 받아오는 것은 불가능하다. 가능하더라도 원격 서버에서 HTTP 헤더 등을 이용해 명확히 승인을 해줘야 한다.

  다만 모던 브라우저에선 추가 권한 허가를 요청하는 플러그인이나 extension 설치가 허용된다.

### 자바스크립트만의 강점

- HTML/CSS 와의 완전한 통합 가능
- 간단한 일은 간단하게 처리
- 모든 주요 브라우저에서 지원하는 기본 언어

### 자바스크립트 너머의 언어들

브라우저에서 실행 되기 전 JS로 트랜스파일 할 수 있는 새로운 언어들이 많이 등장했다.

TypeScript나 Flow 처럼 자료형을 명시적으로 강제하는 언어나, Dart 처럼 브라우저가 아닌 환경 (모바일 앱) 에서 동작하는 고유의 엔진을 가진 독자적 언어들이 있다.

이 언어들을 배우려고 해도 결국 자바스크립트를 알아야 한다.

### 요약

자바스크립트는 브라우저에서만 쓸 목적으로 고안되었으나, 최근엔 다양한 환경에서 쓰이고 있다. 



## 1.2) [Manuals and specifications](https://javascript.info/manuals-specifications)

### 명세서

[ECMA-262 명세서(specification)](https://www.ecma-international.org/publications/standards/Ecma-262.htm) : 자바스크립트라는 언어를 정의하는 공식 문서로, 매년 새로운 버전이 나온다
https://tc39.es/ecma262/ : 자바스크립트의 공식 버전이 나오기 이전의 최신 초안
https://github.com/tc39/proposals : 등록되기 직전의 (stage3) 기능, 제안 목록을 확인 가능

### 매뉴얼

[MDN JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference) : Mozilla 재단이 운영하는 Reference 사이트로 특정 함수나 메서드에 대한 깊이 있는 정보를 얻을 수 있다

### 호환성 표

특정 브라우저나 엔진이 내가 사용하려는 기능을 지원하는지 확인할 수 있는 좋은 사이트들

[http://caniuse.com](http://caniuse.com/) : 특정 브라우저가 해당 기능을 지원하는지 여부를 확인 가능하다.
https://kangax.github.io/compat-table : 특정 엔진이 해당 기능을 지원하는지 여부를 확인 가능하다.



## 1.3) [Code editors](https://javascript.info/code-editors)

통합 개발 환경(Integrated Development Environment, IDE) 과 경량 에디터가 있다.
IDE는 프로젝트 레벨에서 작동하고, 경량 에디터는 주로 파일 하나만 수정할 때 사용한다.

요즘엔 둘 사이의 염격한 구분이 사라져가는 추세이다.



## 1.4) [Developer console](https://javascript.info/devtools)

브라우저는 개발자 도구를 내장하고 있고, 이 도구를 이용하면 에러를 확인하거나 스크립트에 대한 유용한 정보를 얻을 수 있다.

- 에러 확인 및 디버깅
- command line에서 명령어 실행
- 변수 분석

