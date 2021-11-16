---
layout: single
title: Image Segmentation - Preparation
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
 
앞으로 이 프로젝트에서 사용하는 코드는 모두 [Github Repo](https://github.com/gratus907/Image-Segmentation-Study) 에 올라갈 예정입니다. 오늘은 먼저, 데이터 등을 준비하는 과정을 진행합니다. 

## Data preparation
TU Graz에서 제공하는 **Drone aerial image** 데이터를 이용하려고 합니다. [링크](https://www.tugraz.at/index.php?id=22387) 에서 다운로드받을 수 있습니다. 사진 400장의 데이터셋이지만 굉장히 용량이 크고 (4.1GB, 각 이미지가 무려 **6000 by 4000** 입니다) pixel-accurate한 라벨이 달려있는데다 클래스는 23개로 많지 않아서 적당하다고 생각했습니다. 여기서는 360개를 training에, 40개를 test에 쓰겠습니다. 

먼저, 필요한 모듈들을 import해서 때려넣습니다. 별로 좋은 practice는 아니지만, 다양한 모델들을 테스트해보는 의미가 있으므로 코드의 아름다움은 잠시 접어두기로 합시다. Jupyter Notebook이나 Colab을 사용한다면 훨씬 편하게 테스트할 수 있겠지만, 전체를 깃헙에 올려서 바로 볼 수 있게 하기 위해 그냥 일반 파이썬 코딩할때처럼 하겠습니다. 
```py 
# basics.py 
import pandas as pd, numpy as np 
import torch, torchvision, PIL.Image, cv2 
import os, sys
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
import torchvision.transforms as T
import torch.nn.functional as F
from torchsummary import summary
import time
from tqdm import tqdm

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
mean = [0.485, 0.456, 0.406]
std = [0.229, 0.224, 0.225]
```

device 등은 사실 모든 딥러닝에서 공통적으로 쓰는 GPU 코드이므로 별로 특별한 의미가 있지는 않고, 특이한 점은 mean과 std입니다. 이 값은 RGB 각 채널을 normalize하기 위한 값인데요. 0.5가 아닌 이유는 이 값들이 사실 ImageNet에서 훈련된 결과 값인데, 원칙적으로는 새로운 mean과 std를 train하는 것이 의미가 있겠지만 100만장의 ImageNet 데이터를 믿고 그냥 써도 큰 문제가 없습니다. 

## Dataset
pytorch에서 custom dataset을 사용할 때는, torch.utils.data.Dataset 클래스를 만들면 됩니다. 
```py
# datautils.py 
from basics import * 
class DroneDataset(Dataset):
    def __init__(self, img_path, mask_path, X, test=False):
        self.img_path = img_path
        self.mask_path = mask_path
        self.X = X
        self.test = test
    def __len__(self):
        return len(self.X)

    def __getitem__(self, idx):
        img = cv2.imread(self.img_path + self.X[idx] + '.jpg')
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, dsize=(600, 400), interpolation=cv2.INTER_NEAREST)
        mask = cv2.imread(self.mask_path + self.X[idx] + '.png', cv2.IMREAD_GRAYSCALE)
        mask = cv2.resize(mask, dsize=(600, 400), interpolation=cv2.INTER_NEAREST)

        t = T.Compose([T.ToTensor(), T.Normalize(mean, std)])
        img = t(img)
        mask = torch.from_numpy(mask).long()

        return img, mask
```

일단은 data augmentation 등은 아무것도 생각하지 말고, 정말 순수한 bare minimum만 생각합니다. 

간단히 해석해보면...
- `__init__` 는 img_path, mask_path 등을 받아서 이 데이터셋의 위치와, 어떤 transform을 적용할지 (transform이란, 이미지를 텐서로 바꾸는 연산) 기억합니다.
- `__getitem__`은 `data[3]` 과 같이 쓰기 위해서 override하는 method로, 이미지를 잘 읽고 적절하게 변환해서 뱉어줍니다. 
- 6000 * 4000은 진짜 좀 너무 크기 때문에, 이미지 크기는 600 * 400으로 줄였습니다. 줄일때는 NEAREST를 써야 mask의 라벨이 이상해지지 않습니다. 
- `test` 데이터에 대해서는 Image를 그대로 저장하고, `training` 데이터에 대해서는 이를 torch tensor로 바꿔서 저장합니다. 이렇게 하는 이유는, 나중에 정성적으로 segmentation의 퀄리티를 확인하고 싶을 때 이미지를 같이 display하려면 test에 대해서는 이미지를 갖고있는게 편하기 때문이

이제 이 파일을 실제 모델에 적용하기 위해, training / test 데이터셋으로 잘라줘야 합니다. 이를 편하게 잘라주는 `sklearn.model_selection.train_test_split`이 있습니다. 
```py
# datautils.py
from sklearn.model_selection import train_test_split
def import_drone_dataset():
    IMAGE_PATH = "../dataset/semantic_drone_dataset/original_images/"
    MASK_PATH = "../dataset/semantic_drone_dataset/label_images_semantic/"
    name = []
    for dirname, _, filenames in os.walk(IMAGE_PATH):
        for filename in filenames:
            name.append(filename.split('.')[0])
    df = pd.DataFrame({'id': name}, index = np.arange(0, len(name)))
    X_train, X_test = train_test_split(df['id'].values, test_size=0.1, random_state=0)
    train_set = DroneDataset(IMAGE_PATH, MASK_PATH, X_train, test=False)
    test_set = DroneDataset(IMAGE_PATH, MASK_PATH, X_test, test=True)
    return train_set, test_set
```

## Evaluation of Model
모델을 만들기 전에 일단 모델이 있다면 어떻게 동작해야 할지를 먼저 생각해 봅니다. 좀 오래된 말이긴 하지만, 머신러닝을 정의하는 방법 중 한가지는 T, P, E 라고 해서...
- **T**ask : 어떤 명확하게 정의되는 작업을 수행하고 싶고, 
- **P**erformance Measure : 현재 가지고 있는 프로그램의 성능을 측정하는 방법이 있으며, 
- **E**xperience : 데이터로부터 프로그램이 **P**를 발전시키기 위해 노력한다는 것입니다. 

우리는 아직 프로그램을 작성하지 않았지만, semantic segmentation이라는 **T**에 집중할 것입니다. **P**를 어떻게 할지는 이 자체로도 독립된 포스팅이 필요한데, mIoU, Hausdorff distance등 재밌는게 많습니다. 이중 가장 생각하기 쉬운 것은 그냥 pixel단위로 맞은 픽셀수 / 전체 픽셀수를 세는 것입니다. 

Pytorch에서는 모델이 어떤 input image를 받아서, `model(x)` 과 같은 식으로 call해서 inference를 진행합니다. 그 결과를 실제 mask와 비교해서 정확도를 측정해야 합니다. 

Bare minimum의 철학에 따라 일단 pixel accuracy만을 구현합니다. 다만 나중에 여러 다른 metric을 구현할 수 있음을 염두에 두고, metrics.py로 따로 파일을 빼겠습니다. 
```py
# metrics.py 
def pixel_accuracy(output, mask):
    with torch.no_grad():
        output = torch.argmax(output, dim=1)
        correct = torch.eq(output, mask).int()
        accuracy = float(correct.sum()) / float(correct.numel())
    return accuracy
```
Pixel accuracy를 계산할때는 backpropagation용 gradient가 필요하지 않으므로 `with torch.no_grad():` 로 감싸서 제낍니다. 

이제, 편하게 테스트를 여러번 시도하기 위해 테스트를 돌리는 클래스를 따로 만들겠습니다. 
```py
# evaluate.py 
from basics import *

class ModelEvaluation():
    def __init__(self, model, test_dataset, metric):
        self.model = model
        self.test_dataset = test_dataset
        self.metric = metric
    
    def evaluate_single(self, image, mask):
        self.model.eval()
        self.model.to(device)
        image = image.to(device)
        mask = mask.to(device)
        with torch.no_grad():
            image = image.unsqueeze(0)
            mask = mask.unsqueeze(0)
            output = self.model(image)
            acc = self.metric(output, mask)
            masked = torch.argmax(output, dim=1)
            masked = masked.cpu().squeeze(0)
        return masked, acc

    def evaluate_all(self):
        accuracy = [] 
        for i in tqdm(range(len(self.test_dataset))):
            img, mask = self.test_dataset[i]
            pred, acc = self.evaluate_single(img, mask)
            accuracy.append(acc)
        print(f"Mean accruacy = {np.mean(accuracy)}")
        return accuracy

    def show_qualitative(self, ind):
        image, mask = self.test_dataset[ind]
        pred_mask, score = self.evaluate_single(image, mask)
        inv_normalize = T.Normalize(
            mean=[-0.485/0.229, -0.456/0.224, -0.406/0.225],
            std=[1/0.229, 1/0.224, 1/0.225]
        )
        image = inv_normalize(image)
        image = image.cpu().numpy()
        image = image.swapaxes(0, 1)
        image = image.swapaxes(1, 2)
        import matplotlib.pyplot as plt
        fig, (ax1, ax2, ax3) = plt.subplots(1,3, figsize=(20,10))
        ax1.imshow(image)
        ax1.set_title('Picture')
        ax2.imshow(mask)
        ax2.set_title('Ground truth')
        ax2.set_axis_off()
        ax3.imshow(pred_mask)
        ax3.set_title(f'Model | score {score:.3f}')
        ax3.set_axis_off()
        plt.show()
```
- `__init__`에서는 어떤 모델을 테스트하는지, 어떤 데이터에 대해 테스트하는지, 그리고 어떤 metric을 사용할 것인지를 정합니다. 
- `evaluate_single()` 은 이미지 한 개를 받아서 이를 normalize한다음 실제로 inference해 봅니다. 결과로 predicted mask와 그 정확도를 반환합니다. `unsqueeze`는 간단히 그냥 텐서를 쭉 잡아펴주는 연산으로 생각하면 됩니다. 
- `evaluate_all()` 은 평균 정확도를 측정합니다. 
- `show_qualitative()` 는 결과의 정성적 평가를 위한 것으로, 특정 이미지에 대한 image, ground truth, prediction을 동시에 띄워줍니다. 실제로 이미지를 띄워야 하기 때문에, Dataset을 만들때 ToTensor와 Normalize했던 것을 다시 거꾸로 돌려줘야 합니다. Normalize의 정의를 이용하여 이부분은 적당히 처리해줄 수 있습니다. 

다음 포스팅에서는 train을 어떻게 실제로 실행할지와, 이를 이용해서 아주 간단한 모델을 한번 확인해보는 정도를 진행할 예정입니다. 