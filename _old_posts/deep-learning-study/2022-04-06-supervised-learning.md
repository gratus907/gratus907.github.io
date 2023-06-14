---
layout: single
title: Supervised Learning
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

## Supervised Learning
Deep Learning, 보다 일반적으로 Machine Learning을 수학적으로 생각해 보면, 결국은 "미지의 함수에 대한, 데이터를 이용한 parametric inference" 라고 할 수 있습니다. 

이 말의 의미를 생각해 보면서 이야기를 시작합니다. 하나씩 요소들을 살펴보면서 점점 문제를 구체화할 것입니다. 

**미지의 함수에 대한 inference**  
이미지 분류, 주식 가격의 예측, 게임의 최적 전략 등, 많은 딥 러닝의 문제들이 있지만 매우 일반적으로는 다음과 같은 문제로 생각할 수 있습니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">Inference on unknown functions</b>  
    어떤 미지의 함수 $f_\star$를 알고 싶다.
</span> 

예를 들어, 개와 고양이 사진을 구분하는 문제라면, 다음과 같은 정의역과 치역을 함수가 됩니다. 
$$f : \Set{\text{Photos of cats and dogs}} \to \Set{-1, 1}$$
당연한 이야기지만, 그냥 함수라고 하면 꽤 많은 정보를 알더라도 추측하기 어렵습니다. 따라서, 우리는 이 $f_*$가 어떤 좋은 성질들을 만족하고 resonable하게 행동할 것이라고 가정합니다 (많은 실세계의 문제가 그러하기 때문) 

------------------------------------------------

**미지의 함수에 대한 Parametric Inference**  
**주어진 정의역과 치역을 갖는 모든 함수** 같은 대상은 이론적으로는 몰라도, 실질적/계산적으로는 다루기가 너무 어렵습니다. 따라서, 우리는 어떤 **parametrized function** 을 생각합니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">Parametric Inference</b>  
    Parameter $\theta$ 에 의해 결정되는 함수 $f_\theta$ 들의 집합 $\mathcal{F} = \Setcond{f_\theta}{\theta \in \Theta}$ 를 생각하자. 이때, 우리는 $\mathcal{F}$에서 $f_\star$에 가장 가까운 $f_\theta$를 찾고 싶다. 
</span> 

예를 들어, $\theta \in \R^2$ 에 대해, $y = \theta_0 x + \theta_1$ 이라는 모델로 $f_\star : \R \to \R$ 을 근사하는 경우가 있을 수 있습니다. 이는 즉, 어떤 실함수 $f_\star$에 대해 가장 **가까운 직선** 을 찾겠다는 의미입니다. 

여기서, $\mathcal{F} = \Setcond{f_\theta}{\theta \in \Theta}$ 를 **모델(Model)** 또는 **가설(Hypothesis)** 이라고 부릅니다. 우리는 모델이라는 용어를 택하겠습니다. 

여기서 발생하는 문제는, **가까운** 함수를 어떻게 생각하느냐는 것입니다. 이는 함수공간에서의 metric이라는 개념이 되는데... 우선은 두 함수 간의 "거리를 측정" 하는 적당한 $\mathcal{L}$ 가 주어진다고 생각해 보겠습니다. 즉, $\mathcal{L}$ 은 함수 두개를 받아서 0 이상의 실수를 내놓는 함수입니다. 그리고 이 $\mathcal{L}$은 어떤 거리같은 느낌을 줘야겠습니다. 예를 들어, 두 실함수에 대해서...
$$\mathcal{L}(f, g) = \int_{-\infty}^{\infty} (f(x) - g(x))^2\dd{x}$$
이런 느낌의 함수를 만든다고 생각해 보겠습니다. $f$와 $g$가 멀다면 직관적으로 이 값이 커질 것 같습니다. 물론 적분이 안될수도 (무한대가 될수도) 있겠지만, 저게 만약 적분이 된다면 그럴싸한 거리함수인것 같습니다. 이때의 $\mathcal{L}$ 을 **Loss function**이라고 부릅니다. 

<span style="display:block" class="math_item">
    <b class="math_item_title">Parametric Inference with Loss function</b>  
    Parameter $\theta$ 에 의해 결정되는 함수 $f_\theta$ 들의 집합 $\mathcal{F} = \Setcond{f_\theta}{\theta \in \Theta}$ 와, 함수들의 공간에서 정의되는 적절한 거리 함수 $\mathcal{L}$을 생각하자. 이때, 우리는 $\mathcal{F}$에서 $\mathcal{L}(f_\star, f_\theta)$를 최소화하는 $f_\theta$를 찾고 싶다. 
