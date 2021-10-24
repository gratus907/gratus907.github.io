---
layout: single
title: Amortized Analysis
categories: advanced-algorithms
comment: true
comments : true
---
<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

**계산이론** 수업에서 배운 내용 정리.

## Amortized Analysis
우리는 일반적으로 어떤 알고리즘을 분석할 때, $O$, $\Theta$ 같은 asymptotic을 사용해서 분석합니다. 예를 들어, 연산 한번에 $O(n)$ 시간이 들고 그 연산을 $m$번 해야 한다면 전체 시간 복잡도는 $O(nm)$이 될 것입니다. 

이 방법은 유용하지만 어떤 알고리즘들은 이렇게 단순하게 분석할 수 없습니다. 대표적인 예시가 C++의 vector (dynamic array)입니다. 

vector의 모든 연산을 분석하지는 않더라도, 우리는 일단 이 연산을 원합니다.  
- 맨 뒤에 push하는 연산이 $O(1)$ 비슷한 시간에 작동하기를 원합니다.
- 맨 뒤에서 pop하는 연산이 $O(1)$ 비슷한 시간에 작동하기를 원합니다.

즉 우리는 일단은 stack 형태로 생각할 것입니다. 그러나...
- 연속한 메모리만 사용하여, 바로 index를 확인할 수 있어야 합니다. stack을 링크드 리스트로 구현하면 위 두가지를 지키기 쉽지만, 대신에 `vec[17]` 같은 것을 바로 확인할 수가 없습니다. 동적 배열은 이것이 가능해야 합니다.

그런데, 이 두 조건은 뭔가 이상합니다. 배열의 원소들이 연속한 메모리를 점유해야 한다면 계속 push를 하다가 언젠가는 더이상 그 위치의 메모리를 쓸 수 없게 되고, 그러면 모든 원소들을 어딘가로 옮겨야 하므로 그때 들어있는 원소의 개수만큼의 시간이 소요될 것입니다. 그러므로, 연속한 메모리를 점유하기 위해선 반드시 $O(n)$ 시간이 걸리는 push가 존재합니다.

이를 해결하기 위해, vector는 대략 다음과 같은 방법을 씁니다.
- size와 capacity를 분리합니다. size는 진짜 현재 들어 있는 원소의 개수를, capacity는 할당된 메모리를 말합니다.
- 만약 capacity가 다 차지 않았다면 push가 $O(1)$에 기능하게 하는 것은 쉽습니다.
- capacity가 다 찼다면, 현재 모든 원소들을 새로운 곳으로 옮기되, capacity가 현재 크기 +1이 아니라 현재의 두 배가 되게 잡습니다. 

이렇게 하면, move 하는 연산이 가끔씩만 일어나기 때문에, **평균적**으로는 빠릅니다. 이와 같이, 매 operation의 cost를 생각하는 대신, 여러 operation의 cost를 묶어서 그 평균을 계산하는 방법을 amortized analysis라고 부릅니다. 

주의할 점은, amortized analysis는 average case와는 다르다는 점입니다. 알고리즘 분석은 대부분 worst case를 기준으로 하는데 (최근에는 average case도 많이 나오긴 합니다), amortized worst case 도 생각할 수 있습니다. 한국어로 이를 자연스럽게 바꾸자면, "최악의 경우에도 각 연산은 평균 $O(1)$ 에 작동한다" 입니다. "평균적인 경우에 평균 $O(1)$" 이나, "평균적인 경우에 한번당 $O(1)$" 과는 다른 말입니다. 

## Three frameworks
Amortized analysis를 하는 방법에는 크게 3가지가 있습니다. 
### Aggregate method
$n$번의 연산에 걸리는 시간을 모두 더한 다음, $n$으로 나눕니다. 가장 단순한 방법입니다. 

-------
