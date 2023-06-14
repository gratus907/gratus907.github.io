---
layout: single
title: Pytorch-Cifar10
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

ImageNet Challenge를 따라가며, CNN의 가장 큰 태스크중 하나였던 **이미지 분류**에 사용되는 모델들의 구현을 공부합니다. 

코드는 [Github repository](https://github.com/gratus907/Pytorch-Cifar10) 에 업로드됩니다.

## Data
CIFAR10은 32 x 32의 매우 작은 이미지 6만개로 구성된 데이터셋으로, 이미지 분류에서 MNIST보다는 어렵고 Imagenet보다는 쉬운, 적당한 연습용 데이터셋으로 생각할 수 있습니다. 각 이미지는 10개 중 하나의 클래스로 라벨링이 되어있습니다.

여기서는 5만개를 training에, 1만개를 test에 사용할 것입니다. 

Data augmentation은 다음과 같이 수행합니다.
  - 가로세로 4만큼의 패딩
  - Random crop (32 by 32). Padding된 다음 자르는거라 이미지 위치가 정가운데가 아니게 만드는 효과가 있습니다.
  - Random flip
  - Normalization (Imagenet weight)

## Models

<style>
table th:first-of-type {
    width: 15%;
}
table th:nth-of-type(2) {
    width: 40%;
}
table th:nth-of-type(3) {
    width: 25%;
}
table {
    width : 80%;
}
table td, table th {
    font-weight : 500;
}
</style>

| **Model Name** | **Post Link**                                                                                                         | **Result**        |
| -------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------- |
| **LeNet**      | -                                                                                                                     | 66.77% (50 epoch) |
| **AlexNet**    | [AlexNet : Explained](/deep-learning-study/AlexNet/) <br> [AlexNet on Cifar10](/deep-leanrning-study/alexnet-cifar10) | 85.03% (50 epoch) |

------
