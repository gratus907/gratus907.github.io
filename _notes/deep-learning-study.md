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

$bigstar$ 가 붙은 포스팅들은 더 많은 수학/통계학 지식을 요구하는 포스팅입니다. 

![Image](/assets/img/deep-learning.jpg)

## [Supervised Learning (링크)](/deep-learning-study/supervised-learning) 
Supervised Learning이란, **정답을 알고 있는** 훈련 데이터들이 주어지고 **정답을 모르는** 데이터의 답을 예측하는 문제입니다. 예를 들어, 개와 고양이 사진을 분류하는 문제를 들 수 있습니다. 개와 고양이 사진을 각 1만 장씩 주고, 이를 잘 학습한 후, 개인지 고양이인지 모르는 사진 1천 장에 대해 올바르게 분류해내는 것을 목표로 합니다.

Supervised Learning은 딥러닝 이전의 SVM, LR부터 시작해서 이미지 분류에 사용되는 CNN, NLP모델에 사용되는 RNN 등 굉장히 다양합니다.

## Unsupervised Learning
- [Unsupervised Learning, AutoEncoders](/deep-learning-study/autoencoders/)
- [Principal Component Analysis](/deep-learning-study/principal-component-analysis/)

## Generative Models
[Generative Models : Framework] 
- [Flow Models]
- [Variational AutoEncoder]
- [Generative Adversarial Network]