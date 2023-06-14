---
layout: single
title: "[P] Shallow Neural Networks - Introduction"
categories: deep-learning-study
sidebar:
  nav: "sidepost"
comment: true
comments : true
toc : true
---
<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

**심층 신경망의 수학적 기초** 3강 (9월 9일), 4강 (9월 14일) 에 기반합니다. 

이 문서는 $\LaTeX$를 pandoc으로 변환하여 작성하였기 때문에, 레이아웃 등이 깔끔하지 않을 수 있습니다. 언젠가 pdf 버전의 노트를 공개한다면 그쪽을 참고하면 좋을 것 같습니다.  


## Shallow Neural Network : Introduction

데이터 $X_1, \dots X_n \in \mathcal{X}$이 있고, 이에 대한 정답 라벨
$Y_1, \dots Y_n \in \mathcal{Y}$이 주어진 경우를 생각해 보자. 이때, 어떤
**True Unknown Function** $f_\star : \mathcal{X} \to \mathcal{Y}$ 가
있다고 생각하면, $Y_i = f_\star(X_i)$ 를 만족한다.

우리는, $X_i, Y_i$로부터, $f_\star$과 가까운 어떤 함수 $f$를 찾아내는
작업을 수행하고 싶다. $X_i$들에 대해 $Y_i$는 사람이 수집한 데이터를 쓰기
때문에, 이를 **Supervised Learning**이라고 부른다.

뭔가를 시작하기 전에, 일단 $f_\star$과 가까운 $f$가 도대체 무슨 말인지를
명확히 해야 한다. 뭔가를 최소화하는 문제로 만들고 싶은데\... 가장 자명한
방법으로 생각하면 어떤 손실함수 $\ell$을 도입해서, 이렇게 쓰고 싶다.
$$\underset{f \in \mathcal{F}}{\minimize}\ \sup_{x \in \mathcal{X}} \ell(f(x), f_\star(x))$$
이 문제는, (1) 모든 가능한 함수들의 공간 위에서 뭔가를 최적화한다는 것은
알고리즘적으로 말이 안 되고, (2) 이 최적화 문제의 해는 $f_\star$이니까,
사실 최적화 문제도 딱히 아니다. 모든 $x$에 대해 $f_\star$를 알고 있으면
최적화를 생각할 이유가 없다.

대신에, 함수들의 공간을 제약하자. 어떤 파라미터 $\theta$를 이용하여,
우리는 다음과 같은 최적화 문제로 바꾸고 싶다.
$$\underset{\theta \in \Theta}{\minimize}\ \sup_{x \in \mathcal{X}} \ell(f_\theta(x), f_\star(x))$$

여전히, 일단 우리는 모든 $x$에 대해 $f_\star$를 알고 있지 않다. 우리가
알고 있는 $x_1, x_2, \dots$ 에 대한 답 $y_1, y_2 \dots$ 들을 맞춰낼 수
있는 함수를 일단 만드는 정도가 최선이 아닐까? 그리고, 최악의 경우를
최소화하는 대신, 평균을 최적화하는게 뭔가 '일반적으로' 좋은 솔루션을
제공할 것 같다. supremum을 최소화한다는 것은 너무 지나친 목표이다.
$$\underset{\theta \in \Theta}{\minimize}\ \frac{1}{N}\sum_{i = 1}^{N} \ell(f_\theta(x_i), f_\star(x_i))$$
우리는 $f_\star(x_i) = y_i$ 임을 알고 있으므로, 이제 뭔가가 가능하다.

이제, $\theta$를 이용하여 표현되는 $f_\theta$를 **model** 또는 **neural
network**라고 부를 것이다. 또한, 이 최적화 문제를 푸는 작업을
**training** 이라고 부를 것이다. 즉, 파라미터를 이용해서 표현한 모델
$f_\theta$를 SGD와 같은 알고리즘을 이용하여 training한다는 표현이 된다.
현재 거의 모든 방법들이 SGD에 기반하고 있다.

**Example : Least square regression**

$\mathcal{X} = \R^p, \mathcal{Y} = \R, \Theta = \R^p$이고, 모델
$f_\theta(x) = x^T \theta$, $L(y_1, y_2) = \frac{1}{2}(y_1 - y_2)^2$ 인
문제를 Least square라고 부른다. 즉, 주어진 데이터들을 비슷하게 맞춰내는
Linear한 함수를 찍는 것.

## KL-Divergence

As a mathematical tool, 어떤 $p, q \in \R^n$이 probability mass vector일
때, 즉 $p_i, q_i \geq 0$ 이고 $\sum p_i = \sum q_i = 1$일 때, 우리는 두
distribution의 차이를 생각하고 싶다.

Kullback-Leibler Divergence (KL-Divergence)를 다음과 같이 정의한다.
$$\DKL{p}{q} = \sum_{i = 1}^{n} p_i \log\frac{p_i}{q_i} = -\sum_{i = 1}^{n} p_i \log q_i + \sum_{i = 1}^{n} p_i \log p_i$$

- 이는 다시, 정보이론의 용어로는 Cross entropy $H(p, q)$ 와 Entropy
$H(p)$의 합으로 쓰여진다.

- 편의를 위해 (자연스럽게), $0 \log (0 / 0) = 0$ 으로, $0 \log 0 = 0$
으로, $x > 0$이면 $x \log (x / 0) = \infty$ 으로 둔다.

몇가지 성질들을 살펴보면\...

- $\DKL{p}{q}$ 는 일반적으로 $\DKL{q}{p}$ 와 같지 않다. (그래서
    metric은 아님)
- $\DKL{p}{q} \geq 0$ 이고, $p \neq q$ 이면 $\DKL{p}{q} > 0$ (과제)

- $\DKL{p}{q} = \infty$ 인 경우도 가능.

KL-Divergence를 확률론의 notation으로 쓰면, random variable $I$가
$p_i$의 확률분포를 가질 때,
$$\DKL{p}{q} = \expectwith{I}{\log\left(\frac{p_i}{q_i}\right)}$$ 이렇게
expectation으로 쓸 수도 있다.

Symmetrized version $(\DKL{p}{q} + \DKL{q}{p}) / 2$ 같은 것을 생각하면?\
$\Rightarrow$ Jensen-Shannon Divergence라고 부르는데, 그래도 여전히
infinity라는 문제가 남아서 메트릭이 되지는 않는다.