---
layout: single
title: "Subgraph Isomorphism : Introduction"
categories: cs-adventure
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

## Subgraph Isomorphism 문제 소개 

Subgraph Isomorphism이란, 쿼리 그래프 $q$와 데이터 그래프 $G$가 주어지는 상황에서, $G$가 $q$와 isomorphic한 subgraph를 갖는지 여부를 판단하는 문제입니다. 이 문제는 NP-Complete임이 증명되어 있습니다. NP-Complete를 증명하는 것은 우리의 논의에 그렇게 중요하지 않지만, 잠깐 생각해 보면, Clique Problem (Subgraph Isomorphism에서, $q$가 정점 $n$개짜리 완전그래프 $K_n$으로 한정되는 버전) 보다는 적어도 어려운 문제임을 알 수 있습니다. Clique 문제는 Karp가 NP-Complete라는 개념을 정의하고 증명했을 때 나온 21개의 오리지널한 NP-Complete 문제 중 하나로, General SAT로부터 환원되므로 NP-Complete입니다.[^1] 

우리는 Subgraph에 관한 문제를 접근하면서, 다음과 같이 Embedding을 정의합니다.  
Vertex Labeled graph $G, q$가 주어졌을 때, 함수 $f : V_q \to V_G$가 존재하여, $q$에서 edge $(u_1, u_2)$에 대해 항상 $G$에서 edge $(v_1 = f(u_1), v_2 = f(u_2))$ 를 찾을 수 있을 때, 이를 Embedding 이라 합니다. 단, Labeled graph이므로 $q$에서 $u$의 label과 $G$에서 $f(u)$의 label이 항상 같아야 합니다. 앞으로 편의상 $u_1 \dots u_n$은 $q$의, $v_1 \dots v_n$은 $G$의 vertex를 의미하는 것으로 쓰겠습니다.

비슷하지만 좀더 Application 스러운 문제 두 개인 Subgraph search와 matching은, 다음과 같이 정의됩니다.
- Subgraph Search란, 데이터 그래프가 하나가 아니라 여러 개 $G_1, G_2, \dots G_n$의 집합이 주어지고, $q$의 embedding을 갖는 그래프들을 모두 찾는 문제입니다.
- Subgraph Matching이란, 데이터 그래프가 하나 주어지고, 쿼리 그래프가 주어져서, 데이터 그래프에서 $q$의 embedding을 모두 (또는 좀더 현실적으로, 가능한한 많이) 찾는 문제입니다. 

즉, subgraph matching을 푸는 알고리즘에게 embedding을 하나 찾고 return true 하도록 하면, subgraph isomorphism이 되고, 다시 이것을 여러 데이터 그래프에 대해 반복하면 subgraph search가 됩니다. 이 글에서는, 세 문제 모두를 대충 Subgraph Isomorphism이라고 퉁치고 맥락상 이해하기로 하겠습니다.

## Subgraph Isomorphism Algorithms
이런 어려운 문제에 대한 접근에는 크게 세 가지가 있습니다.
- 문제의 제약 있는 버전을 만들어서, 그 문제를 빠르게 풀고자 시도합니다. 주로 사용하는 접근으로는 **Chromatic Number**가 $k$ 이하인 그래프, **평면** 그래프, **Sparse**한 그래프 등에 대해 시도합니다. 이 방향의 연구는 주로 알고리즘이 다항 시간 비슷하게 줄어들며 (NP-Complete한 문제의 일부긴 하지만, 추가적인 조건을 제약했으므로 이게 가능합니다) 수학적으로 엄밀하게 증명합니다. 
- Randomized 알고리즘이나 최적화 형태의 알고리즘을 만들어서, expected time complexity를 줄이고자 합니다.
- 일반적인 Case에 대해, 휴리스틱하게 빠른 알고리즘을 찾고, 이를 큰 데이터셋에 대해 실험을 통해 검증하는 방향이 있습니다.

2020년 2학기에 인턴십을 진행하면서 주로 3번에 해당하는 쪽을 공부했는데, Sub-iso에서 2번은 어떤 식인지 잘 모르겠고 (본적 없습니다) 1번은 여러 재미있는 결과들이 있지만 아직 자세히 읽어보지는 못했습니다.

