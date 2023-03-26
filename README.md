# stochastictalk.github.io



```
export DOCKER_DEFAULT_PLATFORM=linux/amd64
```

To work with a hotloading version of the site on port 4000:
```
docker run --rm --volume="$PWD:/srv/jekyll:Z" -p 4000:4000 -p 35729:35729 -it jekyll/jekyll jekyll serve --livereload
```
