---
layout: page
title: Data structures and Algorithms
permalink : /ds-alg-note/
description: Data structures & Algorithms
img: /assets/img/algorithm-2.png
importance: 1
category: Computer Science
---

## What is This? 
지금까지 세 번 자료구조 / 알고리즘에 관련해서 간단히 수업을 좀 해본적이 있습니다. 
- 2019년 봄 SNUPS에서 했던 PS-Intro 스터디 
- 2020년 12-2월, 2021년 7-8월 해서 두 번 개인적으로 아는 사람과 지식공유 차원에서. 
특히 방학 두 번 모두 저한테 배운 사람들이 수학 전공이었고 굉장히 뛰어난 수학적 Base를 가지고 있었기 때문에 제가 자료를 만들다가 도중에 급발진을 조금 했습니다. 

- 그때 사용했던 자료들을 reform해서 공개할 예정입니다. 아직 완성되지 않은 부분들이 있습니다. 

- PS/CP 입문을 위해 저한테 배운 사람도 있고, 컴공과 알고리즘 수업 듣기 전에 미리 공부해 보고 싶다고 해서 배운 사람도 있는 등 각자 개인의 목적이 조금씩 달랐기 때문에 자료도 약간 뒤섞여 있습니다. 언젠가는 이 모든 자료를 정리해서 완성하고 싶은 생각도 있긴 합니다만, 우선순위는 꽤 떨어지는것 같습니다. 개인적으로 대학원이 결정나고 나서가 가장 한가하지 않을까 싶습니다.

- Number Theoretic Algorithms 스터디를 진행하셨던 kipa00님의 스타일에 정말 많은 영향을 받았습니다.
  - 특히, 직접 생각해 볼 수 있도록 Step-by-Step으로 가이드하는 연습문제처럼 만들어 놓은 자료는 그분의 NTA에서 처음 본 형식인데, 개인적으로 수동적으로 내용을 따라가지 않고 공부에 많은 도움이 되었기 때문에 앞으로 스터디를 진행하거나 뭔가를 가르치게 되면 꼭 그렇게 만들겠다고 생각한 면이 좀 있습니다. 
  - 그렇기 때문에, 이름은 "Additional Topics and Exercise" 지만, 실제로는 본문의 일부입니다. 즉, $x$장의 연습문제에 들어있는 내용을 $y (x > y)$장에서 특별한 언급 없이 가져다 쓰며, 독자가 이전 챕터의 연습문제를 모두 익혔다고 가정합니다. 

- 사실 생각해보면 그런 이유 때문에 독학으로 내용을 익히기에 매우 어려운 사악한 자료입니다. 제가 옆에서 하나씩 알려줄 때는 저 내용들이 본문의 일부여도 상관이 없지만, 자료만 보면 핵심내용에 대한 설명을 연습문제처럼 때워놓은 면이 있기 때문입니다. 그래서, 언젠가 이 자료를 완성할 때는 그 부분도 감안하여 수정할 생각입니다. 

이해가 안가는 부분에 대한 질문, 자료의 오류, 오타 등에 대한 지적은 언제든지 여기 댓글이나 제 개인 메일 (gratus907@snu.ac.kr) 을 포함하여 어떤 경로로든 환영합니다. :) 


## 목차 
1. [링크](/ds-alg-note/01-time-complexity/) 시간 복잡도, Big-O notation
2. [링크](/ds-alg-note/02-basic-ds/) 리스트, 스택, 큐, 덱 등의 기본 자료구조
3. [링크](/ds-alg-note/03-sorting-and-searching/) 정렬과 탐색 (Quick sort, Quick select, Linear Select)
4. [링크](/ds-alg-note/04-binary-search/) Binary Search 
    - 첫번째 급발진으로, Ternary Search를 다루었습니다.
5. [링크](/ds-alg-note/05-graph-basics/) Graph basics
    - 의도적으로 BFS/DFS 등을 배우는 시점을 미뤘습니다. 여기서는 힙과 간단한 이진 트리 등을 다룹니다. 
    - 이렇게 만든 이유는 저희 학교 자료구조 수업 목차랑 비슷하게 맞추기 위해서였습니다.
6. [링크](/ds-alg-note/06-bst-unionfind/) Binary Search Trees, Union Find
7. Balanced Binary Search Tree
    - 자료 없이 그냥 진행했던 주제입니다. 
    - 이거 자료는 만들기 너무 어려워서 아마 만들지 않을 예정입니다. 
8. [링크](/ds-alg-note/08-dp-dnc-1/) Divide and Conquer / Dynamic Programming
9. [링크](/ds-alg-note/09-dp-dnc-2/) More on DnC / DP
    - PS용으로 만들었던 자료가 너무 아까웠고, 결정적으로 멋진 아이디어들을 소개해 주고 싶었습니다.
    - Segment Tree, Merge sort Tree, LCA 등 놀라운 내용들을 '분할 정복 및 다이나믹 프로그래밍' 이라는 지나치게 일반적인 이름 아래에 때려넣었다는 비판을 겸허히 받아들입니다. ㅋㅋ!
    - 처음 이 내용을 읽는 분이 공부하기에는 너무 어려울 수도 있습니다. 통째로 스킵해도 됩니다. 
10. Greedy Algorithms
11. Graph (1) : DFS/BFS
12. Graph (2) : Shortest Path / MST
13. Graph (3) : SCC
14. String Algorithms : KMP, Hashing, Trie
    - 목차에는 계획했으나 한번도 String algorithms를 다뤄본적은 없습니다. 
    - 이유는 각 스터디를 진행할 때마다 13까지 나간 다음 Additional topic을 달렸기 때문입니다.
    - PS 목적일 때는 세그트리를, 그렇지 않은 목적일 떄는 NP-Completeness 같은 주제를 다루었습니다. 
    - 아마도 자료만 만든다면 KMP, Hashing, Trie 이 세 가지를 다룰 듯 합니다.
