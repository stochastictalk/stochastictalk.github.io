---
title: "/stochastictalk/modality-overhang"
post-title: "Modality Overhang"
date: 2023-03-22
categories: foundation models, GPT, agi
layout: post
usemathjax: true
permalink_name: modality-overhang
---

> The capabilities of the model, which have been demonstrated above, both in terms of depth and generality, suggest that the machine learning community needs to move beyond classical benchmarking via structured datasets and tasks, and that the evaluation of the capabilities and cognitive abilities of those new models have become much closer in essence to the task of evaluating those of a human rather than those of a narrow AI model. 

Currently a majority of the casual analysis of GPT-3.5 turbo (a pedantic way of saying ChatGPT) and other ground-breaking foundation models focuses on the application opportunities for language models. Especially ones that have already been built, as opposed to ones that seem likely to be built soon. Here I balance this discussion of what's possible now with what I strongly believe will be possible within the next 1-2 years. In particular, I want to explore the opportunities that will arise from multimodal foundation models.

These are the models that will address the so-called 'modality overhang': 'overhang' meaning 'capability readily attainable using existing ideas, software, hardware, and organizations, but just need someone to get on with them', and 'modality' in the sense of a format of digital media (e.g. text, video, imagery, audio, webpages...). I use 'multimodal' here to mean that at least one combination of the model's possible inputs and outputs are different media formats. More succinctly - the low-hanging fruit for foundation models of mediums beside text: high-capability models that receive control inputs across text, speech, video, and other sensors, and return outputs that are similarly varied, notably including control signals for actuators.

## Why do I think highly capable multimodal foundation models will exist within the next few years? 

