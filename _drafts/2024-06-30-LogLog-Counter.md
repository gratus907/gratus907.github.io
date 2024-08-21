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

<div class="math_env" math_type="Lemma" math_title="Lipschitz Gradient Lemma">
$f : \R^n \to \R$ 이 미분가능하고 $\nabla f$ 가 $L$-Lipschitz 연속이면
임의의 $\delta$에 대해 다음이 성립한다.
$$f(x + \delta) \leq f(x) + \nabla f(x)^T \delta + \frac{L}{2}\norm{\delta}^2$$
</div>

<div class="math_env" math_type="Definition">
$f : \R^n \to \R$ 이 미분가능하고 $\nabla f$ 가 $L$-Lipschitz 연속이면
임의의 $\delta$에 대해 다음이 성립한다.
$$f(x + \delta) \leq f(x) + \nabla f(x)^T \delta + \frac{L}{2}\norm{\delta}^2$$
</div>

다양한 증명이 있지만, [@GarrigosHandbook] 의 증명 아이디어가 (해석적으로)
상당히 멋집니다.

**Proof.** $g(t) = f(x + t\delta)$ 로 정의합니다. 이때
$g'(t) = \nabla f(x + t\delta)^T \delta$ 이므로, 미적분학의 기본정리에
의해, 
$$\begin{aligned}
        f(x + \delta) &= g(1) = g(0) + \int_{0}^{1} g'(t) \dd{t}\\ 
        &= f(x) + \int_{0}^{1} \nabla f(x + t\delta)^T \delta \dd{t}\\ 
        &= f(x) + \nabla f(x)^T \delta + \int_{0}^{1} (\nabla f(x + t\delta) - \nabla f(x))^T \delta \dd{t}\\ 
        &\overset{\scriptsize (1)}{\leq} f(x) + \nabla f(x)^T \delta + \int_{0}^{1} \norm{\nabla f(x + t\delta) - \nabla f(x)}\norm{\delta} \dd{t}\\ 
        &\overset{\scriptsize (2)}{\leq} f(x) + \nabla f(x)^T \delta + \int_{0}^{1} Lt \norm{\delta}^2 \dd{t}\\
        &= f(x) + \nabla f(x)^T \delta + \frac{L}{2}\norm{\delta}^2
\end{aligned}$$ 
(1) 은 코시-슈바르츠 부등식, (2) 는 Lipschitz 연속
조건에 의해 성립합니다. 

이제,
[\[thm:gd_convergence\]](#thm:gd_convergence){reference-type="autoref"
reference="thm:gd_convergence"} 를 증명하는 것은 비교적 간단합니다. GD의
실행 과정 $x_k = x_{k - 1} - \alpha \nabla f (x_{k-1})$ 을 살펴보면,
다음이 성립합니다. $$\begin{aligned}
    \norm{x_k - x^*}^2 &= \norm{x_{k-1} - x^* - \alpha \nabla f(x)}^2 = \norm{x_{k-1} - x^*}^2
\end{aligned}$$ 이제, GD의 업데이트에 대해
[lem:lipschitz_ gradient](#lem:lipschitz_gradient) 을 적용하면,
$$f(x_k) = f(x_{k-1} - \alpha \nabla f (x_{k-1})) \leq f(x_{k-1}) - \alpha \norm{\nabla f (x_{k-1})}^2 + \frac{L\alpha^2}{2}\norm{\nabla f (x_{k-1})}^2$$
이고, $\alpha = 1 / L$ 을 채택하므로, 이는
$$f(x_k) \leq f(x_{k-1}) + \left(\frac{L\alpha^2}{2} - \alpha\right)\norm{\nabla f (x_{k-1})}^2 \leq f(x_{k-1}) - \frac{\norm{\nabla f (x_{k-1})}^2}{2L}$$
가 성립하게 됩니다. 한편, $f$가 convex하다고 가정했으므로, 일계 조건에
의해
$$f(x_{k-1}) - f(x^*) \leq (\nabla f (x_{k-1}) - \nabla f(x^*))^T(x_{k-1} - x^*)$$
인데, convex function에 대해 $\nabla f(x^*) = 0$ 이므로 이는
$$f(x_{k-1}) - f(x^*) \leq \nabla f (x_{k-1})^T(x_{k-1} - x^*)$$ 로
쓰여질 수 있습니다.
