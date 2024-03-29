+++
title = 'Home'
date = 2024-01-15T10:18:17-05:00
draft = false
+++

<p align="center">
  <a href="https://github.com/ESAOpenSR/opensr-test">
    <img src="/imgs/logo_opensrtest.png" alt="header" width="55%">
  </a>
</p>

<p align="center">
    <em>A comprehensive benchmark for real-world Sentinel-2 imagery super-resolution</em>
</p>

<p align="center">
<a href='https://pypi.python.org/pypi/opensr-test'>
    <img src='https://img.shields.io/pypi/v/opensr-test.svg' alt='PyPI' />
</a>

<a href="https://opensource.org/licenses/MIT" target="_blank">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License">
</a>
<a href='https://opensr-test.readthedocs.io/en/latest/?badge=main'>
    <img src='https://readthedocs.org/projects/opensr-test/badge/?version=main' alt='Documentation Status' />
</a>
<a href="https://github.com/psf/black" target="_blank">
    <img src="https://img.shields.io/badge/code%20style-black-000000.svg" alt="Black">
</a>
<a href="https://pycqa.github.io/isort/" target="_blank">
    <img src="https://img.shields.io/badge/%20imports-isort-%231674b1?style=flat&labelColor=ef8336" alt="isort">
</a>
</p>

---

**GitHub**: [https://github.com/ESAOpenSR/opensr-test](https://github.com/ESAOpenSR/opensr-test)

**Documentation**: [https://opensr-test.readthedocs.io/](https://opensr-test.readthedocs.io/)

**PyPI**: [https://pypi.org/project/opensr-test/](https://pypi.org/project/opensr-test/)

**Paper**: Coming soon!

---

#

## Overview {#overview}

In remote sensing, Image Super-Resolution (ISR) goal is to improve the ground sampling distance. However, two problems are common in the literature. Firstly, most models are **tested on synthetic data**, raising doubts about their real-world applicability and performance. Secondly, traditional evaluation metrics such as PSNR, LPIPS, and SSIM are not designed for assessing ISR performance. These metrics fall short, especially in conditions involving changes in luminance or spatial misalignments - scenarios that are frequently encountered in remote sensing imagery.

To address these challenges, 'opensr-test' provides a fresh and fair approach for ISR benchmark. On one front, we provide **three datasets** that were carefully crafted to minimize spatial and spectral misalignment. Besides, 'opensr-test' precisely assesses ISR algorithm performance across **three independent metrics groups** that measure *spectral and spatial consistency*, *the distance between the SR, HR and LR images*, and *overall correctness*.

## How to use {#how_to_use}

The example below shows how to use `opensr-test` to benchmark your SR model.

```python
import torch
import opensr_test

lr = torch.rand(4, 64, 64)
hr = torch.rand(4, 256, 256)
sr = torch.rand(4, 256, 256)

metrics = opensr_test.Metrics()
metrics.setup(lr=lr, sr=sr, hr=hr)
metrics.compute()
metrics.summary()
```

## Installation {#installation}

Install the latest version from PyPI:

```
pip install opensr-test
```

Upgrade `opensr-test` by running:

```
pip install -U opensr-test
```

Install the latest dev version from GitHub by running:

```
pip install git+https://github.com/ESAOpenSR/opensr-test
```

## Examples {#examples}

The following examples show how to use `opensr-test` to benchmark your SR model.

- Use `opensr-test` with a custom SR TensorFlow model [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1cAGDGlj5Kqt343inNni3ByLE1856z0gE#scrollTo=xaivkcD5Zfw1&uniqifier=1)

- Use `opensr-test` with a custom PyTorch model [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1Db8-JSMTF-hNZQv2UyBDclxkO5hgP9VR#scrollTo=jVL7o6yOrJkY)

- Use `opensr-test` with a diffuser model [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1banDovG43c2OBh9MODPN4OXgaSCXu1Dc#scrollTo=zz4Aw7_52ulT)

- Use `opensr-test` to test a multi-image SR model (Satlas Super Resolution) [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1OlrYome8gcBH6Wu3SQhaw6mSlr2apWdV?usp=sharing#scrollTo=NOk0G3-BWonm)

- Use `opensr-test` to create a animated GIF of the SR correctness [![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1pixF3QLDjkwi6Li2ENpty_6857LXkYIx?usp=sharing)

## Visualizations {#visualizations}

The `opensr-test` package provides a set of visualizations to help you understand the performance of your SR model.

```python
import torch
import opensr_test
from super_image import HanModel
import matplotlib.pyplot as plt

# Define the SR model
srmodel = HanModel.from_pretrained('eugenesiow/han', scale=4)

# Load the data
lr, hr, landuse, parameters = opensr_test.load("spot").values()

# Define the benchmark experiment
metrics = opensr_test.Metrics()

# Define the image to be tested
idx = 0
lr_img = torch.from_numpy(lr[idx, 0:3])
hr_img = torch.from_numpy(hr[idx, 0:3])
sr_img = srmodel(lr_img[None]).squeeze()

# Compute the metrics
metrics.setup(lr=lr_img, sr=sr_img, hr=hr_img)
metrics.compute()
```

Now, we can visualize the results using the `opensr_test.visualize` module.
fDisplay the triplets LR, SR and HR images:

```python
metrics.plot_triplets()
```

<p align="center">
  <img src="/imgs/example01.png" width="100%">
</p>



Display the quadruplets LR, SR, HR and landuse images:

```python
metrics.plot_quadruplets()
```

<p align="center">
  <img src="/imgs/example02.png" width="100%">
</p>



Display the matching points between the LR and SR images:

```python
metrics.plot_spatial_matches()
```

<p align="center">
  <img src="/imgs/example03.png" width="70%">
</p>




Display a summary of all the metrics:

```python

metrics.plot_pixel_summary()

```

<p align="center">
  <img src="/imgs/example04.png" width="100%">
</p>



Display the correctness of the SR image:

```python
metrics.plot_tc()
```

<p align="center">
  <img src="/imgs/example05.png" width="100%">
</p>


## Deeper understanding {#deeper_understanding}

Explore the [API](/docs/API/model_parameters.md) section for more details about personalizing your benchmark experiments.

<p align="center">
    <a href="/docs/api.md"><img src="/imgs/image02.png" alt="opensr-test" width="30%"></a>
</p>

## Citation {#citation}

If you use `opensr-test` in your research, please cite our paper:

```
Coming soon!
```

## Acknowledgements {#acknowledgements}

This work was make with the support of the European Space Agency (ESA) under the project “Explainable AI: application to trustworthy super-resolution (OpenSR)”. Cesar Aybar acknowledges support by the National Council of Science, Technology, and Technological Innovation (CONCYTEC, Peru) through the “PROYECTOS DE INVESTIGACIÓN BÁSICA – 2023-01” program with contract number PE501083135-2023-PROCIENCIA.

<center>
    <a href=""><img src="/imgs/logo-adc.png" alt="opensr-test" width="40%"></a>    
</center>



