---
layout: page
title: "Deep Learning"
permalink : /deep-learning-study/
description: Deep Learning
img: /assets/img/ml.png
importance: 1
category: Computer Science
---

# What is This?
이 카테고리의 글들은 크게 아래 세 가지에 기반하고 있습니다.

제가 정리한 내용은 과목의 official한 강의자료와 아무런 상관이 없으며, 제가 이미 잘 알고 있는 내용은 스킵한 것도 많고, 다른 자료를 찾아보며 추가한 내용도 많습니다. 즉, 여기 있는 포스팅은 과목에서 실제로 강의된 내용과 일치하지 않을 수 있습니다. 특히, 오타나 오류가 있다면 매우 높은 확률로 제가 이해한 것을 적다가 실수하였거나 잘못 이해하고 있을 가능성이 높습니다. 

1. Goodfellow, Bengio, Courville의 저서 **Deep Learning** 의 내용을 공부하고 정리한 내용
2. 2021 가을학기에 수강하는 수업 **해석학특강 : 심층학습의 수치해석** 에서 공부한 내용 (1의 책을 교재로 사용하는 수업입니다)
3. 2021 가을학기에 수강하는 수업 **심층 신경망의 수학적 기초** 에서 공부한 내용 (2에 비해 수학적인 면에 집중하는 수업입니다)

강의와 책의 내용을 제가 적당히 제 공부한 방향에 맞게 재구성한 부분들이 많아, 순서가 특정 자료를 따르지 않습니다.

재밌게도 제가 이 블로그에 쓰기 시작한 글은 -습니다로, 필기노트를 $\LaTeX$로 정리하고 그걸 다시 pandoc으로 마크다운 변환한 포스팅들은 -다로 끝납니다. 이걸 모두 언젠가는 통일하겠다는 원대한 꿈이 있지만 당분간은 쉽지 않을 예정입니다.

