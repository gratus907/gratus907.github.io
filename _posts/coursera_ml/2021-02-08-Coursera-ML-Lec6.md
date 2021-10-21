---
layout: single
title: "Coursera ML, Lecture 6 : Overfitting / Regularization"
categories: ml-study
tags:
  - machine-learning
  - logistic-regression
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

### Overfitting Issue
- Underfitting : 데이터가 Linear하지 않음에도 불구하고, Linear function fitting을 하는 등의 이유로 fitting되지 않는 현상
- Overfitting : 5개의 데이터를 4차함수로 fitting한다면? 데이터에 대해서는 100%의 정확도를 갖지만, 실제로 좋은 모델링은 아님.
- 이를 High-variance라고 한다. High-order 다항식을 쓸 때의 문제점. 지나치게 많은 자유도의 가설을 허용하여, 별로 좋은 결과가 아니게 됨.
- Too many features -> Cost function이 매우 작지만 실용적으로 도움이 되지 않는 경우 있음.
- 지나치게 정확한 Fitting 과정 때문에, 파악해야 할 경향성을 놓치는 현상!!

### How to deal with?
- Feature개수 줄이기. 이부분은 Manual하게 할 수도 있고, Model selection algorithm을 쓸 수도 있음.
    - 이 과정에서 진짜 필요한 정보를 놓칠 수도 있음. 실제 Feature가 정말 불필요한지 판정하기가 어렵다.
- Regularization. Feature는 그대로 들고 가되, magnitude / value of parameter를 줄이는 방법.

### Regularization
- ex) 페널티를 통해 $\theta_3, \theta_4$ 를 작은 값으로 유지하도록 강제하기. $$J_{\text{new}}(\theta) = J(\theta) + 1000\theta_3^2 + 1000\theta_4^2$$
- 결국은 Hypothesis를 더 간단하게 하는 것. Overfitting 문제가 줄어든다.
- ex) Regularization parameter를 사용하여, tradeoff를 강제하기.
  $$J(\theta) = \frac{1}{2m}\left(\sum_{i = 1}^{m} (h_{\theta}(x_i) - y_i)^2 + \lambda \sum_{i = 1}^{n} \theta_j^2\right)$$
- $\lambda$가 너무 크면 -> 지나치게 큰 Penalty term 때문에 Underfitting 발생.

### Regularized Linear Regression
$$
  \begin{aligned} \pdv{}{\theta_j}J(\theta) = \frac{1}{m} \sum_{i = 1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}_j + \frac{\lambda}{m}\theta_j \end{aligned}
$$
- 편미분식을 잘 보면, 다음과 같은 업데이트가 이루어질 것임을 안다.
$$
  \theta_j := \theta_j \left( 1- \alpha \frac{\lambda}{m}\right) - \alpha \frac{1}{m} \sum_{i = 1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}_j
$$
- $\left( 1- \alpha \frac{\lambda}{m}\right)$ 을 매번 곱하는 느낌의 Gradient Descent.

- Normal equation을 이용해서도 비슷하게 할 수 있다.
  $$\theta = \left(X^T X + \lambda L\right)^{-1} X^T y$$
  이때 $L$ 은, Identity에서 맨 왼쪽 위 항이 0인 matrix이다. `[[0, 0, 0], [0, 1, 0], [0, 0, 1]]` 정도 느낌.
- 원래의 Linear regression은 Example보다 Feature가 많으면 Non-invertible하다. 이때, Regularization을 쓰면, $\lambda > 0$일 때, $X^T X + \lambda L$가 반드시 invertible함을 보일 수 있다.

### Regularized Logistic Regression
- 다음과 같은 update를 수행한다.
$$
  \theta_0 := \theta_0 - \alpha \frac{1}{m} \sum_{i = 1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}_0
$$
$$
  \theta_j := \theta_j \left( 1- \alpha \frac{\lambda}{m}\right) - \alpha \frac{1}{m} \sum_{i = 1}^{m} (h_\theta(x^{(i)}) - y^{(i)}) \cdot x^{(i)}_j
$$
- 마찬가지로, 식은 Linear 버전과 똑같이 생겼다. 차이는 $h_\theta$뿐.
