# stochastictalk.github.io

My home for self-aggrandizing egocentric content!

To run with Jekyll Docker image:
```
docker run --rm --volume="$PWD:/srv/jekyll:Z" -it jekyll/jekyll jekyll build
```

Can then host locally using e.g. Python's web server by navigating to `_static` and executing
```
python -m http.server
```
