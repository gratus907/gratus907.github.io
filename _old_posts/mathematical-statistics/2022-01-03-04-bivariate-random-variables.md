---
layout: single
title: 04. Bivariate Random Variables
categories: mathematical-statistics
parlinks: []
comments : true
---
<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

## 이변수 확률벡터 
때로는 확률 변수가 하나가 아니라 여러 개일 수도 있습니다. 우선은 2개인 경우를 생각합니다. 
<span style="display:block" class="math_item">
    <b class="math_item_title">정의 : 이차원 확률변수의 결합 확률밀도함수</b>  
    두 확률변수 $X, Y$의 순서쌍이 가질 수 있는 집합에 대해, 그 순서쌍을 가질 확률 (확률밀도) 의 값을 대응시키는 함수 $f$를 이차원 확률변수의 (결합) 확률밀도함수라고 정의한다. 
</span> 
이때, 확률변수가 실수일 때와 거의 똑같이 다음의 성질이 성립합니다. 
- $f(x, y) \geq 0$
- $\displaystyle\int_{-\infty}^{\infty} \int_{-\infty}^{\infty} f(x, y) \dd{y} \dd{x} = 1$
- $\displaystyle\int_{a}^{b} \int_{c}^{d} f(x, y) \dd{y} \dd{x} = \P(a \leq X \leq b, c \leq Y \leq d)$

사실은, 이 적분의 엄밀한 정의는 이차원 무한소 위에서 정의해야 하며 $\dd{(x, y)}$ 를 $\dd{y}\dd{x}$ 또는 $\dd{x}\dd{y}$ 형태로 계산할 수 있다는 보장도 원래는 없습니다. 이것이 가능하다는 것은 **Fubini-Tonelli 정리** 에 의해 얻는 결과이지만, 우선은 이부분은 넘어가겠습니다. 앞으로, Unless Otherwise Specified, 적분의 순서는 교환 가능함을 믿을 것입니다.

<span style="display:block" class="math_item">
    <b class="math_item_title">정의 : 주변확률밀도함수</b>  
    결합 확률밀도함수가 $f(x, y)$ 인 확률변수 $(X, Y)$ 에 대해, 주변확률밀도함수 (marginal pdf) 를 다음과 같이 정의한다.
    $$f_1(x) = \int_{-\infty}^{\infty} f(x, y) \dd{y} \quad \quad f_2(y) = \int_{-\infty}^{\infty} f(x, y) \dd{x}$$ 
</span> 

## 공분산과 상관계수 
<span style="display:block" class="math_item">
    <b class="math_item_title">정의 : 공분산, 상관계수</b>  
    두 확률변수 $X, Y$의 평균이 $\mu_1, \mu_2$ 이고 표준편차가 $\sigma_1, \sigma_2$ 일 때, 다음과 같이 공분산을 정의한다. 
    $$\Cov(X, Y) = \expect{(X - \mu_1)(Y - \mu_2)}$$
    또한, 다음과 같이 상관계수 (Correlation coefficient) 를 정의한다. 
    $$\Corr(X, Y) = \frac{\Cov(X, Y)}{\sigma_1 \sigma_2}$$
</span> 
공분산은 두 값들이 평균으로부터 달라지는 정도에 대해 어떤 관계가 있는지를 나타냅니다. 예를 들어, $X$가 대체로 평균보다 클 때 $Y$도 대체로 평균보다 크다면 공분산값이 양수이고, 그 반대라면 음수인 식입니다. 그러나 이 값은 절대적인 $X$의 스케일 - 즉, 1부터 10사이인지, 1부터 100사이인지 - 에 의해 크게 달라지기 때문에, 이를 $X$와 $Y$자체의 표준편차로 나누어 -1과 1 사이의 값을 갖도록 normalize한 값이 상관계수가 됩니다.  
그렇기 때문에, 상관계수는 서로간의 **선형적 상관관계** 가 얼마나 강한지를 확인해 주는 값입니다. 

다음의 성질들은 그렇게 보면 좀 자연스럽습니다. 
- $\Cov(X, Y) = \Cov(Y, X), \quad \Cov(X, X) = \V(X)$
- $\Cov(aX + b, cY + d) = ac \ \Cov(X, Y)$
- $\Cov(X, Y) = \E(XY) - \mu_1 \mu_2$
- $\rho = \Corr(X, Y)$ 에 대해, $ 1 - \rho^2 = \variance{\displaystyle\frac{Y - \mu_2}{\sigma_2} - \rho \frac{X - \mu_1}{\sigma_1}}$

다른 성질들은 별로 증명까지는 필요하지 않고, 마지막 성질만 논증해 보자면:
- 우변은 결국 제곱하여 기댓값의 형태로 쓸 수 있습니다. 특히 우변 $\V$ 안의 기댓값이 0이므로, 
$$\variance{\frac{Y - \mu_2}{\sigma_2} - \rho \frac{X - \mu_1}{\sigma_1}} = 
\expect{\left(\frac{Y - \mu_2}{\sigma_2} - \rho \frac{X - \mu_1}{\sigma_1}\right)^2}$$
- 이제, 이 제곱을 정리하면
$$\expect{\left(\frac{Y - \mu_2}{\sigma_2}\right)^2 - 2 \rho \frac{Y - \mu_2}{\sigma_2}\frac{X - \mu_1}{\sigma_1} + \left(\rho\frac{X - \mu_1}{\sigma_1}\right)^2}$$
- 기댓값의 선형성에 의해, 이는 다시 정리가 가능합니다. 
$$\rho^2\frac{\V(X)}{\sigma_1^2} + \frac{\V(Y)}{\sigma_2^2} - 2\rho\frac{\Cov(X, Y)}{\sigma_1\sigma_2}$$
- 정의를 대입하면 원하는 식을 얻습니다.