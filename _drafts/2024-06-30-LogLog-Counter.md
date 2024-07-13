---
layout: single
title: "[Study] LogLog 알고리즘"
categories: theory
tags:
sidebar:
  nav: "sidepost"
comment: true
comments : true
toc: true
tag: [study, algorithms, sublinear-algorithms, randomized-algorithms]
distill_tag: "Theory: Randomized Algorithms"
---

### Problem
오늘 살펴볼 문제는 `Distinct Element` 라 하여, $1$ 부터 $m$ 사이의 수 $N$개가 주어졌을 때, 이들 중 distinct한 원소의 개수를 구하는 문제입니다. 

자명한 방법으로, $m$ 칸의 배열에 각 원소가 나타나는 횟수를 적어, stream이 끝난 후 그중 non-zero인 칸의 개수를 세면 문제를 해결할 수 있습니다. 
그러나 $m$이 매우 커서 $O(m)$ 메모리를 사용할 수 없는 경우, 이러한 방법을 사용할수는 없습니다. 