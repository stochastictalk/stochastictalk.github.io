---
title: "/stochastictalk/vector-search-and-nearest-neighbours"
post-title: "Vector Search & Nearest Neighbours"
date: 2022-10-16
categories: STATISTICS MACHINE-LEARNING
layout: post
usemathjax: true
permalink_name: approximate-nearest-neigbours
toc: true
---

🚧 Under Construction 🚧

This post is a briefing on nearest neighbours and approximate nearest neighbours algorithms for people that want to use them for vector search.

<hr class="solid-green">

# Exhaustive Neighbours, Approximate Neighbours, and Vector Search  
<a href="#top">↑ to top ↑</a>

Terms that will come up a lot on this page:

> <mark>Vector (similarity) search</mark> is functionality that receives one or more query vectors and returns a (possibly ordered) set of vectors based on their proximity to the queries.

> <mark>Exhaustive nearest neighbours algorithms</mark> provide an iron-clad guarantee what is returned for a query will be its nearest neighbours. 

> This is in distinction to an <mark>approximate nearest neighbour algorithm</mark>, which exchanges some of this exactness for faster execution or a reduced memory burden.

## Why Care About Vector Search?

Reason 1: vectors can be used to encode the nuances of content such as images (of clothing, places, animals, ...), audio (music, human speech, bird calls, ...), documents, videos, and a great deal besides. Vector search allows users to navigate this content. It is usually best used to augment, as opposed to replace, traditional database filters and ranking.

Reason 2: vector search can form the basis of a predictive model.


## Page Layout + What's an Index?

To make this page easier to navigate, the details of each algorithm are split across three subsections:
1. how it creates the index,
2. how it adds a vector to the index,
3. how it queries a vector against the index.

As you might be able to tell, that word 'index' is going to come up a lot here. Its meaning? 

> The <mark>index</mark> of a nearest neighbours algorithm is the data structure that contains stored vectors and that gets searched at query time. 

It's the filing cabinet of a nearest neighbours algorithm. 

<hr class="solid-green">

# Exhaustive Nearest Neighbours
<a href="#top">↑ to top ↑</a>

Three common (i.e. they're in `sklearn`'s `NearestNeighbours` implementation) algorithms for exhaustive nearest neighbours:
* brute force (as in, 'compare the query with all the stored vectors', not 'bludgeon the data person'),
* ball tree,  
* $$k$$-dimensional tree.

<hr class="dashed-white">

## Brute-force

<a href="#top">↑ to top ↑</a>

Something

## $$k$$-dimensional Tree

<a href="#top">↑ to top ↑</a>

A $$k$$-dimensional tree is a binary data structure that partitions the data's space (which has dimensionality $$k$$) using a sequence of splits, each of which is on a single feature axis. These splits carve the space up into boxes (hyperrectangles, orthotopes, high-dimensional cuboids). 

A vector is added to the index by answering the tree's sequence of yes/no questions about the vector's elements.


## Ball Tree

<a href="#top">↑ to top ↑</a>

Instead of splitting the space into boxes, a ball tree splits it into nested balls (hyperspheres), which are defined by a centre and a radius. Each data point is sorted into a ball. Candidates for a nearest-neighbours search are filtered by using the fact that distances from a query $$q$$ outside of a ball to all points in that ball are in $$[\|q - C\| - r, \|q - C\| + r]$$[^1]. Typically outperforms k-dimensional tree in high dimensions.


[^1] Upper bound can be tightened to $$\|q - C_p\|$$, where $$C_p$$ is the centre of the ball's parent.


---

# Approximate Nearest Neighbours 

<a href="#top">↑ top ↑</a>


## Flat Index

Corresponds to brute-force exhaustive nearest neighbours.

`IndexFlatL2` is
- not a trained index
- exhaustive search (compare query vector to all vectors in the index)

## Inverted File Index

`IndexIVFFlat`
- is a trained index
- partitions data into cells
- `nprobe` attribute defines number of cells to search for neighbours, the 'search scope', starting from the closest one
- `nlist` configures number of cells to create
- allows burden of computation to be dialled down by reducing the scope of the search

Inverted File Index
- search scope reduction through clustering
- each data point is assigned to the Voronoi cell centered on a cluster centroid
- `nprobe` configures number of adjacent cells to search

