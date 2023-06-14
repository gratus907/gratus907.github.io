---
layout: single
title: "Graph Algorithms, Lecture 1 : Fixed subgraph Isomorphism"
categories: advanced-algorithms
tags:
  - graph
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

**참고 : Stanford CS267 lecture note**
## Subgraph Isomorphism
그래프 $G(V_G, E_G)$와, 다른 그래프 $H = (V_H, E_H)$ 에 대해, subgraph isomorphism $f : V_H \to V_G$ 는 $(u, v) \in E_H$ 이면 $(f(u), f(v)) \in E_G$ 인 vertex mappint $f$로 정의한다. 일반적인 그래프 $G$에서 $H$를 찾는 문제는 NP-Hard이고, 나한테는 첫 랩 인턴 주제기도 한 매우 재미있는 문제인데, 이 포스팅에서는 특수한 케이스들만 다룰 예정이다.

일반적으로, 이러한 문제를 접근하는 경로는 크게 두가지가 있다. TSP, Vertex cover, Ham-path 등등도 다 비슷한 느낌인듯 하다. 
- Heuristic하게, 일반적인 그래프에 대해 빠르게 (사실은 덜 느리게 라는 말이 맞을 지도...) 푸는 방법을 찾으려는 노력. 다항 시간을 목표로 하지는 않는다.
- 특정한 형태의 그래프 (평면 그래프, $k$-cycle, bipartite graph, ....) 등등에 대해 다항 시간 또는 이에 근접한 알고리즘을 연구하는 경우. 좀더 classic한 느낌도 있고...아무튼 그렇다. 그래프의 classification과도 매우 깊은 연관이 있고, 무슨 3-colorable graph에 대해서만 성립하는 알고리즘 같은 신기한 것들을 연구하는듯 하다.

자명한 알고리즘은, $V_G$에서 모든 가능한 $V_H$개를 조합해서, 일일히 가능한지 확인하는 것으로, $V_G$ 를 $N$, $E_G$의 크기를 $M$, $V_H$의 크기를 $n$이라 할 때 $O(MN^n)$ 시간이 걸린다. 찾아야 할 그래프가 정해져 있다면 $M$을 시간복잡도 계산에서는 제껴도 되고, 그래도 $O(N^n)$ 시간인 것은 변함이 없다.

## Finding Triangles
$n$개의 정점과 $m$개의 간선이 있는 그래프에서 삼각형을 찾으려고 할 때, 위 **자명한** 알고리즘은 $O(n^3)$ 시간이 걸린다. 이보다 나은 방법이 있는지 생각해 보자.

문제를 명확히 정의하기 위해, 문제의 답을 True / False 로 답하기로 하자. 즉, 삼각형이 있는지 유무만 판정하고, (시간적 손해가 없다면 삼각형을 돌려줄 수 있겠지만)
### $O(mn)$ 알고리즘 
다음 알고리즘은 생각하기 별로 어렵지 않고, $O(mn)$ 인 것도 거의 자명하다.



<fieldset>

<legend>
pseudocode
</legend>

<pre class="pseudocode" style="margin:0">
for v in V: 
  for s, t in N(v):
    if (s, t) in E:
      return (v, s, t)
</pre>
</fieldset>

이 알고리즘의 소요 시간은 결국 $\sum_v d_v^2$ 인데, 
$$\sum_v d_v^2 \leq n \sum_v d_v \leq 2mn$$
이므로, 이는 $O(mn)$ 알고리즘이다.  
쉽게 생각나는 아이디어가 늘 그렇듯, 큰 의미가 있지는 않다. dense graph에서 $m = O(n^2)$ 이라서 최악의 경우 시간 복잡도가 전혀 개선되지 않기 때문이다. (물론 실제로는 조금 빠르겠지만).

