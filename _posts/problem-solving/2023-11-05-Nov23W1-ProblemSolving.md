---
layout: single
title: "11월 1주차 알고리즘 문제풀이"
categories: Problem-Solving
sidebar:
  nav: "sidepost"
comment: true
comments : true
toc : true
orig-authors: 
venue: 
tag: [알고리즘 문제풀이] 
---

<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

예전 ICPC 준비했던 팀원들이 (아직 졸업을 하지 않아서) 올해 ICPC에 출전한다고 하여, 바쁜 일상에서 잠시 벗어나는 겸 해서 연습에 끼어들어 같이 풀었습니다. 오랜만에 (해커컵같은 대회를 제외하고) 순수히 즐길수있는 PS에 참여하니 굉장히 refreshing 한 느낌이었습니다. ㅋㅋ...

------
### AMPPZ 2011F. Laundry
`BOJ 7911 / Poland Collegiate Programming Contest (AMPPZ) 2011F.`  
난이도: <span style="color: rgb(0, 199, 139);">Platinum IV</span> 

문제의 서술이 매우 혼란스럽습니다. 스토리가 문제의 해석을 방해하는 전형적인 경우가 아닌가 싶은데... 아래에는 문제의 수학적인 formulation을 유지하면서 스토리를 단순화하여 기술합니다. 

**문제 요약:** 수열 $d_1, \dots d_n$에 대해, $a_i = 2d_i, b_i = 3d_i$ 라 하자. 1번부터 $K$번 색까지의 페인트가 각각 $l_1 \dots l_K$ 만큼 있고, 이것을 이용하여 $a_i$ 들과 $b_i$ 들에게 색깔을 칠하고자 한다.
최소 종류의 페인트를 사용하면서 다음의 조건을 만족하도록 할 때, 필요한 페인트는 최소 몇 종류인가?
1. 어떤 색도 서로 다른 $i$ 를 칠하는 데 사용할 수 없다 (즉, $a_2$ 와 $b_2$를 커버하는 것은 가능하나, $a_1$ 과 $b_2$ 를 커버할 수는 없음)
2. $a_i$ 와 $b_i$ 하나는 두 개 이상의 색으로 나누어 색칠할 수 없다. 

<details markdown='1'>
<summary><b>풀이 보기:</b></summary>
다음과 같은 그리디 알고리즘으로 해결할 수 있습니다. 처음에는 $a_i$ 와 $b_i$ 를 합쳐서 $i$번 작업으로 생각합니다. 
- 만약 한번에 $a_i$ 와 $b_i$ 를 하나의 $j$로 처리할 수 있다면, 당연히 그렇게 처리하고 싶습니다. 
- 만약 그렇지 못하다면, $a_i$ 와 $b_i$ 를 쪼개어 각각의 작업으로 만들어야 합니다. 
- 이렇게 작업을 나누고 나면, 최대한 다른 작업의 수행을 방해하지 않기 위해서는 '이 작업을 수행할 수 있는 가장 작은 $l_j$' 를 가지고 가야 합니다.
- "쪼개진 작업" 은 지금 처리하지 않으면 미래에는 처리하지 못하게 될 수도 있으므로 (다른 작업을 하다가 큰 색깔들을 써버려서), 우선 처리해야 합니다.
시간복잡도는 priority queue와 set/multiset 같은것을 잘 사용하면 $O(n \log n)$에 할 수 있습니다.
</details>

------

### CTU Open Contest 2004E. Electricity
`BOJ 6672 / CTU Open Contest 2004E.`  
난이도: <span style="color: rgb(0, 199, 139);">Platinum III</span> 

**문제 요약:** 그래프 $G$가 주어진다. 이때, 한 정점(과 그 정점에 이어진 간선들)을 삭제하여, 그래프의 Connected component의 개수를 최대화하라.

Note: :angry: 예제가 정말 아무런 도움이 되지 않습니다. :rage:

<details markdown='1'>
<summary><b>풀이 보기:</b></summary>
단절점 알고리즘은 대략 다음과 같습니다. DFS tree를 만들면서 방문시간을 기록하는데,
- 루트에서는 child의 개수가 2개 이상이면 단절점이고 
- 루트가 아닌 점에서는, 내 DFS-서브트리들 중 '나보다 방문시간이 빠른 정점' 을 방문할 수 없는 서브트리가 있다면 단절점입니다. 
이때, 위 알고리즘은 사실 '단절되는 component' 가 무엇인지도 찾을 수 있습니다. 
- 루트를 지우면 서브트리들이 각각 단절되는 component고 
- 루트가 아닌 점에서는 '문제의 서브트리' 들이 각각 단절되는 component입니다. 
따라서, 단절점 알고리즘을 약간 변형, $O(V + E)$ 에 해결할 수 있습니다. 

