---
layout: single
title: "[Reading] Lightning Fast and Space Efficient k-clique Counting"
categories: paper-reviews
sidebar:
  nav: "sidepost"
comment: true
comments : true
toc : true
orig-authors: Xiaowei Ye et al.
venue: WWW22
tag: [paper-review, cliques, graph-algorithms] 
distill_tag: "Paper Review"
distill_topic: "Algorithms on Large Graphs"
---

> Xiaowei Ye, Rong-Hua Li, Qiangqiang Dai, Hongzhi Chen, and Guoren Wang. 2022. Lightning Fast and Space Efficient k-clique Counting. In Proceedings of the ACM Web Conference 2022 (WWW '22)


### Introduction
- Analyzing cliques in graph data is critical in many applications, but exact counting or enumeration of these structures can be computationally costly.
- **Problem:** Given a graph $G$ and $k \in \N$, estimate the number of $k$-cliques in $G$.

#### Sampling Algorithm for Counting Cliques
- **Sampling** is often the way to go when the objective is to count some structure in a large graph.
- The aim is to efficiently gather **samples** from a **sample space** which encapsulates the set we're interested in.
- Assuming that the set of interest is $\mathcal{A}$ and the sample space is $\Omega$. If it is possible to obtain uniform random samples from $\Omega$, it is natural to take $t$ samples, and count the number of samples that are in $\mathcal{A}$. 
- For this simple algorithm, the **Chernoff's Bound** ensures a probabilisitic guarantee.
<span style="display:block" class="math_item">
    <b class="math_item_title">Chernoff's Bound for Sampling</b>  
    Let $\rho = \abs{\mathcal{A}} / \abs{\Omega}$. A uniform sampling algorithm returns a $1 - \epsilon$ approximation of $\abs{\mathcal{A}}$ with probability $1 - 2\sigma$ if more than $\frac{3}{\rho\epsilon^2}\log(1/\sigma)$ samples are taken uniformly at random.
</span> 
- Hence, the ultimate aim is to maximize $\rho$, which essentially means finding a sample space that closely mirrors $\mathcal{A}$.
  
### Key Ideas
This paper develops an efficient algorithm for $k$-clique estimation via uniform sampling. 
By employing a greedy coloring strategy, the algorithm initially reduces the sample space to the set of $k$-colored sets/paths, which are structures that have a high likelihood of being cliques. The counting of the number of $k$-colored sets/paths is achieved through dynamic programming.

For sparse graphs, <span style="font-family:Helvetica;">PIVOTER (WSDM 20)</span> already performs remarkably well. The authors thereby propose a framework where given graph is split into sparse and dense region, and run PIVOTER on sparse region, while the dense region is dealt with the sampling algorithm authors propose.

#### DP-Based Colored Set Sampling (DPColor)
- Consider the proper graph coloring (no edge should connect vertices with same color). 
- A $k$-colored set (set of $k$ vertices with distinct color) is a good candidate for cliques!
<span style="display:block" class="math_item">
    <b class="math_item_title">Correctness (Unbiasedness) of Sample Space</b>  
    If a set $\set{v_1, \dots, v_k}$ is a $k$-clique in $G$, it must have distinct colors for any given proper coloring.
</span> 
- To use small number of colors, use degeneracy-ordered greedy coloring
- To sample $k$-colored set, we shall count the number of $k$-colored set via dynamic programming.
- Let $a_i$ be the number of nodes with color $i$, and $F(i, j)$ be the number of $j$-colored sets, considering the vertices with color only up to $i$. The $F(i, j)$ follows the following recurrence.
  $$F(i, j) = a_i \times F(i-1, j-1) + F(i-1, j)$$
- Using this as weights, uniform random sampling can be easily done.

  
#### DP-Based Colored Path Sampling (DPColorPath)
- How to improve further? Instead of $k$-colored set, consider $k$-colored paths.
- Choose a center node $u$ arbitrarily. From $N(u)$, count and sample $k$-colored path.
- This is much more likely to be a clique than $k$-colored sets.
- Similar to $k$-colored sets, $k$-colored paths (locally on $N(u)$) can be counted via dynamic programming.

### Results
- The DPColorPath method demonstrates significant speed (an order of magnitude faster than the state-of-the-art methods) and negligible (0.1%) error on large-scale real-world graph datasets, including social networks and citation networks.
- The $\rho$ value for $k$-colored paths are much higher than $k$-colored sets

------
Overall, impressive results (accuracy and speed) with relatively simple algorithm. Implementation seems also reasonably doable.
Giving more structure on the graph via proper coloring to reduce the sample space seems like a really nice idea.