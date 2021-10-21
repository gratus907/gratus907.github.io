---
layout: single
title: "Hello, Jekyll!"
date: 2021-01-06 19:03:01 +0900
categories: jekyll
tags:
  - jekyll
sidebar:
  nav: "sidepost"
comment: true
comments: true
---
## Jekyll Blog
Jekyll은 Markdown을 이용해서 (주로 이런 주제의) 블로그를 쉽게 작성할 수 있도록 해주는 놀라운 툴입니다. Theme을 원하는 대로 적용해서 커스터마이즈 할 수 있고, 저는 아직 잘 모르겠지만 .scss 파일을 잘 만지면 생각보다 많이 손댈 수 있어 보입니다.

## Why Jekyll?
저는 기존에 네이버 블로그와 지금 쓰고 있는 티스토리 [링크](https://gratus-blog.tistory.com/) 에서 글을 작성해 보았습니다. 네이버 블로그를 버린 이유는 크게 두 가지입니다.
1. Mathjax 미지원 및 네이버 수식 편집기의 한계. 저는 LaTeX가 아닌 수식 폰트가 용납이 안 되기 때문에(...)
2. Code highlight의 미흡함. 대표적으로, python의 // 연산자를 C-스타일의 주석이라고 생각하는 그런 끔찍한 경향이 있습니다.

이 두 가지 모두 티스토리는 잘 해결해 줍니다. 특히 원하는 대로 Code highlight을 js를 이용해 마치 설치형 블로그처럼 쓸 수 있었던 점은 (비록 과정이 힘들었지만) 인상적이었습니다.

그럼에도 불구하고 Jekyll 블로그를 따로 여는 이유는...
1. .github.io 가 .tistory.com 보다 개인적으로 좀더 마음에 들었습니다. 물론 저는 어차피 gratus907.com 도메인을 샀고 적어도 5년 이상은 보유할 예정이기 때문에 이부분은 별로 큰 문제는 아닙니다.  
수학과 컴퓨터에 대한 Techy한 글이 주류이기 때문에, github.io가 조금더 정체성에 맞는다는 생각이 들었습니다.
2. 어차피 tistory 글을 markdown으로 거의 비슷하게 export할 수 있어서, 블로그 두개에 똑같은 글을 올리는 데 별로 추가적인 노력이 들지 않습니다.
3. 가장 큰 문제인데, 티스토리는 마음대로 url을 바꾸기 어렵습니다. 예를 들어, CEOI 2015 풀이를 .../ps/ceoi/2015 로 올리고 싶다고 해도, 티스토리는 이런 부분에서 (제가 알기로는) 지원이 미비합니다.
4. [justicehui님의 블로그에 있는 navigator](https://justicehui.github.io/xoi/) 를 보면, 포스팅을 원하는 대로 정리하기가 조금 더 편한 것을 볼 수 있습니다. 티스토리는 포스트와 홈 이외의 뭔가를 제공하지 않기 때문에 이런 관리가 어렵습니다.

그런 이유로, 당분간 글은 같은 글을 양쪽에 올릴 예정이고, 이쪽이 조금더 정돈된 형태로 올라갈 것 같습니다. :)

## Testing
English font 한국어 폰트 다람쥐 헌 쳇바퀴에 타고파

줄  
바  
꿈  

Inline math $^\forall x \in \R$, $\int_{0}^{1} f(x) \text{ d}x$

Display math $$\int_{0}^{1} f(x) \text{ d}x$$

Code highlight  
```cpp
#include <bits/stdc++.h>
using namespace std;

int main()
{
    cout << "Hello world\n";
    return 0;
}
```

