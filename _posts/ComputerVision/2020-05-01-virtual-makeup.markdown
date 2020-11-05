---
layout: post
title: "Virtual MakeUp Tool"
img: posts/ComputerVision/virtualMakeUp.png
group: computer_vision
---

This tool uses a variety of computer vision techniques and libraries to automatically detect the iris, the lips and the teeth on the image. Therefore you can:
- Whitten the teeth ;
- Change the color of the iris ;
- Change the color of the lips ;
- *Ongoing - not available yet:* Change the color of the hairs.

This tool is provided with three input images used for the tests and development. Refers to the `main()` function to add others and change it.

## Results

Before | After
:---: | :---:
![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/girl-no-makeup.jpg) | ![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/results/whole/girl-no-makeup.png)
![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/face1.png) | ![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/results/whole/face1.png)
![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/face2.png) | ![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/results/whole/face2.png)

Below are the mask computed to detect pixel-wisely the iris, the lips and the teeth on 3 different images:

Input | Mask
:---: | :---:
![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/girl-no-makeup.jpg) | ![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/results/masks/girl-no-makeup.png)
![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/face1.png) | ![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/results/masks/face1.png)
![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/face2.png) | ![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/results/masks/face2.png)


## How-to use the tool

### Dependencies

```python
import cv2
import copy
import dlib

import numpy as np

from tkinter import Tk, Button, Label
from tkinter import colorchooser
from PIL import Image, ImageTk
```
Make sure to install everything required.

To launch the tool:
```bash
> python virtualMakeup.py
```

### Some exemples:

Lips |
:---: |
![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/girl-no-makeup_Lips.gif) |

Lips & Teeth |
:---: |
![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/face2_LipsTeeth.gif) |

Eyes |
:---: |
![]({{site.baseurl}}/assets/img/posts/ComputerVision/virtualMakeUp/face2_Eyes.gif) |
