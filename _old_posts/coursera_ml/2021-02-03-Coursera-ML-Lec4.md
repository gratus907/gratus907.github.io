---
layout: single
title: "Coursera ML, Lecture 4 : Analytic Computation"
categories: ml-study
tags:
  - machine-learning
  - linear-regression
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

### Normal Equation
- Iteration을 통해 극소점에 수렴하는 것이 아니라, **Analytically** 최적해 $\theta$를 구하는 방법.
- ex) $J(\theta) = a\theta^2 + b\theta + c$ ($a > 0$) 를 최소화하는 $\theta$ 는 $-\frac{b}{2a}$ 임을 쉽게 알 수 있다.
- How to do for vector parameter $J$?
- => Vector Calculus. $\pdv{}{\theta_i} J(\theta)$ 가 모두 0이 되는 $\theta$ 를 찾으면 된다.
- Parameter들을 행렬 $X$로 만들고, 이에 대응하는 값들을 $y$로 만들자.
- $\theta = (X^T X)^{-1} X^T y$ 가 우리의 **Linear Regression**에 대응함이 알려져 있다.
- Feature scaling 같은 테크닉 불필요.
- Gradient Descent에 대비하여..
  - **장점** : $\alpha$를 생각하지 않아도 되고, 반복적으로 적절한 $\alpha$를 찾을 필요가 없다.
  - **단점** : 행렬곱셈 및 inverse는 굉장히 느림. 특히 $n$이 크면 행렬곱셈을 쓰기 어렵다.

#### Noninvertible Case 
- $(X^T X)$가 invertible하지 않으면??
- Pseudoinverse (octave pinv 함수)
- 크게 두 가지 경우
  - 두 feature가 사실 linear 관계에 있는 경우. 
    - ex) size in feet^2 와 size in m^2 
    - Design matrix $X$가 dependent column 가진다.
    - Redundant features -> Throw away.
  - Too many features.
    - Data는 적은데 feature는 많은 경우.
    - Feature 몇개 버리기 / 또는 Regularization.