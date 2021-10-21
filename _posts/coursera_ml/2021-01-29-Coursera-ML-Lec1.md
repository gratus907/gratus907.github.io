---
layout: single
title: "Coursera ML, Lecture 1 : Introduction"
categories: ml-study
tags:
  - machine-learning
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
----------------------------------------------------------------

### What is Machine Learning?
- A. Samuel (1959) : 컴퓨터가 `explicitly program` 되지 않은 내용을 학습하게 하는 분야
- T. Mitchell (1998) : Task T, Performance measure P, Experience E가 있고, E에 의해 P가 발전하는 Learning problem.
- Supervised / Unsupervised Learning
- Reinforcement Learning, Recommenders, ...
  

#### 응용 분야
- Web search, photo tagging, etc...
- 컴퓨터에게 제공되는 **새로운 가능성** - 인간의 사고/학습하는 방식 모방하여 작동.
  - Database mining (web click, medical records, ...)
    - Computational biology, 유전자 분석 등.
  - 직접 프로그래밍할 수 없는 문제들 
    - 자율주행 기술 - How?
    - Handwriting recognition
    - Natural Language Processing
  - Self customizing
    - 개별 유저에 대해 customized된 알고리즘 개발
  - Understanding Brains / Human Learning


### Supervised Learning
- **올바른 정답** 이 주어지는 Learning problem.
- **올바른 정답** 처럼 행동하는 프로그램 만들기. 
- ex) 주택 가격의 예측. 어떻게 이 문제를 해결할 것인가?
  - 일차함수 피팅? 이차함수 피팅?
  - Regression Problem (연속적인 값 예측하기)
- ex) 종양 크기($x$)에 따른 양성 / 악성 ($y$) 예측. 
  - Probability 예측하기.
  - Classification Problem (이산적인 값에 대한 확률)
  - Seperating Line 찾기.
- 몇개의 Feature에 대해 찾을 것인가? 
- Support Vector Machine - Infinite number of feature에 대해서도 대응할 수 있는 수학적인 방법.


### Unsupervised Learning
- **올바른 정답** 이 주어지지 않는 Learning Problem 
- Clustering algorithm
  - ex) Google News : 수많은 뉴스를 **AUTOMATICALLY** 각 주제별로 모아서 보여주는 서비스 제공.
  - ex) Genomics : 유전자 정보를 이용한 clustering
  - Astronomical data, SNS Analysis, Computing cluster organizing, Market segmentation ... 
- ex) Cocktail Party Problem : 겹치는 목소리 구분해 내는 문제.
  - 짧고 간결한 코드로 유의미한 결과 도출 가능.
  - 이 강의에서는 Octave 이용.