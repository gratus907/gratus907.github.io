---
layout: single
title: Batch Normalization
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

이 글은 ICML 2015에서 발표된 [ICML 2015에서 발표된 Ioffe, Szegedy의 논문](https://arxiv.org/abs/1502.03167) 과 제가 수강했던 심층신경망 강의에 기반합니다.

ICML 2015 논문에서는 딥러닝에서 training을 가속하기 위한 방법으로, Batch normalization이라는 기법을 제시했습니다. 이 글에서는 그 기법에 대해 살펴봅니다.

## Internal Covariate Shift
언제나, 어떤 새로운 기법이 제시되기 위해서는 그 이전 방법 (또는 그 기법이 없을 때) 에 비해 무언가가 나아져야 하고, 그러기 위해서는 어떤 문제가 있는지를 알아야 합니다. 깊은 신경망 네트워크에서 가장 흔히 발생하는 문제 중 하나는 **Vanishing Gradient** 입니다. 

Vanishing Gradient란, sigmoid 같은 함수를 activation function으로 쓸 때, 입력값이 굉장히 크면 기울기가 너무 작아져서 training이 정상적으로 진행되지 않는 상황을 말합니다. 이 문제 때문에 중간에 한번이라도 값이 튀어서 $x$의 절댓값이 지나치게 커지면, 그 위치에서 아무리 gradient를 구해도 그 값이 너무 작기 때문에 빠져나오지 못하고 갇혀버리게 됩니다. 이 문제를 해결하기 위해 크게 두 가지가 제시되었습니다.
- Sigmoid같은 함수를 쓰지 말고, ReLU를 쓰자. ReLU는 $x$가 커져도 기울기가 0이 되지 않고, 대신에 음수가 되면 0이 된다는 단점이 있습니다. 이를 보완할 Leaky ReLU같은 activation function을 고려할 수 있습니다.
- 만약 입력값이 계속 -1~1, 또는 0~1 정도 범위 사이를 왔다갔다 한다는 것을 보장할 수 있다면, 사실 sigmoid를 써도 됩니다. 즉, 어떤 식으로든 입력을 stabilize할 수 있으면 좋을 것 같습니다. 
  - 글로 다룬 적은 없지만, 이 문제 때문에 딥러닝은 (Convex한 함수의 최적화와는 다르게) initialization을 잘 해야 합니다. Initialization을 어떻게 할지에 대해서도 많은 논문들이 있습니다. 
  - 오늘 다룰 방법도 이 관점에서 문제를 살펴봅니다.

Ioffe와 Szegedy는 (이하, 저자들은) 초기에 입력이 좋은 상태 (-1~1 정도 구간 사이에 존재) 하는 상황으로 시작하더라도 나중에 뉴런들을 거치다 보면 이 분포가 변화함을 관찰하였으며, 이를 **Internal Covariate Shift** 라고 불렀습니다. 즉, 초기에는 평균 0, 분산 1인 아름다운 데이터를 들고 시작하더라도 중간에 평균과 분산이 틀어지며, 이를 교정하고 싶다는 것입니다. 

## Batch Normalization
통계학과 기존의 머신러닝에서는 이미 **서로 다른 범위의 데이터를** 다룰 때, 정규화라는 기법을 이용해 왔습니다. 예를들어 어떤 동물종 A와 B의 개체수에 따른 회귀모형을 만들고자 할 때, A는 1~100 정도 분포하고 B는 1~10,000 정도 분포한다면 B의 차이에 비해 A의 차이가 너무 작아져서 A에 따른 변화가 올바르게 반영되지 못할 것입니다. 이를 막기 위해, 보통은 평균이 0이고 분산이 1이 되도록 전체 값을 맞춰준다거나 하는 정규화를 수행합니다. 이때, 데이터 $x_1, \dots x_n$에 대해 정규화는 다음과 같이 쉽게 수행할 수 있습니다.
$$y_i = \frac{x_i - \expect{x}}{\sqrt{\var[x]}}$$
이 방법은 쉬운 정규화지만, 약간 문제가 있습니다. 정규화 때문에 혹시 네트워크가 표현가능한 함수의 집합 (이를 Representation power라 합니다) 이 줄어들지 않느냐는 것입니다. 예를 들어 sigmoid가 -1, 1 구간에서 거의 linear하고 양쪽부분에서 nonlinear한데 모든 중간 레이어값을 어거지로 이렇게 중간에 밀어넣는게 올바르냐? 는 말에 선뜻 답하기가 어렵습니다.

그래서 저자들은 새로운 방법으로, 다음과 같은 normalization을 제안합니다. 
$$y_i = \gamma_i \frac{x_i - \expect{x}}{\sqrt{\var[x]}} + \beta_i$$
이때, $\gamma_i$ 와 $\beta_i$는 trainable parameter입니다.

이제 방법을 생각하고 나면, 또다른 문제가 있습니다. Stochastic optimization을 하는 우리의 특성상, batch 한번을 이용해서 gradient update를 하고나면 평균과 표준편차가 달라집니다. 전체 데이터가 1만개고 batch가 100개씩이라고 하면, 100개를 이용해서 레이어의 각 파라미터를 한번 바꾸고 나면 1만개의 입력을 넣고 돌려서 새로운 평균을 구해야 한다는 것입니다. 이럴거면 애초에 batch를 잡아서 stochastic하게 뭔가를 하는 의미가 없어져 버립니다. 

그래서 저자들은 실제 평균과 표준편차를 구해서 쓰는게 아니라, batch별로 평균과 표준편차를 구해서 그 값들만 활용하는 방법을 제시합니다. 즉... Tensor $X$를 $B \times N$ 로 볼 때,
$$\begin{align*}
    \mu[:] &= \frac{1}{B} \sum_{b = 1}^{B} X[b, :] \\
    \sigma^2[:] &= \frac{1}{B} \sum_{b = 1}^{B} (X[b, :] - \mu[:])^2 + \epsilon \\
    \text{BN}_{\beta, \gamma}(X)[b, :] &= \gamma[:] \odot \frac{X[b, :] - \mu[:]}{\sigma[:]} + \beta[:]
\end{align*}$$
이렇게 됩니다. $\epsilon$은 floating point error를 피하기 위해 집어넣은 적당히 작은 수이므로 수학적으로는 고려하지 않아도 됩니다. 

Convolution 연산에서도 거의 같습니다. 다만, Convolution의 경우 어떤 spatial locality를 유지한다는 성질을 유지하고 싶기 때문에 (이 정보가 어디서 왔는지를 어느정도는 보존하면서 가고 싶기 때문에) H, W 방향으로는 정규화하지 않고, C방향만 이용해서 수행합니다. 즉, tensor $X$를 $B \times C \times H \times W$ 로 볼 때, 
$$\begin{align*}
    \mu[:] &= \frac{1}{BHW} \sum_{b = 1}^{B} \sum_{i = 1}^{H} \sum_{j = 1}^{W} X[b, :, i, j] \\
    \sigma^2[:] &= \frac{1}{BHW} \sum_{b = 1}^{B} \sum_{i = 1}^{H} \sum_{j = 1}^{W} (X[b, :, i, j] - \mu[:])^2 + \epsilon^2 \\
    \text{BN}_{\beta, \gamma}(X)[b, :, i, j] &= \gamma[:] \odot \frac{X[b, :, i, j] - \mu[:]}{\sigma[:]} + \beta[:]
\end{align*}$$

## Experimental Result
저자들은 다음과 같은 사항들을 **실험적으로** 확인했습니다.
- Dropout과 Batch norm은 둘 다 쓸 필요는 없습니다. BN 자체가 어느정도의 regularizaiton효과가 있기 때문이라고 합니다.
- BN이 있기 때문에, learning rate를 좀더 크게 잡을 수 있습니다. 같은 원리로, momentum을 늘리거나 lr decay를 줄일 수도 있겠습니다.
- ReLU가 아닌 tanh, sigmoid 등의 함수도 activation으로 쓸 수 있습니다.
- Local Response Normalization 이라는 방법을 [AlexNet 포스팅](/deep-learning-study/AlexNet)에서 언급했지만 더이상 쓰이지 않는다고 말했었는데, 그 이유가 여기에 있습니다. BN을 사용하면 Local Response Normalization은 굳이 필요하지 않다고 합니다. 

또한, [VGGNet 포스팅](/deep-learning-study/VGGNet)에서도 "VGGNet은 깊어서 training이 어렵기 때문에 11레이어 훈련하고 거기에 2개 얹고...하는 식으로 training한다" 는 말을 언급한 적이 있는데, BN을 사용하면 이것도 굳이 그렇게 하지 않아도 그냥 바로 16레이어를 훈련할 수 있습니다.

## 후속연구 : Real effect of BN?
MIT의 연구팀 (Santurkar et al) 은 2018년 [NeurlPS에 발표된 연구](https://arxiv.org/abs/1805.11604)에서, BN의 저자들이 주장한 Internal Covariate Shift (이하 ICS)에 대한 부분을 반박했습니다. 보다 정확히는, 이 논문의 요점을 정리하자면...

1. ICS를 교정한다고 실제로 performance가 높아진다는 근거는 별로 없다. BN의 저자들이 (BN이 ICS를 교정하며) (그래서 performance가 높아진다) 라고 주장했지만, concrete evidence가 있는것은 아니다.
2. In fact, BN이 ICS를 정말 교정하는 것도 사실 아니다. 실험 결과는 BN이 ICS 교정과 별로 상관이 없는것 같다.
3. 그럼에도 불구하고 BN이 performance를 개선하는건 사실이다. 
4. 사실 BN의 진짜 효과는, loss function의 surface를 smooth하게 만드는 효과가 있다. 또한, 다른 regularization 방법들도 수학적으로 분석해보면 그런 효과가 있다. 

이정도로 요약할 수 있습니다. 즉, Loss function이 좀더 좋은 형태로 잡히기 때문에 BN을 써야 하긴 하지만, 그게 ICS 때문은 아니라는 것입니다. 이 논문은 다양한 실험결과와 함께 이론적으로도 분석하고 있는데, 이론적 기반을 먼저 갖춘상태로 정확히 필요한 것이 무엇인지를 잡아내서 실험을 설계하면 보다 원하는 결과를 쉽고 정확하게 얻을 수 있다는 점과, 우리가 잘 알려진 기법들에 대해서도 수학적/통계학적으로 명확하게 이해하고 있는 것은 아니라는 것을 보여주는 예시라고 할 수 있겠습니다.

그럼에도, 이후의 많은 딥러닝 모델들 - 특히 CNN들에 대해서, Batch Normalization은 거의 필수적인 것으로 받아들여지고 있을 만큼 성능 개선 효과가 뚜렷하기에 원 저자들의 연구가 빛이 바래는 것은 아닙니다. 2014년 이후의 Deep CNN 모델들은 BN의 효과 덕분에 훈련이 가능해졌다고 해도 과언이 아니니까요. 앞으로는 이런 방법들을 적용한, 더 깊은 network들에 대해 좀더 살펴보겠습니다. 