A small amount of context to explain why I find it very likely that this capabilty gap will be firmly closed soon:
1. Because of the [prospective economic impact of these models](https://arxiv.org/abs/2303.10130), there is a large opportunity cost for organizations capable of developing them in doing anything else, and OpenAI's success with ChatGPT has set off a firestorm of investment. See [Microsoft's $10bn investment in OpenAI](https://www.bloomberg.com/news/articles/2023-01-23/microsoft-makes-multibillion-dollar-investment-in-openai), and [Google's $300mn for 10% of Anthropic](https://www.ft.com/content/583ead66-467c-4bd5-84d0-ed5df7b5bf9c) and [scramble to incorporate generative features into Workspace](https://blog.google/technology/ai/ai-developers-google-cloud-workspace/).
2. To a significant extent, they already do: [Microsoft Research's evaluation](https://arxiv.org/pdf/2303.12712.pdf) demonstrated that GPT-4 has zero-shot capability to generate raw SVGs, TikZ images, Javascript code for 3D games, compositionally correct sketches (which incidentally that can be used to seed an image-synthesis model), function as a Python interpreter, use search and calculator tools in a zero-shot way, and solve problems in game environments experienced only via a text interface. And this was all without assessing the explicitly multimodal (i.e. image input) capability of the model!
3. There has been a monsoon of lower-TRL multimodal papers and codebases recently: [ModelScope](https://huggingface.co/spaces/damo-vilab/modelscope-text-to-video-synthesis) for text-to-video, [Midjourney](https://www.midjourney.com/app/) and [stable diffusion](https://github.com/Stability-AI/stablediffusion) for single-prompt text-to-image synthesis, [Instruct2Pix](https://www.timothybrooks.com/instruct-pix2pix) for sequential image synthesis and editing, [KOSMOS-1](https://arxiv.org/pdf/2302.14045.pdf), [BLIP 2](https://huggingface.co/docs/transformers/main/model_doc/blip-2), and [CLIP](https://github.com/openai/CLIP) for joint text-image representation, [CLIP&BLIP interrogator](https://github.com/pharmapsychotic/clip-interrogator) for image-to-text, [SpeechT5](https://huggingface.co/microsoft/speecht5_tts) and [VALL-E](https://github.com/enhuiz/vall-e) for text-to-speech, and [Composer](https://github.com/damo-vilab/composer) for richer x-to-image synthesis.


## Foundation models: the basics

To credibly chart how foundation models will proliferate and speculate on where they could be applied, it's necessary to understand their ingredients.

A multimodal model's central function is to represent how media tends to co-occur in its training data. For example, given an image of a leaking ceiling and a question "How do I stop this leak?", a well-fit model relating image and text to text assigns a high probability to a response explaining how to seek out possible sources of the leak and call a plumber, and a low probability to nonsense answers such as how the Roti Island snake-necked turtle is endangered. 

Why does the model output this response? 

Basic ingredients
- GPT-3.5: autoregressive pre-training (`text-), supervised fine-tuning on human-generated labelled prompts, then reinforcement learning from human feedback (fit a reward model to human preferences, use this reward model to further fine-tune the model using proximal policy optimisation).
- Alpaca: autoregressive pre-training (the [7B LLaMA model](https://arxiv.org/abs/2302.13971)), self-instruct instruction generation (using `text-davinci-3.5`) from 175 instruct seed examples and supervised fine-tuning.

- LLaMA: used exclusively publicly available data

## Multimodal models vs Language models

In this section I outline what might happen next. Time horizon of 1-2 years. Maybe.

### Vision-speech models

Language models receive and spew out text. This means that to interact with them, users must use a keyboard, which is a fairly dextrous high-effort undertaking. By contrast, cameras and microphones rely on communication channels that are far more alike to human-to-human interaction: vision and hearing.

To people outside of the machine learning research and engineering community then, who might assume that an objective of those inside it is to artificially imitate human intelligence, it may be surprising that the insiders have focused on text and (text, image) models. The reasons for this are apparent to those inside the community: the world we live in is one where processing imagery and text is easier than processing video and audio. Video and audio take up more space in memory and on disk than imagery and text. The history of PyTorch and TensorFlow, the distribution of media formats that feature in Kaggle notebooks, the topics of machine learning research papers, and the comparative maturity of code libraries for manipulating the various formats are testament to this statement. The vast majority of data scientists would find problems relating to image and text processing significantly more familiar than those involving video and audio. 

I should also mention that the data is there, waiting for a model to be fit to it: the internet hosts vast volumes of video with audio, but the research zeitgeist and engineering obstacles mean there is not yet much interest in fitting joint (image, speech) or (video, speech) models. There is also no obvious reason to think that massive transformers trained on vast quantities of audio and video will not yield results comparable to the success of GPT-4 on text and imagery. 

This combination of facts leads me to think that joint video-speech models are not far off. The convenience of this interface will be in uncomfortable conflict with expectations of privacy. 

### Human-computer interaction

Massively overindexed on text (e.g. filesystem)

### Breaking the ChatGPT paradigm

The interaction paradigm of ChatGPT is a one-to-one conversation in which the assistant leverages no context from other conversations, and has no internal dialogue.

There are many ways this paradigm can be broken:
* Multi-participant, especially what I'll call myriad-participant, conversations, involving more than one person and one agent, or alternatively many.
* The assistant could initiate conversation.
* The assistant could also be configured with an alternative intrinsic motivation besides prioritising responses that are preferred by users in general. An inherent limitation of RLHF is that the learnt preferences are averaged across many users.
* An internal dialogue could exist within the agent. This is explicitly called out in the [sparks of AGI paper](https://arxiv.org/pdf/2303.12712.pdf): 
> one of the main limitations of the model is that the architecture does not allow for an “inner dialogue” or a “scratchpad”, beyond its internal representations, that could enable it to perform multi-step computations or store intermediate results

### Human-computer interaction

### Alien senses

Compensating for the sensory blindspots of people

### Turbo senses

Enhancing the senses of people

### Risk-seeking behaviours

Government adopts slowly for risk-aversion reasons, people adopt quickly because it works and is offered by companies that bear no risk

## Climbing the modality overhang 

* Making the _thinking process_ visible in the training data.
* Equipping LLMs with agency and intrinsic motivation is a fascinating and important direction for future work
* Confidence calibration
* Long-term memory
* Continual learning 
* Insights from language model behaviour being used to understand human thought. 

Recipe: "Describe a process for answering this question/performing this task", followed by "Execute the process you described".

## Predictions

* Video-speech models within five years.
* A significant shift in the dominant mode of human-computer interface away from text and towards speech within five years.
* AI policy becoming as popular a topic as climate change policy within ten years.
