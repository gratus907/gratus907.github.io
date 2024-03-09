---
layout: single
title: "12월 알고리즘 문제풀이"
categories: competitive-programming
sidebar:
  nav: "sidepost"
comment: true
comments : true
toc : true
orig-authors: 
venue: 
tag: [competitive-programming] 
distill_tag: "Competitive Programming"
---

앞으로 PS 포스팅은 월 1-2회정도는 해보려고 생각하고 있습니다.

------
### Atcoder Beginner Contest 331F. Palindrome Query
`Atcoder Beginner 331F`  
난이도: <span style="color: rgb(0, 0, 255);">1666 (Atcoder)</span> 

**문제 요약:** 문자열 $S$에 대해, 다음 두 쿼리가 주어진다. (문자열 길이 $10^6$, 쿼리 개수 $10^5$)
1. `1 x c`: $S$의 $x$ 번째 문자를 $c$로 바꾼다
2. `2 l r`: $S$의 $[l, r]$ 부분 문자열이 Palindrome인지 판정하라.    


<details markdown='1'>
<summary><b>풀이 보기:</b></summary>
1번 쿼리 (문자열 업데이트) 가 없다면 당연히 Manacher's algorithm으로 선형 시간에 전처리하고 쿼리당 $O(1)$에 답할 수 있습니다. 

그러나, Manacher's algorithm은 문자열 업데이트에 대응할 수 없습니다. 대신에, 이 문제의 경우 **Rabin-Karp** 해싱을 이용하면 됩니다. 

Rabin-Karp 해싱에서, 문자열 $a_0\dots a_{L-1}$은 $\sum_{i = 0}^{L-1} a_i x^i \mod M$ 으로 해싱됩니다.
(이때 $M$ 으로는 일반적으로 소수를 사용하고, $x$는 $M$과 서로소이면 큰 문제가 없는 것으로 알고 있습니다. 저는 습관적으로 29 (대소문자가 있으면 61), 10억7 정도의 $x$와 $M$을 씁니다.) 

이러한 해싱을 이용하면, 문자열 $A$와 $B$가 주어졌을 때, $AB$ concatenation 의 해시값을 $h(A) \times p^{\text{len}(B)} + h(B)$ 로 $O(1)$에 빠르게 계산할 수 있습니다. 
($p^{\text{len}(B)}$ 를 계산하는 데 원래는 $\log$ 시간이 걸리지만, 이것은 전처리해 놓는다고 생각하고) 

따라서, Segment tree를 만들어서, 각 노드가 **자신이 담당하는 부분문자열의 해시값** 을 가지고 있게 한다면, 이 값을 빠르게 업데이트할 수 있습니다. 

이제, 실제로는 팰린드롬인지를 판정해야 하므로, $S$와 $\text{reverse}(S)$ 에 대한 segment tree를 각각 만듭니다. 
1. 1번 쿼리에 대해서는 양쪽의 적절한 인덱스에 업데이트를 수행하면 $O(\log N)$ 시간에 처리 가능합니다. 
2. 마찬가지로, $S$의 $[l, r]$ 과 $\text{reverse}(S)$ 의 $[N-r-1, N-l-1]$ 인덱스의 해시값을 만들어 비교하면 됩니다.

해시 충돌이 약간 걱정되지만,  **설마 그렇게 사악하겠느냐** 는 믿음을 가지고 제출했습니다. 
</details>

------

### Atcoder Beginner Contest 333F. Bomb Game 2
`Atcoder Beginner 331F`  
난이도: <span style="color: rgb(0, 0, 255);">1770 (Atcoder)</span> 

**문제 요약:** $1, 2, \dots N$ 번 사람이 줄에 서 있을 때, 맨 앞 사람에 대해 다음 '시행' 을 반복한다. 

> 맨 앞 사람을 $1/2$ 확률로 제거하고, 만약 제거되지 않았다면 맨 뒤로 보낸다. 

이 시행을 한 사람만이 남아 있을 때까지 계속 반복할 때, $i$번째 사람이 마지막으로 남아 있게 될 확률을 구하시오. 

<details markdown='1'>
<summary><b>풀이 보기:</b></summary>
대회중에는 약간의 실수로 해결하지 못했지만, 재밌는 확률 DP 문제라고 생각했습니다. 

