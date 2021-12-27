---
layout: single
title: 02. Random Variables and Expectations
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

## 확률변수와 확률 질량/밀도 함수
먼저 정의로 시작합니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">정의 : 확률변수</b>  
    여러 결과가 가능하고 각 결과에 확률이 부여되는 실험을 랜덤한 실험 (random experiment) 라 하고, 그 가능한 결과 집합을 표본공간으로 나타낸다. 이때, 이 표본공간 위에서 정의된 실수값 함수를 <b>확률변수</b>라 한다. 
</span> 
즉, 확률변수란 **확률이 정의되는 표본공간** 을 정의역으로, **실수** 를 치역으로 하는 함수를 말합니다. 예를 들어, '주사위의 눈' 은 1부터 6까지의 각 눈이 나오는 사건들이 표본공간이 되며 각 확률이 1/6인 확률변수가 됩니다.

확률변수 $X$의 치역이 이산적인지 ($\Set{x_1, \dots x_k}$), 연속적인지에 따라 이산확률변수와 연속확률변수로 구분합니다. 

이때, 각각에 대해 확률 질량/밀도 함수를 정의합니다. 
<span style="display:block" class="math_item">
<b class="math_item_title">정의 : 확률질량함수</b>  
이산확률변수 $X$에서, 함수 $f(x_i) = \P(X = x_i)$ 를 $X$의 확률질량함수 (probability mass function) 라 한다.  
</span> 

이산확률변수의 확률 질량 함수는 다음과 같은 성질을 만족합니다. 
- $f(x) \geq 0$, $f(x) = 0$ if $x \neq x_k$ for some $k$.  
- $\sum_{x} f(x) = 1$
- $\sum_{x \in A} f(x) = \P(X \in A)$

연속확률변수의 경우, 생각하는 방법이 조금 다릅니다. 예를 들어 $[0, 1]$ 구간에서 완전히 랜덤하게 임의의 점을 하나 택했는데, 그 점이 정확히 $1/2$ 일 확률을 얼마라고 하더라도 이상합니다. 
- 이 확률이 어떤 실수 $\epsilon > 0$ 이라면, 
- $1/\epsilon$ 보다 큰 자연수 $N$을 잡아서 $x_1, \dots x_N$을 생각할 때 택한 점이 이들 중 하나일 확률이 1이 넘어갑니다. 
- 따라서, 확률의 공리에 따라 $\P(X = 1/2)$ 는 0이어야 합니다.
연속확률변수는 우리가 고등학교 때 배운 기하적 확률처럼 생각해야 합니다. 개별 값이 아닌, **구간** 을 기본 단위로 삼습니다. 밀도라는 말도 그렇게 이해하면 되는데, 부피가 없는 점을 생각하면 쇠구슬의 특정한 한 점의 질량은 0이라고 해야 하지만 전체 쇠구슬은 질량을 갖는 것과 비슷한 이치입니다. 

<span style="display:block" class="math_item">
<b class="math_item_title">정의 : 확률밀도함수</b>  
연속확률변수 $X$에서, $\displaystyle\int_{a}^{b} f(x) \dd{x} = \P(a \leq X \leq b)$ 인 함수 $f$ 를 $X$의 확률밀도함수 (probability density function) 라 한다.  
</span> 

거의 비슷한 성질을 pdf에 대해서도 논의할 수 있습니다. 
- $f(x) \geq 0$
- $\displaystyle\int_{-\infty}^{\infty} f(x) \dd{x} = 1$
- $\displaystyle\int_{A} f(x) \dd{x} = \P(X \in A)$

[확률밀도함수에 관한 3b1b 영상](https://www.youtube.com/watch?v=ZA4JkHKZM50) 으로부터도 많은 insight를 얻을 수 있습니다.

사실은, 측도를 이용하게 되면 여기서 이산형과 연속형을 구분하지 않아도 됩니다. 나중에 측도에 기반한 확률론을 공부하고 포스팅할 생각이 있긴한데 언제가 될지는 모르겠습니다. 이하, 확률질량함수와 확률밀도함수를 모두 밀도라는 용어로 통일하겠습니다. 또한 앞으로는, "적분을 합으로 바꾸는" 아이디어를 통해 이산형 확률변수에 대해 간단히 논의할 수 있으므로, 모든 statement는 연속형인 경우만 쓰겠습니다. 

## 확률변수의 기댓값과 분산 
우리가 잘 알고 있는 평균을 다음과 같이 정의합니다. 
<span style="display:block" class="math_item">
<b class="math_item_title">정의 : 평균</b>  
어떤 확률변수 $X$의 확률밀도함수가 $f$일 때, $X$의 확률분포의 평균(mean)은 다음과 같이 정의된다.  
$$\mu = \int_{-\infty}^{\infty} xf(x) \dd{x}$$
</span> 
(이산형이면 마찬가지로 합으로 바꾸면 됩니다)

보다 일반적으로, 확률변수 $X$에 대해 어떤 함수 $g(X)$를 생각할 수 있고, 이때...
<span style="display:block" class="math_item">
<b class="math_item_title">정의 : 기댓값</b>  
어떤 확률변수 $X$의 확률밀도함수가 $f$일 때, $g(X)$의 기댓값 (expectation)은 다음과 같이 정의된다. 
$$\E(g(X)) = \int_{-\infty}^{\infty} xf(x) \dd{x}$$
</span> 







------