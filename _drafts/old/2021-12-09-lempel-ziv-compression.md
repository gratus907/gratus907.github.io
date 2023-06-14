---
layout: single
title: Lempel-Ziv Compression Algorithms
categories: advanced-algorithms
parlinks: []
comments : true
---
<div id="toc">
Contents
</div>
* TOC
{:toc}
----------

## Lempel-Ziv compression Algorithms
Lempel-Ziv는 lossless (손실 없는) 압축 알고리즘으로, LZ77, LZ78과 추가로 Welch가 참여한 LZW 알고리즘으로 나누어 살펴볼 수 있습니다. 큰 아이디어는 공유하지만, 세부적인 사항에서 약간의 차이가 있습니다. 이 글에서는 세 알고리즘의 Encoding, Decoding 방식에 대해 살펴봅니다.

세 알고리즘을 관통하는 가장 큰 아이디어는 다음과 같습니다.  
"**이미 나온 적 있는** 문자열이 반복된다면, 이를 **어디서 봤는지** 만 기억하고, 실제 그 문자열을 반복하지 않는다"

이 방법이 좋은 이유는, 미리 어떤 문자열을 어떻게 매핑할지 정해놓지 않더라도 decoding을 거꾸로 따라가면서 문자열을 복원할 수 있다는 점입니다. 

## LZ77 
