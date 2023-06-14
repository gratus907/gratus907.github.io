---
layout: single
title: "Coursera ML, Lecture 8 : Neural Network Application"
categories: ml-study
tags:
  - machine-learning
  - neural-networks
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

### 예시 : XOR / XNOR Classification
- XOR (0, 0 / 1, 1) 과 XNOR (1, 0 / 0, 1)로 구분하는 classification 문제. 
- 먼저, AND를 $(x_1, x_2)$ 를 받아서 값을 출력하는 네트워크로 표현하자. 
- 적당히 Logistic classification하면 잘 돌아간다. $g(20 x_1 + 20 x_2 - 30)$ 정도. 핵심은 $x_1 = x_2 = 1$ 외의 나머지를 모두 0으로 빡세게(?) 보낼수있게 스케일링하기.
- 비슷하게 OR도 별로 어렵지 않다. $g(20 x_1 + 20x_2 -10)$ 같은 함수를 쓰면 0, 0 외의 나머지를 1로 보낼 수 있다.
- NOT은 $g(-20x_1 + 10)$ 정도...
- 이제 $x_1$ XNOR $x_2$ 를 레이어를 이용해 표현하는 방법을 생각해 보자. 
- 가중치를 달리한 Neuron을 두개 만들어서, $a_1$ 은 $x_1$ AND $x_2$로, $a_2$ 는 ((NOT $x_1$) AND (NOT $x_2$)) 로 만들자.
- Layer 3 : $a_3$ 은 $a_1$ OR $x_2$ 로 만든다. 
- 이렇게 레이어로 구성한 Neural Network는 XNOR 함수를 학습한 것이 된다.
- Intuition : Hidden Layer (중간 과정) 에도 학습이 이루어질 수 있음을 이용, Complex한 함수도 만들 수 있다.

### Multiclass Classification
- One versus All 의 Extension
- 각 Category를 Output unit으로 만든다. $\R^4$ 로 Hypothesis 설계.