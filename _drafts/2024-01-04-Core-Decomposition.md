---
layout: single
title: "Cohesive Subgraphs: Core Decomposition"
categories: study
sidebar:
  nav: "sidepost"
comment: true
comments : true
toc : true
venue: 
tag: [study, graph-algorithms] 
---

<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

#### Prelim: Cohesive Subgraphs 
In analyzing graphs like social networks or protein-protein interaction (PPI) networks, identifying cohesive subgraphs, which are crucial for uncovering semantic relationships and structures, is a key focus. 
The most intuitive measure of subgraph cohesiveness is its density (average degree), but locating dense regions in large graphs is a challenging problem.[^1]. 

Core decomposition, and the coreness of vertex is a cohesiveness measure that is relatively easy to understand and compute. Furthermore, the maximum core number of graph (also known as the degeneracy) enjoys some good mathematical properties. 
In real-world graphs, core numbers are often much smaller than their theoretical bounds. This makes some algorithms much more efficient than what theoretical analysis allows. 

#### Core Decomposition
We define the $k$-core of a graph $G = (V, E)$ as follows:

<div class="mathenv" markdown=1>  
<div class="mathenv-title">Definition (K-Core / Core Number)</div>
A $k$-core $H$ of graph $G$ is a maximal subgraph of $G$ in which all vertices of $H$ have degree at least $k$. 

A vertex $v \in V_G$ has core number $c$ if $v$ is in $c$-core but not to any $(c+1)$-core.
</div>

Here, the term 'maximal' means that no other vertices can be added into $H$ while maintaining this property. 

The core number of vertex is defined as the maximum $c$ such that $v$ is in any $c$-core. 

<div class="mathenv" markdown=1>  
<div class="mathenv-title">Definition (Degeneracy)</div>
The degeneracy of graph $G$ (usually denoted as $\delta_G$) is the maximum $k$ such that $G$ has non-empty $k$-core. 
</div>

#### Linear Time Algorithm 

#### Degeneracy

#### References
{% bibliography --cited_in_order --template short_bib --group_by none %}


#### Footnotes
[^1]: This itself is an interesting problem in graph data mining. While some methods based on maximum flow have been developed, these do not scale to million-sized graphs.
