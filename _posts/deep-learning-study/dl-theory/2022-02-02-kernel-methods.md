---
layout: single
title: Kernel Methods - Reproducing Kernel Hilbert Space
categories: deep-learning-study
parlinks: []
comments : true
---
\* 이 포스트는 대략 학부 4학년 실변수함수론 (서울대 수리과학부 기준) 수준의 해석학 지식을 전제합니다.

<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

## Why Kernel Trick?
[SVM 포스팅](/deep-learning-study/support-vector-machines/) 에서 언급한 바와 같이, 때로는 우리가 가진 데이터가 linearly seperable 하지 않아 보이지만, 어떤 적당한 함수 $\phi$ 를 도입했을 때 $\phi(x_i)$ 들로 $x_i$들을 옮기고 나면 새로운 관계가 보일 수 있습니다. 
<p align="center">
    <img src="../../images/6dc8f506a3e95c55b5e5200af4ca2a56f4d099116befd3ff4bf14b2b4b5c0e63.png" alt="drawing" width="50%"/><br>
    (그림 출처 : Benyamin Ghojogh et al,
    <i>Reproducing Kernel Hilbert Space, <br/> Mercer’s Theorem, Eigenfunctions, Nyström Method, and Use of Kernels in Machine Learning: Tutorial and Survey</i>)
</p>
그림에서와 같이, 원본의 데이터는 초평면으로 구분이 불가능하지만 이를 적절히 조절하면 - 예를 들어, $(a, b)$ 를 $(a, b, a^2+b^2)$으로 보내면 - 발생하는 새로운 기하적인 특성을 관찰할 수 있을지도 모릅니다. 이 포스팅에서는 이러한 방법을 보다 체계적으로 논증합니다. 

먼저, 몇가지 개념들을 정의합니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">정의 : 힐베르트 공간 (완비 내적공간)</b>  
    **완비성(Completeness)** 을 갖춘 **내적공간(Inner product space)** 을 힐베르트 공간이라 한다.
</span> 
<span style="display:block" class="math_item">
    <b class="math_item_title">정의 : 양의 정부호 (Positive Definite)</b>  
    행렬 $K$ 가, 임의의 벡터 $c$에 대해, $c^T K c > 0$ 을 만족하면 Positive Definite라 한다. 
</span> 
둘 모두 해석학과 선형대수학에서 다루는 standard한 개념이므로, 설명은 생략하겠습니다. 

## Idea 
SVM의 최적화 문제를 다시 가져와 보곘습니다. 
$$\minimize \ \frac{1}{2}\alpha^T Q \alpha - \alpha^T 1 \quad \subto \ \ \alpha^T y = 0, \alpha_i \in [0, C]$$
이때, $Q$는 $Q_{ij} = y_i y_j \inner{x_i}{x_j}$인 행렬입니다. 즉, 만약 우리가 $x_i$ 대신 $\phi(x_i)$를 들고 classification을 해결하고자 한다면, 실제로는 $\inner{\phi(x_i)}{\phi(x_j)}$ 를 계산할 수만 있다면 각 $\phi(x_i)$를 직접 계산할 필요는 없다는 것을 알 수 있습니다. 중요한 것은 **데이터가 이동한 위치** $\phi(x)$ 가 아니라 **내적 계산** 이라는 의미입니다.

이 논리가 핵심적인 이유는 크게 다음과 같습니다. 
- $\inner{a}{b}$ 는 넓은 의미에서 두 벡터의 유사도로 생각할 수 있습니다.
- 따라서, 적절한 유사도 메트릭 $k(a, b)$ 를 이용하여, $\inner{a}{b}$를 **확장** 하고 싶으며, 
- SVM의 나머지 논증이 성립하기 위해서는, $k(a, b) = \inner{\phi(a)}{\phi(b)}$ 인 $\phi$가 존재해야 합니다. 

이때, 이 함수 $k : X \times X \to \R$ 을 **Kernel** 이라고 부릅니다. 따라서 우리의 질문은, 
- 어떤 함수 $k$에 대해, $k(a, b) = \inner{\phi(a)}{\phi(b)}$ 인 $\phi$를 찾을 수 있는가? 

이것으로 요약할 수 있겠습니다. 

## RKHS Construction
**`[*]`** 이 부분은 **결론** 외에는 이후 파트에 사용되지 않습니다. 

집합 $X$에 대해, $X \to \R$ 함수들의 집합 $\R^X$ 를 생각합니다. 또한, 새로운 함수 $\Psi : X \to \R^X$를 생각합니다.

제가 컴퓨터에 익숙해서인지, 저는 이걸 뭔가 function object notation으로 보면 굉장히 이해에 많은 도움이 되었습니다. 
- $\R^X$ : `function<Real(X)>`
- $\Psi$ 는 `function<function<Real(X)>(X)>` 타입이 됩니다. 

이때, $\Psi(x)$ 는 $X \to \R$ 함수이며, 구체적으로 $k(\cdot, x)$ 가 되도록 합니다. 그리고 이들의 선형결합을 생각합니다. 
$$f(\cdot) = \sum_{i = 1}^{n} \alpha_i k(\cdot, x_i)$$
여기에 **내적** 을 부여하고 싶습니다. [선형대수와 군] 같은 책에 잘 나와있는, dual space에서의 내적을 참고하면, $k(\cdot, x_i)$ 와 $k(\cdot, x_j)$의 내적이 $k(x_i, x_j)$ 임을 알 수 있습니다. 따라서, $f$ 처럼 선형결합된 함수들에 대해서도... 
$$f(\cdot) = \sum_{i = 1}^{n} \alpha_i k(\cdot, x_i),\ g(\cdot) = \sum_{j = 1}^{m} \beta_j k(\cdot, x_j') \Rightarrow \inner{f}{g} = \sum_{i, j} \alpha_i \beta_j k(x_i, x_j')$$
이렇게 내적이 잘 정의가 됩니다.