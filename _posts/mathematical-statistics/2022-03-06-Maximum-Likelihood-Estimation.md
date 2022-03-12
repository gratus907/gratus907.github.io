---
layout: single
title: Maximum Likelihood Estimation
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

## Parametric Inference
다음과 같은 문제를 생각합니다. 

<span style="display:block" class="math_item">
    <b class="math_item_title">Problem : Parametric Inference</b>  
    데이터 $x_1, x_2, \dots x_n$ 이 있고, 이들이 어떤 분포 $f(x ; \theta)$ 로부터 추출되었음을 알고 있다. 이때, $x_1, \dots x_n$ 으로부터 $\theta$를 추측하고 싶다. 
</span> 

예를 들어, 다음과 같은 데이터를 어떤 **정규 분포** $\mathcal{N}(\mu, \sigma^2)$ 로부터 추출했다고 가정하겠습니다. 
```
[ 6.52615303, 12.4042103 , 12.71258848, 14.6846982 , 12.88396983,
  7.65825908, 10.2504715 ,  9.01303742, 16.79015299, 10.74596275,
  12.08337416,  5.09596278,  6.13636642, 14.98837882, 17.40270976,
  11.49500769,  9.77796779, 11.61802914, 15.90435845,  8.1379665 ]
```
이때, 우리는 입력이 정규분포를 따름은 알고 있으나, $\mu$ 와 $\sigma$는 모릅니다. 데이터로부터 거꾸로 unknown parameter $\mu, \sigma$의 값을 어떻게 추론하면 좋을까요? 참고로, 정답은 평균 12, 표준편차 3 (분산 9)입니다. 글 마무리에서 이 정보를 활용하지 않고 이를 추론할 것입니다. 

## Likelihood
Likelihood (번역어는 '우도' 입니다. 왜인지는 모르겠습니다) $L(\theta \di x)$ 란, 다음과 같이 정의합니다. 
$$L(\theta \di x) = \P(X = x; \theta)$$
즉, unknown parameter $\theta$가 정확히 $\hat{\theta}$ 일 때, $X = x$ 일 확률을 $L(x, \hat{\theta})$로 정의한다는 의미가 됩니다. 

데이터 $N$개가 주어질 때, 이들은 확률이기 때문에, 확률의 곱을 생각함이 자연스럽습니다. 
$$\mathcal{L}(\theta) = \prod_{i = 1}^{N} L(\theta \di x_i)$$
즉, $\mathcal{L}(\theta)$를 위 예시에 적용하면, $\mathcal{L}(\mu=2, \sigma=1)$ 이라는 값은 "평균이 2, 표준편차가 1인 정규분포에서 샘플 20개를 추출했을 때 우리가 정확히 위와 같은 샘플을 얻을 확률" 이라고 해석할 수 있습니다.

직관적으로, 이 확률을 maximize하는 것이 가장 자연스러운 방향임을 알 수 있습니다. "Parameter가 $\theta$일 때 데이터가 이렇게 생겼을 가능성" 이 높은 $\theta$를 찾는 것이 곧 "데이터가 이렇게 나왔을 때 parameter가 $\theta$일 가능성" 을 높여준다는 것입니다. 이는 우리가 "$\theta$에 대해 사전에 알고 있는 정보가 없다면" 가장 합리적인 것처럼 보입니다 (물론 사전에 $\theta$에 대한 prior 정보가 있다면 이 가정이 합당하지 않을 수 있습니다)

