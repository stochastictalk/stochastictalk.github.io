---
title: "/stochastictalk/modality-overhang"
post-title: "Modality Overhang"
date: 2023-03-22
categories: foundation models, GPT, agi
layout: post
usemathjax: true
permalink_name: modality-overhang
---


Currently a majority of the casual analysis of GPT and other ground-breaking foundation models focuses on the application opportunities for language models. Especially ones that have already been built, as opposed to ones that seem likely to be built soon. Here I balance this discussion of what's possible now with what I strongly believe will be possible within the next 1-2 years. In particular, I want to explore the opportunities that will arise from multimodal foundation models.

These are the models that will address the so-called 'modality overhang'. 'Overhang' meaning 'capability readily attainable using existing ideas, software, hardware, and organizations, but just need someone to get one with them', and 'modality' in the sense of a format of digital media (e.g. text, video, imagery, audio, webpages...). 

More succinctly - the low-hanging fruit for foundation models of mediums beside text: high-capability models that receive control inputs across text, speech, video, and other sensors, and return outputs that are similarly varied, notably including control signals for actuators.

## Why do I think highly capable multimodal foundation models will exist within the next few years? 

A small amount of context to explain why I find it very likely that this capabilty gap will be firmly closed soon:
1. There is a competitive incentive for the organizations developing these models to do so, and a large opporunity cost in doing anything else.
2. Models of this type exist already at a low TRL: 
3. Unimodal models are developing quickly and the way they are trained is mode-agnostic:
    * Text-to-video: [ModelScope](https://huggingface.co/spaces/damo-vilab/modelscope-text-to-video-synthesis), DreamBooth, ;
    * Text-to-image: Midjourney and stable diffusion for single-prompt synthesis; [Instruct2Pix](https://www.timothybrooks.com/instruct-pix2pix) for sequential synthesis and editing;
    * Image-to-text: [CLIP&BLIP interrogator](https://github.com/pharmapsychotic/clip-interrogator);
    * Image-text: [BLIP 2](https://huggingface.co/docs/transformers/main/model_doc/blip-2); CLIP
    * (speech text): [SpeechT5](https://huggingface.co/microsoft/speecht5_tts)
    * (image, text): [KOSMOS-1](https://arxiv.org/pdf/2302.14045.pdf)
    * Text-to-speech: [VALL-E](https://github.com/enhuiz/vall-e)
    * Speech-to-speech: [VALL-E X](https://arxiv.org/abs/2303.03926)
    * (text, image, ...)-to-image: [Composer](https://github.com/damo-vilab/composer)
    * Image-to-image: 
4. The path to making these models high TRL seems readily accessible: large compute's available, large data's available, there are big teams of research and products engineers primed.


## A framework for thinking about multimodal models  


    * More precise articulation and creation of control and output formats - [Composer](https://github.com/damo-vilab/composer) and [Multimodal conditioning modules](https://arxiv.org/pdf/2302.12764.pdf) are examples of this, mapping from (sketch, palette, segmentation mask, caption, ...) to generated images, as opposed to just from 'images'.
    * User workflow (how does a person interact with it?)
    * What it means to create a useful multimodal representation
* Example applications
* Questions to answer