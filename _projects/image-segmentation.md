---
layout: page
title: Image Segmentation
permalink : /image-segmentation-2021/
description: Project for Bachelor's Thesis is Mathematics, comparing DL/pre-DL image segmentation methods
img: /assets/img/image-segmentation.png
importance: 1
category: SNU
---

Thumbnail image source : [Tensorflow Image segmentation](https://www.tensorflow.org/tutorials/images/segmentation?hl=ko)[^1]

## Pre-DL Image segmentation methods
딥러닝이 본격화되기 이전에는 어떤 방법들이 image segmentation에 사용되었는지 공부했습니다.
-  [Chan-Vese Segmentation 논문 공부 포스팅 링크](/cs-adventure/chan-vese/) : Functional의 optimization문제로 바꾸어 contour를 찾는 방법.

## Deep Learning methdos
[Github Link](https://github.com/gratus907/Image-Segmentation-Study) 에서 코드를 모두 확인할 수 있습니다. 

가볍게 각 모델들을 비교할 것이므로, 작은 데이터셋을 써보려고 합니다. Graz Univ에서 제공하는 [드론 항공 사진 데이터셋](https://www.tugraz.at/index.php?id=22387) 을 이용해 보겠습니다. 먼저 데이터를 로딩할 준비를 하고, 기본 세팅들을 합니다. 모델을 구현하고 나서 데이터를 로딩해서 테스트할 수 있도록.. 
- [Preparation 포스팅 링크](/image-segmentation-2021/preparation/)

Prep이 제대로 되었는지 확인하고 싶습니다. 1-Layer CNN에다가 이미지를 먹이면 조금이라도 Nontrivial한 뭔가를 배울 수 있을까요?
- [What can 1-Layer-Convolution acheive?]

Fully Convolutional Network (FCN) 을 공부하고 구현합니다. 
- [Fully Convolutional Network 정리]
- [FCN : Pytorch Implementation]

U-Net을 공부하고 구현합니다. 
- [U-Net 정리]
- [U-Net 구현]
  
------

[^1]: Ironically, this project will use pytorch.