---
layout: single
title: "Coursera ML, Lecture 3 : Multivarite Linear Regression"
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

### Multivariate Linear Regression
- 다수의 Feature $(x_1, x_2, x_3, \dots)$ 로부터, output variable $y$ 를 predict하고 싶다.
- Notation 정리: Data $i$번째의 $j$번째 feature를 $x^{(i)}_j$ 로 쓰기로 하자. 이제, $x^{(i)}$ 는 하나의 training data인데, 이는 n-vector 형태의 데이터가 된다.
- Linear Regression의 원리는 똑같다. 다변수 선형함수를 Hypothesis로 삼고...
  $$h_\theta(x) = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \dots $$
- 0번째 feature $x_0 = 1$ 을 항상 고정하면, $x$와 $\theta$를 $n+1$개짜리 vector로 생각할 수 있고, 벡터의 내적으로 위 Hypothesis를 쉽게 작성할 수 있다.
  $$h_\theta = \mathbf{\theta}^T \mathbf{x}$$
  (원래 벡터는 \mathbf 로 쓰고 싶지만, 아마 귀찮으니 대충 쓸 듯... 맥락상 유추할 수 있다)

### Multivariate Gradient Descent
- 푸는 방법도 Single variable 경우와 별로 다르지 않다. Gradient descent를 생각하자.
- Parameter가 $n+1$ vector, Hypothesis는 위 내적 함수이므로, cost function만 잘 정의하면 끝.
- Cost도 비슷하게..
  $$J(\theta) = \frac{1}{2m} \sum_{i = 1}^{m} (\theta^T x^{(i)} - y^{(i)})^2$$
- $n+1$개의 parameter에 대한, 편미분을 이용한 Simultaneous update를 한다.

### Feature Scaling
- Feature들이 비슷한 Scale에 있으면, gradient descent가 더 빠르게 수렴하게 할 수 있다.
- 예를 들어, 주택 가격을 예측하는 데 있어서...
  - size가 $[0, 2000]$ 범위에 있고
  - number of bedrooms 가 $[1, 5]$ 범위에 있다면?
- Cost function의 contour가 매우 길고 얇은 타원형으로 나타나게 되고,
- 이 타원의 장축을 따라 내려가기에는 너무 오랜 시간이 걸릴 수도 있다!
- 반대로, 너무 짧은 단축을 따라가다 보면 수렴하지 못할 수도 있다.
- 각 Feature를, 그 feature가 가질 수 있는 최댓값으로 나누어 $[0, 1]$ 스케일 위에 올리면 이 문제를 피할 수 있다.
- 더 일반적으로는 $[-1, 1]$에 올린다. 최솟값이 $-1$, 최댓값이 $1$이 되게.
- 꼭 그 범위인 것은 아니고... 대충 비슷한 범위 내로 feature들이 들어오게 하는 것.
- **Mean Normalization** : $x_i$ 를 $x_i - \mu_i$ 로 대체하여, approximately zero mean을 유지하게 하기.

### Learning Rate
  $$\theta_j := \theta_j - \alpha \pdv{}{\theta_j} J(\theta_0, \theta_1)$$
- How to choose $\alpha$ ?
- Practical tips.
  - Gradient descent iteration 횟수 ($t$) 에 대한 $J(\theta)$ 의 값을 계속 plotting 한다.
  - 이 값이 감소함수이게 하고 싶다. 우리 목적은 $J$를 minimize하는 것이니까.
  - Convergence test를 잘 만들어도 되고... ex) 몇번 더돌렸는데 $k$만큼 값이 떨어지지 않으면~ ...
- Not working?
  - $J$ 증가 : 아마도 $\alpha$가 너무 크기 때문.
  - Overshooting : 아마도 $\alpha$가 너무 크기 때문.
  - Too slow : 아마도 $\alpha$가 너무 작기 때문.
- Mathematically Proven Result : $\alpha$가 충분히 작으면, $J$는 gradient descent의 매 iteration마다 반드시 감소한다. ($J$가 convex function일 때...)

### More on features / Regression
- 정말 우리가 가진 data $x_1, x_2, \dots$에 $y$ 값이 선형적인 관계를 갖는가?
- $x_1x_2$ (곱)에 대한 선형함수는 아닌가? (New feature defining)
- $x_1$에 대한 이차함수, 삼차함수 ... 는 아닌가? (Polynomial Regression)
  - Hypothesis $h$를 다항식으로 잡으면 쉽게 가능.
    $$h_\theta(x) = \theta_0 + \theta_1 x^2 + \theta_2 x^2 + \dots $$
  - Linear regression과 마찬가지로, $J$를 잘 계산, 편미분해서 돌린다.
- 이차 이상의 경우 Feature scaling이 더 중요해진다.
  - $[1, 100]$이 이차가 되면 $[1, 10000]$이 되기 때문...
- 꼭 다항식일 필요도 없다. $h_\theta(x) = \theta_0 + \theta_1 x + \theta_2 \sqrt{x}$ 같은 것도 가능.
- 데이터에 대한 Insight가 이런 상황에서 hypothesis를 결정하는 데 도움이 된다.
