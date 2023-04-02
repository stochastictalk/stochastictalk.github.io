---
title: "/stochastictalk/the-landscape-of-uk-ai-governance"
post-title: "The Landscape of UK AI Governance"
date: 2023-04-02
categories: GOVERNANCE POLICY AI
layout: post
usemathjax: true
permalink_name: uk-ai-governance
toc: true
---

Here I recap how the AI governance discussion has heated up and outline the current shape and immediate future of UK AI policy.


# It's Getting Hot in Here

In the last two weeks AI has ignited in the public consciousness. This seems to be a consequence of
* ChatGPT being accessible and very capable. And [banned in Italy](https://www.bbc.co.uk/news/technology-65139406)
* publication of the Future of Life Institute's [Pause Giant AI Experiments letter](https://futureoflife.org/open-letter/pause-giant-ai-experiments/), which was signed by Yoshua Bengio, Stuart Russell, and Steve Wozniak
* the [Time magazine article by Eliezer Yudkowsky](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/), containing such gems as 'be willing to destroy a rogue datacenter by airstrike'
* [Balenciaga Pope](https://www.theguardian.com/technology/2023/apr/01/misinformation-mistakes-and-the-pope-in-a-puffer-what-rapidly-evolving-ai-can-and-cant-do) and [Harry Potter](https://www.youtube.com/watch?v=iE39q-IKOzA), the [Trump arrest photographs](https://www.theguardian.com/technology/2023/apr/01/misinformation-mistakes-and-the-pope-in-a-puffer-what-rapidly-evolving-ai-can-and-cant-do), and a cascade of other photorealistic synthetic images generated using Midjourney's Version 5 model

There are several signals marking an abrupt increase in interest in AI governance outside of the typical Twitter clique: [Laura Kuenssberg is writing about it for the BBC](https://www.bbc.co.uk/news/uk-65147841), the White House ran [a press briefing](https://www.foxnews.com/politics/white-house-tight-lipped-push-congressional-intervention-rapid-ai-developments-heats) (the 'blueprint' mentioned is [here](https://www.whitehouse.gov/ostp/ai-bill-of-rights/)) specifically responding to the letter, and the Midjourney memes have gone viral.

Simmering away beneath the surface of all this are concerns of foundation models violating image copyright (Midjourney ref), compromising the privacy of web users (ChatGPT ref), and spewing out code that was originally licensed as copyleft. Oh, and in tech specifically, many companies are desperately searching for a GPT-4-like open source model that has a more commercially permissive license than Meta's LLaMA.

The letter strikes a fierce contrast to these comparatively humdrum concerns, as would be expected of a letter from the organisation that previously published a fictionalised [video of small autonomous drones selectively executing innocents](https://www.youtube.com/watch?v=HipTO_7mUOw).

# The Letter

The letter has brought to the fore ongoing disagreement regarding what should be done to regulate the development of AI. Notably absent from the letter's signatories are older figureheads of the field such as [Yann Le Cunn](https://twitter.com/ylecun/status/1640910484030255109?s=20), [Andrew Ng](https://twitter.com/AndrewYNg/status/1641121451611947009?s=20), and Geoff Hinton. Unsurprisingly, the battery of superstar deep learning researchers from Bay Area tech companies haven't signed either.

The specific requests in the letter:
* all AI labs to immediately pause for at least 6 months the training of AI systems more powerful than GPT-4
    * pause should be public and verifiable, and include all key actors
    * if such a pause cannot be enacted quickly, governments should step in and institute a moratorium
* AI labs and independent experts should use this pause to jointly develop and implement a set of shared safety protocols for advanced AI design and development that are rigorously audited and overseen by independent outside experts
    * AI developers must work with policymakers to dramatically accelerate development of robust AI governance systems
    * new and capable regulatory authorities dedicated to AI
    * oversight and tracking of highly capable AI systems and large pools of computational capability
    * provenance and watermarking systems to help distinguish real from synthetic and to track model leaks
    * a robust auditing and certification ecosystem
    * liability for AI-caused harm
    * robust public funding for technical AI safety research
    * well-resourced institutions for coping with the dramatic economic and political disruptions

The letter does not articulate a specific assessment of near-term risks (instead it references a set of canonical LessWrong x-risk books), but its strapline is clear: current policy isn't sufficient to mitigate some extremely serious risks, so not only do we need to accelerate the creation of governance institutions and policy, but we also need to slow down the growth of capability.

# Not the Letter

The responses to the letter from people who disagree with it are variously:
* It would allow geopolitical rivals to the United States the opportunity to 'catch up', which would be foolish.
* It would create a significant opportunity cost because AI holds enormous promise to improve the wellbeing of people globally. Proponents of this position are presumably concerned about over-regulating development longer term.
* Realistically, it would require government intervention to enact, which is undesirable if you don't want the government doing that sort of thing as a matter of principle.
* In addition to some of the above being neglected, the existential and/or social and/or economic risks of AI are overstated and their time horizons are naively short.


# Concrete UK AI Policy as of 2nd April 2023

The starting point for my overview of current UK policy is a whitepaper published a few days after the Pause letter. It was created by the Department for Science, Innovation, and Technology's (DSIT's) [Office for Artificial Intelligence](https://www.gov.uk/government/organisations/office-for-artificial-intelligence) and sets out how the Office, which is 'responsible for overseeing implementation of the National AI Strategy', intends to approach the cross-sectoral regulation of AI. 

## The Office for Artificial Intelligence's Policy Whitepaper

You can read the paper, _A Pro-innovation Approach to Regulating Artificial Intelligence_, [here](https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach). My crude summary of it follows.

Currently AI systems are regulated by sector-specific regulators. The Office for AI wants to keep it this way, but have provided a set of governance principles and will provide central support functions to these regulators specifically to help them govern AI systems. 

Crucially, the Office for AI clarifies that regulators are not yet legally compelled to apply these principles or leverage these support functions in drafting new requirements and guidelines. However, the Office mentions that they will chase legal oomph if regulators don't apply the principles voluntarily. 

The Office acknowledges that they need to gather evidence on what statutory interventions are preferable before making suggestions, and is strongly encouraging regulators to create requirements and guidance that are targeted at specific AI applications, as opposed to creating generic requirements for AI systems for an entire sector. 

The Office proposes six central support functions (quoted verbatim):
* Monitoring and evaluation of the overall regulatory framework’s effectiveness and the implementation of the principles, including the extent to which implementation supports innovation. This will allow us to remain responsive and adapt the framework if necessary, including where it needs to be adapted to remain effective in the context of developments in AI’s capabilities and the state of the art.
* Assessing and monitoring risks across the economy arising from AI.
* Conducting horizon scanning and gap analysis, including by convening industry, to inform a coherent response to emerging AI technology trends.
* Supporting testbeds and sandbox initiatives to help AI innovators get new technologies to market.
* Providing education and awareness to give clarity to businesses and empower citizens to make their voices heard as part of the ongoing iteration of the framework.
* *Promoting interoperability with international regulatory frameworks.

The Office for AI explicitly state that they will not be confronting the copyright dilemmas posed by Midjourney, Stability, Github Copilot and so on:
> _The proposed regulatory framework does not seek to address all of the wider societal and global challenges that may relate to the development or use of AI. This includes issues relating to access to data, compute capability, and sustainability, as well as the balancing of the rights of content producers and AI developers._

* [Section specifically on foundation models](https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach/white-paper#section333)

The whitepaper also briefly mentions a Foundation Model Taskforce that will sit inside the Office for AI and will be directed by Matt Clifford from the Advanced Research and Innovation Agency.

Central support functions roadmap will be published within the next six months, along with cross-sectoral guiding principles for regulators.

12 months or more from now: first iteration of central functions, publish the first monitoring and evaluation report, 


## The National AI Strategy

(National AI Strategy)[https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1020402/National_AI_Strategy_-_PDF_version.pdf] (first published September 2021, last updated December 2022).

# The Putative Future of UK AI Policy

Ironically, this could actually be a domain in which Brexit helps UK businesses: I fully expect the [EU's AI act](https://artificialintelligenceact.eu/) to be more risk-averse than the sum total of UK AI regulation. Large fines will be imposed on companies that fail to comply and innovation will be stifled. This will probably result in a similar outcome to what we've seen with the EU's GDPR versus the US's variegated data collection regulations: the EU will fall farther behind in the development of commercial AI applications, and the locus of control in the course of AI will shift further towards US companies (e.g. OpenAI almost certainly could not have trained a GPT-4-like model in the EU). 

* Does the Office for AI have the resources to fulfil the monitoring and coordination role it proposes?
* Do the sector-specific regulators have the resources to fulfil the role that the Office for AI is proposing?

My initial prediction is that the regulatory landscape will not develop as the Office for AI predict: in the next six months there will be more disruption, and major government offices will intervene.