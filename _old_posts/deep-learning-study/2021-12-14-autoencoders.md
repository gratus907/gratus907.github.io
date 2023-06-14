---
layout: single
title: Unsupervised Learning, Autoencoders
categories: deep-learning-study
parlinks: []
comments : true
---
<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

## Unsupervised Learning
Unsupervised (또는, Self-supervised) 의 의미는, **정답이 제공되지 않는** 머신 러닝 상황을 말합니다. 이게 무슨 말인지 알아보기 위해, 이전에 알아본 supervised learning의 기본 프레임으로 돌아가보겠습니다.
- 미지의 함수 $f$에 대해 알고자 하는데, 
- 모든 지점이 아닌 어떤 지점 $x_i$ 들에서만 그 값 $f(x^i) = y^i$ 를 알고 있고, 
- 그래서 어떤 페널티 $\ell$ 을 정의해서, $\sum_i \ell(f(x^i), g(x^i))$가 작은 $g$를 $f$의 근사-함수로 생각하고 싶습니다.
- 그런데 이 $g$를 모든 함수의 공간에서 최적화하는 것은 일반적으로 가능하지 않으므로, 
- 어떤 parameter $\theta$ 에 의해 표현되는 함수공간의 부분집합 $g_\theta$만을 생각하며,
- $\minimize \sum_i \ell(f(x^i), g_\theta(x^i))$ by moving $\theta$로 생각합니다. 

여기서, 'supervision' 은 정답 $f(x^i) = y^i$ 를 말합니다. 이를 이미 알고 있는 경우 (예를 들어, Imagenet 데이터는 사람을 잔뜩 고용해서 이미지를 실제로 구분했습니다) 도 있지만, 많은 경우에 이 데이터를 모으는 과정 자체가 매우 비싸거나 불가능합니다. 이런 경우에는, 이 프레임을 과감히 포기하고, supervision 없이 데이터 자체의 내부적인 구조를 학습하도록 하고자 합니다.

즉, unsupervised learning이란: 
- 데이터 $X_1, \dots X_n$ 이 주어질 때,
- 그 내부의 어떤 **구조**화가 얼만큼 진행되었는지를 실용적으로 유의미한 어떤 loss function $\mathcal{L}(\theta)$ 의 학습가능한 형태로 만들어서 
- 이를 최적화하는 방향으로 생각합니다.

Supervised learning과는 달리, 이 프레임만 읽어서는 무엇을 하고 싶은지가 별로 명확하지 않습니다. 그래서 대표적인 예시인 Autoencoder를 직접 살펴보고자 합니다. 

## Autoencoder
Autoencoder란 간단히 압축처럼 생각하는 것이 가장 편하게 이해할 수 있는 방법입니다. 우리는 어떤 함수 $E_\theta$ 와 $D_\phi$를 만들어서, $E_\theta$ 가 모델의 어떤 특징을 **인코딩** 하고, $D_\phi$ 가 반대로 이를 **디코딩** 하도록 하고자 합니다. 즉... $\R^n$ 에서, $\R^m$ 으로 가는 함수 $E_\theta$와, (수학적으로 존재하지 않는) 그 역함수 비슷한 $D_\phi$를 만들고자 합니다. 

이때, 다음과 같은 값을 생각합니다.
$$\mathcal{L}(\theta, \phi) = \expect{\norm{X - D_\phi(E_\theta(X))}^2}$$
이 값이 작다는 것은, $D(E(X))$ 가 $X$를 거의 그대로 가져간다는 의미입니다. 다시 말해, $E(X)$는 일종의 **압축** 을 수행하고, $D$는 이 압축을 해제하는 함수가 됩니다. 

여전히, 우리는 expectation을 직접 최적화할 수 없고, 데이터만을 이용해서 뭔가를 해야 하므로, 
$$\mathcal{L}(\theta, \phi) = \frac{1}{N} \sum_{i = 1}^{N} \norm{X_i - D_\phi(E_\theta(X_i))}^2$$
이 값을 대신 최적화한 다음, $\theta, \phi$가 잘 최적화되어 실제로는 expectation이 작기를 기대합니다. 이는 사실 위에서 설명한 supervised learning의 원리에서도 적용했던 방법 (충분히 많은 데이터를 통해 최적화하면 **아마도** 작동할 것이다) 이므로, 이러한 논증은 (비교적) 합리적이라고 할 수 있겠습니다. 

이걸로 뭘 할 수 있을지는 굉장히 다양합니다.
- Encoder는 일종의 압축 알고리즘이므로, 충분히 잘 훈련한 autoencoder를 그냥 이미지 압축같은거에 써도 됩니다. 
- 데이터의 noise를 제거할 수 있습니다. Encoder-Decoder는 아마도 데이터의 inherent한 구조를 반영하고 있을 것이므로, noise는 encoding과정에 별로 유의미하게 반영되지 않을 것이며, decoding할 때 그 noise가 줄어들 것이라고 생각할 수 있습니다.
- 데이터의 anomally를 잡아낼 수 있습니다. 이미 충분히 잘 훈련한 Encoder-Decoder에 대해, $\norm{X - D_\phi(E_\theta(X))}^2$가 다른 데이터에 비해 특이하게 큰 뭔가가 있다면, 이 데이터에는 **다른 값들과 다른 어떤 요소** 가 있다고 생각할 수 있습니다. 
- Label은 없지만, 비슷한 것들끼리 묶는것은 가능합니다. K-means같은 clustering.

참고로, classical machine learning의 대표적인 알고리즘 중 하나인 PCA(Principal Component Analysis)는 $E$로 $y = Ax$를, $D$로 $y = A^T x$를 쓰는 autoencoder라고 생각할 수 있습니다. 이는 나중에 PCA정도는 따로 포스팅할 예정이므로 그때 추가하겠습니다.