### $O(n^w)$ 알고리즘 
행렬을 이용하는 방법이 있다. 먼저, 그래프의 adjacency matrix $A$를 생각하자. 이때, $A[i, j]$ 는 (i, j) edge가 있는지 여부이고, $A^2[i, j] > 0$ 은 $A[i, k] = 1, A[k, j] = 1$ 인 $k$가 있는지 여부를 알려준다. 따라서, $A^2$ 을 계산한 후, $A^2[i, j]$ 가 1이고 $A[i, j]$ 가 1이면 (실제로 찾지는 못하지만) 삼각형이 존재한다는 사실은 알 수 있다. 우리는 앞서 이걸 목표로 했으므로, 행렬 곱셈 하는 시간 + $O(n^2)$ 에 삼각형 찾기가 가능함을 보였다. 

현재 알려진 행렬 곱셈 알고리즘 중 가장 빠른 Coppersmith-winograd 및 그 개선된 버전들 (Le Gall, Williams 등) 이 $O(n^{2.37})$ 정도이고, 이 부분이 더 빨라질지 어떨지는 알 수 없지만 $O(n^2)$ 보다는 느리기 때문에 행렬 곱셈의 시간 복잡도를 $O(n^w)$ 라 쓰고, 대충 현재로써는 2.37 정도임을 기억하자.  

다만 $w = 2.37$ 알고리즘은 현재로서는 실용적으로 사용하기 어렵다. 현실적으로 이 알고리즘은 너무 큰 상수를 가지고 있어 실제로 다룰 수 있는 크기의 행렬에 대해서 전혀 빠르지 않기 때문이다. 시간 복잡도 증명에 의의가 있다. 실용적으로 빠른 방법은 Strassen의 알고리즘으로, $w = \log_2 7 \approx 2.81$ 이지만 실제로는 더 빠르다. 

굉장히 재밌는 사실 중 하나로, 다음 명제가 있다. 증명은 trace를 합으로 쓰고 나서 조건을 잘 생각해 보면 그렇게 어렵지 않은데, 힌트를 조금 제시하자면 6은 $i, j, k$ 의 삼각형이 순서가 없으므로 $3!$을 나누어 준 것이다. 

$$\text{Tr}(A^3) = \text{number of triangles of graph A}$$

어차피 $A^3$의 trace 연산을 행렬 곱셈보다 빠르게 하는 알고리즘이 연구되지 않았기 때문에 우리의 큰 관심사는 아니다.

### $O(m^{(w + 1)/2})$ 알고리즘
이 알고리즘은 위 두 아이디어를 적당히 섞어내는 방법이다.

어떤 parameter $t$를 잡아서, degree가 $t$ 이하인 정점과 이상인 정점으로 나누자. 이하인 정점들 (low-degree) 정점에 대해서, $O(mn)$ 알고리즘 비슷한 것을 돌린다. 이러면, low-degree 정점을 하나라도 포함하는 모든 삼각형을 찾을 수 있다. 이제 low-degree 정점은 모두 상관 없으므로 삭제한다.

남은 정점들은 모두 high-degree임이 보장된다. 남은 정점들에 대해서는 위의 행렬 곱셈을 돌리자. 이제, 이 알고리즘의 시간 복잡도를 증명해 보면,

모든 정점의 degree의 합이 $2m$ 이므로, 최대 $2m/t$ 만 high-degree vertex가 존재할 수 있다. 또한, low-degree 정점에 대해서는, 각각의 degree가 $t$ 이하이고, degree의 총합이 $2m$ 이하이므로, degree의 제곱의 합은 $2mt$를 넘지 않는다. Asymptotically, 이렇게 구성된 알고리즘의 시간 복잡도는 

$$O((m / t)^w + mt)$$ 이며, 이를 최소화하는 $t$를 직접 찾으면 $t^{w+1} = m^{w-1}$일 때임을 알 수 있다. 우리가 아는 최선의 $w = 2.37$ 을 쓰면 이 알고리즘의 시간 복잡도는 $O(m^{1.41})$ 이 된다.