**참고** 3번 수업의 경우 $\LaTeX$ 로 필기노트를 관리하고 있습니다. 언젠가 여건이 허락한다면 이 노트를 여기에 올릴텐데, pandoc으로 쓴 포스팅은 그쪽이 좀더 깔끔하게 보일 것 같습니다. 최종적으로는 매우 유명한 [Evan Chen Notes](https://web.evanchen.cc/coursework.html) 같은 결과물을 목표하고 있는데, 다양한 이슈들이 있습니다. 가장 먼저, 이 자료를 공개해도 되는지의 문제가 있는데, 원본 강의자료가 [교수님의 개인 웹사이트](http://www.math.snu.ac.kr/~ernestryu/courses/deep_learning.html) 에 어떤 로그인이나 학교 계정 요구 없이 올라와 있으므로 (아마도) 괜찮을 것으로 생각하고 있습니다. 특히 마크다운 버전은 제 edit이 좀 헤비하게 들어갈 거라서 아마 큰 문제는 없는 것으로 알고 있는데, $\LaTeX$ scribe note는 강의 필기한 거라서 괜찮은지 사실 잘 모르겠습니다. 

------ 



# Postings
가능한한 포스팅을 읽는 순서를 DAG로 유지하려고 노력했습니다. 현재까지 작성완료된 포스팅은 볼드체로 표시되어 있습니다.

![Image](/assets/img/deep-learning.jpg)

## Supervised Learning 
Deep Learning, 보다 일반적으로 Machine Learning을 수학적으로 생각해 보면, 결국은 "미지의 함수에 대한, 데이터를 이용한 parametric inference" 라고 할 수 있습니다. 이게 무슨 의미인지를 생각해 보면서 이야기를 시작합니다. 

이미지 분류, 주식 가격의 예측, 게임의 최적 전략 등, 많은 딥 러닝의 문제들이 있지만 매우 일반적으로는 다음과 같은 문제로 생각할 수 있습니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">Supervised Learning : Basic Setup</b>  
    어떤 미지의 '진실' 함수 $f$가 있고, 우리는 이 함수에 대해 알고 싶다. 우리는 일부 데이터 $x^i$ 들에서 $f(x^i)$의 값을 알고 있다. 
</span> 

- 당연한 이야기지만, 그냥 함수라고 하면 $x^i$들에 대한 정보를 알더라도 아무것도 추측하기 어렵습니다. 따라서, 우리는 이 $f$가 어떤 좋은 성질들을 만족하고 resonable하게 행동할 것이라고 가정합니다 (많은 실세계의 문제가 그러하기 때문)
- 따라서, 두 함수 간의 "거리를 측정" 하는 $\mathcal{L}$ 가 주어진다면, truth function $f$와의 거리 $\mathcal{L}(f, g)$를 최소화하는 $g$를 찾는 것이 우리의 목표라고 할 수 있겠습니다. 그러나, $f$를 모른다면 $\mathcal{L}(f, \cdot)$ 을 계산하는 것은 불가능할 것입니다. 
- 대신에 우리는 $x^i$들에서 알고 있다는 정보를 최대한 이용하고 싶기 때문에, 어떤 새로운 페널티 $\ell$ 을 정의해서, $\sum_i \ell(f(x^i), g(x^i))$가 작은 $g$를 $f$의 근사-함수로 생각하고 싶습니다. 이를 **Empirical Risk Minimization** 이라 합니다. 
- 그런데, **모든 함수들 중에서** $\sum_i \ell(f(x^i), g(x^i))$ 를 최소화한다는 것은 일반적으로 불가능합니다. 따라서, 어떤 **파라미터** (변수) $\theta \in \Theta$를 정의하여, 다음과 같은 최적화 문제를 생각합니다. $g_\theta$는 $\theta$를 이용하여 정의되는 함수입니다. 
$$\underset{\theta \in \Theta}{\minimize}\ \sum_i \ell(f(x^i), g_\theta(x^i))$$
이때, $g_\theta$는 **parameter에 의해 정의되는 함수들의 집합** 이며, 이를 **모델(model)** 이라 합니다. 
- 이제, 위 문제를 보면 결국 $f$는 모르더라도 $f(x^i)$는 이미 알고 있는 값이고, $g_\theta$는 $\theta$에 의해서만 결정됩니다. 따라서, $\sum_i \ell(f(x^i), g_\theta(x^i))$ 전체는 사실 $\theta$에 의한 함수이고, 다음과 같은 최적화 문제로 환원됩니다. 
$$\underset{\theta \in \Theta}{\minimize}\ \mathfrak{L}(\theta)$$

따라서, Supervised Learning의 문제를 이러한 세팅 하에서 공부할 수 있습니다. 
- 가장 중요한 문제는 당연히 어떤 $\theta$를 잡아서, $g_\theta$를 만드는지의 문제입니다. 즉, 다양한 **모델** 이 연구되어야 하며, 각 모델마다 **표현할 수 있는 함수들의 공간** 이 다르기 때문에, 이를 고려해야 합니다. 모델에 대해서는 마지막에 다시 나열합니다. 
- $\mathfrak{L}(\theta)$가 이미 알려져 있다면, 이를 어떻게 최소화할수 있을까요? $\mathfrak{L}$이 좋은 성질 (볼록성 등) 을 만족하지 않는다면, 일반적으로 이는 매우 어렵습니다. 최적화하는 방법과 각 알고리즘의 성능 등에 대해 공부해야 합니다.
  - [Introduction to Optimization / Gradient Descent](/deep-learning-study/opt-and-gd/)
  - [Stochastic Gradient Descent](/deep-learning-study/sgd/)
  - [Backpropagation](/deep-learning-study/backpropagation/) 
  - [Optimizers for Deep Learning](/deep-learning-study/optimizer-for-deep-learning)
  - [Batch Normalization](/deep-learning-study/batch-normalization/)
- 우리는 $\sum_i \ell(f(x^i), g_\theta(x^i))$를 최소화했지만, 사실 바라는 것은 $x^1 \dots x^n$ 에 없는 **새로운 데이터** $x'$가 들어왔을 때, $f(x')$ 이 $g_\theta(x')$ 에 가깝기를 바랍니다. 즉, 개와 고양이 사진을 많이 훈련한 모델은 한번도 본적없는 개/고양이 사진에 대해서도 잘 작동하기를 바랍니다. 이를 Generalization이라 합니다. 
  - [Overfitting and Regularization : Dropout, Weight decay, Data Augmentation](/deep-learning-study/overfitting-and-regularization/)

- 가장 간단한 Model들인 Support Vector Machine, Logistic Regression, Softmax Regression 등에 대해 알아봅니다. 
  - [Support Vector Machine 알아보기](/deep-learning-study/support-vector-machines/)
  - * More on SVM : Kernel Methods (1) (2)


#### Shallow Neural Networks 
- [Introduction to Shallow Neural Networks](/deep-learning-study/shallow-nn/)
- [Support Vector Machine & Logistic Regression](/deep-learning-study/svm-and-lr/) : Binary Classification 문제를 해결하는 두 모델에 대하여.
- [Softmax Regression](/deep-learning-study/softmax-regression/) : Multiclass classification 해결, Logistic Regression의 확장

#### Multi Layer Perceptron 
가장 기본적인 형태의 딥 러닝인 MultiLayer Perceptron에 대해 공부합니다. 
- [Multi-Layer Perceptron](/deep-learning-study/multilayer-perceptron/) : 딥 러닝의 시작.
- [Softmax와 MLP로 MNIST 풀어보기](/deep-learning-study/mnist-mlp/) : MNIST 손글씨 숫자인식 with Softmax / MLP

#### Convolutionary Neural networks
이미지 처리에 가장 많이 쓰이는, Convolution 기반의 뉴럴 네트워크에 대해 공부합니다. 
- [Convolutionary Neural Networks](/deep-learning-study/convolutionary-neural-networks/) : CNN 개요.
- [LeNet으로 MNIST 풀어보기](/deep-learning-study/LeNet-MNIST) 

ImageNet Challenge의 역사를 따라가며, 몇가지 성공적인 Image classification 모델들에 대해 공부합니다.   
[CIFAR10에서의 결과 정리](/deep-learning-study/pytorch-cifar10)
- [CNN Architecture : AlexNet](/deep-learning-study/AlexNet/)
  - [AlexNet으로 CIFAR10 풀어보기](/deep-learning-study/alexnet-cifar10/)
- [CNN Architecture : VGGNet](/deep-learning-study/VGGNet/)
  - [VGGNet으로 CIFAR10 풀어보기](/deep-learning-study/vggnet-cifar10/)
- [CNN Architecture : GoogLeNet]
- [CNN Architecture : ResNet]
- [CNN Architecture : SENet]

Classificiation 외의 다른 이미지 관련 문제를 푸는 방법에 대해 공부합니다.  
[Semantic Segmentation 개요](/deep-learning-study/semantic-segmentation/) : Semantic segmentation 문제 정의, 개요
- [Fully Convolutional Networks]
- [Encoder-Decoder, U-Net]
- [Dilated Convolutions, DeepLab]

## Unsupervised Learning
- [Unsupervised Learning, AutoEncoders](/deep-learning-study/autoencoders/)
- [Principal Component Analysis](/deep-learning-study/principal-component-analysis/)

## Generative Models
[Generative Models : Framework] 
- [Flow Models]
- [Variational AutoEncoder]
- [Generative Adversarial Network]