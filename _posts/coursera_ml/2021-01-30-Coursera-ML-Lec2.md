---
layout: single
title: "Coursera ML, Lecture 2 : Linear Regression, Gradient Descent"
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

강의 기준 1주차 Linear regression - Gradient Descent.

### Linear Regression
- Regression Problem에 대한 **Linear Fitting**
- $m$개의 **Training data** 들이 $(x_i, y_i)$ 형태로 주어지고, 이 data로부터 **best-predicting line** 찾기.
- Learning Algorithm을 만들어서, hypothesis $h$ 를 만든다. 이 $h$는, $x$를 받아서 Estimated value $y$를 만드는 함수.
- Hypothesis로 Linear function $y = \theta_0 + \theta_1 x$ 를 쓰는 것이 `Linear Regression`.
- 이 Parameter를 어떻게 결정할 것인가? $h_\theta (x)$가 우리가 알고 있는 $m$개의 data들에 가깝게 하고 싶다.

### Cost funtion 
- Minimize할 **목표** 를 잡아서 parameter를 맞추려고 한다.
$$\text{minimize }_{\theta_0, \theta_1} \quad \frac{1}{2m}\sum_{i = 1}^{m} \ (h_\theta(x_i) - y_i)^2$$
- 각 Data point까지의 제곱 거리의 평균을 minimize하려는 목표.
- 이 함수를 $J(\theta_0, \theta_1)$ 로 써서, $\text{minimize }_{\theta_0, \theta_1} \ J(\theta_0, \theta_1)$ 처럼 쓰고 square error function이라고 부르자.
- Why square? 가장 일반적인 regression에서의 reasonable choice.
- 결국은 이변수함수 $J(\theta_0, \theta_1)$의 Minimum을 얻는 $\theta_0, \theta_1$을 찾는 문제.

### Gradient Descent
- 어떻게 그 **minimum** 을 찾을 것인가?
- 작은 step을 밟되, **지금 이 순간 가장 가파른 경사를 타고 내려갈 수 있는 방향으로** 조금씩 내려간다면 나름대로 빠르게 local minimum으로 갈 수 있지 않을까?
- 이런 방법으로 다변수함수의 gradient를 타고 가는 것이 **Gradient Descent**.
- 초기점이 아주 살짝 달라졌을 때, gradient를 타고 가다 보면 다른 local optimum에 도착할 수도 있다. 

다음과 같은 수식으로 쓸 수 있다. 

$$\theta_j := \theta_j - \alpha \pdv{}{\theta_j} J(\theta_0, \theta_1)$$
(실제로는, 이를 **simulatneous update** 로 구현해야 한다.)

- $\alpha$ 는 **Learning rate** 으로 생각할 수 있다. 이때, $\alpha$ 가 너무 작으면 gradient descent 자체가 느리게 수렴할 것이고, $\alpha$가 너무 크면 overshoot (minimum을 지나쳐서 수렴하지 않는 경우) 발생 가능성이 있다.

### Gradient Descent on Linear Regression
- Linear Regression 문제에 Gradient Descent를 적용해 보자. 

$$
  \begin{aligned} \pdv{}{\theta_0}  \frac{1}{2m}\sum_{i = 1}^{m} \ (\theta_0 + \theta_1 x_i - y_i)^2 &= \frac{1}{m} \sum_{i = 1}^{m} (\theta_0 + \theta_1 x_i - y_i)\\ \pdv{}{\theta_1}  \frac{1}{2m}\sum_{i = 1}^{m} \ (\theta_0 + \theta_1 x_i - y_i)^2 &= \frac{1}{m} \sum_{i = 1}^{m} (\theta_0 + \theta_1 x_i - y_i) \cdot x_i \end{aligned}
$$

이를 그냥 적용해서 simulatneous update 하면 끝.

- Linear Regression은 **convex objective function**을 가지고 있기 때문에, global optima 외의 local optima를 갖지 않는다. 따라서, Gradient descent가 local optima로 빠지지 않고 항상 잘 작동한다.
- 이 문제의 경우, 모든 training set 을 이용해서 한 스텝의 gradient descent를 밟았는데 이를 **Batch** Gradient Descent 라고 부른다. 한 스템에서 모든 test set을 통째로 확인한다는 의미.