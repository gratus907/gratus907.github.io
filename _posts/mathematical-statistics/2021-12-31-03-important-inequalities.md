---
layout: single
title: 03. Important Inequalities
categories: mathematical-statistics
parlinks: []
comments : true
---

다변수 분포에 대해 알아보기 전에, 몇가지 중요한 부등식을 보입니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">정리 : 젠센 부등식 (Jensen Inequality)</b>  
    확률변수 $X$와 볼록함수 $\phi$에 대하여, 다음이 성립한다. 
    $$\phi(\E(X)) \leq \E(\phi(X))$$
</span> 
$\E$를 (확률을 반영한) 가중 평균으로 생각하면, 볼록함수에 대해 (가중 평균의 합수값) 은 (함수값의 가중 평균) 이하라는 정리입니다. 

이계 미분을 이용하면 이 부등식을 쉽게 증명할 수 있지만, $\phi$가 두번 미분가능한 함수일 때만 가능한 증명이라는 한계가 있습니다. 여기서는 조금 다른 증명을 이용하겠습니다. 식을 다시 쓰면, 볼록함수 $\phi$에 대해, 다음을 보이면 충분합니다.
$$\phi\left(\int_{A} g(x) \dd{x}\right) \leq \int_{A} \phi(g(x)) \dd{x}$$
볼록함수의 정의에 따라, 임의의 $x_0$ 에 대해, $ax + b \leq \phi(x)$, $ax_0 + b = \phi(x_0)$ 를 만족하는 어떤 직선 $y = ax + b$가 존재합니다. (이를 $\phi$의 sub-derivative라 하는데, $\phi$가 연속인 볼록함수기만 하면 미분가능하지 않아도 존재합니다. 직관적으로 보이기는 별로 어렵지 않으나, (적어도 제가 아는 증명은) supporting hyperplane theorem이라는 상당히 강한 툴을 요구합니다. 여기서는 일변수만 볼 것이므로 증명 생략.)

$x_0 = \displaystyle \int_{A} g(x) \dd{x}$라 하고 이를 그대로 활용하면, 다음이 성립합니다. 
$$\int_{A} \phi(g(x)) \dd{x} \geq \int_{A} ag(x) + b \dd{x} \geq a \int_{A} g(x) \dd{x} + b = ax_0 + b = \phi\left(\int_{A} g(x) \dd{x}\right)$$

<span style="display:block" class="math_item">
    <b class="math_item_title">정리 : 리야푸노프 부등식 (Liapounov Inequality)</b>  
    확률변수 $X$에 대해 $\E(\abs{X}^s) < \infty$ 이면, $0 < r < s$인 $r$에 대해, 다음이 성립한다.
    $$\E(\abs{X}^r)^{1/r} \leq \E(\abs{X}^s)^{1/s}$$
</span> 

<b>증명</b> : $p > 1$에 대해 $\phi(x) = \abs{x}^p$ 로 젠센 부등식을 쓰면 $\E(\abs{X}^p) \leq \E(\abs{X})^p$ 입니다.   
$p = s / r > 1$ 과 확률변수 $\abs{X}^r$ 를 이 젠센 부등식에 대입하면 증명 끝.

<span style="display:block" class="math_item">
    <b class="math_item_title">정리 : 마르코프 부등식 (Markov Inequality)</b>  
    확률변수 $X$에 대해 $\E(\abs{X}^r) < \infty$ 이면, 임의의 $k$에 대해 다음이 성립한다. 
    $$\P(\abs{X} \geq k) \leq \E(\abs{X}^r) / k^r$$
</span> 

<b>증명</b> : $\P(\abs{X} \geq k) = \E(I_{(\abs{X} \geq k)})$ 로 씁니다. (indicator function) 이때, $I_{(\abs{X} \geq k)}$에 대해 생각해 보면 이는 다시 $I_{(\abs{X} / k \geq 1)}$ 과 같고, 이 함수는 $\abs{X} / k$ 가 1보다 큰 부분에서만 1이므로 다음이 성립합니다.
$$I_{(\abs{X} / k \geq 1)} \leq (\abs{X} / k)^r I_{(\abs{X} / k \geq 1)} $$
양변에 기댓값을 씌우면 주어진 식이 됩니다.

<span style="display:block" class="math_item">
    <b class="math_item_title">정리 : 체비셰프 부등식 (Chebyshev Inequality)</b>  
    확률변수 $X$에 대해 $\V(X) < \infty$ 이면, 임의의 $k$에 대해 다음이 성립한다. 
    $$\P(\abs{X - E(X)} \geq k) \leq \V(X) / k^2$$
</span> 

<b>증명</b> : 앞선 Markov 부등식에서, $Z = X - E(X)$, $r = 2$를 대입합니다.