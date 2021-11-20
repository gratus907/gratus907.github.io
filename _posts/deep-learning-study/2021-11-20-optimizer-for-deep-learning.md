---
layout: single
title: Optimizers for Deep Learning
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

* 많은 딥러닝 문헌에서 $x^i$를 $i$번째 데이터를 의미하는데 쓰고, $x_i$는 $x$벡터의 $i$번째 인덱스를 의미하는데 씁니다. 그러나 이렇게하면 제곱이랑 헷갈린다는 문제가 있어서, 여기서는 최대한 $i$번째 데이터를 $x_i$로 쓰고, 그 벡터의 원소는 $x_i(j)$ 로 쓰겠습니다.

딥러닝의 문제는 수학적 관점에서 환원하면 결국 다음과 같이 요약할 수 있습니다. 
- 미지의 함수 $f$에 대해 알고자 하는데, 
- 모든 지점이 아닌 어떤 지점 $x_i$ 들에서만 그 값 $f(x_i) = y_i$ 를 알고 있고, 
- 그래서 어떤 페널티 $\ell$ 을 정의해서, $\sum_i \ell(f(x_i), g(x_i))$가 작은 $g$를 $f$의 근사-함수로 생각하고 싶습니다.
- 그런데 이 $g$를 모든 함수의 공간에서 최적화하는 것은 일반적으로 가능하지 않으므로, 
- 어떤 parameter $\theta$ 에 의해 표현되는 함수공간의 부분집합 $g_\theta$만을 생각하며,
- $\minimize \sum_i \ell(f(x_i), g_\theta(x_i))$ by moving $\theta$로 생각합니다. 

그런데 $f(x_i)$는 이미 알고 있으므로, 결국은 $\ell$ 이라는 함수는 $\theta$에만 의존하게 됩니다. 따라서, 우리는 $\ell(\theta)$를 최소화하는 $\theta$를 찾는 것을 목표로 합니다. 다시 이를 일반화해서, $\theta \in \R^n$ 으로 생각하면, $\ell : \R^n \to \R$ 함수의 최적화 문제가 됩니다. 

일반적으로, $f$가 볼록(Convex) 함수인 경우에는 유일한 최적값이 존재하며, 추가로 강볼록 (Strictly Convex) 함수인 경우에는 최적값을 주는 최적 $\theta$도 유일함을 알고 있습니다. 볼록함수를 비롯한 여러 좋은 성질을 가진 함수들을 최적화하는것도 매우 흥미로운 이론들이 많이 있지만, 여기서는 깊이 다루지는 않겠습니다.

### (Stochastic) Gradient Descent
이 글에서는 독자가 gradient descent를 이해하고 있다고 가정하지만, 혹시 아니라면 [Gradient Descent에 대한 포스팅](/deep-learning-study/opt-and-gd) 를 참고해 주세요. 

Gradient Descent는 한 스텝 한 스텝이 너무 느리기 떄문에 (모든 데이터를 한바퀴 돌아야 해서), 대신 한 데이터 또는 소수의 데이터로 자주 밟는 stochastic gradient descent가 기본이 됩니다. 기본적인 SGD에 대해서는 [Stochastic Gradient Descent 포스팅](/deep-learning-study/sgd) 에서 다루었습니다. (언젠가 리폼될 예정) 이하의 모든 알고리즘들은 어떤식으로든 SGD에 기반하기 때문에, SGD의 식은 한번 리뷰할 가치가 있습니다. 

$$i(k) \sim \uniform{1}{N},\quad \theta_{k+1} = x_k - \alpha_k \nabla{f_{i(k)}(\theta_k)}$$

여기서 $\nabla f_{i(k)}$ 대신 다른 적당한 $g_k$를 잡아도 되는데 (Batched-gradient), 대신 $g_k$는 $\nabla F(x_k)$ 의 **Unbiased Estimator** 여야 합니다. 또한 좀더 식을 간단하게 쓰기 위해, 앞으로 $i(k)$ 의 선택은 논의하지 않겠습니다. 이건 그냥 랜덤하게 돌리면 됩니다. 즉, 위 SGD를 다시 쓸 때,  
$$\theta_{k+1} = x_k - \alpha_k g_k(\theta_k)$$
이렇게만 쓰더라도, $g_k$를 랜덤하게 골라진 index $i(k)$에 대한 (또는, batch를 사용하는 경우 batch-gradient) $\nabla f_i(k)$의 값으로 읽어주면 됩니다. Batch에 대한 자세한 얘기는 위에 링크걸린 SGD 포스팅을 읽어주세요.

#### Momentum SGD
SGD의 수렴속도를 개선해 보고 싶습니다. 