## Why triangles?
왜 삼각형을 찾는 문제가 중요한가? 당연히, 알고리즘이 자명하지 않은 가장 쉬운 그래프이기도 하지만, 다음의 정리 때문이기도 하다. 

**Theorem (Nesetril, Poljak)** $n$개의 노드를 갖는 그래프에서 $O(n^t)$시간에 삼각형을 찾는 알고리즘이 존재한다면, $3k$개의 노드를 갖는 fixed subgraph $H$를 $O(n^{tk})$ 시간에 찾을 수 있다.

간단히 말해서, 삼각형을 찾는 문제는 모든 $k$개의 노드를 갖는 graph isomorphism으로 확장할 수 있음을 의미한다. 삼각형을 $O(n^{2.5})$에 찾을 수 있다면, 9개의 노드를 갖는 subgraph는 $O(n^{7.5})$ 에 찾을 수 있는 식이다. 물론 끔찍하지만, brute-force보다는 훨씬 빠르다!

### Nesetril-Poljak Subgraph isomorphism 
위 정리의 증명은 사실 Nesetril과 Poljak이 1985년에 제시한 알고리즘이다. $3k$개의 노드를 갖는 subgraph를 $H$라 하고, 이를 아무렇게나 $k$개의 노드씩 끊어서 $H_1, H_2, H_3$을 만들자. 각 $i = 1, 2, 3$ 에 대해, $h_{j}^{i}$ 를 $H_i$의 $j$번째 정점이라고 하자.

$G'$ 을 다음과 같이 정의한다. $G$에서 정점을 $k$개 (순서를 가지고) 뽑은, $n^k$ 개의 tuple에 대해서, 이 tuple이 (정점의 순서를 지키면서) $H_1, H_2, H_3$과 isomorphic한지 확인해서, $H_i$와 isomorphic하다면 $(i, [tuple])$ 을 통째로 하나의 정점으로 삼는다. 즉, 무려 최대 $3n^k$개의 정점을 갖는 거대한 그래프를 만든다.

이제, $(i, tuple_1)$와 $(j, tuple_2)$ 를 $G'$의 정점 2개로 잡고, $(tuple_1 \cup tuple_2)$가 $H_i \cup H_j$ 와 isomorphic하면 $(i, tuple_1)$ node와 $(j, tuple_2)$ node 사이의 edge를 잇는다. (단, tuple 두개가 disjoint해야만 한다) 

어렵지 않게, $H$가 $G$에 subgraph로 들어 있다면, $G'$에 삼각형이 있음을 알 수 있다. 마찬가지로 $G'$에 삼각형이 있으면 그걸 잘 이용해서 $H$를 역으로 construct할 수도 있다. 따라서, 이 알고리즘의 정당성은 쉽게 생각할 수 있다. 

시간 복잡도는, 총 $O(n^k)$개의 노드들 사이에 모두 edge 여부를 확인해야 하므로 $O(k^2 n^{2k})$ 시간에 걸쳐 graph construction을 해야 하고, $O(n^{k})$개의 노드를 갖는 그래프에 $O(N^t)$ 삼각형 찾기를 해야 하므로 $O(n^{tk})$ 시간이 든다. $k$를 상수로 생각하기로 했으므로 전부 $O(n^{tk})$임을 알 수 있다. 

참고로, 이 알고리즘을 조금만 잘 변형하면 $O(n^{tk + q})$ 시간에 $3k + q$ ($q = 1, 2$) 에 대한 경우도 해결할 수 있다. 또한, 우리는 $t \geq 2$ 임을 알고 있는데, 일단 그래프를 다 받기는 해야 하기 때문(...). 그러므로 이 방법으로 우리가 얻을 수 있는 최대한은 $O(n^{2k})$ 시간에 $3k$짜리 문제를 푸는 것이다. (Naive는 $O(n^{3k})$ 이므로, 어쨌든 상당한 발전이다).  