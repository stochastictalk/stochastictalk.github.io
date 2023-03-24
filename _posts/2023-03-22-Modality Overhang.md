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

These are the models that will address the so-called 'modality overhang'. 'Overhang' meaning 'capability readily attainable using existing ideas, software, hardware, and organizations, but just need someone to get on with them', and 'modality' in the sense of a format of digital media (e.g. text, video, imagery, audio, webpages...). I use 'multimodal' here to mean that at least one combination of the model's possible inputs and outputs are different media formats. 

More succinctly - the low-hanging fruit for foundation models of mediums beside text: high-capability models that receive control inputs across text, speech, video, and other sensors, and return outputs that are similarly varied, notably including control signals for actuators.

## Why do I think highly capable multimodal foundation models will exist within the next few years? 

A small amount of context to explain why I find it very likely that this capabilty gap will be firmly closed soon:
1. There is a competitive incentive for the organizations developing these models to do so, and a large opporunity cost in doing anything else.
2. To a large extent, they already do: [Microsoft Research's evaluation](https://arxiv.org/pdf/2303.12712.pdf) demonstrated that GPT-4 has zero-shot capability to generate raw SVGs, TikZ images, Javascript code for 3D games, compositionally correct sketches (which incidentally that can be used to seed an image-synthesis model), function as a Python interpreter, use search and calculator tools in a zero-shot way, and solve problems in game environments experienced only via a text interface. And this was all without assessing the explicitly multimodal (i.e. image input) capability of the model!
3. There has been a monsoon of recent multimodal papers and codebases: [ModelScope](https://huggingface.co/spaces/damo-vilab/modelscope-text-to-video-synthesis) for text-to-video, [Midjourney](https://www.midjourney.com/app/) and [stable diffusion](https://github.com/Stability-AI/stablediffusion) for single-prompt text-to-image synthesis, [Instruct2Pix](https://www.timothybrooks.com/instruct-pix2pix) for sequential image synthesis and editing, [KOSMOS-1](https://arxiv.org/pdf/2302.14045.pdf), [BLIP 2](https://huggingface.co/docs/transformers/main/model_doc/blip-2), and [CLIP](https://github.com/openai/CLIP) for joint text-image representation, [CLIP&BLIP interrogator](https://github.com/pharmapsychotic/clip-interrogator) for image-to-text, [SpeechT5](https://huggingface.co/microsoft/speecht5_tts) and [VALL-E](https://github.com/enhuiz/vall-e) for text-to-speech, and [Composer](https://github.com/damo-vilab/composer) for richer x-to-image synthesis.
4. The path to making these models high TRL seems readily accessible: large compute's available, large data's available, there are big teams of research and products engineers primed.


## Foundation models: the basics

To credibly chart how foundation models will proliferate and speculate on where they could be applied, it's necessary to understand their ingredients.

A multimodal model's central function is to represent how media tends to co-occur in its training data. For example, given an image of a leaking ceiling and a question "How do I stop this leak?", a well-fit model relating (image, text) to text assigns a high probability to a response explaining how to seek out possible sources of the leak and call a plumber, and a low probability to nonsense answers such as removing the back wheel from the bicycle and inverting it. 

Why does the model output this response? 


The


"one of the main limitations of the model is that the architecture does not allow for an “inner dialogue” or a “scratchpad”, beyond its internal representations, that could enable it to perform multi-step computations or store intermediate results"

* Making the _thinking process_ visible in the training data.
* Equipping LLMs with agency and intrinsic motivation is a fascinating and important direction for future work

Conclusions from the Microsoft Research paper:
* Confidence calibration
* Long-term memory
* Continual learning
* 

* Insights from language model behaviour being used to understand human thought. 

Recipe: "Describe a process for answering this question/performing this task", followed by "Execute the process you described".

The capabilities of the model, which have been demonstrated above, both in terms of depth and generality, suggest that the machine learning community needs to move beyond classical benchmarking via structured datasets and tasks, and that the evaluation of the capabilities and cognitive abilities of those new models have become much closer in essence to the task of evaluating those of a human rather than those of a narrow AI model. 



## A framework for thinking about multimodal models  


    * More precise articulation and creation of control and output formats - [Composer](https://github.com/damo-vilab/composer) and [Multimodal conditioning modules](https://arxiv.org/pdf/2302.12764.pdf) are examples of this, mapping from (sketch, palette, segmentation mask, caption, ...) to generated images, as opposed to just from 'images'.
    * User workflow (how does a person interact with it?)
    * What it means to create a useful multimodal representation
* Example applications
* Questions to answer