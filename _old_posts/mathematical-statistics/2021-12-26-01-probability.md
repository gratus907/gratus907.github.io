---
layout: single
title: 01. Probability
categories: mathematical-statistics
parlinks: []
comments : true
---
<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

## 확률의 정의 
우리는 일상적으로 **확률** 이라는 용어를 사용합니다. 확률론의 많은 정의와 정리들은 측도론 (Measure Theory) 을 도입하면 매우 쉽게 (몇몇은 거의 자명하게) 얻어지지만, 우선은 측도를 도입하지 않고 전개하겠습니다. 다만 일부 measure에 의해 일반화가 쉬운 정리들은 증명을 생략하겠습니다.

<span style="display:block" class="math_item">
    <b class="math_item_title">정의 : 표본공간, 사건, 확률</b>  
    모든 가능한 관측 결과들의 집합을 <b>표본 공간</b> 이라 하고, 그 부분집합을 <b>사건</b> 이라 하며,  
    각 사건에 실수값을 대응하는 함수 $\P$ 가 다음의 조건을 만족하면 이를 <b>확률</b>이라 한다.  
    1. $0 \leq \P(A)$  
    2. $\P(\Omega) = 1$  
    3. 서로 disjoint한 $A_1, \dots$ 에 대해, $\P(\cup_{i = 1}^{\infty} A_i) = \sum_{i = 1}^{\infty} \P(A_i)$ 
</span> 
즉, 확률은 표본공간의 부분집합[^1]마다 어떤 실수를 할당하는 일종의 함수로 생각합니다.

몇가지 성질들이 있는데, 고등학교 확률과 통계 시간에 배우는 내용이므로 증명은 모두 스킵하겠습니다. 
- $\P(A \cup B) = \P(A) + \P(B) - \P(A \cap B)$
- $A \subset B \Rightarrow \P(A) \leq \P(B)$ 
- $\P(\emptyset) = 0$
- $\P(A^c) = 1 - P(A)$

비교적 중요한 정리로, 확률측도의 연속성이 있습니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">정리 : 확률측도의 연속성</b>  
    $A_1 \subset A_2 \subset \dots$ 에 대하여, 다음이 성립한다. 
    $$\P(\cup_{i = 1}^{\infty} A_i) = \lim_{n \to \infty} \P(A_n)$$
    $A_1 \supset A_2 \supset \dots$ 에 대하여, 다음이 성립한다. 
    $$\P(\cap_{i = 1}^{\infty} A_i) = \lim_{n \to \infty} \P(A_n)$$
</span> 
사실은 일반적인 측도에 대해 성립하는 성질이므로, 증명은 생략합니다. 이를 해석하면, **단조증가/감소**하는 사건들에 대해서는 극한과 확률계산의 순서를 바꿀 수 있다는 것입니다. 

## 조건부확률과 사건의 독립성
많은 경우에 우리는 어떤 사건 $A$가 이미 벌어진 상황에서, $B$가 벌어질 확률이 궁금합니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">정의 : 조건부확률</b>  
    어떤 사건 $A$가 이미 주어진 경우에 $B$가 벌어질 확률을 $B$의 조건부 확률이라 하고, 다음과 같이 계산한다. 
    $$\P(B \di A) = \frac{\P(A \cap B)}{\P(A)}$$
</span> 
예를 들어, 주사위를 하나 던졌을 때 눈이 짝수라는 것이 이미 일어났다면, 소수(2, 3, 5)인 경우는 2인 경우밖에 없습니다. 계산해보면
$$\P(\text{소수} \di \text{짝수}) = \frac{1/6}{1/2} = \frac{1}{3}$$
이렇게 계산될 수 있습니다. 

이 예시에서 알 수 있는 것은, 우리가 **아무것도 모를 때보다** 결과가 **짝수임을 알 때**, **소수일 확률이 낮아졌다** 는 것입니다. 이는 즉, $\P(B \di A) \neq \P(B)$ 인데, 이런 경우 두 사건이 **종속 (dependent)** 이라 하고, $\P(B \di A) = \P(B)$ 인 경우 두 사건을 **독립 (independent)** 이라 합니다.  
두 사건이 독립일 필요충분조건은 $\P(A)\P(B) = \P(A \cap B)$ 를 만족하는 것으로, 이는 쉽게 알 수 있습니다.

조건부확률 계산에서 매우 중요한 베이즈 정리를 살펴보고 이번 포스팅을 마칩니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">정리 : 베이즈 정리</b>  
    사건 $A_1, \dots A_k$가 표본공간 $S$를 공통부분이 없게 분할하고, $\P(A_i) > 0$, $P(B) > 0$ 일 때, 다음이 성립한다. 
    $$\P(A_j \di B) = \frac{\P(B \di A_j)\P(A_j)}{\sum_{i = 1}^{k} \P(B \di A_i)\P(A_i)} $$
</span> 
이 정리가 중요한 이유를 간단히 설명하자면, 우리가 어떤 모형 $A_1, \dots A_k$를 가지고 있고 실험을 통해 결과 $B$를 얻었을 때, 결과 $B$가 이미 일어난 실험이므로 조건부확률 $\P(A_j \di B)$는 **실험 결과를 주어진 것으로 볼 때 각 모형의 확률**, 즉 사후확률 (posterior) 로 볼 수 있기 때문입니다. 베이즈 정리는, 사전확률 $\P(A_i)$ 와 결과 $B$가 일어날 확률 $\P(B \di A_i)$들로부터 사후확률을 계산할 수 있는 정리입니다. 이 정리는 나중에 매우 중요하게 다루어집니다. 

------
[^1]: 측도론을 도입하면 사실 모든 부분집합에 확률을 부여하는 것은 불가능함을 배웁니다. 정확히는 **가측인** 부분집합에만 부여해야 하지만, 우리는 이를 고려하지 않겠습니다.