## Minhashing and Banding

Locality sensitive hashing (shingling, minhashing, banded LSH)
- Locality sensitive hashing consists of several different methods. One covered here is the 'traditional approach': shingling --> MinHashing --> banded LSH function.
- Random projection is another way to do locality sentistive hashing.
- Shingling = converting a string of text into a set of 'shingles', tiles containing a fixed number of characters.
- Create a vocabulary from union of shingle sets, then use it to one-hot encode each shingle set.
- Minhashing = define length of output a.k.a. the signature. To get the value of each location in that output, generate a shuffled list of the first `1` to `len(ohe_vector)` integers then select the smallest number that corresponds to a 1 in the `ohe_vector`. Minhashing is a technique for estimating the Jacard index. 
- Minhashing a long one-hot encoded vector alone is unlikely to map similar vectors to the same hash value. Banding is a technique that addresses this issue: rather than minhashing the whole vector, we split the vector into sub-vectors then minhash those. We can then measure similarity between two vectors using the number of hashing collisions across all hashed sub-vectors.
- Can solve analytically for probability of a pair being a candidate pair via $$P = 1 - (1 - s^r)^b$$, where $$b$$ is the number of bands, $$r$$ is the number of rows in each band, and $$s$$ is the similarity score (Jacard index).


## Random Projection

A kind of locality-sensitive hashing.

- generate $$nbits$$ hyperplanes intersecting the origin
- hash a vector into $$nbits$$ values in $$\{0, 1\}$$ indicating which side of each hyperplane it lies on.
- compare distance of hashes using Hamming distance (number of mismatches).
- this is the index that FAISS's `IndexLSH` corresponds to.


## Product Quantisation

`IndexPQ` and `IndexIVFPQ`
- Product quantization = vector compression
- Each vector is split into subvectors, which are then clustered to yield centroids for each set of sub-vectors. Each sub-vector is then replaced with the ID of its nearest set-specific centroid. 
- _not_ the same as dimensionality reduction.
- Rather than reducing the dimensionality of the vectors, we reduce their scope - the number of unique symbols. One way to do this is via locality sensitive hashing. Another is to use centroids.
- 'Quantization is primarily used to reduce the memory footprint of indexes'
- Product quantization is a type of quantization. How it works:
    - Split input vector into subvectors.
    - Assign each of these subvectors to its nearest centroid (a.k.a. reproduction/reconstruction value)
    - Replacing these centroid values with unique IDs
    - `nbits` is the number of bits in the ID code (so $$2^{nbits}$$ is the number of centroids per subspace).
- 'Lower recall rates are a major drawback of PQ'
- Can be combined with inverted file index - Voronoi cells are constructed for the quantized vectors.
- Optimized Product Quantization (OPQ) works by rotating vectors to flatten the distribution of values across the subvectors used in product quantization.

## Hierarchical Navigable Small World Graphs


Hierarchical Navigable Small World Graphs
- Navigable Small World graph = graph structure where vertices contain data points and are connected to their nearest neighbouring vertices.
- the 'small world' part here refers to there being very short average path lengths to all other vertices within the graph
- 'hierarchical' bit refers to nesting of graphs inside of vertices of other graphs.
- 'for bigger datasets with higher dimensionality, HNSW graphs are some of the best-performing indexes that we can use'
- `M` is the number of nearest neighbours that each vertex will connect to. Higher values of this will improve search performance, at the cost of a larger index size.
- `efSearch` is the number of entry points that will be explored between layers during the search
- `efConstruction` is the number of entry points that will be explored when building the index


Hierarchical navigable small-world graphs
- Probability skip list
- A skip lists works by building several layers of linked lists on top of a sorted list.
- On the first layer, links may skip many intermediate nodes/vertices.
- Moving down the layers, the number of skips by each link is decreased.
- To search a skip list, we start at the highest layer with the longest 'skips' and move along it. If we find the currently node key is greater than the key we are searching for, we know we've overshot our target, so we move down to the next level.
- HNSW has the same layered format with longer edges in the highest layers and shorter edges in the lower layers.
- Borrows inspiration from NSW graphs and Pugh's probability skip list. 
- In HNSW graphs, higher levels of the hierarchy contain longer links, while lower layers contain shorter links. Higher layers tend to be higher-degree because search over them pays off with bigger gains in recall. When we reach a local minimum during routing, we either descend to the lower layer or return the vertex.
- Graph construction: vectors are iteratively inserted one-by-one. The number of layers is represented by parameter `L`. The probability of insertion at a layer is given by a probability function normalized by the level multiplier `m_l`, where `m_l = 0` means vectors are inserted at layer 0 only. Also configure the number of neighbors we add to each vertex on insertion. Not totally clear on the rest of the description.

