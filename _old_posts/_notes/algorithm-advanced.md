---
layout: page
title: Algo / DS ++ 
permalink : /advanced-algorithms/
description: Data structures & Algorithms
img: /assets/img/algorithm-1.png
importance: 1
category: Computer Science
---


## What is This? 

- PS에서 쓰는 알고리즘들 외에도 더 theoretical한 자료구조/알고리즘들에 대한 이해가 부족한 것 같아서 공부해 보기로 했습니다. PS에서도 요즘은 더 높은 레벨로 가면 splay tree / link cut tree 같은건 좀 나오는것 같기도 하구요.
PS틱한 내용들 (DP-optimization이 대표적) 도 섞일 예정입니다.
- 계획 : 고급 자료구조 / 알고리즘 내용들, CLRS에서 아직 제대로 공부하지 않은 부분 몇가지, 계산이론 수업
  MIT 고급 자료구조 6.851 [링크](https://courses.csail.mit.edu/6.851/fall17/lectures/) 이나 고급 알고리즘 [링크 1](http://people.csail.mit.edu/moitra/854.html) [링크 2](https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-854j-advanced-algorithms-fall-2008/) 같은 내용들 중 몇가지 재밌어 보이거나 이건 알아야 한다고 추천받은 내용들을 볼 계획입니다.
- 언젠가 다룰 내용들...

<style>
table th:first-of-type {
    width: 40%;
}
table th:nth-of-type(2) {
    width: 60%;
}

</style>

### Various topics

| **Topic**                                                               | **TLDR**                                                                      |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [**Amortized Analysis**](/advanced-algorithms/amortized-analysis)       | Framework of analyzing more complex algorithms consisting multiple operations |
| Hashing                                                                 |                                                                               |
| Network Flows                                                           |                                                                               |
| Linear Programming                                                      |                                                                               |
| [**Divide and conquer optimization**](/advanced-algorithms/DP-DnC-Opt/) | Method of DP optimization                                                     |
| [**Pollard's Rho Algorithm**](/advanced-algorithms/Pollards-Rho/)       | Fast probabilistic prime factorization                                        |

### Advanced Data Structures  

| Topic                                                        | **TLDR**                         |
| ------------------------------------------------------------ | -------------------------------- |
| [**Fibonacci Heaps**](/advanced-algorithms/Fibonacci-heaps/) | Heap with decrease-key operation |
| Splay trees                                                  |                                  |

### Randomized Algorithms

| Topic                                                                 | Link                                          |
| --------------------------------------------------------------------- | --------------------------------------------- |
| [**Karger-Stein Min Cut**](/advanced-algorithms/karger-stein-mincut/) | Fast randomized algorithm for min-cut problem |


### Graph Algorithms

| Topic                                                                                  | Link                                   |
| -------------------------------------------------------------------------------------- | -------------------------------------- |
| [**Fixed Subgraph Isomorphism**](/advanced-algorithms/graph-algorithms-lec1/)          | Finding triangles in a graph           |
| [**Pagerank & Random walk with Restart**](/advanced-algorithms/random-walk-on-graphs/) | Discussion of node affinities on graph |

### String Algorithms

Mainly from : SNU 2021 Fall Theory of computation

| Topic                                                                      | Link                          |
| -------------------------------------------------------------------------- | ----------------------------- |
| [**Boyer-Moore Algorithm**](/advanced-algorithms/boyer-moore-algorithm/)   | 1-text 1-pattern matching     |
| [**Aho-Corasick Algorithm**](/advanced-algorithms/aho-corasick-algorithm/) | 1-text multi-pattern matching |

