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
## Basics / Theory
MLP, CNN 등 모델에 대한 얘기가 아닌, 전체적인 이론에 대한 이야기
- [Introduction to Optimization / Gradient Descent](/deep-learning-study/opt-and-gd/)
- [Stochastic Gradient Descent](/deep-learning-study/sgd/)
- [Backpropagation](/deep-learning-study/backpropagation/)
- [Optimizers for Deep Learning](/deep-learning-study/optimizer-for-deep-learning)
- [Overfitting and Regularization : Dropout, Weight decay, Data Augmentation](/deep-learning-study/overfitting-and-regularization/)
- [Batch Normalization]
- [Universal Approximation Theorem]

## Shallow Neural Networks 
- [Introduction to Shallow Neural Networks](/deep-learning-study/shallow-nn/)
- [Support Vector Machine & Logistic Regression](/deep-learning-study/svm-and-lr/) : Binary Classification 문제를 해결하는 두 모델에 대하여.
- [Softmax Regression](/deep-learning-study/softmax-regression/) : Multiclass classification 해결, Logistic Regression의 확장

## Multi Layer Perceptron 
- [Multi-Layer Perceptron](/deep-learning-study/multilayer-perceptron/) : 딥 러닝의 시작.
- [Softmax와 MLP로 MNIST 풀어보기](/deep-learning-study/mnist-mlp/) : MNIST 손글씨 숫자인식 with Softmax / MLP

## Convolutionary Neural networks
- [Convolutionary Neural Networks](/deep-learning-study/convolutionary-neural-networks/) : CNN 개요.
- [LeNet으로 MNIST 풀어보기](/deep-learning-study/LeNet-MNIST) 

ImageNet Challenge의 역사를 따라가며, 몇가지 성공적인 Image classification 모델들에 대해 공부합니다.   
[CIFAR10에서의 결과 정리](/deep-learning-study/pytorch-cifar10)
- [CNN Architecture : AlexNet](/deep-learning-study/AlexNet/)
  - [AlexNet으로 CIFAR10 풀어보기](/deep-learning-study/alexnet-cifar10/)
- [CNN Architecture : VGGNet](/deep-learning-study/VGGNet/)
- [CNN Architecture : GoogLeNet]
- [CNN Architecture : ResNet]
- [CNN Architecture : SENet]


## Computer Vision
[Semantic Segmentation 개요](/deep-learning-study/semantic-segmentation/) : Semantic segmentation 문제 정의, 개요
- [Fully Convolutional Networks]
- [Encoder-Decoder, U-Net]
- [Dilated Convolutions, DeepLab]

## Unsupervised Learning
- [Unsupervised Learning, AutoEncoders](/deep-learning-study/autoencoders/)
- [Principal Component Analysis]

## Generative Models
[Generative Models : Framework] 
- [Flow Models]
- [Variational AutoEncoder]
- [Generative Adversarial Network]