Navigable Small World Graphs
- Searching the graph proceeds starting from an _entry point_. We search the neighbours of the entry point and move to the one that is closest to the query vector. This repeats until we are at a vertex which is close to the query than all of its neighbours. This algorithm is called 'greedy routing'.
- To minimize the probability of stopping in a local minima, we can increase the degree of vertices, but this increases network complexity (and therefore storage space and search time). So the average degree of vertices needs to be balanced.


## Bonus: Index Composition

Composing indices
- Built from a combination of 
    - a vector transform (pre-processing step applied to vectors before indexing, e.g. PCA, OPQ)
    - a coarse quantizer (for restricting search scope: organization of vectors to buckets, includes inverted file index, inverted multi-index, and hierarchical navigable small world graphs)
    - a fine quantizer (for compressing index size, such as product quantization and locality sensitive hashing)
    - refinement (a final step at search-time which re-orders results using distance calculations on the original flat vectors)
- Popular compositions
    - IVFADC
        - Inverted file index (assigning vectors to Voronoi cells)
        - followed by product quantization.
        - At query time, an asymmetric distance computation (ADV) is executed. It's called asymmetric because it compares the uncompressed query vector to the compressed product quantization vectors. This is as opposed to symmetric distance computation, where the query vector is quantized before being compared to the PQ vectors.
    - OPQ
        - Optimized product quantization - see details under product quantization
        - Used in combination with an inverted file index as per IVFADC.
    - Multi-D-ADC (multi-dimensional asymmetric distance computation)
        - Based on inverted multi-index (IMI), which is an extension of the inverted file index.
        - Works very similar to IVF, but Voronoi cells are split across vector dimensions (i.e. there is a set of Voronoi cells/centroids created for each subvector).
        - Add vector compression using product quantization to an inverted multi-index and multi-D-ADC is obtained. Notice the similarities between this and IVFADC.
    - IVF with HNSW graphs
        - Creates a hierarchical navigable small world graph for navigating the inverted file index centroids.
        - Obviously only worth it if you use a large `nlist` value.

Scalar quantisation



# References

[1] [sklearn's page on nearest neighbours](https://scikit-learn.org/stable/modules/neighbors.html)

[2] [Product quantization for nearest neighbor search](https://lear.inrialpes.fr/pubs/2011/JDS11/jegou_searching_with_quantization.pdf)

[Alternative overview of product quantization](https://hal.inria.fr/file/index/docid/514462/filename/paper_hal.pdf)

[3] [Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs](https://arxiv.org/abs/1603.09320)

[4] [A Survey of Product Quantization](https://www.jstage.jst.go.jp/article/mta/6/1/6_2/_pdf)

[5] [FAISS Guidelines to Choosing an Index](https://github.com/facebookresearch/faiss/wiki/Guidelines-to-choose-an-index)


[DiskANN](https://github.com/microsoft/DiskANN) is a graph-based approximate nearest neighbours algorithm that does not require the search index to be loaded into memory.

[Learning to index for nearest neighbor search](https://arxiv.org/pdf/1807.02962.pdf)

[ANN Benchmarks](http://ann-benchmarks.com/)

[Erik Bernhardsson presentation](https://www.slideshare.net/erikbern/approximate-nearest-neighbor-methods-and-vector-models-nyc-ml-meetup)

[Research foundations of FAISS](https://faiss.ai/)

[Pinecone vector indexes tutorial](https://www.pinecone.io/learn/vector-indexes/)

[2016 review paper from Li et al](https://arxiv.org/pdf/1610.02455.pdf)

Notably, Milvus performs very poorly in these benchmarks compared to competitors.




