---
layout: single
title: "[Study] Random Walk and Pagerank"
sidebar:
  nav: "sidepost"
comment: true
comments : true
toc : true
tag: [study, graph-algorithms, data-mining] 
---
<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

그래프 데이터 $G = (V, E)$ 가 주어졌을 때, 우리는 다음과 같은 두 질문에 답하고 싶습니다. 
1. 그래프에서 중요한 노드가 어디인가? 
2. 그래프의 특정한 정점 $u$ 의 입장에서 볼 때, 가장 연관이 깊은 노드는 어디인가?

전자의 질문에 답하는 가장 보편적인 방법이 Pagerank, 후자의 질문에 답하는 보편적인 방법이 RWR입니다. 이번 포스팅에서는 이 두개를 같이 간단하게 알아보려고 합니다.  
우리는 Directed graph를 기본 모델로 생각하겠습니다. 

## PageRank 
Pagerank는 Google이 검색 결과를 정리하기 위해 개발한 알고리즘으로, 웹페이지의 순위 (rank) 를 정하기 위해 고안되었습니다.

### Motivation
대략적인 motivation은 아래 두 가지입니다.

- 많은 페이지로부터 인용된 (링크가 걸린) 페이지는 **중요하다**
- **중요한** 페이지로부터 링크가 걸린 페이지는 **중요하다**

굉장히 직관적으로 말이 되는 원칙입니다. 

### Algorithm
기본적으로 Pagerank는 stochastic하게 매겨집니다. 즉, 어떤 노드 $i$의 pagerank값 $r_i$는 $i$뿐 아니라 스텝수 $j$ (시간이라고 받아들이면 됩니다) 의 영향을 받으며, $r_{i, j}$ 는 $r_{-, j-1}$ 들에 의해 계산된다는 뜻입니다. 

- 각 노드의 최초 중요도 $r_{i, 0}$ 은 편의상 $1/N$ 으로 정합니다. ($N$은 당연히 노드 개수)
- 이제, 업데이트 과정은 다음과 같습니다. $N(i)$ 는 원래 neighbor를 의미하지만, 잠시 'incoming neighbors' 만 생각하기로 하겠습니다. 즉 $N(i)$는 $i$로 들어오는 edge를 갖는 노드의 집합을 의미합니다. 대신, 반대로 $i$가 인용하는 노드의 집합을 $L(i)$ 라고 쓰겠습니다. 
$$r_{i, t} = \frac{1-d}{N} + d \sum_{c \in N(i)} \frac{r_{c, t-1}}{\abs{L(c)}}$$
- 나머지 값들은 대충 자명합니다. $d$는 Damping factor라 해서, 얼마나 빠르게 수렴할지를 정하는 상수값입니다. 통상 0.85 정도를 사용합니다. 
- 가장 자연스러운 언어로 설명하자면, 완전 랜덤하게 하이퍼링크를 클릭하는 가상의 surfer가 있을 때, $t$시간이 지난 후 이 surfer가 어디에 위치할지의 확률 분포를 계산하는 방식입니다. Damping은 여기서, 클릭을 멈추고 현재 노드에 정착할 확률을 제공합니다. 

### Linear Algebra PoV
지금까지의 논의를 선형대수학의 언어로 다시 써 보겠습니다. 
- 먼저, 인접행렬 $A$에 대해, $A$를 Normalize해서 각 열의 합을 1로 고정합니다. 이를 Markov matrix라고 부릅니다. 
- Markov matrix는 마르코프 체인을 나타내는 행렬이라는 뜻인데, 이러기 위해서는 Dangling node가 있어서는 안 됩니다. 위 construction은 이를 보장하지 않기 때문에, 전체를 connected component로 이어주기 위해 
  $$S = A + \frac{1}{N}\mathbb{1}e^T$$
  이런 행렬을 새로이 계산합니다. 여기서 $\mathbb{1}$ 은 모든 항이 1인 열벡터이고, $e$는 열의 값이 0인 dangling $j$에 대해서만 1인 벡터입니다. 
