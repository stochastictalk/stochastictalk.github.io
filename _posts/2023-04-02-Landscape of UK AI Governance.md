---
title: "/stochastictalk/landscape-of-uk-ai-governance"
post-title: "Landscape of UK AI Governance"
date: 2023-04-02
categories: governance, policy, ai
layout: post
usemathjax: true
permalink_name: uk-ai-governance
---

Here I recap how the AI governance discussion has heated up and do my best to outline the current shape of UK AI policy.

In the last two weeks AI has exploded into the public consciousness. This seems to be a consequence of
* ChatGPT being accessible and very capable (and being [banned in Italy](https://www.bbc.co.uk/news/technology-65139406))
* publication of Future of Life Institute's [Pause Giant AI Experiments letter](https://futureoflife.org/open-letter/pause-giant-ai-experiments/), which was signed by Yoshua Bengio, Stuart Russell, and Steve Wozniak
* the [Time magazine article by Eliezer Yudkowsky](https://time.com/6266923/ai-eliezer-yudkowsky-open-letter-not-enough/), containing such gems as 'be willing to destroy a rogue datacenter by airstrike'
* [Balenciaga Pope](https://www.theguardian.com/technology/2023/apr/01/misinformation-mistakes-and-the-pope-in-a-puffer-what-rapidly-evolving-ai-can-and-cant-do) and [Harry Potter](https://www.youtube.com/watch?v=iE39q-IKOzA), and the [Trump arrest photographs](https://www.theguardian.com/technology/2023/apr/01/misinformation-mistakes-and-the-pope-in-a-puffer-what-rapidly-evolving-ai-can-and-cant-do)

The letter pushed to the fore viscious disagreement on what should be done to regulate the development of AI. Notably absent from the letter's signatories are older figureheads of the field such as [Yann Le Cunn](https://twitter.com/ylecun/status/1640910484030255109?s=20), [Andrew Ng](https://twitter.com/AndrewYNg/status/1641121451611947009?s=20), and Geoff Hinton. Unsurprisingly, the battery of superstar deep learning researchers from Bay Area tech companies haven't signed either.

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

Its strapline is clear: current policy isn't sufficient to mitigate some extremely serious risks, so not only do we need to accelerate the creation of governance institutions and policy, but we also need to slow down the growth of capability.

The response to the letter from people who disagree with The Pause is variously:
* It would allow geopolitical rivals to the United States the opportunity to 'catch up', which would be foolish.
* It would create a significant opportunity cost because AI holds enormous promise to improve the wellbeing of people globally. Proponents of this position are presumably concerned about over-regulating development longer term.
* Realistically, it would require government intervention to enact, which is undesirable if you don't want the government doing that sort of thing as a matter of principle.
* In addition to some of the above being neglected, the existential and/or social and/or economic risks of AI are overstated and their time horizons are naively short.

UK AI policy at the minute and in the near future (who, what they're doing):
* 29th March policy whitepaper [A Pro-innovation Approach to AI Regulation](https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach)
* associated [impact assessment](https://assets.publishing.service.gov.uk/government/uploads/system/uploads/attachment_data/file/1147045/uk_ai_regulation_impact_assessment.pdf)
* [National AI strategy](https://www.gov.uk/government/publications/national-ai-strategy)
* the Department for Science, Innovation and Technology's [Office for Artificial Intelligence](https://www.gov.uk/government/organisations/office-for-artificial-intelligence)
* the Alan Turing Institute, particularly its [AI Standards Hub](https://aistandardshub.org/)
* Ministry of Defence published its own AI ethical principles and policy in June 2022

Excerpts from the policy whitepaper's Exec Summary:
* 'AI technologies are currently regulated through a complex patchwork of legal requirements'
* 'we will not put these principles on a statutory footing initially' 'principles will be issued on a non-statutory basis and implemented by existing regulators' 'we will... evaluate whether the non-statutory framework is having the desired effect'
* 'Following this initial period of implementation, and when parliamentary time allows, we anticipate introducing a statutory duty on regulators requiring them to have due regard to the principles'
* 'we will not move to introduce such a statutory duty [on regulators] if our monitoring of the framework shows that implementation is effective without the need to legislate'
* identified a number of central support functions, initially provided by government, necessary to implement the framework
    * Monitoring and evaluation of the overall regulatory framework’s effectiveness and the implementation of the principles, including the extent to which implementation supports innovation. This will allow us to remain responsive and adapt the framework if necessary, including where it needs to be adapted to remain effective in the context of developments in AI’s capabilities and the state of the art.
    * Assessing and monitoring risks across the economy arising from AI.
    Conducting horizon scanning and gap analysis, including by convening industry, to inform a coherent response to emerging AI technology trends.
    * Supporting testbeds and sandbox initiatives to help AI innovators get new technologies to market.
    * Providing education and awareness to give clarity to businesses and empower citizens to make their voices heard as part of the ongoing iteration of the framework.
    * Promoting interoperability with international regulatory frameworks.
* 'During our call for views, industry, academia and civil society stressed that international alignment should support UK businesses to capitalise on global markets and protect UK citizens from cross-border harms.'

From the meat of the paper:
* 'The proposed regulatory framework does not seek to address all of the wider societal and global challenges that may relate to the development or use of AI. This includes issues relating to access to data, compute capability, and sustainability, as well as the balancing of the rights of content producers and AI developers.'
* [Section specifically on foundation models](https://www.gov.uk/government/publications/ai-regulation-a-pro-innovation-approach/white-paper#section333)
* [Foundation Model Taskforce announced in the Integrated Review Refresh 2023](https://www.gov.uk/government/speeches/foreign-secretary-statement-to-parliament-on-the-integrated-review-refresh-2023) - this taskforce will be chaired by Matt Clifford from the newly created Advanced Research and Invention Agency

* [£900mn on an exascale computer](https://www.gov.uk/government/speeches/spring-budget-2023-speech) following the 6th March [Independent Review of the Future of Compute](https://www.gov.uk/government/publications/future-of-compute-review)

My brief summary: the Office for Artificial Intelligence has outlined a definition and some principles for AI systems that they want sector-specific regulators to assimilate and apply. The duty of regulators to comply with these principles is currently non-statutory, but the Office for AI will push for a statutory duty for regulators to comply if they feel the principles aren't being applied. The Office acknowledges that they need to gather evidence on what statutory interventions are preferable before making suggestions, and is strongly encouraging regulators to create requirements and guidance that are targeted at specific AI applications, as opposed to creating generic requirements for AI systems for an entire sector. In addition to the framework, the Office for AI is planning to introduce several central functions to support its implementation and evolution.

Central support functions roadmap will be published within the next six months, along with cross-sectoral guiding principles for regulators.

12 months or more from now: first iteration of central functions, publish the first monitoring and evaluation report

Ironically, this could actually be a domain in which Brexit helps UK businesses: I fully expect the [EU's AI act](https://artificialintelligenceact.eu/) to be more risk-averse than the sum total of UK legislation. Large fines will be imposed on companies that fail to comply, and innovation will be stifled. This will probably resulting in a similar outcome to what we've seen with the EU's GDPR versus the US's variegated data collection regulations: the EU will fall farther behind in the development of commercial AI applications, and the locus of control in the course of AI will shift further towards US companies (e.g. OpenAI almost certainly could not have trained a GPT-4-like model in the EU). 

* Does the Office for AI have the resources to fulfil the monitoring and coordination role it proposes?
* Do the sector-specific regulators have the resources to fulfil the role that the Office for AI is proposing?

My initial prediction is that the regulatory landscape will not develop as the Office for AI predict: in the next six months there will be more disruption, and major government offices will intervene.