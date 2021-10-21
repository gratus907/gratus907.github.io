---
layout: single
title: "Fibonacci Heap"
categories: advanced-algorithms
tags:
sidebar:
  nav: "sidepost"
comment: true
comments : true
toc: true
---

**참고자료** : CLRS Chapter 19, [MIT Lecture Note](http://courses.csail.mit.edu/6.854/05/scribe/fibheaps.ps)

## Motivation
Minimum Spanning Tree를 찾는 Prim's algorithm이나, 최단 거리를 찾는 Dijkstra Algorithm에서 매우 중요한 역할을 하는 자료구조로 Priority queue가 있다. 두 알고리즘의 실행 과정을 보면, 다음 두 연산이 필요함을 알 수 있다.
- `insert(x, e)` : 자료구조에 간선 또는 정점과 그 가중치를 넣는다. 가중치는 간선 가중치거나 (Prim), 시작점에서 그 정점까지 오는, 현재까지 찾아진 최단 거리이거나 (다익스트라)...
- `pop_min()` : 최소 가중치를 갖는 간선/정점을 넣는다.

다익스트라 알고리즘을 구현하는 방법에는 여러가지가 있겠지만, C++의 일반적인 priority queue를 쓴다면 대략 이런 느낌으로 구현할 수 있을 것이다.
```cpp
bool relax(Edge edge, int u, int dist[])
{
    bool flag = 0;
    int v = edge.dest, w = edge.w;
    if (dist[v] > dist[u] + w && (dist[u]!=INF))
    {
        flag = true;
        dist[v] = dist[u]+w;
    }
    return flag;
}

void dijkstra(int dist[], int start, vector<Edge> graph[])
{
    fill(dist,dist+MX,INF);
    dist[start] = 0;
    priority_queue<Edge> pq;
    pq.push({start,0});
    while(!pq.empty())
    {
        Edge x = pq.top();
        int v = x.dest, w = x.w;
        pq.pop();
        if (w>dist[v])
            continue;
        for (auto ed : graph[v])
            if (relax(ed, v, dist))
                pq.push({ed.dest,dist[ed.dest]});
    }
}
```
다익스트라 알고리즘을 잘 보면, 개념적으로 우리가 찾고 싶은 것은 **가중치가 가장 작은 미방문 정점** 이다. 즉, 우리는 실제로는 **정점** 을 뽑고 싶지만, priority queue에는 실제로는 간선을 넣고 있다.   
다시 말해, 현재 방문한 점의 집합이 $S$ 고, 새로운 정점 $x$ 로 가고 싶을 때, 우리가 알고 싶은 것은 $d(x, S)$ 지만, priority queue에 실제로 넣은 것은 $s \in S$ 에 대해 각각의 $d(x, s)$ 를 갖고 있다. 물론 구현 자체에는 문제가 없지만, 이 과정에서 priority queue에 최대 $E$개의 엔트리가 들어가게 되므로 $E \log E$ 시간이 걸리게 된다.

왜 $d(x, S)$ 를 관리할 수 없을까? 이는, $S$ 가 계속 바뀌기 때문에, $d(x, S)$ 를 관리하려면 priority_queue에 다음 연산이 하나 더 필요하기 때문이다.
- `modify(x, v)` : $x$의 가중치를 $v$로 바꾼다.

그러나, 실제로 위 알고리즘을 수행하는 과정을 보면, modify는 약간 오버킬이다. $S$는 집합으로서 단조증가 (원소가 빠지지는 않고 추가만 된다) 이므로, $d(x, S)$ 가 수행 과정에서 단조감소함을 관찰하면, 필요한 연산을 다음과 같이 줄일 수 있다.
- `decrease(x, v)` : $x$의 가중치를 $v$로 **줄인다**.

여전히, C++의 priority_queue는 heap으로 구현되어 있기 때문에 위 연산을 지원하지 않는다. 위 연산을 빠르게 처리할 수 있는 자료구조가 바로 Fibonacci Heap이다.

## Fibonacci Heap
피보나치 힙은 실제로는 힙 성질을 만족하는 트리 여러 개로 구성된다. 즉, 트리 $T_1, T_2, \dots$ 가 힙 성질을 만족하며, 각 트리의 루트 노드들을 doubly linked list로 관리한다.   
여기서 힙 성질이란, 임의의 edge에서 parent node의 가중치가 child node보다 작거나 같게 하는 것이다. 단, 우리가 알고 있는 Binary Heap 과는 달리 임의의 힙 성질을 만족하는 트리를 이용할 것이다.

몇가지 변수와 용어롤 정의하고 가자.
- root list란, 당연히, root들을 이은 리스트를 말한다. 이를 $L$ 이라 하고, 그 크기를 $\abs{L}$ 이라고 쓰자.
- node `x`의 `rank(x)`는, 그 노드의 자식 노드의 개수를 말한다. 또한, 트리 $T_i$의 rank는 트리의 루트의 rank로 정의한다. 즉, 루트로부터 거리가 1인 노드의 개수.
- node `x`의 자식 노드 $y_1, y_2, \dots y_{\text{rank}(x)}$ 가 있는데, 이들의 인덱스는 항상 **추가된 순서대로** 매기며, 중간에 노드가 떨어지면 나머지의 인덱스를 업데이트한다고 본다. linked list에서의 순서를 생각하면 된다.
- 어떤 노드에 대해~ 라고 할 때, 우리는 항상 그 노드로 바로 연결되는 포인터가 있다고 간주한다. 이게 왜 중요한지는 나중에 나오게 된다.
- 각 노드마다 `mark` 라는 boolean 변수를 하나 둔다.
- Heap 성질을 만족하므로, 각 트리의 루트는 (다른 트리와 상관없이) 자기 트리에서 최솟값이다. 이들 중 다시 최솟값을 항상 가지고 있을 것이며, 이를 `global-min` 이라고 하자.
이제, 우리가 필요한 연산을 구현하기 위해, 이 자료구조에 대한 기본연산들을 정의해야 한다.

1. `INSERT(x)` : 모든 insert(x) 연산은, 노드 $x$를 새로운 트리의 루트라고 보고, 노드 한개짜리 트리를 root list 맨 뒤에 집어넣는 것으로 한다.
2. `MERGE(T1, T2)`: Merge 연산은, 힙 성질을 만족하기 위해, 두 트리의 루트가 갖고 있는 가중치 값을 확인해서, 큰 쪽을 작은 쪽의 자식노드로 밀어넣는다.
3. `CUT(x)` : root에 대한 cut은 아무것도 하지 않고, Root가 아닌 노드라면 그 노드를 루트로 하는 서브트리를 잘라서 root list 맨 뒤에 집어넣는다. 이때, 다음과 같이 경우를 나눈다.  
    - Parent node가 마킹되어 있지 않다면, Parent node를 마크한다.
    - Parent node가 이미 마킹되어 있다면, Parent node를 재귀적으로 cut 한다.  

즉, 이는 다시 말하자면 어떤 노드에 대한 마킹은 **자신의 child node 중 잃어버린(cut된) 노드가 있는지 여부** 에 대한 마킹으로 정의함을 말한다. root node는 cut되지도 않고, mark되어야 할 상황에서도 mark를 무시하기로 한다 (어차피 cut할 때 아무 일도 없으므로, 자동으로 재귀적 cut을 적용하였다고 생각해도 좋겠다)

각 operation의 time complexity를 생각하면, `INSERT` 와 `MERGE` 가 $O(1)$에 동작함은 당연하다. `CUT`의 경우, 재귀적으로 올라갈 수 있으므로, 최대 $O(H)$, 즉 트리의 높이만큼 재귀될 수 있다.   

이 기본 연산들을 이용해서, 다음과 같이 `POP-MIN` 과 `DECREASE` 를 구현한다.
- `DECREASE(x, v)` : 먼저, $x$ 를 `CUT` 해서 새로운 트리로 만든 다음 decrease를 실제로 수행한다. root를 decrease하는 것은 힙 성질이 절대 깨지지 않으므로 항상 가능하다. 필요하다면, `global-min` 포인터를 업데이트한다. (decrease 결과 현재의 global-min보다 작아졌다면).
- `POP-MIN()` : 우리는 `global-min` 의 포인터를 가지고 있으므로, pop해야 할 노드를 $O(1)$에 알 수 있다. 이 노드를 삭제하면서, 이 노드 아래에 달려있는 노드들을 모두 root list에 끼워넣는다. 즉, root list는 최대 `# of children of global-min - 1` 만큼 증가하게 된다. 이때, 다음과 같은 과정을 수행한다.
    - 이렇게 늘어난 `root list`를 다시 줄일 것이다. `rank`가 같은 두 tree를 merge 해서, `rank`가 하나 큰 트리를 얻는다. 이를 `rank`가 작은 쪽부터 반복적으로 수행해서, `rank`가 $k$ 인 트리가 모두 최대 하나씩만 있게 한다. 만약 처음에 랭크가 1인 트리가 4개, 2인 트리가 3개, 3인 트리가 1개 있다면, 1인 트리들을 합쳐서 `rank = 2` 인 트리를 2개 얻고, 이렇게 총 5개의 rank-2 트리를 합쳐서 rank-2 트리 1개와 rank-3 트리 2개를 추가하려 (0, 1, 3, 0), 마지막으로 이들을 합쳐 rank-4 트리를 하나 얻어 (0, 1, 1, 1)로 만드는 식이다.
    - 최종적으로 합쳐진 `root list`를 돌면서, `global-min`을 다시 직접 찾는다.

우리의 마지막 목표는, 이 연산들의 complexity가 insert, decrease, pop-min 각각이 Amortized $O(1)$, $O(\log n)$, $O(1)$ 임을 보이는 것이다.

## Time complexity의 증명

먼저, 다음의 **매우 중요한 Lemma** 를 보자. 이 Lemman는 이 자료구조의 이름이 **피보나치 힙** 인 이유이다.
### Maximum Rank Lemma 
피보나치 힙의 수행 과정에서 생길 수 있는 트리들에 대하여, `maximum rank of tree with n nodes` $= O(\log n)$  

피보나치 힙의 수행 과정을 보면, merge는 반드시 랭크가 같은 트리에서만 일어남을 관찰할 수 있다. 이를 Merge Rule 이라고 부르자.

이를 보이는 것은, 대략 다음과 같다. 먼저, $x$ 의 자식노드 중 $i$ 번째 노드를 생각해 보자. 이 노드는 적어도 $i$번째에 달린 노드이므로, 이 노드가 달려 있다는 것은 적어도 앞에 $i-1$개의 노드가 달린 상태였다는 뜻이다. 그러므로 $x$의 $i$번째 자식 $y_i$ 가 달리기 전에, $y_i$의 rank는 $i-1$ 이었을 것이다. 

여기서, $y_i$ 는 최대 1개의 자식 노드를 cut으로 잃어버릴 수 있다. 그 이상 잃어버린다면 mark의 원칙에 의해, $y_i$ 가 $x$로부터 떨어져 나갔을 것이다. 따라서, $x$의 $i$ 번째 자식은 적어도 $i-2$ 의 랭크를 갖는다.

이 원칙을 재귀적으로 적용하면, rank가 $k$ 인 가장 작은 트리의 크기를 $P_k$ 라고 할 때, 다음의 재귀식을 얻는다.
$$P_k \geq 1 + \sum_{i = 0}^{k-2} P_{i}$$

$k$ 번째 피보나치 수 $F_k$ 에 대해, 다음과 같은 사실이 잘 알려져 있다. 
$$F_k = 1 + \sum_{i = 0}^{k-2} F_{i}$$

다만, $P_0 = 1$, $P_1 = 2$ 를 이용하여 인덱스를 잘 맞추어 주어야 한다. 인덱스를 잘 맞추어 주면, $P_k$ 가 적어도 피보나치 수열만큼 빠르게 증가함을 안다. 그리고 피보나치 수가 $(1.5)^k$ 보다 빠르게 증가함이 잘 알려져 있으므로, $P_k$ 는 지수적으로 빠르게 증가한다. 반대로 말하면, 노드가 $n$ 개인 트리의 최대 rank는 $O(\log n)$ 임이 증명되었다. 

### Amortized Analysis
Amortized analysis 중 potential method를 사용하자. potential function $\phi$ 를 다음과 같이 정의한다.

$$\phi(DS) = \text{size of root-list} + 2 * \text{number of marked nodes}$$

$\phi(DS_0)$을 빈 피보나치 힙으로 생각하면 $phi(DS_i) \geq \phi(DS_0)$ 임이 자명하므로 위 함수는 potential function으로 valid하다.
$C_{\text{amortized}} = C_{\text{real}} + \Delta\phi$ 를 이용해서 분석해보면,

- `INSERT` : 실제 cost 는 $O(1)$ 이고, $\Delta\phi$ 는 root만 하나 늘어나므로 1임을 알 수 있다.
  
- `POP-MIN` : 실제 cost 를 먼저 생각하면, $O(1)$ 만에 노드를 지우고, 그 노드의 children의 수만큼, 즉 `rank(global-min)` 만큼 root list를 늘려야 한다. 이 값을 $r$ 이라 하자. 마지막으로, 모든 트리들을 돌면서 merge 할 수 있는지 여부를 확인해야 하는데, 이는 rank에 따라 버킷을 만든다고 생각하면 $O(\abs{L} + \text{maximum rank})$ 시간에 가능하다.   
$\Delta \phi$ 를 명확히 잡기 어려운데, 이렇게 생각해 보자. 일단 root-list 의 크기가 원래 얼마였는지는 알 수 없으나, `maximum rank` 값보다 커질 수는 없다. (`MERGE` 과정을 거치므로) 또한, marked node의 개수는 원래 marked였는지 알 수 없는 노드들이 root가 되면서 강제로 unmark 되는 과정을 거치므로, 반드시 줄어든다. 따라서, $\Delta \phi \leq$ `maximum rank` 정도는 알 수 있다. $\abs{L}$, 최대 랭크 둘 모두 $O(\log n)$ 이므로 `POP`연산은 amortize해도 $O(\log n)$ 에 이루어진다.

- `DECREASE` : Decrease를 어렵게 만드는 가장 큰 요인은 cut이 몇번 일어날지 알 수 없다는 점이다. 최악의 경우, cut은 `height of tree` 만큼 일어나는데, 이 값을 $h$ 라 하자. 이때, potential function의 변화량 $\Delta \phi$ 를 생각해 보면, 한번 cut이 일어날 때마다 marked node가 하나씩 줄어들고, root-list의 크기가 하나씩 늘어난다. 상수를 계산해 보면 $\Delta \Phi$ 가 $-h$ 임을 알 수 있다. cut을 하는 시간 외에, 나머지 연산들은 상수 시간에 벌어지므로, potential drop 을 actual cost와 합쳐 보면 amortized $O(1)$ 임을 안다. 

## Why then... 
우리는 이렇게 decrease-key라는 연산을 $O(1)$ 에 수행하는 놀라운 자료구조를 얻었다. 이제 dijkstra 같은 알고리즘을 구현할 때 priority queue에 vertex를 직접 때려넣고 decrease를 하는 식으로 구현하면 $O(V \log V)$ 다익스트라 알고리즘을 얻는다.

개인적으로 나는 한번도 이렇게 구현한 코드를 본 적이 없고 아마 읽는 사람도 마찬가지일텐데, 그 이유는 크게 두 가지로 들 수 있다. 
- 구현이 상당히 어렵다. DECREASE, POP 모두 포인터와 링크드 리스트를 매우 조심스럽게 잘 이용해야 한다. 
- 실제로 작성해보면 매우 느린데, binary heap이 그냥 배열에 인덱스를 잘 주는 식으로 정말 빠르게 구현할 수 있는 반면 Fibonacci heap은 필연적으로 포인터를 이용한 링크드 리스트 구조로 만들어야 하고, 단순 접근에 비해 이런 식으로 구현하면 몇 배의 상수가 붙는다. 

만약 $E$가 $V$에 비해 상당히 큰 dense graph 라면, priority queue를 스피드업하는 방법이 될 수 있겠지만, $E$ 가 $O(V)$ 내지는 그 언저리인 셋업에서는 별로 도움이 되지 않는다. 여기저기 찾아보니 $V$가 10만 단위, $E$가 $10^7$ 단위인 그래프에서는 빨라지긴 한다는 듯 하다.