주의: 간선이 0개인 경우, 정점은 하나를 지워야 하므로 (정점 개수) 가 아니라 (정점 개수 - 1)이 답이 됩니다. 
예제에 이것마저 없었다면 아무도 맞추지 못했을 것 같습니다. :rage:
</details>

------

### AMPPZ 2012H Hydra / 경기과학고 2016 나코더 송년대회 F 장비를 정지합니다
`BOJ 7981 / Poland Collegiate Programming Contest (AMPPZ) 2012H / 경기과학고 나는코더다 송년대회 2016F`  
난이도: <span style="color: rgb(0, 199, 139);">Platinum II</span> 

이렇게 한문제에 전혀다른 출처가 두개 이상 달리는게 간혹 있던데, 문제를 가져다 쓴건지 뭔지 잘 모르겠네요. 

문제 statement가 충분히 concise하게 잘 쓰여져 있어, 원문으로 충분한 것 같아 바로 풀이만 작성합니다. 

<details markdown='1'>
<summary><b>풀이 보기:</b></summary>
Dhdroid가 알려주지 않았다면 아마 해결하기 힘들었을것 같습니다. solved.ac 난이도에 비해 훨씬 어렵다고 생각합니다.  

약한충격의 코스트 $u_i$ 와 강한충격의 코스트 $z_i$에 더하여, "진짜 최소 코스트" $x_i$ 가 있다고 생각하겠습니다. 다음을 관찰하는 것이 매우 중요합니다. 
- $N$개의 장비들 중, **가장 싼값에 강한 충격을 가할수 있는** 장비 $k$에 대하여, $x_k = z_k$입니다. 
- **증명:** 약한 충격에 의해 열리는 장비의 리스트가 비어있지 않음이 주어졌으므로, 약한충격을 이용해서 장비 하나를 (깨끗하게) 닫기 위해서는 다른 어디선가는 강한충격을 써야만 합니다. 
- 또한, 만약 어떤 $x_k$ 가 정해졌다면, $k$를 '여는' 약한 충격들에 대해, 이것들이 $k$를 연다고 하는 대신 약한 충격의 가격을 $x_k$만큼 올려버려도 답이 바뀌지 않습니다. 
- 따라서 다익스트라 알고리즘과 비슷한 방법으로 구현할 수 있습니다.

시간복잡도는 장비의 개수 $N$과 간선개수 ($r_i$들의 합) $R$에 대해, $O(N \log N + R)$ 시간에 구현할 수 있습니다.  