참고로, 후자는 확률분포가 맞지만 ($\theta$의 분포), 전자는 사실 확률분포는 아니라는 점입니다. (이 값을 확률로 오해해서 발생하는 오류를 Prosecutor's fallacy 라고 부릅니다.)

## Maximum Likelihood Estimation : 예시 
이제, 위 likelihood function
$$\mathcal{L}(\theta) = \prod_{i = 1}^{N} L(\theta \di x_i)$$
이를 maximize하는 $\theta$를 찾는 것을 **Maximum Likelihood Estimation** 이라고 부릅니다. 

곱을 최소화하는 것은 계산적으로 상당히 어렵습니다.[^why] 따라서, 실제 computation에서는 log-likelihood를 생각합니다. 
$$\log \mathcal{L}(\theta) = \sum_{i = 1}^{N} \log L(\theta \di x_i)$$

다시 정규분포의 케이스로 돌아가 보겠습니다. 먼저, Likelihood 계산은 다음과 같이 가능합니다. 
$$L((\mu, \sigma^2) \di x_i) = \frac{1}{\sigma \sqrt{2\pi}}\exp\left(-\frac{(x_i-\mu)^2}{2\sigma^2}\right) $$
따라서, 우리는 다음을 최대화하고자 합니다. 
$$\underset{\mu \in \R, \sigma \in \R}{\maximize} \log \mathcal{L}(\mu, \sigma^2) = \sum_{i = 1}^{N} \left(- \log \sigma - \log \sqrt{2\pi} -\frac{(x_i-\mu)^2}{2\sigma^2}\right)$$
그런데, $\log \sqrt{2\pi}$ 는 어차피 $\mu$, $\sigma$랑 아무 관련이 없고, 부호를 바꾸면 최대화가 최소화가 되므로, 이 문제는 다음과 같이 다시 쓸 수 있습니다. 
$$\underset{\mu \in \R, \sigma \in \R}{\minimize} - \log \mathcal{L}(\mu, \sigma^2) = N \log \sigma + \frac{1}{2\sigma^2} \sum_{i = 1}^{N} (x_i - \mu)^2$$

이를 최소화하는 것은 그냥 다변수함수 최적화 문제이고, 편미분을 통해 극값을 찾을 수 있습니다. 편하게 함수를 $\ell$ 이라고 쓰면, 
$$\pdv{\ell}{\mu} = \sum_{i = 1}^{N} 2(x_i - \mu) = 0$$
따라서, $\mu = \frac{1}{N} \sum_{i = 1}^{N} x_i$ 일 때 $\pdv{\ell}{\mu} = 0$ 입니다. 즉 "원래 분포의 평균값에 대한 **합리적 추정** 치로 **표본평균** 을 사용할 수 있음"을 의미합니다. [^2]

같은 방법으로, $\sigma$에 대해서도 반복합니다. 
$$\pdv{\ell}{\sigma} = \frac{N}{\sigma} - \frac{1}{\sigma^3} \sum_{i = 1}^{N} (x_i - \mu)^2 = 0$$
$$\sigma^2 = \frac{1}{N}\sum_{i = 1}^{N} (x_i - \mu)^2$$
"원래 분포의 분산에 대한 **합리적 추정 (MLE)** 치로 **표본분산** 을 사용할 수 있음"을 의미합니다. 

위 데이터에 이를 적용하면, 표본평균 11.3과 표본분산 12.01을 얻습니다. 데이터가 적어 정확하지는 않지만, 평균에 대해 표본평균을, 분산에 대해 표본분산을 쓰는 것은 합리적인듯 보입니다. 

## Further Discussion 
최대 우도 추정 (Maximum Likelihood Estimation) 은 분명 듣기에 합리적이어 보이고, 실제로도 가장 많이 활용되는 추정 방법입니다. 

그러나, 완벽하지는 않습니다. 대표적으로 방금 본 정규분포의 분산 추정에서 MLE는 **unbiasedness**를 만족하지 않습니다. 이게 무슨 말이냐면... 
- 우리가 같은 분포에서 **추출하고, 데이터를 통해 inference** 하는 행동을 방금 한 번 했습니다.     
- 만약 이 과정을 $K$번 반복할 수 있다면, 즉 분산을 한번 추정하는게 아니라, $N$개의 데이터를 모아서 그로부터 분산을 추정하는 행동 자체를 $K$번 해서 $\sigma_1 \dots \sigma_K$ 를 만든다면? 
- 직관적으로 우리는 $\E[\hat{\sigma}] = \sigma$, 즉 이 데이터로부터 얻은 추정 $\sigma$ 들의 기댓값이 정확히 원래의 분산이 되기를 바랍니다. 
- 그러나, 계산해보면 그렇지 않습니다. 혹시 우리가 고등학교나 대학 1학년 확률과 통계에서 표본분산으로부터 모분산을 추정할 때 $N$ 이 아닌 $N-1$로 나눈 것을 기억하시나요? 
$$\hat{\sigma} = \frac{1}{N - 1} \sum_{i = 1}^{N} (x_i - \mu)^2$$
이 $N-1$ 이 바로 '기댓값을 원래 분산과 같게 하는', 즉 '편향 없는' 추정을 위한 보정입니다.  
왜 $N-1$이어야 하는지는 나중에 따로 다룰 기회가 있을 것 같습니다. 
- 즉, MLE 추정치가 unbiased라는 보장은 없습니다. 
- 그러나, MLE에 관해서는 다양한 조건 하에서 다양한 수렴성을 보장하는 정리들이 알려져 있습니다.

------ 

[^2]: Obviously, 사실은 이계미분 (Hessian)을 통해 증감을 판별할 필요가 있으나... 이부분은 직접 계산을 통해 수행가능하므로 넘어가겠습니다. 
[^why]: 뒤 계산 과정에서 볼 수 있듯이, exponential function들을 날릴 수 있습니다. Computational하게는, floating point의 한계 때문에 0.1의 확률을 100번 곱하는 것은 불가능하지만, $100 \log 0.1$ 을 계산하는 것은 아무 문제가 없다는 이유도 있습니다. 