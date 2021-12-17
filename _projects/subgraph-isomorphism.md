---
layout: page
title: Subgraph Isomorphism in Molecule graphs
permalink : /snu-cid-2021/
description: SNU Creative Integrated Design, 2021 Fall
img: /assets/img/molecule-caffeine.png
importance: 1
category: SNU
---

Thumbnail image source : [Wikipedia](https://en.wikipedia.org/wiki/Molecular_graph)

September 2021 - December 2021. 

Supervised by : [**AIGenDrug Co.Ltd**](https://www.aigendrug.com/)

### Creative Integrated Design
- 서울대학교 컴퓨터공학부 "창의적 통합 설계" 과목 프로젝트. 이 과목은 산학협력 프로젝트 과목으로, 참여 기업에서 먼저 프로젝트를 제안하고 학생들이 3인 1팀으로 진행합니다.
- 저희는 컴퓨터공학부 BHI(Bio & Health Informations) Lab 김선 교수님께서 최근(Jun 2021)에 설립하신 AIGenDrug 사에서 제안한 프로젝트를 수행합니다. 

### Our Project
- 분자 구조식을 그래프로 보는 것은 매우 자연스럽게 생각할 수 있습니다.
- 그래프의 각 정점에는 원자번호같은 필요한 정보를 써 넣고, 필요하다면 간선에 결합에 대한 정보도 적을 수 있습니다. 
- 이제, 분자를 Vertex and Edge labeled graph로 볼 때...
- 분자의 "부분구조" 를 그래프의 "부분그래프" 로 생각할 수 있습니다. 
- 약물의 화학적 성질에는 부분구조가 매우 큰 영향을 미칩니다. 따라서, 어떤 분자가 이러이러한 부분구조를 갖는 부분이 있는지를 빠르게 찾을 수 있다면 많은 도움이 될 것입니다. 
- 그러나, 그래프 A에 그래프 B가 부분그래프로써 존재하는지를 찾는 것 (Subgraph Isomorphism Problem) NP-Complete 문제로 일반적으로 해결하기 매우 어렵습니다. 이를 빠르게 수행하는 기존의 알고리즘들을 비교하고, 가능하다면 개선하고자 합니다.

### September 2021 : Literature review
다른 창의통합설계 주제가 대부분 어떤 서비스의 개발 또는 딥러닝 모델 개발에 중점을 두는 것과는 달리, 저희는 일종의 연구 과제이기 때문에 특별히 extensive한 선행연구 조사가 필요합니다.
- [Subgraph Isomorphism, Backtracking Algorithm들에 대한 정리 (Korean)](/cs-adventure/sub-iso-note/)
  - 그중 가장 최근에 서울대학교 컴퓨터이론 연구실 [^1] 에서 개발되었고, 가장 높은 성능을 보이는 [VEQ 알고리즘](/cs-adventure/VEQ/) 에 대해 공부했습니다.
  - 현재의 Cheminformatic Library인 RDKit에서는 **VF2** 알고리즘을 사용합니다. VF2는 그보다 후속 세대의 알고리즘인 VF2++, VF3가 이미 연구되어 왔고, DAF나 VEQ등 다른 여러 알고리즘들 또한 VF2와 비교하여 더 성능이 높음을 보인 경우가 많기 때문에 우리는 우선 VF2의 performance를 기준으로 이보다 개선하는 것을 목표로 합니다.
- 약물 분자 그래프에는 좋은 성질들이 있습니다. 꼭 모든 그래프에 대해 문제를 해결하지 않더라도, 분자그래프가 갖는 좋은 성질들을 이용해 문제 자체의 복잡성을 크게 줄일 수 있습니다. 경우에 따라 다항 시간에 문제를 해결할 수도 있습니다.
  - 대표적으로, 대부분의 분자 그래프는 Planar합니다 (분자가 평면임을 의미하는 것은 아닙니다. 입체 분자 구조도 평면에 embedding 가능한 그래프 형태를 가질 수 있습니다)
  - 또한, 그래프가 sparse합니다. 화학적으로 [옥텟 규칙](https://en.wikipedia.org/wiki/Octet_rule) 에 의해 degree가 bound되기 때문입니다. 일부 배위 화합물들이 더 많은 결합을 가질 수는 있는 것으로 알고 있으나, 이 경우에도 굉장히 한정적이기 때문에 매우 sparse합니다. 
  - sparse 보다 사실 degree bounded는 더 강한 성질입니다. 어떤 알고리즘들은 degree $k$이하인 그래프에서 $k$를 파라미터로 갖는 시간 복잡도를 보입니다.
  - 특수한 그래프에서 수행되는 다양한 알고리즘을 검토하였습니다. Planar Sub-iso, Eppstein의 color coding 등을 검토하였으나, parametrized complexity로 미루어 볼 때 VEQ, VF2 등 최적화가 잘 된 휴리스틱 기반의 알고리즘들과 comparable한 퍼포먼스를 보여줄 것이라는 확신은 그닥 없습니다.
  - 다만, 유일하게 트리에 서브트리를 매칭하는 subtree isomorphism은 거의 확실하게 퍼포먼스 개선에 도움이 될 것입니다. 그러나 분자 그래프는 대부분 좋은 성질을 갖고는 있지만 트리 정도까지는 아니므로, 적용하기는 쉽지 않습니다.
  - 분자 구조에서 생기는 사이클은 대부분 Benzene 내지는 그 비슷한 형태인데...이것을 노드 하나로 압축하면? 
- 종합하여, 우리의 데이터가 **매우 좋은** 정도가 아니라면 아마 general 한 알고리즘들을 성능으로 이기기 쉽지 않아 보입니다. 언뜻 데이터를 볼 때는 데이터가 **좋은** 성질을 갖는 것 같은데, **매우 좋은** 성질을 갖는지는 아직 확인하지 못한 채로 9월을 마무리하였습니다.

### October 2021 : Literature Review & Testing of algorithms
세명 모두가 각자 다른 시험기간에 걸려 있었고, 저를 제외한 다른 두명은 대학원 입학을 위해 입학전형을 치러야 했기 때문에 많은 진행이 어려웠습니다.
- 10월 1일에는 1차 중간발표가 있었습니다. 이때는 project specification을 발표하는 자리였는데, 저희는 비교적 구조적으로는 단순한 (다만 결과가 나올 때까지 명확하지 않은) 문제라는 특징 상 큰 이슈는 없었습니다.

주어진 chemical data를 더 검토하였고, Cheminformatics 분야에서는 Subgraph isomorphism에 기반한 분자구조 분석이라는 주제에 대해 어떤 논의들이 진행되는지 확인했습니다. 사이클이 있는 그래프에서 그 전부를 갖는 것 (사이클 전체의 매칭) 과 그 일부만 갖는 것 간에는 화학적으로 다른 의미를 갖는다는 것 같습니다. 
- Cheminformatics 에서 사용하는 SMILES의 구조에 대해 공부했습니다. 결국은 분자구조를 DFS하면서 필요한 정보를 작성하는 느낌의 방식인 것으로 보입니다. 그래프를 compact하게 표현한다는 점에서는 큰 의의가 있지만, 단순히 SMILES위에서 뭔가를 판단할 수는 없어 보이고 결국은 그래프를 만들어야 합니다. 다행히 RDKit 라이브러리가 이부분은 잘 처리해 줍니다.

이미 바이너리 또는 소스코드가 공개된 알고리즘들에 대해 먼저 테스트를 진행했습니다. 각 알고리즘마다 다른 Input format을 갖기 때문에, 우리가 가진 SMILES 스트링을 파싱해서 그래프를 만드는 converter를 작성해야 합니다. 

Edge-label을 허용하지 않는 알고리즘의 경우, edge 중간에 노드를 하나씩 더 끼워 넣으면 문제가 좀 커지긴 하지만 일단 정보를 잃지 않을 수 있습니다. sparse한 그래프에서는 복잡도의 손실도 그렇게까지 크지는 않다고 판단했습니다. 필요하다면 알고리즘을 edge-label에도 적용해야 하는데, 일부 알고리즘들은 소스코드가 공개되어 있지 않으므로 논문을 보고 다시 구현하는 경우도 고려해야 할 것으로 보였습니다.

우선은 이 알고리즘들을 실험한 결과, 
- VEQ는 실제로 Chemical data 같은 정도의 비교적 작고 sparse한 그래프에서도 VF2보다 훨씬 더 빠릅니다. 비록 이 프로젝트에서는 VEQ의 코드를 뜯어볼수가 없어서 자세한 실험을 진행하지는 못했지만, 더 좋은 알고리즘이 이정도 스케일에서도 많은 도움이 된다는 것을 보았습니다.
- RDKit같은 코드에 이런 빠른 알고리즘이 implement되면 좋겠지만...VF2를 쓰는 이유는 사실 빨라서라기보다는 RDKit같은 응용 라이브러리 개발자 입장에서는 이런걸 직접 구현할수는 없는데 Boost가 이미 VF2로 subgraph matching을 굉장히 잘하고 있어서 어쩔수 없을 것 같기는 합니다. 

### October 2021 : Filtering Methods
Subgraph matching, 특히 이런 heavily labeled subgraph matching에서, 매칭이 성공할 확률은 굉장히 낮습니다. 저희가 받은 데이터셋에서 전체 매칭의 성공률은 5% 미만입니다. 

그런데, label이 정말 헤비하게 붙어있는 이런 그래프의 경우에는 특히 "매칭해보지 않고도 알 수 있는 실패" 들이 있습니다. 예를 들어, 

------
[^1]: 제가 학부생 연구참여 프로그램을 수행했던 곳이기도 합니다