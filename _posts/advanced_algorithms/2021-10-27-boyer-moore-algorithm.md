---
layout: single
title: Boyer-Moore Heuristic Pattern Matching
categories: advanced-algorithms
comment: true
comments : true
tag: [study, algorithms, string-algorithms] 
---


## Motivation
Boyer-Moore 알고리즘이 해결하는 문제는 KMP와 똑같이, 어떤 $n$글자의 긴 텍스트 $T$에 대해, 짧은 $m$글자의 패턴 $P$를 매칭하는 것입니다. 
- 가장 Naive하게 $T$의 모든 위치에 대해 $m$글자를 매칭해보는 알고리즘은 $O(nm)$ 입니다. 
- [KMP 알고리즘](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm) 은 (언젠가 작성할 계획은 있지만 우선순위는 낮습니다) 이를 $O(n + m)$ 으로 줄인 엄청난 성과를 보입니다. 

Boyer-Moore 알고리즘은 worst case에서는 $O(nm)$이지만, string이 랜덤하게 주어진다면 평균 $O(n / m)$ 복잡도를 보입니다. 

기본적으로, 이 알고리즘은 패턴을 **오른쪽부터 왼쪽으로** 매칭하고, 문자열 자체는 (즉 매칭하는 위치 자체는) **왼쪽에서 오른쪽으로** 봅니다. 이 방향의 차이에 주목할 필요가 있습니다. KMP의 경우는 패턴과 텍스트 모두 좌 -> 우 로 매칭합니다. 가능한한 '첫', '두번째' 와 같은 말은 오른쪽에서 왼쪽으로 매칭하는 실제 세팅에, '1번', '2번' 등의 말은 진짜 인덱스를 의미하도록 작성했습니다. 

## Algorithm : Bad Character Heuristic
텍스트 `abcacbcadc` 에서 패턴 `acbcda`를 매칭한다고 생각해 봅시다. 이때, 뒤에서부터 앞으로 매칭을 시도하는 것은 텍스트 `abcacb` 와 `acbcda`를 매칭하는 것입니다. 여기서 첫 글자 (패턴을 **오른쪽부터** 읽으므로 텍스트와 패턴의 첫 글자는 각각 6번 위치인 b와 a입니다!) 를 매칭하려고 시도했을 때, a를 찾아야 하는데 b를 찾았으므로 실패했습니다. 

Naive matching은 여기서 포기하고 다음 위치인 `bcacbc`와의 매칭을 시도하겠지만, Boyer-Moore의 알고리즘은 여기서 "그럼 만약, 이 6번위치의 b를 꼭 써야 한다면, 어디까지 내가 패턴을 밀어야 b를 쓸 수 있느냐?" 라는 질문을 던집니다. 생각해보면 텍스트를 기준으로 패턴을 한칸 밀어봤자, 패턴의 5번 글자인 d와 b를 매칭하게 될 것이고 이는 어차피 실패할 것이기 때문입니다. 패턴의 맨 뒤를 기준으로 3글자를 밀어야 b를 텍스트 6번 b에 맞출 수 있으므로, 이만큼을 push해 버릴 수 있습니다. 여기서 이 'b' 를 **Bad Character** 라고 부를 것입니다. 

이를 좀더 정리하면...
- Bad character가 패턴에 아예 등장하지 않으면, 패턴을 확 밀어서 아예 넘어가도 됩니다. 
- Bad character가 패턴에서 **가장 오른쪽에** 등장하는 위치가 현재 보고있는 bad character의 패턴에서의 위치보다 왼쪽이면, 그만큼을 밀어도 됩니다. 
- Bad character가 패턴에서 **가장 오른쪽에** 등장하는 위치가 현재 보고있는 bad character의 패턴에서의 위치보다 오른쪽이면 얻을 수 있는 정보가 없습니다.  

## Algorithm : Good Suffix Heuristic 
이 방법은 자세히 설명하지 않을 것입니다. (이유는 후술합니다) Good suffix란, 어떻게 보면 위 Bad character의 3번 경우에 얻는 정보가 없음을 거꾸로 이용하는 방법인데요. 3번 경우는 아마도 꽤 많은 글자들이 맞은 다음 처음으로 bad character를 만난 상황일 것입니다. 즉 pattern의 꽤 긴 suffix가 이미 맞고 있는 상황이라는 의미가 됩니다. 이 Good suffix를 패턴에서 다시 맞추려면 얼만큼 이동해야 하는지를 미리 모두 precomputation해 두면, 그만큼을 점프할 수 있습니다. 당연히 맞는 suffix가 길수록 이 suffix를 다시 맞추기가 어려울 것이므로, 꽤 멀리 점프할 수 있을 것 같습니다. 이 precomputation은 "Pattern의 길이 k인 suffix가 다시 suffix로 등장하는 pattern의 prefix 위치" 를 마킹하면 되고, KMP의 실패함수와 매우 유사한 방법으로 구할 수 있습니다. 

## Boyer-Moore-Horspool Algorithm
Horspool의 알고리즘은 위 Boyer-Moore에서 Good suffix heuristic을 아예 포기하고, Bad character는 항상 현재 매칭 위치의 마지막 글자만 고려합니다. 이렇게 해도 평균 시간 복잡도 $O(n / m)$ 비슷한 시간을 유지할 수 있음이 알려져 있지만, 그 증명 과정은 엄청난 수식과 고통스러운 증명 (부등식 줄이기)을 요구합니다. 다만, 충분히 랜덤한 텍스트에 대해서는 B-M-H가 굉장히 빠름이 잘 알려져 있습니다.

Horspool은 굉장히 쉽게 구현할 수 있습니다. 먼저 각 character에 대해 패턴의 오른쪽 끝에서 가장 가까운 (하지만 오른쪽 끝은 아닌) 등장 위치를 계산해 두고, bad character에 걸리면 그만큼 push하면 됩니다. 

여기서는 정말 러프한 증명...도 아니고 argument를 하나 소개하고 마치겠습니다. 알파벳 $q$글자 중 랜덤하게 생성된 string $P, T$에서의 Horspool 알고리즘을 가정하겠습니다. 이중 한 글자가 패턴의 오른쪽 끝에서 얼마나 멀리 있을지 그 기댓값을 생각해 봅시다. 알파벳 $x$를 이용하여 $k$길이 이상의 jump를 허용하기 위해서는 뒤에서 $k-1$개의 글자는 $x$가 아닌 다른 글자여야 하므로, 점프 길이가 $k$ 이상일 확률은 $\left(1-\frac{1}{q}\right)^{k-1}$ 입니다. $r = \left(1-\frac{1}{q}\right)$ 로 쓰면 편하게 이를 $r^{k-1}$ 로 쓸 수 있습니다. 

$\expect{X} = \sum_{k = 1}^{\infty} \P(X \geq k)$ 의 공식을 이용합니다. $k \geq m+1$의 확률은 0이므로, 
$$\expect{\text{jump length}} = \sum_{j = 1}^{m} r^{j-1} = \frac{r^m - 1}{r - 1}= q(1 - r^m)$$

따라서, $m$이 충분히 크면 대충 $q$ 정도의 shift는 기대할 수 있으므로, $O(n / q)$ 정도의 퍼포먼스는 기대해 볼 수 있습니다. 당연히 이는 각 글자가 iid random이라는 이루어지지 않는 가정이 들어갔을 뿐만 아니라, 각 위치에서 bad character를 만나는 데 걸리는 매칭개수도 무시하고 있지만, 간단한 argument로는 그럭저럭 기능합니다. 