- Damping factor를 고려해서 최종적인 Google Matrix (실제로 이런 이름이 붙었습니다) 를 아래와 같이 만듭니다. 
  $$G = \frac{1-d}{N} \mathbb{11^T} + d S$$
- 선형대수학의 Perron-Frobenius 정리에 의하면 irreducible markov matrix는 시작점 $x_0$와 상관없이, $x_i = G x_{i-1}$ 연산을 반복하면 어딘가로 수렴함이 알려져 있습니다. 
- 선형대수학적으로, 이 행렬은 $0 < d < 1$ 에 대해 Unique Maximal Eigenvalue $\lambda = 1$ 을 가집니다. 이 Eigenvalue에 대응하는 eigenvector가 바로 pagerank vector입니다.  
- Iteration $x_{i} = G x_{i-1}$ 을 빠르게 수렴시키는 방법은 numerical linear algebra의 영역이며, $G$행렬은 일반적으로 엄청나게 크지만 대신 sparse하기 때문에 그냥 그대로 놓고 iteration을 반복해도 생각보다 빠르게 계산할 수 있습니다. 

------

## Random Walk with Restart
Pagerank가 global한 노드의 중요도를 계산해 주는데 반해, Random Walk (with Restart) 는 Local한 관점에서의 중요도를 제공합니다. 어떤 노드 $u$에 대해, 각 노드 $i$ 의 중요도 벡터 $r_i = C_{u, i}$를 계산한다고 생각하면 되겠습니다. 기본적인 관점 (random-surfer) 이 Pagerank와 똑같기 때문에, Personalized Pagerank 라는 이름으로 불리기도 합니다. [^1]

### Motivation
노드 간의 어떤 연관성을 찾는 방법은 보통 두가지를 생각해 볼 수 있을 것입니다.
- Path의 길이 기반 : Shortest path 등의 metric에 기반하는 방법들
- Flow 기반 : Flow network를 만들어서 Flow가 얼마나 흐를 수 있는지에 기반하는 방법들 

이 두 방법 모두, 명환한 한계가 있습니다. 예를 들어 SNS 그래프에서 나를 기준으로, A를 통해 B로, C를 통해 D로 갈 수 있다고 하겠습니다.  
이때, A가 수많은 사람을 알고 있는 유명인이고, C가 일반적인 친구라면, 나는 B보다는 D와 더 가까운 사이라고 판단해야 합니다. 그러나 위 두 방법들은 이러한 차이를 잡아내지 못합니다. 이런 점에서 Random walk는 A에서 갈수있는 노드가 많다는 점을 Penalize하기 때문에 보다 적절하다고 할 수 있습니다.


### Algorithm 
위 Pagerank와 똑같지만, 한 노드 $u$에서만 시작하기로 합니다. Notation의 편의를 위해 Adjacent matrix를 $A$로, 이를 normalize해서 얻은 Weight matrix를 $W$ 로 쓰겠습니다.  
RWR-vector는 다음 식을 통해 계산됩니다. 
$$r_{i} = dWr_{i-1} + (1-d) e_u$$
여기서 $e_u$는 시작노드 $u$만 1인 standard basis vector입니다.  
이 식이 벡터 $r$로 수렴한다고 하면, $r = dWr + (1-d) e_u$이므로, 이를 조금 정리하면 $(I - dW)r = (1-d) e_u$에서,
$$r = (1 - d) (I - dW)^{-1} e_u$$ 
이렇게 계산할 수 있습니다. 

### Fast Computation
이 알고리즘은 실제로 쓰기에는 상당히 느리기 때문에 (행렬곱셈 연산이 느리므로...) 다양한 방법들이 개발되어 왔습니다. 특히, Pagerank는 한번 돌리면 모든 노드에 대한 정보를 얻으므로 그 cost가 amortize되지만, RWR은 쿼리노드가 바뀌면 처음부터 다시 해야한다는 점에서, 쿼리당 복잡도가 매우 높습니다. 이를 개선하기 위한 방법들에 대해서는 별도 포스팅으로 다룰 예정입니다. 

------

[^1]: 공식적으로 발표된 논문에서는 아주 약간의 차이가 있으나, 식 정리의 문제이고 실제로는 identical합니다.