</span> 

사실 위 문제에서 $\mathcal{L}(f_\star, f_\theta)$ 가 무엇에 의존하는지 생각해보면 $f_\star$ 는 이미 나와있는 값이므로 $\theta$에만 의존하게 됩니다. 따라서, 

<span style="display:block" class="math_item">
    <b class="math_item_title">Parametric Inference with Loss function</b>  
    Parameter $\theta$ 에 의해 결정되는 함수 $f_\theta$ 들의 집합 $\mathcal{F} = \Setcond{f_\theta}{\theta \in \Theta}$ 와, 함수들의 공간에서 정의되는 적절한 거리 함수 $\mathcal{L}$을 생각하자. 이때, 우리는 $\Theta$에서 $\mathcal{L}(\theta) = \mathcal{L}(f_\star, f_\theta)$를 최소화하는 $\theta$를 찾고 싶다. 
</span> 

($\mathcal{L}$ 이 함수 두개를 받아서 실수를 뱉어야 하는데, $\theta$를 받는 것은 엄밀히는 잘못되었습니다. 그러나 이정도는 notation의 abuse로 넘어갑시다.)

이제 주어진 문제는 사실 어떤 최적화 문제가 되었습니다.

------------------------------------------------

**미지의 함수에 대한, 데이터를 이용한 parametric inference**  

여기까지 오면서 놓친게 있습니다. 예를 들어, 우리가 다음과 같은 문제를 푼다고 생각해 보겠습니다. 

<span style="display:block" class="math_item">
    <b class="math_item_title">Problem Example</b>  
    $y = x\sin x$를 $[0, 1]$ 에서 최대한 근사하는 이차식 $f_\theta(x) = ax^2 + bx + c$ 를 찾는다
</span> 

이때 위의 적분을 이용한 $\mathcal{L}$을 쓰려고 합니다. 즉, 우리는 다음을 최소화합니다. 
$$\mathcal{L}(a, b, c) = \int_{0}^{1} (x \sin x - (ax^2 + bx + c))^2 \dd{x}$$
이 식은 잘 적분해서 최소화하면 됩니다. 그러나, 이 방법에는 심각한 문제가 있습니다. 우리가 $\mathcal{L}$ 을 구하는데 $y = x \sin x$ 라는 실제 $f_\star$ 값을 사용하고 있다는 점입니다. 

실제 문제에서는 이런 정보가 주어지지 않습니다. $f_\star$를 구하는게 목적이므로 이를 $\mathcal{L}$ 계산에서 사용한다는 것은 선후가 잘못되었습니다. 

그런데, $\mathcal{L}(f_\star, f_\theta)$를 계산하려면 $f_\star$ 를 알아야 합니다. 적분계산같은걸 할수있다면 애초에 $f_\star$가 미지의 함수가 아닐 것입니다. 

여기에서 **데이터** 가 등장합니다. 즉... 우리가 미지의 함수에 대한 데이터를 수집하여, $x^1, x^2, \dots x^n$ 에 대하여 정보 $f_\star(x^i) = y^i$ 만은 이미 알고 있는 경우입니다. 이를 "Labeled Data" 를 가지고 있다고 생각하면 되겠습니다. 
- 우리는 $x^i$들에서 알고 있다는 정보를 최대한 이용하고 싶기 때문에, 어떤 새로운 페널티 $\ell$ 을 정의해서, $\sum_i \ell(f(x^i), g(x^i))$가 작은 $g$를 $f$의 근사-함수로 생각하고 싶습니다. 이를 **Empirical Risk Minimization** 이라 합니다. 

따라서, 최종적인 Supervised Learning의 문제는 다음과 같습니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">Parametric Inference with Loss function</b>  
    Parameter $\theta$ 에 의해 결정되는 함수 $f_\theta$ 들의 집합 $\mathcal{F} = \Setcond{f_\theta}{\theta \in \Theta}$ 와, 값들의 공간에서 정의되는 적절한 거리 함수 $\ell$을 생각하자. 이때, 우리는 $\Theta$에서 $\mathcal{L}(\theta) = \sum \ell(f_\star(x^i), f_\theta(x^i))$를 최소화하는 $\theta$를 찾고 싶다. 
</span> 

그리고 $f_\star$가 적절하게 좋은 성질을 갖기 때문에, $\ell$을 충분히 잘 디자인한다면 주어진 데이터가 아닌 새로운 데이터 $u$에 대해서도 $f_\star(u) \approx f_\theta(u)$ 일 수 있을 것이라고 믿습니다. 결국 우리는 본적 있는 데이터가 아니라 새로운 데이터에서 잘 작동하는 모델을 찾는것이 목적이기 때문입니다. 