이 문제의 3번 접근에는 다시 크게 세가지 접근이 있습니다.
- Ullmann (1976) 으로부터 시작하는 Backtracking 기반의 알고리즘으로, 가장 자연스럽게 생각할 수 있는 백트래킹에 기반합니다.
- Artificial Intelligence 쪽에서도 이 문제를 상당히 중요하게 보고 있어서, 이쪽의 접근도 있습니다. Graph 위에서 뭔가를 열심히 학습시키는 방법입니다. 
- Contraint Programming 이라는 신기한 방법론에 기반하는 접근이 있습니다. 저는 이쪽을 잘 모르지만, 이론적으로 상당히 재밌는 내용들이 많다고 들었습니다.

2번은 주로 Graph mining 같은 방향으로 접근하여 약간 방향성이 다르기 때문에, 1번과 3번을 실질적으로 알고리즘적인 접근으로 볼 수 있습니다. 3번의 현재 SOTA는 Glasgow라는 프로그램이 있고, 1번의 경우 CFL-Match라는 알고리즘을 기점으로 CECI, DAF 등이 연구되었습니다. 

## Backtracking Algorithms
CFL-Match, CECI, DAF를 비롯하여 많은 알고리즘들이 크게 3단계로 이 문제를 해결합니다. Filtering - Matching order generation - Backtracking인데, 각각이 어떤 느낌인지 알아보겠습니다. 

### Filtering
Filtering이란, 도저히 매칭이 안되는 점들을 먼저 쳐내는 방법입니다. 이때 Candidate Vertex Set이라는 개념이 등장하는데, $q$의 정점 $u$에 대해 $u$가 매핑될 수 있는 $G$의 vertex들이라고 볼 수 있습니다. 예를 들어, Label이 다른 정점은 아예 고려할 필요가 없습니다. 조금 더 복잡한 예시로는, $q$에서 1번 정점으로부터 label이 $a$인 정점으로 가는 간선이 있는 상황을 생각해 보겠습니다. $G$의 정점 10번에 대해, 10번 정점의 neighbor들 중 label이 $a$인 정점이 하나도 없다면, $u_1$ 을 $v_{10}$으로 매칭하는 매핑은 존재할 수 없습니다. 이러한 정점들을 최대한 강하게 필터링해서 제거하면, 백트래킹할 대상이 줄어들 것입니다. 이때 Candidate vertex set은 $u_i$가 매핑될 수 있는 $v_j$ 들의 집합 $C_i$를 말하며, 알고리즘에 따라서는 이 과정을 좀더 잘 하는 방법을 제시하는 경우 자료구조의 이름이 달라지기도 하지만 대략적으로는 이렇습니다.

### Matching Order
문제의 특징 상, 어떤 순서로 정점들을 matching해 나가는지는 search space가 감소하는 속도를 좌우하는 매우 중요한 요소입니다. Backtracking을 하기 위해서는 이 matching order가 필요한데, 이후 백트래킹을 수행하는 순서 (정의상 $q_V$의 permutation) 를 matching order라고 부릅니다. 알고리즘마다 다른 matching order를 사용하게 됩니다. 

### Backtracking
백트래킹은 단순히 하면 되지만, 이 과정에서 다양한 최적화가 가능합니다. 먼저 백트래킹을 위해서는 extendable한 candidate를 잡아야 하는데...
1. 현재의 partial embedding $M$에서 사용했던 점들은 다시 사용할 수 없고 
2. 지금 내가 $u$를 보고 있다면, $u$의 neighbor들 중 $M$에서 이미 매핑된 정점들에 대해, 그 정점들 모두와 연결이 가능해야 합니다. 즉, $u_3$이 $u_1$, $u_2$ 와 연결되어 있고, $u_1, u_2$를 각각 $v_a, v_b$와 연결되어 있으면, $u_3$은 적어도 $v_a, v_b$와 연결된 점들 중에 골라야 한다는 것입니다. 
이 두가지가 가장 기본이 됩니다. 여기서 추가로 DAF의 경우 Failing set과 같은 최적화 기법들을 제시하기도 했습니다. 

## References / Papers
- Sun, S., & Luo, Q. (2020). **In-Memory Subgraph Matching: An In-depth Study**. Proceedings of the ACM SIGMOD International Conference on Management of Data, 1083–1098. https://doi.org/10.1145/3318464.3380581 : Subgraph Isomorphism 방법들을 비교하고, 이들을 모두 구현하여 통일된 프레임워크 위에서 실험한 논문입니다. 이 글은 거의 이 논문에 기반한 정리 포스팅인데, 논문의 메인인 실험 결과를 정리하지 않았기 때문에 그렇게 분류해놓지는 않았습니다. 

------

[^1]: 이부분의 증명은 이 글의 Scope를 너무 많이 벗어납니다. 