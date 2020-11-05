---
layout: post
title: "Facial detection and recognition"
img: posts/ComputerVision/FacialRecognition.gif
group: computer_vision
---

This tool uses dlib and OpenCV to detect faces, extract them and recognizes them.

It is divided into two parts:
- Facial Detection & Extraction & Aligment
- Facial Recognition

## A - Facial Detection & Extraction & Aligment

![]({{site.baseurl}}/assets/img/posts/ComputerVision/faceDetectionRecognition/FacialDetection.gif)

Two scripts are availables here:
1. `myStaticFacialDetector.py` which detects faces and computes facial landemarks on images ;
2. `myWebcamFacialAligment.py`, the main script here, which:
	- Launch the webcam ;
	- Detect the faces ;
	- Compute the facial landemarks ;
	- Extract the faces ;
	- Align the extracted faces and display them.

### Dependencies

```python
import dlib
import cv2
import math
import numpy as np
```

### How-to launch

```bash
> python myWebcamFacialAlignement.py
```

## B - Facial Recognition

![]({{site.baseurl}}/assets/img/posts/ComputerVision/faceDetectionRecognition/FacialRecognition.gif)

The script `myWebcamFacialRecognition.py` uses the previous face detection and recognize the faces within a dataset. You can use one or more images per faces, the algorithm will just output the name with the highest similarities.

### Add a new person to recognize

To add a new face in the dataset, add the corresponding *.jpg* file in the *data/images/knownFaces/* folder:
```
FaceDetection-Recognition
├── data
│   ├── gifs
│   │   └── *.gif
│   ├── images
│   │   ├── faces
│   │   │   └── *.jpg
│   │   └── knownFaces
│   │       └── *.jpg         *Here you can add your images*
│   └── models
│       └── *.dat
├── Detection
│   └── ...
├── Recognition
│   └── ...
└── README.md
```

### Dependencies

```python
import glob
import ntpath
import dlib
import cv2
import math
import numpy as np
import face_recognition
```

### How-to launch

```bash
> python myWebcamFacialRecognition.py
```

### Understand how it works

To see a practical example with more details explanations of the method used, please refer to my other project [DoppelGanger]({{site.baseurl}}/doppelGanger)