앞으로 여러 포스팅을 통해, 각각의 문제들을 하나씩 공부해볼 것입니다 :) 

------------------------------------------------

## 포스팅들 모아보기 
- 가장 중요한 문제는 당연히 어떤 $\theta$를 잡아서, $g_\theta$를 만드는지의 문제입니다. 즉, 다양한 **모델** 이 연구되어야 하며, 각 모델마다 **표현할 수 있는 함수들의 공간** 이 다르기 때문에, 이를 고려해야 합니다. 모델에 대해서는 마지막에 다시 나열합니다. 
  - 기본적인 수리통계? 지식이 있으면 많은 도움이 됩니다. 
    - **Empirical Risk Minimization**
    - **KL-Divergence**
    - **[Maximum Likelihood Estimation](/mathematical-statistics/Maximum-Likelihood-Estimation/)**
<br/><br/>

- $\mathfrak{L}(\theta)$가 이미 알려져 있다면, 이를 어떻게 최소화할수 있을까요? $\mathfrak{L}$이 좋은 성질 (볼록성 등) 을 만족하지 않는다면, 일반적으로 이는 매우 어렵습니다. 최적화하는 방법과 각 알고리즘의 성능 등에 대해 공부해야 합니다.
  - **[Introduction to Optimization / Gradient Descent](/deep-learning-study/opt-and-gd/)**
  - **[Stochastic Gradient Descent](/deep-learning-study/sgd/)**
  - **[Backpropagation](/deep-learning-study/backpropagation/)**
  - **[Optimizers for Deep Learning](/deep-learning-study/optimizer-for-deep-learning)**
  - **[Batch Normalization](/deep-learning-study/batch-normalization/)**
<br/><br/>

- 우리는 $\sum_i \ell(f_\star(x^i), f_\theta(x^i))$를 최소화했지만, 사실 바라는 것은 $x^1 \dots x^n$ 에 없는 **새로운 데이터** $x'$가 들어왔을 때, $f(x')$ 이 $g_\theta(x')$ 에 가깝기를 바랍니다. 즉, 개와 고양이 사진을 많이 훈련한 모델은 한번도 본적없는 개/고양이 사진에 대해서도 잘 작동하기를 바랍니다. 이를 Generalization이라 합니다. 
  - **[Overfitting and Regularization : Dropout, Weight decay, Data Augmentation](/deep-learning-study/overfitting-and-regularization/)**
<br/><br/>

- 가장 간단한 Model들인 Support Vector Machine, Logistic Regression, Softmax Regression 등에 대해 알아봅니다. 
  - **[Support Vector Machine 알아보기](/deep-learning-study/support-vector-machines/)**
  - **($\bigstar$) More on SVM : Kernel Methods (1) (2)**
<br/><br/>

- 딥 러닝의 시작이라고 할 수 있는, MultiLayer Perceptron에 대해 공부합니다. 
  - **[Multi-Layer Perceptron](/deep-learning-study/multilayer-perceptron/)**
  - **[Softmax와 MLP로 MNIST 풀어보기](/deep-learning-study/mnist-mlp/)** : MNIST 손글씨 숫자인식 with Softmax / MLP
  - **($\bigstar$) Universal Approximation Theorem**
<br/><br/>

- 이미지 처리에 가장 많이 쓰이는, Convolution 기반의 뉴럴 네트워크에 대해 공부합니다. 
  - **[Convolutionary Neural Networks](/deep-learning-study/convolutionary-neural-networks/)** : CNN 개요.
  - **[LeNet으로 MNIST 풀어보기](/deep-learning-study/LeNet-MNIST)**
- ImageNet Challenge의 역사를 따라가며, 몇가지 성공적인 Image classification 모델들에 대해 공부합니다.   
[CIFAR10에서의 결과 정리](/deep-learning-study/pytorch-cifar10)
  - **[CNN Architecture : AlexNet](/deep-learning-study/AlexNet/)**
    - **[AlexNet으로 CIFAR10 풀어보기](/deep-learning-study/alexnet-cifar10/)**
  - **[CNN Architecture : VGGNet](/deep-learning-study/VGGNet/)**
    - **[VGGNet으로 CIFAR10 풀어보기](/deep-learning-study/vggnet-cifar10/)**
  - [CNN Architecture : GoogLeNet]
  - [CNN Architecture : ResNet]
  - [CNN Architecture : SENet]
<br/><br/>