$D(i, j)$ 를 $i$명이 줄에 남은 채로 $(1 \dots i)$ 이 작업을 시작할 때, 이때의 $j$번째 사람이 마지막으로 남는 사람일 확률이라고 정의합니다. 
이제, 우리가 원하는 값은 $D(N, j)$ 들을 구하면 됩니다. 

$D(i, 1)$ 을 구하는 과정을 생각해보면, $1/2$ 확률로 이 사람이 사라지고, $1/2$ 확률로 줄의 맨 뒤로 가게 됩니다. 이는 즉, 
$$D(i, 1) = \frac{1}{2} D(i, i)$$
식이 항상 성립합니다. 이제, 나머지 $D(i, j)$ 를 생각해보면, $j$번째 사람이 마지막 사람이기 위해서는 
- 맨 앞사람이 제거되고, 남은 $i-1$명중 $j-1$번째 사람이 마지막 사람이거나 
- 맨 앞사람이 제거되지 않고, 남은 $i$명중 $j-1$ 번째 사람이 마지막 사람인 
두 경우가 있습니다. 즉, 
$$D(i, j) = \frac{D(i-1, j-1) + D(i, j-1)}{2}$$
가 됩니다. $D(i, 1)$을 $x$로 놓고, $D(i, *)$ 들의 합이 1임을 이용하여 $x$의 값을 찾은 후, 나머지 값들을 모두 찾으면 $O(N^2)$ 시간에 풀 수 있습니다.
</details>

------

### CERC 2019S. Saba1000kg
`BOJ 18180 / ICPC Central European Regional Contest 2019 S`  
난이도: <span style="color: rgb(0, 199, 139);">Platinum II</span> 

**문제 요약:** 정점과 간선이 $10^5$ 개 이하인 그래프에 대하여, 다음의 쿼리가 최대 $10^5$개 주어진다. 
- 정점 집합 $S$ 는 몇 개의 connected component로 구성되어 있는가? 

단, 주어지는 집합 $S$의 크기의 합은 $10^5$ 이하이다. 

<details markdown='1'>
<summary><b>풀이 보기:</b></summary>
굉장히 간단하지만, 복잡도를 맞추기 쉽지 않습니다. 정점 집합 하나에 대해서라면 union-find나 DFS를 이용하여 선형 시간에 판정할 수 있지만, 쿼리를 처리하기는 어려워 보입니다. 

관점을 달리하여, **선형 시간에 충분히 큰 집합도 해결할 수 있다** 라고 생각해 봅시다. 반대로, 작은 집합이라면 **모든 정점의 쌍들을** 확인해 볼 수 있습니다. 
즉, 어떤 $K$를 잡아서, 
- 집합의 크기가 $K$보다 작은 쿼리는, $K^2$ 시간에 모든 정점 쌍을 확인하면서 union-find를 하면 $O(K^2 \alpha(V))$ 시간에 풀 수 있고 
- 집합의 크기가 $K$보다 큰 쿼리는, 모든 간선을 한바퀴 돌면서 양쪽 끝점이 모두 $S$에 들어있을 때만 union-find를 하면 $O(E \alpha(V))$에 풀 수 있습니다. 

주어지는 쿼리의 크기를 $s_1 \dots s_Q$ 라 할 때, $\sum s_i \leq 10^{5}$ 이므로,  
첫번째 경우는 아무리 커도 $\sum_{i = 1}^{Q} s_i^2 \alpha(V) \leq K \times 10^5 \times \alpha(V)$ 를 넘지 않고, 
두번째 경우는 쿼리가 최대 $10^5 / K$ 개밖에 없으므로 연산량을 대략 $E \times 10^5 \times \alpha(V) / K$ 로 바운드할 수 있습니다.
따라서, $K = 10^{2.5}$ 정도로 잡으면 양쪽 모두를 $10^{7.5}$ ($\alpha(V)$ 항을 대충 무시하고) 정도로 맞춰볼 수 있습니다. 

일종의 sqrt decomposition 처럼 복잡도를 맞추는 이런 류의 트릭은 비교적 간단하면서도 굉장히 강력한것 같습니다. :)
</details>

