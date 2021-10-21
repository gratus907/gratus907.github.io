---
layout: page
title: CS Adventure
description: 공부한 논문 정리 / 리뷰
img: /assets/img/old-library.png
importance: 1
category: Computer Science
---

## What is This? 
나름 CS Research를 꿈꾸는데도 전혀 그런쪽으로는 준비가 안 된거 같아서, 지금부터라도 논문읽기나 세미나 참석하고 정리하기를 조금씩 해 보려고 합니다. 재밌어 보이는 것들 / 추천받은 것들 등등... 을 읽어보고 재밌는 주제들이 있으면 여기에 정리할 계획입니다. 개인적인 흥미가 최우선이다보니 막 세세한 결과같은것보단... 핵심적인 아이디어가 재밌는가? 가 가장 중요한것 같습니다. 

제가 이 카테고리의 게시글을 작성하는 기본 틀은 다음과 같습니다. 
1. Introduction : 소개, 이 논문을 읽게된 계기, Historically 어떤 위치에 있는지.
2. Key ideas : 본문의 Key idea를 적당히 제가 이해한 방식대로 정리합니다. 
3. Conclusion : 논문의 결론
4. Thoughts : 읽으면서 들었던 짧은 생각들을 정리합니다. 짧은 생각들은 정말 느낌일수도 있고, 뭔가 오 이런건 왜 안 다루지? 하는 걸수도 있을텐데 **학부생의 법칙** 에 따라, 지금의 제가 논문을 읽고 뭔가 떠오른게 있다면 100% 둘 중 하나입니다. 누군가 이미 해 놨거나, 안 되는 거거나... 하지만 여전히 이런 생각을 해보는 것들은 의미있지 않을까 싶습니다. 궁금했던 점을 다른 논문을 찾아보는 계기로 삼으려고 합니다. 

경우에 따라, 어떤 논문 A와 그 후속연구 B, C, D를 한번에 다루기도 할 예정입니다.

Topic (분야) 는, 일반적으로는 [Arxiv의 기준](https://arxiv.org/archive/cs)을 따릅니다. Arxiv에 올라와있지 않은 논문은 읽은후에 제가 최대한 비슷하게 분류해 넣었습니다. 
(아마도) Arxiv 분류 코드 중 제가 보게될 논문들은 이정도가 메인일듯 합니다. 특히 장기적으로는 CC, DM, DS.
- **AI** : Artificial Intelligence
- **CC** : Computational Complexity
- **DM** : Discrete Mathematics
- **DS** : Data structures / Algortihms
- **NA** : Numerical Analysis

그래프에 관한 많은 논문들 (저는 DM이나 DS처럼 받아들이게 되는) 은 실제로는 다음과 같은 Topic으로 많이 올라옵니다. 제가 (아마도) DB management에 관한 뭔가를 읽을 일은 없을 것이므로, 여기 내용들은 거의 100% 그래프에 관한 내용입니다. 
- **DB** : Databases 
- **SI** : Social and Information Networks

당분간은 수리과학부 졸업논문을 위해 CV, AI 쪽도 많이 보게 될 예정입니다. 
- **CV** : Computer Vision

<style>
table th:first-of-type {
    width: 70%;
}
table th:nth-of-type(2) {
    width: 10%;
}
table th:nth-of-type(3) {
    width: 20%;
}

</style>

어떤 한 주제가 있고, 이 주제에 관한 여러 논문이 있는 경우, 그 주제에 대한 개요를 적는 포스팅을 하나씩 더 쓰기도 할 것 같습니다. 이 포스팅은 아래 리뷰 글에서 논문 리뷰 외의 일반적인 개념에 대한 소개를 최소화하기 위해 주로 작성합니다.
- **[Subgraph Isomorphism : Introduction](/cs-adventure/sub-iso-note)**

| **Title (Link to post)**                                                                                          | **Topic**  | **Published**                 |
| ------------------------------------------------------------------------------------------------------------- | ------ | ------------------------- |
| **[Active Contours Without Edges](/cs-adventure/chan-vese/)**                                                 | NA, CV | IEEE TIP[^ieee-tip], 2001 |
| **[DELTACON: A Principled Massive-Graph Similarity Function](/cs-adventure/deltacon/)**                       | SI     | SDM[^sdm], 2013           |
| **In-Memory Subgraph Matching: An In-depth Study**[^subiso]                                                   | DS, DB | SIGMOD[^sigmod], 2020     |
| **[Versatile Equivalences : Speeding up Subgraph Query Processing and Subgraph Matching](/cs-adventure/VEQ)** | DS, DB | SIGMOD[^sigmod], 2021     |


[^ieee-tip]: Transactions on Image Processing
[^sdm]: SIAM International Conference on Data Mining
[^sigmod]: Proceedings of the ACM SIGMOD International Conference on Management of Data


[^subiso]: Subgraph Isomorphism 방법들을 비교하고, 이들을 모두 구현하여 통일된 프레임워크 위에서 실험한 논문이라서 별도로 포스팅을 정리하지는 않았습니다.