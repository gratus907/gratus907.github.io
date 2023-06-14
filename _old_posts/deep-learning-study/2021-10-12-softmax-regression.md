---
layout: single
title: "[P] Softmax Regression"
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

**심층 신경망의 수학적 기초** 6강 (9월 23일) 에 기반합니다. 

이 글은 SVM과 Logistic Regression [링크](/deep-learning-study/svm-and-lr) 에 이어지는 내용입니다.

나중에 설명을 보강해서 다시 작성될 예정입니다. 

------

데이터 $X_1, \dots X_n \in \mathcal{X}$이 있고, 이에 대한 정답 라벨
$Y_1, \dots Y_n \in \mathcal{Y}$이 주어진 경우를 생각해 보자. 이번에는 그런데, $Y_i$ 가 $-1$ 과 $1$ 중에서 고르는 것이 아니라 $\Set{1, 2, \dots k}$ 중 하나이다.

## Softmax Regression
Logistic Regression의 확장된 버전으로, multi-class classification을 하고 싶다. 여전히 empirical distribution의 개념을 사용한다. $\mathcal{P}(y)$ 는 크기 $k$의 벡터로, one-hot encoding 된 것으로 보자.

Softmax 함수를 이용하여, $\argmax$ 를 in some sense smooth- 한다. Define $\mu : \R^k \to \R^k$ as
$$\mu(z)_i = \frac{e^{z_i}}{\sum_{j = 1}^{k} e^{z_j}}$$

이 함수값의 모든 index $i$에 대한 합이 1이기 때문에, $\mu(z)_i$ 를 일종의 confidence 확률로 생각할 수 있다.

이제, 모델 $\mu(f_{A, b}(x)) = \mu(Ax + b)$ 를 택하자. 이때, $x \in \R^n$ 에 대해, $A$의 각 row vector 를 $a_i^T$ 라 하면, $f_{A, b}(x)$ 는 다음 그림과 같이 $(f_{A, b}(x))_i = (a_i^Tx + b_i)$ 인 크기 $k$의 벡터가 되고, $\mu$ 를 붙이면 각 index에 softmax를 쓴 결과가 된다. 결국은 어떤 행렬곱을 해서 벡터를 얻은 다음, 그 벡터에다가 softmax를 붙인 셈.

우리는 다음과 같은 최적화 문제를 해결하고자 한다.
$$\underset{A \in \R^{k \x n}, b \in \R^k}{\minimize}\ \sum_{i = 1}^{N} \DKL{\mathcal{P}(Y_i)}{\mu(f_{a, b}(X_i))}$$
이 식을 정리하면, Logistic regression 때처럼 다음 문제와 동치임을 안다.
$$\underset{A \in \R^{k \x n}, b \in \R^k}{\minimize}\ \sum_{i = 1}^{N} H(\mathcal{P}(Y), \mu(f_{a, b}(X)))$$
이제, 다시 cross entropy 항을 전개하여 정리한다.
$$\underset{A \in \R^{k \x n}, b \in \R^k}{\minimize}\ -\sum_{i = 1}^{N} \sum_{j = 1}^{k} \mathcal{P}(Y_i)_j \log (\mu(f_{A, b}(X_i))_j)$$
여기서 $\mathcal{P}(Y_i)_j$ 는 $j = Y_i$ 일 때 1이고 나머지는 0이므로,
$$\underset{A \in \R^{k \x n}, b \in \R^k}{\minimize}\ -\sum_{i = 1}^{N} \log \mu(f_{A, b}(X_{i}))_{Y_i} =
\underset{A \in \R^{k \x n}, b \in \R^k}{\minimize}\ -\sum_{i = 1}^{N} \log \left(
\frac{e^{a_{Y_i}^T X_i + b_{Y_i}}}{\sum_{j = 1}^{k} e^{a_j^TX_i + b_j}}\right)$$
이 식을 정리하여,
$$\underset{A \in \R^{k \x n}, b \in \R^k}{\minimize}\ \sum_{i = 1}^{N} \left(-(a_{Y_i}^T X_i + b_{Y_i}) + \log\left(\sum_{j = 1}^{k} e^{a_j^TX_i + b_j}\right)\right)$$

**Interesting fact** : Softmax regression은 잘 보면 결과 식이 사실 convex하다. 또한, $n = 2$ 일 때, 이 식은 Logistic regression과 동치이다.

이를 편하게 쓰기 위해, Cross Entropy Loss 라는 함수를 정의한다.
$$\ell^{\text{CE}} (f, y) = - \log\left(\frac{e^{f_y}}{\sum_{j = 1}^{k} e^{f_j}}\right)$$
이제, 이 함수를 이용하여 쉽게 Softmax Regression을 정의할 수 있다.
$$\underset{A \in \R^{k \x n}, b \in \R^k}{\minimize}\ \frac{1}{N}\sum_{i = 1}^{N} \ell^{\text{CE}}(f_{A, b}(X_i), Y_i)$$

이는 즉, Softmax Regression을 정의하는 데 있어서...
- 단순한 Linear model을 Cross Entropy Loss로 최적화하기
- Softmax-ed Linear model의 KL Divergence로 최적화하기

결국은 둘이 같은 말이지만 (CE Loss가 결국 softmax처리한 확률분포를 고려하겠다는 의미이므로), 전자의 표현이 좀더 일반화가 쉽다. 

전자의 표현을 이용하여 SR을 자연스럽게 확장하면, linear model $f_{A, b}$ 대신 어떤 임의의 model $f_\theta(X_i)$ 와의 cross entropy loss를 minimize하는 것처럼 생각해 볼 수도 있다.
$$\underset{A \in \R^{k \x n}, b \in \R^k}{\minimize}\ \frac{1}{N}\sum_{i = 1}^{N} \ell^{\text{CE}}(f_{\theta}(X_i), Y_i)$$

이는 cross entropy loss가 기본적으로는 어떤 arg-max 스러운 (by softmax) choice를 해서 그 결과값의 empirical distribution과의 KL-Divergence를 minimize하는 개념으로 적용되기 때문.