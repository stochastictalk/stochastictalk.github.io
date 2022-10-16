One of my things that gets my goose is the awful experience most people have with probability and statistics. I certainly don't blame anyone except the Department for Education and universities for this. For lots of these people, that they recoil at the mention of these topics can be attributed to the stress of forced and hamfisted exposure to maths when they were younger, the negative experience of being pushed into 'important' exams which they didn't feel prepared for. The bland 'crank the handle' type work that's prolific in UK high school maths doesn't help. In the rush for students to memorize barrelfuls of statistical devices and their operation, the philosophical thrills of randomness, uncertainty, and the logic of science are lost in the crush.  

I also bank that many higher education students have also been taught statistics in a way that they find baffling, apart maybe from those that learn it from degree courses offered by maths or stats departments. Those departments don't really count anyway, since they have the benefit of dedicated experts and the chance to teach students across multiple courses. I'm worried about the students that study engineering, the natural sciences, or the social sciences, those that have to make do with a statistics course that is run in just six weeks by a professor who might not care if the students learn, or might be a bit foggy on the concepts themselves.

I'm going to do my best to rectify that by giving the clearest explanations of concepts from probability and statistics I can. The only mathematical prerequisites for you are to know what a function is and what a set is. I'll also give lots of 'so whats' and highlight gotchas and places where things could get weird and confusing.



# Probability Models

Most students first meet statistical modelling via the linear model, a bottom-first approach which provides exposure to an instance of probability model. To my mind, this muddies the water slightly since students tend to picture the 'line' or a linear equation $y = ax_1 + b$ first, and consider it as a probability distribution second (if they get it at all). There are few situations I'd want to go into bottom-first, and I wonder if a more productive line of attack is 
1. introduce the concept of a probability model in the abstract, 
2. then provide the linear model as one of several examples.

Probability is a tool that allows us to reason about possible outcomes of an experiment. Here I mean 'experiment' really broadly, taking this definition:

> __Experiment__ - (noun) the making of an observation. 

Examples:
- Finding out what's in that big parcel under the Christmas Tree.
- Looking up the 20th decimal value of $\exp$.
- Learning how long you live for. 
- Rolling a dice or finding out what colour ball you take out of that blasted bag.

A probability space is a triple $(\Omega, \mathcal{F}, P)$ containing
- a _sample space_ $\Omega$, the set of all possible outcomes.
- an _event space_ $\mathcal{F}$, which contains _events_ - sets of outcomes from $\mathcal{\Omega}$.
- a _probability measure_ $P: \mathcal{F} \rightarrow [0, 1]$.

Probability spaces are commonly used to model the real world. And, good news, you too can create a probability model by defining a probability space.

To define the sample space $\Omega$, create a set where each element corresponds to a possible outcome of your experiment.  