[코드 링크](http://boj.kr/649f9cfb8f2f4610a209b8366d6d4447)
</details>

------

### CERC 2012 I The Dragon and the Knights
`BOJ 3413 / ICPC Central European Regional Contest 2012 I`  
난이도: <span style="color: rgb(0, 199, 139);">Platinum I</span> 

**문제 요약:** 평면상에 $N$개의 직선과 $M$ 개의 점이 주어질 때, **직선으로 인해 나누어지는 평면의 영역** 하나당 점이 적어도 한개씩 들어있는지 여부를 판정하라. 

<details markdown='1'>
<summary><b>풀이 보기:</b></summary>

직선 $N$개가 주어졌을 때, 이로 인해 나누어지는 영역이 몇 개인지는 **오일러 공식** 으로 구할 수 있습니다. 직선과 직선들이 만나는 교점들을 정점으로 보면, 전체는 평면 그래프가 됩니다. 
따라서, $V - E + F = 2$ 에 따라, $V$ 와 $E$ 를 알고 있으므로 $F$를 구하면 됩니다. 

각 영역마다 점이 하나씩 들어있는지 여부를 판정하는 것은 어려운 일이므로, $M$개의 점이 서로 다른 영역을 몇개 커버하는지로 문제를 바꾸어 풀 것입니다. 
각 점 $x$에 대해, $f(x)$를 $N$ 차원의 boolean vector로, $f(x)_i$ 는 $x$가 $i$번째 직선의 오른쪽에 있는지 (CCW) 여부로 정의합니다. 
이제, 각 '영역'은 $f(x)$ 가 서로 다른 점들의 집합이므로, $N$개의 점에 대해 각각 $f(x)$ 벡터를 구하고, 이들중 서로 다른 것이 몇 개인지를 판정하면 됩니다. 

저는 $M$개의 점들을 집합으로 관리하고, 직선을 하나씩 추가하면서, 오른쪽과 왼쪽에 있는 점들이 갈린다면 새로운 집합으로 갈라주는 식으로 구현했습니다. 이렇게 하는 경우, 빈 집합을 만들지 않는다면 $M$개 이상의 파티션을 나누는 일은 없으므로 $O(N^2 + NM)$ 시간 알고리즘을 구현할 수 있습니다 ($N^2$는 교점을 모두 구해야 하므로) 

기하 문제가 늘 그렇듯 교점을 주의해야 합니다. 다만, 이 문제의 경우 서로 다른 세 직선이 한 점에서 만나지 않는다는 것을 보장하므로, 직선들을 방향벡터에 따라 나누어 관리하면 쉽게 할 수 있습니다. 

Note: 구현해보지는 않았지만, $f(x)$를 모두 구한 다음, 벡터들을 해싱하거나 정렬해서 비교하기만 한다면 훨씬 쉽게 구현할 수 있을 것입니다. 
</details>

------

### CERC 2012 B Who Wants to Live Forever?
`BOJ 3406 / ICPC Central European Regional Contest 2012 B`  
난이도: <span style="color: rgb(0, 158, 229);">Diamond V</span> 

**문제 요약:** 0 또는 1의 값을 갖는 수열 $x_1 \dots x_N$이 다음 recurrence에 의해 시간에 따라 변화한다. ($\oplus$ 는 XOR)
$$x_i(t) = x_{i-1}(t-1) \oplus x_{i+1}(t-1)$$ 
(단, 맨 왼쪽과 오른쪽에 벽으로 막힌 값은 0으로 간주) 무한히 많은 시간이 지났을 때, 수열 전체가 $x_i = 0$이 되는가? 

<details markdown='1'>
<summary><b>풀이 보기:</b></summary>
일종의 콘웨이 생명 게임 같은 문제입니다. 한참 고민하다가 풀이를 보고서야 정말 멋진 문제였음을 알게 되었습니다. 

- 먼저, 자명한 경우로 시작할 때 모두 0이면 정답은 True입니다.
- 그렇지 않을 때, $x_1, x_2, x_3, x_4$ 에서 1초가 지난 상황에서 수열은 다음과 같습니다. 
$$x_2 \quad (x_1 \oplus x_3) \quad (x_2 \oplus x_4) \quad x_3$$
이제, 여기서 더 시간이 지나면 
$$(x_1 \oplus x_3) \quad x_4 \quad x_1 \quad(x_2 \oplus x_4)$$
$$x_4 \quad x_3 \quad x_2 \quad x_1$$
이렇게 진행되게 되는데, 여기서 중요한 점은 수열의 길이가 짝수이기 때문에, 돌리다보면 $x_1, x_2, x_3, x_4$ 가 무한히 많이 반복된다는 점입니다. 
- 따라서, 짝수 길이 수열의 경우, 단 하나라도 0이 아닌 값이 있다면 이 0이 아닌 값을 지울수 없습니다. 
- 홀수의 경우 약간 다릅니다. $x_1, x_2, x_3, x_4, x_5$ 에 대해 위 예시처럼 진행해 보면, 
$$x_2 \quad (x_1 \oplus x_3) \quad (x_2 \oplus x_4) \quad (x_3 \oplus x_5) \quad x_4$$
$$(x_1 \oplus x_3) \quad x_4 \quad (x_1 \oplus x_5) \quad x_2 \quad (x_3 \oplus x_5)$$
$$x_4 \quad (x_3 \oplus x_5) \quad (x_2 \oplus x_4) \quad (x_1 \oplus x_3) \quad x_2$$
$$(x_3 \oplus x_5) \quad x_2 \quad (x_1 \oplus x_5) \quad x_4 \quad (x_1 \oplus x_3)$$
이렇게 변화하게 됩니다. 다시 여기서도 관찰해 보면, 
  - 짝수 인덱스들은 시간이 지남에 따라 원래대로 돌아오고, 
  - 홀수 인덱스들은 약간 까다롭지만, 홀수 인덱스를 생각하는 대신 1초가 지난 후의 짝수 인덱스들을 생각하면 이들도 같은 성질을 만족합니다. 
  - 따라서, $t = 0$에서의 $x_2(0), x_4(0) \dots$ 와, $t = 1$에서의 $x_2(1), x_4(1) \dots $를 따로따로 생각하면, 
  - 이들이 둘 모두 0으로 안정화되는 것은 전체가 안정화될 필요충분조건입니다. (이들은 서로 독립적이므로)
- 즉, 홀수 길이 수열은 두개의 더 작은 수열을 확인하는 것으로 문제를 줄일 수 있고, 
- 이는 Divide and Conquer로, Master's Theorem이 적용되므로 복잡도를 $O(n \log n)$ 으로 바운드할수 있습니다.
</details>
------

셋 총평: 문제가 이상하다고 생각했지만 항상 깊이 생각하다보면 이상한건 나라는 사실을 깨닫게 됩니다. 
특히 전혀 생각지 못한 다익스트라의 아이디어를 쓰는 3번이나, 분할정복으로 깔끔하게 맞추는 5번은 풀이가 깔끔하고 아름다운데도 정말 어려웠습니다. :cry: