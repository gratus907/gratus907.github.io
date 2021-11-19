---
layout: single
title: Fully Convolutional Network (FCN) 정리
categories: image-segmentation-2021
parlinks : [deep-learning-study]
comments : true
---
<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

## Motivation
### Linear layer는 쓸 수 없다
LeNet을 시작으로 여러 CNN 모델들은 기존의 방법들로는 도저히 이룰 수 없는 성능을 보여주면서 이미지처리 분야에서 놀라운 발전을 견인했습니다. 

정말 간단하게, Imagenet challenge를 따라가면서 얘기하자면, 
- AlexNet (2012) 가 deep CNN이 얼마나 강력한지를 선보였고, 
- VGGNet, GoogLeNet (2014) 이 다시한번 (두 방법이 접근이 다르긴 하지만) 놀라운 성과로 한자리수 top-5 error rate를 보여준 데 이어,
- ResNet (2015) 이 새로운 architecture로 성능을 다시 급상승시키는 등

몇년 사이에 거의 사람이 처리하는 수준의 정확도를 보여주게 되었습니다. 그러나, 이 모델들은 **image classification** 을 수행하는 모델들이기 때문에, segmentation을 하기 위해서는 약간 다른 접근이 필요합니다. 

![picture 1](../../images/65248dcf9168b967e664f799c65014d13df38e1e7bff5db23b3db50ee05952ff.png)  

이 그림에서 볼 수 있듯, semantic 또는 instance segmentation은 classification과는 다르게, 고양이가 **있는지** 뿐 아니라 **어디에** 있는지를 알아야 합니다. 그런데, LeNet 같은 CNN의 구조를 보면...

![picture 2](../../images/cd97eccdcd206c69165bedbe52ab311cecf6e35e340166c1780794892fed550e.png)  

마지막에 Fully connected layer를 다는게 일반적인데 (당연히, 이미지의 '전체' 를 보고 어떤 이미지인지 알고 싶은 것이므로 자연스럽습니다), 이렇게 하면 이미지에서 고양이가 원래 어디에 있었는지에 대한 spatial information을 다 날려 보리게 됩니다. 그래서, 더이상 linear layer는 쓸 수 없습니다.

그러면, 마지막도 그냥 다 convolution으로 밀어버리면 어떨까요? 이 아이디어가 FCN의 기반입니다. 

### Pooling을 없앨 수는 없는데...
우리가 원하는 것은 최대한 pixel-wise segmentation입니다. 그런데, 예를 들어 무작정 VGGNet같은거의 끝 linear layer를 뜯어버리고 convolution을 몇개 더 달아서 segmentation을 시키면 어떤 문제가 있을까요? 
- VGGNet을 돌리는 과정을 잘 보면, feature map의 크기가 pooling을 하다 보면 계속 줄어들게 됩니다. 
- 그러므로, 결국 마지막 순간에 우리가 가진 feature map은 원본에 비해 가로, 세로가 각각 1/32로 줄어든 이미지가 됩니다. 256 x 256을 들고 시작했다면, 8 x 8 이 되겠네요.
- 당연히, upsampling은 쉽게 할 수 있습니다. 그런데 한 박스의 크기가 기본 32 x 32인 segmentation은 좀 마음에 안 듭니다.
- 즉, pooling을 할수록 segmentation을 정밀하게 할 수가 없습니다. 그런데 그렇다고 해서 pooling을 포기할 수는 없는 것이, pooling을 안하면 이렇게 깊게 네트워크를 쌓았을 때 크게 두 가지 문제가 있게 됩니다.
  - parameter가 너무 많아서, training이 매우 어렵거나 불가능해집니다. 파라미터가 많으면 overfitting의 문제가 증대될 수도 있습니다. 
  - 각 feature가 영향을 받는 receptive field가 너무 작습니다. 이건 convolution 연산 자체의 한계인데, convolution (3 by 3) 을 10번 하면 그 결과물의 1픽셀은 사실 가로세로 주변 10픽셀 크기 정사각형에 의해 결정되게 됩니다. 즉 전체적인 큰그림을 볼수가 없습니다. 아무리 segmentation이 local한 특징을 잡아내는 task라고는 하지만, 아예 큰그림을 볼수 없어서는 그것도 문제가 됩니다. 